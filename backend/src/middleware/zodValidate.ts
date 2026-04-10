import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

/**
 * Generic Zod validation middleware.
 * Validates req.body against the given schema.
 * Returns 422 with formatted errors on failure.
 */
export function zodValidate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            req.body = schema.parse(req.body)
            next()
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(422).json({
                    error: 'Dados inválidos.',
                    details: err.errors.map(e => ({
                        field: e.path.join('.'),
                        message: e.message,
                    })),
                })
                return
            }
            next(err)
        }
    }
}
