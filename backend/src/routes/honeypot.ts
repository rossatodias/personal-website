import { Router, Request, Response } from 'express'
import { logger } from '../utils/logger'

const honeypotRouter = Router()

/**
 * Fake endpoints that real users would never access.
 * Any hit means: automated scanner, bot, or attacker.
 * All access is logged with HIGH severity.
 *
 * VULN-05 fix: removed setTimeout delay to prevent connection exhaustion DoS.
 * Response is immediate — still logs the attacker, but doesn't hold connections.
 */
const TRAPS = [
    { path: '/admin', response: { status: 'authenticated', role: 'viewer', session: 'a8f3e...' } },
    { path: '/wp-admin', response: { dashboard: 'loading', version: '6.4.2' } },
    { path: '/wp-login.php', response: { login: 'ready', nonce: 'x9k2m4...' } },
    { path: '/.env', response: { error: 'permission denied' } },
    { path: '/debug', response: { debug: true, uptime: 847293, mem: '142MB' } },
    { path: '/internal-metrics', response: { requests: 4821, errors: 12, cpu: '23%' } },
    { path: '/api-docs', response: { swagger: '3.0', status: 'restricted' } },
    { path: '/graphql', response: { errors: [{ message: 'authentication required' }] } },
    { path: '/actuator/health', response: { status: 'UP' } },
    { path: '/server-status', response: { uptime: '12d 4h', load: 0.42 } },
]

for (const trap of TRAPS) {
    honeypotRouter.all(trap.path, (req: Request, res: Response) => {
        logger.security('Honeypot triggered', {
            trap: trap.path,
            ip: req.ip,
            method: req.method,
            userAgent: req.headers['user-agent'] ?? 'unknown',
            requestId: req.id,
        })

        // Respond immediately — no delay to prevent DoS amplification
        res.status(200).json(trap.response)
    })
}

export default honeypotRouter
