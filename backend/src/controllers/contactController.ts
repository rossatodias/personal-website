import { Request, Response, NextFunction } from 'express'
import { sendContactEmail } from '../services/mailer'
import { logger } from '../utils/logger'

export async function sendContact(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { name, email, message } = req.body as {
            name: string
            email: string
            message: string
        }

        logger.info('Contact form submission', {
            requestId: req.id,
            name,
            email,
            ip: req.ip,
            // NEVER log the message body — PII / privacy
        })

        await sendContactEmail({ name, email, message })

        logger.info('Contact email sent', { requestId: req.id })

        res.status(200).json({ message: 'Mensagem recebida com sucesso!' })
    } catch (err) {
        logger.error('Failed to send contact email', {
            requestId: req.id,
            errorMessage: (err as Error).message,
        })
        next(err)
    }
}
