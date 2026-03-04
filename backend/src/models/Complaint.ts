import mongoose, { Document, Schema } from 'mongoose';

export interface IComplaint extends Document {
    complaintId: string;
    title: string;
    category: string;
    priority: string;
    location: string;
    description: string;
    status: string;
    aiScore?: number;
    imageUrl?: string;
    assignedTo?: string;
    reportedBy?: string;
    reportedAt: Date;
    resolvedAt?: Date;
}

const complaintSchema = new Schema<IComplaint>({
    complaintId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, required: true, enum: ['low', 'medium', 'high', 'critical'] },
    location: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'in progress', 'resolved'] },
    aiScore: { type: Number },
    imageUrl: { type: String },
    assignedTo: { type: String, default: '—' },
    reportedBy: { type: String, default: 'Anonymous' },
    reportedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date }
});

export const Complaint = mongoose.model<IComplaint>('Complaint', complaintSchema);
