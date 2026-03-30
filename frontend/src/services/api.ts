import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
    timeout: 10_000,
    headers: { 'Content-Type': 'application/json' },
})

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Project {
    id: string
    title: string
    description: string
    tags: string[]
    repoUrl?: string
    demoUrl?: string
    semester?: string
    featured?: boolean
}

export interface ContactPayload {
    name: string
    email: string
    message: string
}

// ── API calls ─────────────────────────────────────────────────────────────────

export const projectsApi = {
    list: (): Promise<Project[]> =>
        api.get<Project[]>('/projects').then(r => r.data),
}

export const contactApi = {
    send: (payload: ContactPayload): Promise<{ message: string }> =>
        api.post<{ message: string }>('/contact', payload).then(r => r.data),
}

export const healthApi = {
    check: (): Promise<{ status: string }> =>
        api.get<{ status: string }>('/health').then(r => r.data),
}

export default api
