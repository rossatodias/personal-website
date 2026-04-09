import { Github, Linkedin, Mail, Terminal } from 'lucide-react'

const socialLinks = [
    { href: 'https://github.com/rossatodias', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/in/heloisa-rossato', icon: Linkedin, label: 'LinkedIn' },
    { href: 'mailto:contato@heloisarossato.com', icon: Mail, label: 'Email' },
]

export function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t border-slate-100 dark:border-slate-800 mt-20">
            <div className="section-container py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 font-mono text-sm text-lavender-600 dark:text-lavender-400">
                    <Terminal size={16} />
                    <span>Heloisa Rossato</span>
                </div>

                <div className="flex items-center gap-3">
                    {socialLinks.map(({ href, icon: Icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="p-2 rounded-lg text-slate-400 hover:text-lavender-600 dark:hover:text-lavender-400
                         hover:bg-lavender-50 dark:hover:bg-lavender-900/20 transition-all duration-150"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>

                <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                    © {year} · Heloisa Rossato · ITA – Engenharia de Computação
                </p>
            </div>
        </footer>
    )
}
