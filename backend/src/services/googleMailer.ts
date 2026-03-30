import nodemailer from 'nodemailer'

interface ContactPayload {
    name: string
    email: string
    message: string
}

export const sendWithGoogle = async ({ name, email, message }: ContactPayload) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    return transporter.sendMail({
        from: `"Website Contact" <no-reply@juanlibonatti.com>`,
        to: process.env.GMAIL_USER,
        subject: 'New Contact Form Submission',
        text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })
}
