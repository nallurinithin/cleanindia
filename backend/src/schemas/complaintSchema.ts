import { z } from 'zod';

export const createComplaintSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    category: z.string().min(1, 'Category is required'),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    location: z.string().min(1, 'Location is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    reportedBy: z.string().optional(),
    latitude: z.string().optional(),
    longitude: z.string().optional()
});

export const updateStatusSchema = z.object({
    status: z.enum(['submitted', 'verified', 'assigned', 'in progress', 'resolved']),
    comment: z.string().optional(),
    updatedBy: z.string().optional()
});
