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

export const sendWithSES = async ({ name, email, message }: ContactPayload) => {
    const transporter = nodemailer.createTransport({
        SES: { sesClient, SendEmailCommand },
    })

    return transporter.sendMail({
        from: `"Website Contact" <no-reply@${process.env.DOMAIN}>`,
        to: process.env.CONTACT_RECEIVER,
        subject: 'New Contact Form Submission',
        text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    })
}
