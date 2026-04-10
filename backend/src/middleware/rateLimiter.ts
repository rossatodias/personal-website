import rateLimit from 'express-rate-limit'
import { logger } from '../utils/logger'

/**
 * General API rate limiter – 100 req / 15 min per IP
 */
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Muitas requisições. Tente novamente mais tarde.' },
    handler: (req, res, _next, options) => {
        logger.security('Rate limit exceeded (general)', {
            ip: req.ip,
            path: req.path,
            requestId: req.id,
        })
        res.status(options.statusCode).json(options.message)
    },
})

/**
 * Strict limiter for the contact form – configurable via env
 * CONTACT_FORM_RATE_LIMIT_WINDOW: window in seconds (default 600)
 * CONTACT_FORM_MAX: max requests per window (default 2)
 */
const rateLimitWindow = parseInt(process.env.CONTACT_FORM_RATE_LIMIT_WINDOW || '600', 10)
const maxReqs = parseInt(process.env.CONTACT_FORM_MAX || '2', 10)

export const contactLimiter = rateLimit({
    windowMs: rateLimitWindow * 1000,
    max: maxReqs,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Limite de mensagens atingido. Tente novamente mais tarde.' },
    handler: (req, res, _next, options) => {
        logger.security('Rate limit exceeded (contact)', {
            ip: req.ip,
            requestId: req.id,
        })
        res.status(options.statusCode).json(options.message)
    },
})
