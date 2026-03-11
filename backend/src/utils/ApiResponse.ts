export class ApiResponse {
    static success(res: any, data: any, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static error(res: any, message = 'Internal Server Error', statusCode = 500, error: any = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            error: error ? (error.message || error) : null
        });
    }
}
