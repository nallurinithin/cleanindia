import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { ApiResponse } from '../utils/ApiResponse';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await AuthService.register(req.body);
        return ApiResponse.success(res, null, 'User registration successful', 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await AuthService.login(req.body);
        return ApiResponse.success(res, data, 'Login successful');
    } catch (error) {
        next(error);
    }
};
