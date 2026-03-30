import { Request, Response, NextFunction } from 'express'

interface AppError extends Error {
    statusCode?: number
}

export function errorHandler(
    err: AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = err.statusCode ?? 500
    const isDev = process.env.NODE_ENV !== 'production'

    console.error(`[error] ${err.message}`)

    res.status(status).json({
        error: err.message ?? 'Erro interno do servidor',
        ...(isDev && { stack: err.stack }),
    })
}
