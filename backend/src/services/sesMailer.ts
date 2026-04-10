import nodemailer from 'nodemailer'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

interface ContactPayload {
    name: string
    email: string
    message: string
}

const sesClient = new SESv2Client({
    region: process.env.SES_REGION,
    credentials: {
        accessKeyId: process.env.SES_ACCESS_KEY_ID!,
        secretAccessKey: process.env.SES_SECRET_ACCESS_KEY!,
    },
})

/**
 * Sanitize value for inclusion in email body.
 * VULN-03 fix: strip characters that could be used for MIME boundary injection.
 */
function sanitizeForEmail(val: string): string {
    return val
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        // Remove any MIME-like headers
        .replace(/^Content-Type:.*$/gmi, '')
        .replace(/^Content-Transfer-Encoding:.*$/gmi, '')
        .replace(/^MIME-Version:.*$/gmi, '')
        // Collapse excessive newlines
        .replace(/\n{3,}/g, '\n\n')
        .trim()
}

export const sendWithSES = async ({ name, email, message }: ContactPayload) => {
    const transporter = nodemailer.createTransport({
        SES: { sesClient, SendEmailCommand },
    })

    const safeName = sanitizeForEmail(name)
    const safeEmail = sanitizeForEmail(email)
    const safeMessage = sanitizeForEmail(message)

    return transporter.sendMail({
        from: `"Website Contact" <no-reply@${process.env.DOMAIN}>`,
        to: process.env.CONTACT_RECEIVER,
        subject: 'New Contact Form Submission',
        text: [
            `Name: ${safeName}`,
            `Email: ${safeEmail}`,
            '',
            'Message:',
            safeMessage,
        ].join('\n'),
    })
}
