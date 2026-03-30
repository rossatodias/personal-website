import { sendWithGoogle } from './googleMailer'
import { sendWithSES } from './sesMailer'

export interface ContactPayload {
    name: string
    email: string
    message: string
}

const isProd = process.env.NODE_ENV === 'production'

/**
 * Sends a contact email using the appropriate transport:
 * - Production → Amazon SES
 * - Development → Gmail
 */
export const sendContactEmail = async (payload: ContactPayload) => {
    if (isProd) {
        return sendWithSES(payload)
    }
    return sendWithGoogle(payload)
}
