const User = require('../models/User');
const Lesson = require('../models/Lesson');
const LessonReport = require('../models/LessonReport');

class AdminService {
    async getStats() {
        const totalUsers = await User.countDocuments();
        const totalLessons = await Lesson.countDocuments();
        const totalReports = await LessonReport.countDocuments();
        return { totalUsers, totalLessons, totalReports };
    }

    async getAllUsers() {
        return await User.find().sort({ createdAt: -1 });
    }

    async updateUserRole(id, role) {
        return await User.findByIdAndUpdate(id, { role }, { new: true });
    }

    async updateUserPremiumStatus(id, isPremium) {
        return await User.findByIdAndUpdate(id, { isPremium }, { new: true });
    }

    async getAllLessons() {
        return await Lesson.find().populate('creatorId', 'name email').sort({ createdAt: -1 });
    }

    async deleteLesson(id) {
        return await Lesson.findByIdAndDelete(id);
    }

    async getAllReports() {
        return await LessonReport.find().populate('lessonId').populate('reporterId', 'name email');
    }

    async resolveReport(id) {
        return await LessonReport.findByIdAndDelete(id);
    }
}

module.exports = new AdminService();
