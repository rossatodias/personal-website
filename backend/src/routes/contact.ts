import { Router } from 'express'
import { body } from 'express-validator'
import { sendContact } from '../controllers/contactController'
import { contactLimiter } from '../middleware/rateLimiter'
import { validateRequest } from '../middleware/validateRequest'

const contactRouter = Router()

// ── Padrões de injeção de script que serão bloqueados ─────────────────────────
// Remove: tags HTML, event handlers inline, protocolos perigosos, funções JS
const SCRIPT_INJECTION_PATTERN =
    /<[^>]*>|javascript:|on\w+\s*=|<script|<\/script|eval\s*\(|document\.|window\.|alert\s*\(/i

// POST /api/contact
contactRouter.post(
    '/',
    contactLimiter,
    [
        body('name')
            .trim()
            .escape()                                          // HTML-encode < > & " '
            .notEmpty().withMessage('O nome é obrigatório.')
            .isLength({ min: 2, max: 120 }).withMessage('Nome deve ter entre 2 e 120 caracteres.')
            // Bloqueia qualquer tentativa de injeção de script remanescente
            .not().matches(SCRIPT_INJECTION_PATTERN).withMessage('Nome contém caracteres inválidos.'),

        body('email')
            .trim()
            .notEmpty().withMessage('O email é obrigatório.')
            .isEmail().withMessage('Email inválido.')
            .normalizeEmail(),

        body('message')
            .trim()
            .escape()                                          // HTML-encode < > & " '
            .notEmpty().withMessage('A mensagem é obrigatória.')
            .isLength({ min: 10, max: 2000 }).withMessage('Mensagem deve ter entre 10 e 2000 caracteres.')
            .not().matches(SCRIPT_INJECTION_PATTERN).withMessage('Mensagem contém conteúdo inválido.'),
    ],
    validateRequest,
    sendContact
)

export default contactRouter
