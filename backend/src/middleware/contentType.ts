import { Request, Response, NextFunction } from 'express'

const METHODS_REQUIRING_BODY = new Set(['POST', 'PUT', 'PATCH'])

/**
 * Rejects requests with a body that don't declare `Content-Type: application/json`.
 * Returns 415 Unsupported Media Type.
 */
export function enforceJsonContentType(req: Request, res: Response, next: NextFunction): void {
    if (METHODS_REQUIRING_BODY.has(req.method) && !req.is('application/json')) {
        res.status(415).json({ error: 'Content-Type deve ser application/json' })
        return
    }
    next()
}
