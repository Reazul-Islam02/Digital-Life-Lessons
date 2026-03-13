const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

// User Authentication & Sync (public — no token needed, may be first login)
router.post('/users/sync/:email', userController.syncUser);

// All protected user routes: verifyToken applied per-route (NOT router.use)
// Using router.use(verifyToken) here was a bug — it intercepted ALL /api/* requests
// (including /api/lessons) because this router is mounted at /api.
router.get('/users/profile', verifyToken, userController.getUserProfile);
router.get('/users/admin', verifyToken, userController.checkAdmin);
router.put('/users/profile/update', verifyToken, userController.updateProfile);

// Favorites Management
router.post('/users/favorites/toggle', verifyToken, userController.toggleFavorite);
router.get('/users/favorites', verifyToken, userController.getFavorites);

module.exports = router;
