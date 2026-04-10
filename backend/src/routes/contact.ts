import { Router } from 'express'
import { contactSchema } from '../schemas/contact'
import { zodValidate } from '../middleware/zodValidate'
import { sendContact } from '../controllers/contactController'
import { contactLimiter } from '../middleware/rateLimiter'
import { logger } from '../utils/logger'

const contactRouter = Router()

// POST /api/contact
contactRouter.post(
    '/',
    contactLimiter,
    zodValidate(contactSchema),
    // Honeypot check: if `website` field is filled, it's a bot.
    // Return fake success to avoid tipping off the bot.
    (req, res, next) => {
        if (req.body.website) {
            logger.security('Bot detected via honeypot field', {
                ip: req.ip,
                requestId: req.id,
                userAgent: req.headers['user-agent'] ?? 'unknown',
            })
            res.status(200).json({ message: 'Mensagem recebida com sucesso!' })
            return
        }
        next()
    },
    sendContact,
)

export default contactRouter
