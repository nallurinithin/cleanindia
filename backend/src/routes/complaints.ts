import { Router } from 'express';
import { Complaint } from '../models/Complaint';
import { Notification } from '../models/Notification';

const router = Router();

// Generate a random complaint ID
const generateId = () => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `CMP-${year}-${randomNum}`;
};

// @route   POST /api/complaints
// @desc    Create a new complaint
router.post('/', async (req, res) => {
    try {
        const { title, category, priority, location, description, reportedBy, imageUrl } = req.body;

        const newComplaint = new Complaint({
            complaintId: generateId(),
            title,
            category,
            priority,
            location,
            description,
            reportedBy: reportedBy || 'Anonymous',
            imageUrl: imageUrl || null,
            // Mocking AI score generation
            aiScore: Math.floor(Math.random() * 20) + 80, // 80-99 range
        });

        const savedComplaint = await newComplaint.save();

        // 1. Send Alert to Admin
        await new Notification({
            recipient: 'admin',
            message: `A new issue "${title}" has been reported in ${location}.`,
            type: 'info'
        }).save();

        // 2. Send Alert to Citizen (if registered/identified)
        if (reportedBy && reportedBy !== 'Anonymous') {
            await new Notification({
                recipient: reportedBy,
                message: `You have successfully raised the complaint "${title}".`,
                type: 'success'
            }).save();
        }

        res.status(201).json(savedComplaint);
    } catch (error) {
        console.error('Error creating complaint:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/complaints
// @desc    Get all complaints sorted by newest
router.get('/', async (req, res) => {
    try {
        // Find all and sort by reportedAt descending
        const complaints = await Complaint.find().sort({ reportedAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PATCH /api/complaints/:id/resolve
// @desc    Mark a complaint as resolved
router.patch('/:id/resolve', async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.status = 'resolved';
        complaint.resolvedAt = new Date();

        const updatedComplaint = await complaint.save();

        // Alert the Citizen that their issue is resolved
        if (complaint.reportedBy && complaint.reportedBy !== 'Anonymous') {
            await new Notification({
                recipient: complaint.reportedBy,
                message: `Your issue "${complaint.title}" has been resolved by the admin.`,
                type: 'success'
            }).save();
        }

        res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error('Error resolving complaint:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PATCH /api/complaints/:id/status
// @desc    Update a complaint's status dynamically
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        const validStatuses = ['pending', 'in progress', 'resolved'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status provided' });
        }

        complaint.status = status;
        if (status === 'resolved') {
            complaint.resolvedAt = new Date();
        }

        const updatedComplaint = await complaint.save();

        // Alert the Citizen dynamically based on the status change
        if (complaint.reportedBy && complaint.reportedBy !== 'Anonymous') {
            if (status === 'resolved') {
                await new Notification({
                    recipient: complaint.reportedBy,
                    message: `Your issue "${complaint.title}" has been resolved by the admin.`,
                    type: 'success'
                }).save();
            } else if (status === 'in progress') {
                await new Notification({
                    recipient: complaint.reportedBy,
                    message: `Your issue "${complaint.title}" is now in progress!`,
                    type: 'info'
                }).save();
            }
        }

        res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error('Error updating complaint status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PATCH /api/complaints/:id/assign
// @desc    Assign a complaint to a department or person
router.patch('/:id/assign', async (req, res) => {
    try {
        const { assignedTo } = req.body;
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        complaint.assignedTo = assignedTo;
        const updatedComplaint = await complaint.save();

        res.status(200).json(updatedComplaint);
    } catch (error) {
        console.error('Error assigning complaint:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
