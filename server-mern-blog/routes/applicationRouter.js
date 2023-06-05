import { checkAuth } from '../utils/checkAuth.js';
import { Router } from 'express';
import { createApply} from '../controllers/apply.js';

const router = new Router();

// Create apply
// http://localhost:3002/api/apply
router.post('/:id/add', checkAuth, createApply)

export default router
