type LogLevel = 'info' | 'warn' | 'error' | 'security'

interface LogEntry {
    level: LogLevel
    message: string
    timestamp: string
    requestId?: string
    path?: string
    ip?: string
    [key: string]: unknown
}

/**
 * Structured JSON logger.
 * NEVER log: passwords, tokens, email bodies, secrets.
 */
function emit(level: LogLevel, message: string, meta: Record<string, unknown> = {}): void {
    const entry: LogEntry = {
        level,
        message,
        timestamp: new Date().toISOString(),
        ...meta,
    }

    const output = JSON.stringify(entry)

    if (level === 'error' || level === 'security') {
        console.error(output)
    } else {
        console.log(output)
    }
}

export const logger = {
    info: (msg: string, meta?: Record<string, unknown>) => emit('info', msg, meta),
    warn: (msg: string, meta?: Record<string, unknown>) => emit('warn', msg, meta),
    error: (msg: string, meta?: Record<string, unknown>) => emit('error', msg, meta),

    /** High-severity security event — honeypot hits, abuse, suspicious activity */
    security: (msg: string, meta?: Record<string, unknown>) => emit('security', msg, meta),
}
