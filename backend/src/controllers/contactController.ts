import { Request, Response, NextFunction } from 'express'
import { sendContactEmail } from '../services/mailer'

export async function sendContact(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { name, email, message } = req.body as {
            name: string
            email: string
            message: string
        }

        const receivedAt = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

        // ── Log (visível em: journalctl -u pw -f) ────────────────────────────
        console.log('[contact]', JSON.stringify({ name, email, receivedAt }))

        // ── Envio via mailer facade (Google em dev, SES em prod) ─────────────
        await sendContactEmail({ name, email, message })
        console.log('[contact] Email enviado com sucesso')

        res.status(200).json({ message: 'Mensagem recebida com sucesso!' })
    } catch (err) {
        console.error('[contact] Erro ao enviar email:', err)
        next(err)
    }
}
