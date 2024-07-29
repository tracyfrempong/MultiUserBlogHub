import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userController.js';
import { ensureToken, verifyToken } from '../middleware/index.js';

const router = express.Router();

// register user
router.post('/register', registerUser);

// login user
router.post('/login', loginUser);

// get user profile
router.get('/profile/:id', ensureToken, verifyToken, getUserProfile);

// update user profile
router.put('/profile/:id', ensureToken, verifyToken, updateUserProfile);

// delete user account
router.delete('/profile/:id', ensureToken, verifyToken, deleteUserProfile);

export default router;
