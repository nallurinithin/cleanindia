import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { ApiResponse } from '../utils/ApiResponse';

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync(req.body);
        return next();
    } catch (error: any) {
        if (error instanceof ZodError) {
            const message = error.issues.map(err => err.message).join(', ');
            return ApiResponse.error(res, message, 400);
        }
        return next(error);
    }
};
