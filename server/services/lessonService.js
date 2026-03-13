const Lesson = require('../models/Lesson');
const User = require('../models/User');

class LessonService {
    async createLesson(lessonData, userEmail) {
        // Always derive creatorId from the verified token email (server-side)
        const user = await User.findOne({ email: userEmail });
        if (!user) throw new Error('User not found');

        const lesson = await Lesson.create({
            ...lessonData,
            creatorId: user._id,
            creatorEmail: userEmail,
            creatorName: lessonData.creatorName || user.name,
            creatorPhoto: lessonData.creatorPhoto || user.photoURL,
        });

        // Increment user's createdLessons count
        await User.findByIdAndUpdate(user._id, { $inc: { createdLessons: 1 } });

        return lesson;
    }

    async getAllLessons(filters = {}) {
        const { category, emotionalTone, search, page = 1, limit = 9, visibility = 'public' } = filters;
        const query = { visibility };

        if (category && category !== 'undefined' && category !== 'null') {
            query.category = { $regex: `^${category}$`, $options: 'i' };
        }

        if (emotionalTone && emotionalTone !== 'undefined' && emotionalTone !== 'null') {
            query.emotionalTone = { $regex: `^${emotionalTone}$`, $options: 'i' };
        }

        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            query.$or = [
                { title: { $regex: escapedSearch, $options: 'i' } },
                { description: { $regex: escapedSearch, $options: 'i' } },
                { category: { $regex: escapedSearch, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        const total = await Lesson.countDocuments(query);
        const lessons = await Lesson.find(query)
            .populate('creatorId', 'name photoURL')
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        return {
            lessons,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        };
    }

    async getLessonById(id) {
        return await Lesson.findById(id).populate('creatorId', 'name photoURL bio socialLinks');
    }

    async getLessonsByCreator(userEmail) {
        const user = await User.findOne({ email: userEmail });
        if (!user) throw new Error('User not found');
        return await Lesson.find({ creatorId: user._id });
    }

    async updateLesson(id, updateData) {
        return await Lesson.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }

    async deleteLesson(id) {
        return await Lesson.findByIdAndDelete(id);
    }
}

module.exports = new LessonService();
