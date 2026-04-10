import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

interface AppError extends Error {
    statusCode?: number
}

/**
 * Global error handler.
 * NEVER leaks error messages or stack traces in production.
 */
export function errorHandler(
    err: AppError,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = err.statusCode ?? 500
    const isDev = process.env.NODE_ENV !== 'production'

    logger.error('Unhandled error', {
        requestId: req.id,
        path: req.path,
        method: req.method,
        status,
        errorName: err.name,
        // Only log the message internally, never to the client in prod
        errorMessage: err.message,
        ...(isDev && { stack: err.stack }),
    })

    res.status(status).json({
        error: isDev ? err.message : 'Erro interno do servidor',
        ...(isDev && { stack: err.stack }),
    })
}
