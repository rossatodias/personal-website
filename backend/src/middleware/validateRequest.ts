import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

/**
 * Middleware that reads the result from express-validator and, if there are
 * validation errors, short-circuits the request with a 422 response.
 * The controller is NEVER called if validation fails.
 */
export function validateRequest(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({
            error: 'Dados inválidos.',
            details: errors.array().map(e => ({ field: e.type, message: e.msg })),
        })
        return
    }
    next()
}
