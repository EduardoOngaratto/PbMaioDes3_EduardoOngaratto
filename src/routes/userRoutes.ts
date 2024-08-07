import { Router } from 'express';
import { register, login } from '../controllers/authController';  
import { getUser } from '../controllers/userController';

const router = Router();

router.get('/users/:id', getUser);
router.post('/register', register);
router.post('/login', login);

export default router;
