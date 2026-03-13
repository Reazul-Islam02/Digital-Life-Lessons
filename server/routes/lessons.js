const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/lessons', lessonController.getAllLessons);
router.get('/lessons/:id', lessonController.getLessonById);
router.get('/my-lessons', verifyToken, lessonController.getMyLessons);

router.post('/lessons', verifyToken, lessonController.createLesson);
router.put('/lessons/:id', verifyToken, lessonController.updateLesson);
router.delete('/lessons/:id', verifyToken, lessonController.deleteLesson);

module.exports = router;
