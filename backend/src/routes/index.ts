import { Router } from 'express'
import { generalLimiter } from '../middleware/rateLimiter'
import projectsRouter from './projects'
import contactRouter from './contact'
import honeypotRouter from './honeypot'

export const apiRouter = Router()

// Apply general rate limiter to all /api/* routes
apiRouter.use(generalLimiter)

// Health check – lightweight, no business logic
apiRouter.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

apiRouter.use('/projects', projectsRouter)
apiRouter.use('/contact', contactRouter)

// ── Honeypot routes (must be AFTER real routes to not shadow them) ────────────
apiRouter.use(honeypotRouter)
