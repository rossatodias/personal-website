import { randomUUID } from 'crypto'
import { Request, Response, NextFunction } from 'express'

declare global {
    namespace Express {
        interface Request {
            id: string
        }
    }
}

/**
 * Attaches a unique request ID (UUID v4) to every request.
 * ALWAYS generated server-side — never trust client input (VULN-02 fix).
 * Exposed in the `X-Request-Id` response header for tracing.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
    const id = randomUUID()
    req.id = id
    res.setHeader('X-Request-Id', id)
    next()
}
