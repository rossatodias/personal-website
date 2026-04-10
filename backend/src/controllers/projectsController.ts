import { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'

interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    repoUrl?: string
    demoUrl?: string
    semester?: string
    featured?: boolean
}

const DATA_PATH = path.join(__dirname, '../data/projects.json')

/**
 * Cache projects in memory at startup.
 * VULN-07 fix: removed fs.readFileSync per-request, which blocked the event loop.
 */
let cachedProjects: Project[] | null = null

function loadProjects(): Project[] {
    if (cachedProjects) return cachedProjects
    const raw = fs.readFileSync(DATA_PATH, 'utf-8')
    cachedProjects = JSON.parse(raw) as Project[]
    return cachedProjects
}

// Pre-load cache at module import time
try {
    loadProjects()
} catch {
    // File may not exist in test environment
}

export function getProjects(_req: Request, res: Response, next: NextFunction): void {
    try {
        const projects = loadProjects()
        res.json(projects)
    } catch (err) {
        next(err)
    }
}
