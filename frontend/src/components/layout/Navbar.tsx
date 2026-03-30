import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const navLinks = [
    { href: '#about', label: 'Sobre' },
    { href: '#skills', label: 'Habilidades' },
    { href: '#projects', label: 'Projetos' },
    { href: '#contact', label: 'Contato' },
]

export function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handler, { passive: true })
        return () => window.removeEventListener('scroll', handler)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800'
                : 'bg-transparent'
                }`}
        >
            <div className="section-container h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 font-mono font-bold text-lavender-600 dark:text-lavender-400 hover:opacity-80 transition-opacity"
                >
                    <Terminal size={20} className="shrink-0" />
                    <span className="text-sm sm:text-base">Heloisa Rossato</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium rounded-lg text-slate-600 dark:text-slate-300
                         hover:text-lavender-600 dark:hover:text-lavender-400
                         hover:bg-lavender-50 dark:hover:bg-lavender-900/20
                         transition-all duration-150"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        aria-label="Alternar tema"
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400
                       hover:text-lavender-600 dark:hover:text-lavender-400
                       hover:bg-lavender-50 dark:hover:bg-lavender-900/20
                       transition-all duration-150"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Menu"
                        className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 pb-4">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300
                         hover:text-lavender-600 dark:hover:text-lavender-400
                         hover:bg-lavender-50 dark:hover:bg-lavender-900/20 rounded-lg
                         transition-all duration-150"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    )
}
