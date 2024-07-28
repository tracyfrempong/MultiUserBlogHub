import express from 'express';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/postController.js';
import { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { ensureToken, verifyToken } from '../middleware/index.js';

const router = express.Router();

// Posts routes
router.get('/posts', getPosts);
router.post('/posts', ensureToken, verifyToken, createPost);
router.get('/posts/:id', getPostById);
router.put('/posts/:id', ensureToken, verifyToken, updatePost);
router.delete('/posts/:id', ensureToken, verifyToken, deletePost);

// Categories routes
// get all categories 
router.get('/categories', getCategories);
// create a new category
router.post('/categories', ensureToken, verifyToken, createCategory);
// get category by ID
router.get('/categories/:id', getCategoryById);
// update category
router.put('/categories/:id', ensureToken, verifyToken, updateCategory);
// delete category
router.delete('/categories/:id', ensureToken, verifyToken, deleteCategory);

export default router;
