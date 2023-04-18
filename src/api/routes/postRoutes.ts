import { Router } from 'express';
import {createPost, deletePost, getAllPosts, getPost, updatePost} from '../controllers/postController.js';

const router = Router();

router.get('/', getAllPosts);

router.post('/', createPost);

router.get('/:id', getPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;