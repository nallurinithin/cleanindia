import { Notification } from '../models/Notification';

export class NotificationService {
    static async getNotifications(recipient: string) {
        return await Notification.find({
            $or: [{ recipient: recipient }, { recipient: 'admin' }]
        }).sort({ createdAt: -1 }).limit(20);
    }

    static async markAsRead(id: string) {
        return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    }
}
