import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center gradient-mesh px-4">
            <div className="text-center max-w-lg">
                {/* Terminal box */}
                <div className="inline-block font-mono text-left bg-slate-900 dark:bg-slate-950 rounded-2xl
                        px-8 py-6 mb-10 shadow-2xl border border-slate-700 w-full">
                    <div className="flex gap-2 mb-4">
                        <span className="w-3 h-3 rounded-full bg-red-400" />
                        <span className="w-3 h-3 rounded-full bg-yellow-400" />
                        <span className="w-3 h-3 rounded-full bg-mint-400" />
                    </div>
                    <p className="text-slate-500 text-sm mb-1">$ curl seusite.com<span className="text-slate-300">/essa-pagina</span></p>
                    <p className="text-red-400 text-sm mb-1">404 Not Found</p>
                    <p className="text-slate-500 text-sm mb-4">Error: rota não encontrada no servidor.</p>
                    <p className="text-lavender-400 text-4xl font-bold">404</p>
                    <span className="text-mint-400 animate-pulse">▌</span>
                </div>

                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                    Página não encontrada
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    A rota que você tentou acessar não existe ou foi removida.
                </p>

                <Link to="/" className="btn-primary inline-flex">
                    <ArrowLeft size={16} /> Voltar ao início
                </Link>
            </div>
        </div>
    )
}
