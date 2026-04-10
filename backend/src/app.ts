import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { apiRouter } from './routes'
import { errorHandler } from './middleware/errorHandler'
import { requestId } from './middleware/requestId'
import { enforceJsonContentType } from './middleware/contentType'
import { requestTimeout } from './middleware/requestTimeout'
import { logger } from './utils/logger'

const app = express()

// ── Request tracing ───────────────────────────────────────────────────────────
app.use(requestId)

// ── Request timeout (30s) ─────────────────────────────────────────────────────
app.use(requestTimeout(30_000))

// ── Security headers (Helmet with strict CSP) ─────────────────────────────────
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'none'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https:'],
                fontSrc: ["'self'", 'https://fonts.gstatic.com'],
                connectSrc: ["'self'"],
                frameSrc: ["'none'"],
                objectSrc: ["'none'"],
                baseUri: ["'self'"],
                formAction: ["'self'"],
                frameAncestors: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
        crossOriginEmbedderPolicy: false,  // Allow external fonts/images
        hsts: {
            maxAge: 63072000,  // 2 years
            includeSubDomains: true,
            preload: true,
        },
    })
)

// ── Additional security headers not covered by Helmet ─────────────────────────
app.use((_req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'none')
    next()
})

// ── CORS: accept requests ONLY from the frontend domain ───────────────────────
app.set('trust proxy', 1)

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map(o => o.trim())

app.use(
    cors({
        origin: (origin, callback) => {
            // Block null origins (e.g. from sandboxed iframes, file:// protocol)
            if (!origin) return callback(null, false)
            if (allowedOrigins.includes(origin)) return callback(null, true)
            logger.security('CORS blocked', { origin })
            callback(new Error('CORS: origin not allowed'))
        },
        credentials: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'X-Request-Id'],
        maxAge: 86400,  // Cache preflight for 24h
    })
)

// ── Body parsing (strict limits) ──────────────────────────────────────────────
app.use(express.json({ limit: '16kb', strict: true }))
app.use(express.urlencoded({ extended: false, limit: '16kb' }))

// ── Content-Type enforcement (POST/PUT/PATCH must be application/json) ────────
app.use(enforceJsonContentType)

// ── Reject non-UTF8 and malformed bodies ──────────────────────────────────────
app.use((err: Error & { type?: string }, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.type === 'entity.parse.failed') {
        res.status(400).json({ error: 'JSON malformado' })
        return
    }
    next(err)
})

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api', apiRouter)

// ── 404 catch-all for unknown routes ─────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' })
})

// ── Global error handler ──────────────────────────────────────────────────────
app.use(errorHandler)

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT ?? '4000', 10)
// Bind to 127.0.0.1 ONLY — never expose to the public network directly.
// Caddy reverse-proxies /api/* to this address internally.
app.listen(PORT, '127.0.0.1', () => {
    logger.info('Backend started', { port: PORT, env: process.env.NODE_ENV })
})

export default app
