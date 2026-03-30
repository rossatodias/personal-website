import { skillCategories } from '@/data/skills'
import { Terminal } from 'lucide-react'

export function SkillsSection() {
    return (
        <section id="skills" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="section-container">
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                bg-lavender-100 dark:bg-lavender-900/40
                                text-lavender-700 dark:text-lavender-400
                                text-sm font-mono mb-8 border border-lavender-200 dark:border-lavender-800
                                animate-fade-in">
                        <Terminal size={14} />
                            // Habilidades
                    </div>
                    <h2 className="section-title">Stack &amp; Tecnologias</h2>
                    <p className="section-subtitle">Ferramentas que uso no dia a dia e nos projetos do ITA.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {skillCategories.map(category => (
                        <div key={category.title} className="glass-card p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="font-mono text-lg text-lavender-500 dark:text-lavender-400 font-bold">
                                    {category.icon}
                                </span>
                                <h3 className="font-semibold text-slate-700 dark:text-slate-200">{category.title}</h3>
                            </div>

                            <div className="space-y-4">
                                {category.skills.map(skill => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="font-mono text-slate-600 dark:text-slate-300">{skill.name}</span>
                                            <span className="text-slate-400 dark:text-slate-500 text-xs">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${skill.color} rounded-full transition-all duration-700`}
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
