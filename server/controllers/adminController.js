const asyncHandler = require('express-async-handler');
const adminService = require('../services/adminService');
const AppError = require('../utils/appError');

const getStats = asyncHandler(async (req, res) => {
    const stats = await adminService.getStats();
    res.status(200).json({
        status: 'success',
        data: stats
    });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await adminService.getAllUsers();
    res.status(200).json({
        status: 'success',
        data: { users }
    });
});

const updateUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
        throw new AppError('Invalid role', 400);
    }
    const user = await adminService.updateUserRole(req.params.id, role);
    if (!user) throw new AppError('User not found', 404);

    res.status(200).json({
        status: 'success',
        message: 'User role updated'
    });
});

const updateUserPremiumStatus = asyncHandler(async (req, res) => {
    const { isPremium } = req.body;
    const user = await adminService.updateUserPremiumStatus(req.params.id, isPremium);
    if (!user) throw new AppError('User not found', 404);

    res.status(200).json({
        status: 'success',
        message: `User premium status updated to ${isPremium}`
    });
});

const getAllLessons = asyncHandler(async (req, res) => {
    const lessons = await adminService.getAllLessons();
    res.status(200).json({
        status: 'success',
        data: { lessons }
    });
});

const deleteLesson = asyncHandler(async (req, res) => {
    await adminService.deleteLesson(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

const getAllReports = asyncHandler(async (req, res) => {
    const reports = await adminService.getAllReports();
    res.status(200).json({
        status: 'success',
        data: { reports }
    });
});

const resolveReport = asyncHandler(async (req, res) => {
    await adminService.resolveReport(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

module.exports = {
    getStats,
    getAllUsers,
    updateUserRole,
    updateUserPremiumStatus,
    getAllLessons,
    deleteLesson,
    getAllReports,
    resolveReport
};
