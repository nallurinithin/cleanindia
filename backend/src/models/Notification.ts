import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
    recipient: string; // 'admin' or specific user identity
    message: string;
    type: 'info' | 'success' | 'warning';
    read: boolean;
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'success', 'warning'], default: 'info' },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
