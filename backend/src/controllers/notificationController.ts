import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notificationService';
import { ApiResponse } from '../utils/ApiResponse';

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipient = req.query.recipient as string;
        const notifications = await NotificationService.getNotifications(recipient);
        return ApiResponse.success(res, notifications);
    } catch (error) {
        next(error);
    }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationService.markAsRead(req.params.id as string);
        return ApiResponse.success(res, notification, 'Notification marked as read');
    } catch (error) {
        next(error);
    }
};
