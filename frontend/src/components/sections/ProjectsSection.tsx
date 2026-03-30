import { useEffect, useState } from 'react'
import { ExternalLink, Github, Folder, Loader2, ServerOff, Terminal } from 'lucide-react'
import { projectsApi, type Project } from '@/services/api'

function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="glass-card p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1
                    hover:border-lavender-200 dark:hover:border-lavender-700
                    transition-all duration-250">
            <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 rounded-xl bg-lavender-100 dark:bg-lavender-900/40">
                    <Folder size={20} className="text-lavender-600 dark:text-lavender-400" />
                </div>
                <div className="flex gap-2">
                    {project.repoUrl && (
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Repositório"
                            className="text-slate-400 hover:text-lavender-500 dark:hover:text-lavender-400 transition-colors"
                        >
                            <Github size={18} />
                        </a>
                    )}
                    {project.demoUrl && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Demo"
                            className="text-slate-400 hover:text-mint-500 dark:hover:text-mint-400 transition-colors"
                        >
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 leading-snug">{project.title}</h3>
                {project.semester && (
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-2">{project.semester}</p>
                )}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>
        </div>
    )
}

export function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        projectsApi.list()
            .then(setProjects)
            .catch(() => setError('Não foi possível carregar os projetos.'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <section id="projects" className="py-24">
            <div className="section-container">
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                bg-lavender-100 dark:bg-lavender-900/40
                                text-lavender-700 dark:text-lavender-400
                                text-sm font-mono mb-8 border border-lavender-200 dark:border-lavender-800
                                animate-fade-in">
                        <Terminal size={14} />
                            // Projetos
                    </div>
                    <h2 className="section-title">Projetos do ITA</h2>
                    <p className="section-subtitle">
                        Trabalhos desenvolvidos durante a graduação.
                    </p>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-32 text-lavender-400">
                        <Loader2 size={32} className="animate-spin" />
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center gap-3 py-24 text-slate-400">
                        <ServerOff size={36} />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="flex flex-col items-center gap-3 py-24 text-slate-400 dark:text-slate-600">
                        <Folder size={40} />
                        <p className="font-mono text-sm">// projetos em breve</p>
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
