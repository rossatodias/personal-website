import { ArrowDown, Github, Linkedin } from 'lucide-react'

export function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh"
        >
            {/* Decorative blobs */}
            <div className="absolute top-24 left-[10%] w-64 h-64 bg-lavender-200/40 dark:bg-lavender-900/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-32 right-[10%] w-72 h-72 bg-mint-200/30 dark:bg-mint-900/20 rounded-full blur-3xl pointer-events-none" />

            <div className="section-container text-center py-32 z-10">
                {/* Heading */}
                <h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up"
                    style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
                >
                    Olá, sou{' '}
                    <span className="bg-gradient-to-r from-lavender-500 via-lavender-400 to-mint-400 bg-clip-text text-transparent">
                        Heloisa
                    </span>
                </h1>

                {/* Subtitle */}
                <p
                    className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
                    style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
                >

                    Aqui você encontrará meus projetos, estudos e experimentos.
                </p>

                {/* Terminal snippet */}
                <div
                    className="inline-block text-left font-mono text-sm bg-slate-900 dark:bg-slate-950 text-mint-400
                      rounded-xl px-6 py-4 mb-10 shadow-xl border border-slate-700 animate-fade-in-up"
                    style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
                >
                    <span className="text-slate-500">$ </span>
                    <span className="text-lavender-300">whoami</span>
                    <br />
                    <span className="text-mint-300">→ Heloisa · ITA · Eng. Computação</span>
                    <br />
                    <span className="text-slate-500">$ </span>
                    <span className="text-lavender-300">cat interests.txt</span>
                    <br />
                    <span className="text-peach-300">→ IA, Arquitetura de Software, Estruturas de Dados</span>
                    <span className="animate-pulse">▌</span>
                </div>

                {/* CTA buttons */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
                    style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
                >
                    <a href="#projects" className="btn-primary">
                        Ver Projetos <ArrowDown size={16} />
                    </a>
                    <div className="flex gap-3">
                        <a
                            href="https://github.com/rossatodias"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <Github size={16} /> GitHub
                        </a>
                        <a
                            href="https://linkedin.com/in/heloisa-rossato"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <Linkedin size={16} /> LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <a
                href="#about"
                aria-label="Rolar para baixo"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-300 dark:text-slate-600
                   animate-bounce hover:text-lavender-400 transition-colors"
            >
                <ArrowDown size={22} />
            </a>
        </section>
    )
}
