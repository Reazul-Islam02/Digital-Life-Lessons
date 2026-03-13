const User = require('../models/User');

class UserService {
    async syncUser(userData) {
        const { email, name, photoURL } = userData;
        return await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    name: name || email.split('@')[0] || 'User',
                    photoURL
                },
                $setOnInsert: {
                    role: 'user',
                    isPremium: false,
                    createdLessons: 0
                }
            },
            { upsert: true, new: true, runValidators: true }
        );
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async updateProfile(email, profileData) {
        return await User.findOneAndUpdate(
            { email },
            { $set: profileData },
            { new: true, runValidators: true }
        );
    }

    async toggleFavorite(email, lessonId) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        if (user.favorites.includes(lessonId)) {
            await User.updateOne({ email }, { $pull: { favorites: lessonId } });
            return { added: false };
        } else {
            await User.updateOne({ email }, { $addToSet: { favorites: lessonId } });
            return { added: true };
        }
    }

    async getFavorites(email) {
        const user = await User.findOne({ email }).populate('favorites');
        return user ? user.favorites : [];
    }
}

module.exports = new UserService();
