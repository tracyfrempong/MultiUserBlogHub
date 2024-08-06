import express from 'express';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/postController.js';
import { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { ensureToken, verifyToken } from '../middleware/index.js';

const router = express.Router();

// Posts routes
router.get('/posts/getAllPosts', getPosts);
router.post('/posts/createPost', ensureToken, verifyToken, createPost);
router.get('/posts/getOnePost/:id', getPostById);
router.put('/posts/updatePost/:id', ensureToken, verifyToken, updatePost);
router.delete('/posts/deletePost/:id', ensureToken, verifyToken, deletePost);

// Categories routes
// get all categories 
router.get('/categories/getAllCategories', getCategories);
// create a new category
router.post('/categories/createCategory', ensureToken, verifyToken, createCategory);
// get category by ID
router.get('/categories//getOneCategory/:id', getCategoryById);
// update category
router.put('/categories/updateCategory/:id', ensureToken, verifyToken, updateCategory);
// delete category
router.delete('/categories/deleteCategory/:id', ensureToken, verifyToken, deleteCategory);

export default router;
