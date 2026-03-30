import { Router } from 'express'
import { getProjects } from '../controllers/projectsController'

const projectsRouter = Router()

// GET /api/projects
projectsRouter.get('/', getProjects)

export default projectsRouter
