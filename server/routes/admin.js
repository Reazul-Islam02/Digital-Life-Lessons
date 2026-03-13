const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.use(verifyToken, verifyAdmin);

router.get('/admin/stats', adminController.getStats);
router.get('/admin/users', adminController.getAllUsers);
router.patch('/admin/users/:id/role', adminController.updateUserRole);
router.patch('/admin/users/:id/premium', adminController.updateUserPremiumStatus);
router.get('/admin/lessons', adminController.getAllLessons);
router.delete('/admin/lessons/:id', adminController.deleteLesson);
router.get('/admin/reports', adminController.getAllReports);
router.delete('/admin/reports/:id', adminController.resolveReport);

module.exports = router;
