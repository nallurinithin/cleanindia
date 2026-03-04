import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

// @route   POST /api/auth/register
// @desc    Register a new user (Citizen or Admin)
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Sanitize role specifically
        const assignedRole = role === 'admin' ? 'admin' : 'citizen';

        // Create user
        const newUser = new User({
            name,
            email,
            phone,
            passwordHash,
            role: assignedRole
        });

        await newUser.save();

        res.status(201).json({ message: 'User registration successful' });
    } catch (error: any) {
        console.error('Error in registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT Payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    role: user.role,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                });
            }
        );
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
