import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/authSchema';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register a new user (Citizen, Admin, or Worker)
router.post('/register', validate(registerSchema), authController.register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', validate(loginSchema), authController.login);

export default router;
