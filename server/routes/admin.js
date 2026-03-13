const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

const adminOnly = [verifyToken, verifyAdmin];

router.get('/admin/stats', adminOnly, adminController.getStats);
router.get('/admin/users', adminOnly, adminController.getAllUsers);
router.patch('/admin/users/:id/role', adminOnly, adminController.updateUserRole);
router.patch('/admin/users/:id/premium', adminOnly, adminController.updateUserPremiumStatus);
router.get('/admin/lessons', adminOnly, adminController.getAllLessons);
router.delete('/admin/lessons/:id', adminOnly, adminController.deleteLesson);
router.get('/admin/reports', adminOnly, adminController.getAllReports);
router.delete('/admin/reports/:id', adminOnly, adminController.resolveReport);

module.exports = router;
