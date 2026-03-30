import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { apiRouter } from './routes'
import { errorHandler } from './middleware/errorHandler'

const app = express()

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet())

// ── CORS: accept requests ONLY from the frontend domain ───────────────────────
app.set('trust proxy', 1)

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? 'http://localhost:5173')
    .split(',')
    .map(o => o.trim())

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true)
            if (allowedOrigins.includes(origin)) return callback(null, true)
            callback(new Error(`CORS: origem não permitida — ${origin}`))
        },
        credentials: true,
    })
)

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: false, limit: '16kb' }))

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
    console.log(`[server] Backend running on http://127.0.0.1:${PORT}`)
})

export default app
