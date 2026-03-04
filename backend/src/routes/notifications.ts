import { Router } from 'express';
import { Notification } from '../models/Notification';

const router = Router();

// @route   GET /api/notifications
// @desc    Get user notifications
router.get('/', async (req, res) => {
    try {
        const { role, identifier } = req.query;

        let queryRecipient = role === 'admin' ? 'admin' : identifier;

        if (!queryRecipient) {
            return res.status(400).json({ message: 'Missing identifier' });
        }

        const notifications = await Notification.find({ recipient: queryRecipient as string })
            .sort({ createdAt: -1 })
            .limit(20);
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PATCH /api/notifications/read
// @desc    Mark user notifications as read
router.patch('/read', async (req, res) => {
    try {
        const { role, identifier } = req.body;
        let queryRecipient = role === 'admin' ? 'admin' : identifier;

        if (!queryRecipient) {
            return res.status(400).json({ message: 'Missing identifier' });
        }

        await Notification.updateMany(
            { recipient: queryRecipient, read: false },
            { $set: { read: true } }
        );

        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        console.error('Error updating notifications:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
