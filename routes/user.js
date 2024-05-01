// require express
const express = require('express');

// require express router
const router = express.Router();

// require controller
const userController = require('../controllers/userController');

// require authentication
const auth = require('../middleware/auth');

// require controllers
router.get('/getUser', auth.isAuthenticated, userController.getUser);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', auth.isAuthenticated, userController.logout);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// export router
module.exports = router;