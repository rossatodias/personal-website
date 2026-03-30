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

export function getProjects(_req: Request, res: Response, next: NextFunction): void {
    try {
        const raw = fs.readFileSync(DATA_PATH, 'utf-8')
        const projects: Project[] = JSON.parse(raw)
        res.json(projects)
    } catch (err) {
        next(err)
    }
}
