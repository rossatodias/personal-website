import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Github, Linkedin, Terminal } from 'lucide-react'
import { contactApi, type ContactPayload } from '@/services/api'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactSection() {
    const [form, setForm] = useState<ContactPayload>({ name: '', email: '', message: '' })
    const [status, setStatus] = useState<Status>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')
        try {
            await contactApi.send(form)
            setStatus('success')
            setForm({ name: '', email: '', message: '' })
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
            setErrorMsg(msg ?? 'Erro ao enviar. Tente novamente.')
            setStatus('error')
        }
    }

    return (
        <section id="contact" className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="section-container">
                <div className="text-center mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                bg-lavender-100 dark:bg-lavender-900/40
                                text-lavender-700 dark:text-lavender-400
                                text-sm font-mono mb-8 border border-lavender-200 dark:border-lavender-800
                                animate-fade-in">
                        <Terminal size={14} />
                            // Contato
                    </div>
                    <h2 className="section-title">Fale Comigo</h2>
                    <p className="section-subtitle">Tem alguma dúvida, proposta ou quer trocar uma ideia?</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start max-w-4xl mx-auto">
                    {/* Info */}
                    <div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                            Estou aberta a conversas sobre projetos acadêmicos, oportunidades de estágio,
                            colaborações técnicas ou simplesmente uma troca de experiências. Me mande uma mensagem!
                        </p>
                        <div className="space-y-4">
                            {[
                                { icon: Mail, label: 'Email', href: 'mailto:contato@heloisarossato.com', text: 'contato@heloisarossato.com' },
                                { icon: Github, label: 'GitHub', href: 'https://github.com/rossatodias', text: 'github.com/rossatodias' },
                                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/heloisa-rossato', text: 'linkedin.com/in/heloisa-rossato' },
                            ].map(({ icon: Icon, label, href, text }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="p-2.5 rounded-xl bg-lavender-100 dark:bg-lavender-900/40
                                  group-hover:bg-lavender-200 dark:group-hover:bg-lavender-900/60 transition-colors">
                                        <Icon size={18} className="text-lavender-600 dark:text-lavender-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">{label}</p>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200
                                  group-hover:text-lavender-600 dark:group-hover:text-lavender-400 transition-colors">
                                            {text}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="glass-card p-8">
                        {status === 'success' ? (
                            <div className="flex flex-col items-center gap-4 py-8 text-center">
                                <CheckCircle size={40} className="text-mint-500" />
                                <p className="font-semibold text-slate-700 dark:text-slate-200">Mensagem enviada!</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Responderei assim que possível.</p>
                                <button onClick={() => setStatus('idle')} className="btn-outline mt-2">
                                    Enviar outra
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                <div>
                                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                        Nome *
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Seu nome completo"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                        Email *
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="seu@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                        Mensagem *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows={5}
                                        placeholder="Escreva sua mensagem aqui..."
                                        value={form.message}
                                        onChange={handleChange}
                                        className="input-field resize-none"
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
                                        <AlertCircle size={16} />
                                        {errorMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                                    ) : (
                                        <><Send size={16} /> Enviar Mensagem</>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
