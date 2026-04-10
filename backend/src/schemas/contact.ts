import { z } from 'zod'

/**
 * Sanitize a string by removing potentially dangerous content.
 * Defense-in-depth: even though output context is email (not browser),
 * we strip anything that could be used for MIME injection or HTML rendering.
 */
function sanitize(val: string): string {
    return val
        // Strip HTML tags (including fullwidth unicode variants)
        .replace(/[<＜][^>＞]*[>＞]/g, '')
        // Strip null bytes
        .replace(/\0/g, '')
        // Collapse multiple newlines to prevent MIME boundary injection
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
}

/**
 * Blocklist patterns for obvious injection attempts.
 * This is a SECONDARY defense — sanitize() is the primary one.
 */
const INJECTION_PATTERN =
    /<[^>]*>|＜[^＞]*＞|javascript:|on\w+\s*=|eval\s*\(|document\.|window\.|alert\s*\(|constructor\s*\.\s*constructor|globalThis|__proto__|prototype\s*\[/i

/**
 * Strict Zod schema for the contact form payload.
 * All fields are trimmed, sanitized, and validated against injection.
 */
export const contactSchema = z.object({
    name: z
        .string({ required_error: 'O nome é obrigatório.' })
        .trim()
        .min(2, 'Nome deve ter pelo menos 2 caracteres.')
        .max(120, 'Nome deve ter no máximo 120 caracteres.')
        .transform(sanitize)
        .pipe(z.string().min(2, 'Nome deve ter pelo menos 2 caracteres.'))
        .pipe(z.string().refine(val => !INJECTION_PATTERN.test(val), {
            message: 'Nome contém caracteres inválidos.',
        })),

    email: z
        .string({ required_error: 'O email é obrigatório.' })
        .trim()
        .email('Email inválido.')
        .max(254, 'Email muito longo.')
        .toLowerCase(),

    message: z
        .string({ required_error: 'A mensagem é obrigatória.' })
        .trim()
        .min(10, 'Mensagem deve ter pelo menos 10 caracteres.')
        .max(2000, 'Mensagem deve ter no máximo 2000 caracteres.')
        .transform(sanitize)
        .pipe(z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres.'))
        .pipe(z.string().refine(val => !INJECTION_PATTERN.test(val), {
            message: 'Mensagem contém conteúdo inválido.',
        })),

    // Honeypot field — should ALWAYS be empty. Bots fill it automatically.
    website: z
        .string()
        .max(0, 'Campo inválido.')
        .optional()
        .default(''),
})

export type ContactPayload = z.infer<typeof contactSchema>
