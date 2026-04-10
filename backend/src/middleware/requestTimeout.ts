import { Request, Response, NextFunction } from 'express'

const DEFAULT_TIMEOUT_MS = 30_000

/**
 * Aborts requests that exceed the configured timeout.
 * Returns 408 Request Timeout AND destroys the underlying socket
 * to prevent zombie handlers from continuing execution (VULN-09 fix).
 */
export function requestTimeout(ms: number = DEFAULT_TIMEOUT_MS) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const timer = setTimeout(() => {
            if (!res.headersSent) {
                res.status(408).json({ error: 'Tempo limite da requisição excedido' })
            }
            // Actually kill the connection — don't let handlers keep running
            req.destroy()
        }, ms)

        res.on('finish', () => clearTimeout(timer))
        res.on('close', () => clearTimeout(timer))
        next()
    }
}
