const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');
const AppError = require('../utils/appError');

const syncUser = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const user = await userService.syncUser({ ...req.body, email });
    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

const getUserProfile = asyncHandler(async (req, res) => {
    // SECURITY: Use email from verified token
    const email = req.user.email;
    const user = await userService.getUserByEmail(email);
    if (!user) throw new AppError('User not found', 404);

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

const checkAdmin = asyncHandler(async (req, res) => {
    const email = req.user.email;
    const user = await userService.getUserByEmail(email);
    res.status(200).json({
        status: 'success',
        data: { admin: user?.role === 'admin' }
    });
});

const updateProfile = asyncHandler(async (req, res) => {
    const email = req.user.email;
    const user = await userService.updateProfile(email, req.body);
    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

const toggleFavorite = asyncHandler(async (req, res) => {
    const email = req.user.email;
    const { lessonId } = req.body;

    if (!lessonId) throw new AppError('Lesson ID is required', 400);

    const result = await userService.toggleFavorite(email, lessonId);
    res.status(200).json({
        status: 'success',
        data: result
    });
});

const getFavorites = asyncHandler(async (req, res) => {
    const email = req.user.email;
    const favorites = await userService.getFavorites(email);
    res.status(200).json({
        status: 'success',
        data: { favorites }
    });
});

module.exports = {
    syncUser,
    getUserProfile,
    checkAdmin,
    updateProfile,
    toggleFavorite,
    getFavorites
};
