const asyncHandler = require('express-async-handler');
const lessonService = require('../services/lessonService');
const AppError = require('../utils/appError');

// @desc    Get all lessons
// @route   GET /api/lessons
// @access  Public
const getAllLessons = asyncHandler(async (req, res) => {
    const result = await lessonService.getAllLessons(req.query);
    res.status(200).json({
        status: 'success',
        data: result
    });
});

// @desc    Get single lesson
// @route   GET /api/lessons/:id
// @access  Public
const getLessonById = asyncHandler(async (req, res) => {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) {
        throw new AppError('Lesson not found with that ID', 404);
    }
    res.status(200).json({
        status: 'success',
        data: { lesson }
    });
});

// @desc    Create new lesson
// @route   POST /api/lessons
// @access  Private
const createLesson = asyncHandler(async (req, res) => {
    const lesson = await lessonService.createLesson(req.body, req.user.email);
    res.status(201).json({
        status: 'success',
        data: { lesson }
    });
});

// @desc    Update lesson
// @route   PUT /api/lessons/:id
// @access  Private (Owner/Admin)
const updateLesson = asyncHandler(async (req, res) => {
    // Logic to check ownership or admin role would go here
    const lesson = await lessonService.updateLesson(req.params.id, req.body);
    if (!lesson) {
        throw new AppError('Lesson not found with that ID', 404);
    }
    res.status(200).json({
        status: 'success',
        data: { lesson }
    });
});

// @desc    Delete lesson
// @route   DELETE /api/lessons/:id
// @access  Private (Owner/Admin)
const deleteLesson = asyncHandler(async (req, res) => {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) {
        throw new AppError('Lesson not found with that ID', 404);
    }

    // Ownership check could be added here

    await lessonService.deleteLesson(req.params.id);
    res.status(204).json({
        status: 'success',
        data: null
    });
});

const getMyLessons = asyncHandler(async (req, res) => {
    const email = req.user.email;
    const lessons = await lessonService.getLessonsByCreator(email);
    res.status(200).json({
        status: 'success',
        data: { lessons }
    });
});

module.exports = {
    getAllLessons,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    getMyLessons
};
