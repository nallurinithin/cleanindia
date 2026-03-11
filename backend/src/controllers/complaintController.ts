import { Request, Response, NextFunction } from 'express';
import { ComplaintService } from '../services/complaintService';
import { ApiResponse } from '../utils/ApiResponse';

export const createComplaint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const complaint = await ComplaintService.createComplaint(req.body, req.file);
        return ApiResponse.success(res, complaint, 'Complaint submitted successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const getComplaints = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const complaints = await ComplaintService.getAllComplaints(req.query);
        return ApiResponse.success(res, complaints);
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const complaint = await ComplaintService.updateStatus(req.params.id as string, req.body, req.file);
        return ApiResponse.success(res, complaint, 'Status updated successfully');
    } catch (error) {
        next(error);
    }
};
export const assignComplaint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { assignedTo, adminName } = req.body;
        const complaint = await ComplaintService.assignComplaint(req.params.id as string, assignedTo, adminName || 'Admin');
        return ApiResponse.success(res, complaint, 'Complaint assigned successfully');
    } catch (error) {
        next(error);
    }
};
