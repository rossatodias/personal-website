import { GraduationCap, MapPin, Code2, Coffee, Terminal } from 'lucide-react'

const highlights = [
    { icon: GraduationCap, label: 'Instituição', value: 'ITA – São José dos Campos' },
    { icon: Code2, label: 'Curso', value: 'Engenharia de Computação' },
    { icon: MapPin, label: 'Localização', value: 'São José dos Campos, SP' },
    { icon: Coffee, label: 'Interesses', value: 'IA, Arquitetura de Software & Estruturas de Dados' },
]

export function AboutSection() {
    return (
        <section id="about" className="py-24">
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                bg-lavender-100 dark:bg-lavender-900/40
                                text-lavender-700 dark:text-lavender-400
                                text-sm font-mono mb-8 border border-lavender-200 dark:border-lavender-800
                                animate-fade-in">
                            <Terminal size={14} />
                            // Sobre
                        </div>
                        <h2 className="section-title">
                            Estudante de{' '}
                            <span className="text-lavender-500 dark:text-lavender-400">Computação</span>
                        </h2>
                        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                            <p>
                                Sou <strong>Heloisa Rossato</strong>, aluna de{' '}
                                <strong>Engenharia de Computação no ITA</strong> (Instituto Tecnológico de Aeronáutica),
                                uma das instituições de ensino técnico mais respeitadas do Brasil.
                            </p>
                            <p>
                                Este site é meu espaço para documentar e compartilhar os projetos que desenvolvo
                                durante a graduação, desde implementações de algoritmos e estruturas de dados
                                até sistemas distribuídos e aplicações web completas.
                            </p>
                            <p>
                                Tenho interesse especial em{' '}
                                <span className="text-lavender-500 dark:text-lavender-400 font-medium">IA</span>,{' '}
                                <span className="text-peach-500 dark:text-peach-400 font-medium">Arquitetura de Software</span> e{' '}
                                <span className="text-mint-600 dark:text-mint-400 font-medium">Estruturas de Dados</span>.
                            </p>
                        </div>

                        <div className="mt-8">
                            <a href="#contact" className="btn-primary">
                                Entre em contato
                            </a>
                        </div>
                    </div>

                    {/* Info cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {highlights.map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className="glass-card p-5 flex items-start gap-4 hover:shadow-xl
                           hover:border-lavender-200 dark:hover:border-lavender-700
                           transition-all duration-200"
                            >
                                <div className="p-2.5 rounded-xl bg-lavender-100 dark:bg-lavender-900/40 shrink-0">
                                    <Icon size={20} className="text-lavender-600 dark:text-lavender-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mb-0.5">{label}</p>
                                    <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm leading-snug">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
