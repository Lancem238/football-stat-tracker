import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
    
    // Custom application error class
    constructor(
        // Status code
        public statusCode: number,
        // Reable error code for clients
        public code: string,
        // Descriptive error message for clients
        public message: string,
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // HandleS known AppError instances
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success:false,
            error: {
                code: err.code,
                message: err.message,
            },
        });
        return;
    }

    // Handle specific known error patterns (e.g., rate limit errors)
    if (err.message.includes('rate limit')) {
        res.status(429).json({
            success: false,
            error: {
                code: 'RATE_LIMIT_EXCEEDED',
                message: err.message},
        });
        return;
    }

    // Log unexpected errors for debugging
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'An unexpected error occurred. Please try again later.'},
    });
}
