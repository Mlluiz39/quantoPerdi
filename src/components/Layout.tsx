import { Link, Outlet, useLocation } from "react-router-dom";
import { Activity, User, Calculator, PieChart, Compass, Home, TrendingDown } from "lucide-react";
import { cn } from "../lib/utils";

export default function Layout() {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Início', match: '/' },
    { to: '/perda-cartao', label: 'Cartão', match: '/perda-cartao' },
    { to: '/perda-inflacao', label: 'Inflação', match: '/perda-inflacao' },
    { to: '/perda-gastos', label: 'Gastos', match: '/perda-gastos' },
    { to: '/perda-poupanca', label: 'Poupança', match: '/perda-poupanca' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-background text-on-surface min-h-screen selection:bg-primary/30 selection:text-primary flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-outline-variant/10">
        <nav className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <Activity className="text-emerald-400" />
            <span className="text-xl font-black tracking-tighter text-emerald-400 italic">QuantoPerdi</span>
          </Link>
          
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map(({ to, label, match }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "font-bold transition-colors duration-300",
                  isActive(match) ? "text-emerald-400" : "text-slate-400 hover:text-emerald-300"
                )}
              >
                {label}
              </Link>
            ))}
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant">
              <User className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 pt-16">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-surface py-20 px-6 border-t border-outline-variant/10 mt-auto mb-24 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="text-primary" />
              <span className="text-2xl font-black tracking-tighter text-primary italic">QuantoPerdi</span>
            </div>
            <p className="text-on-surface-variant max-w-xs">Expondo a realidade financeira para construir um futuro próspero.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h6 className="font-bold uppercase text-[11px] tracking-widest text-on-surface-variant">Calculadoras</h6>
              <ul className="space-y-2 text-sm text-on-surface/70">
                <li><Link to="/perda-cartao" className="hover:text-primary transition-colors">Cartão de Crédito</Link></li>
                <li><Link to="/perda-inflacao" className="hover:text-primary transition-colors">Inflação</Link></li>
                <li><Link to="/perda-gastos" className="hover:text-primary transition-colors">Gastos Invisíveis</Link></li>
                <li><Link to="/perda-poupanca" className="hover:text-primary transition-colors">Poupança</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h6 className="font-bold uppercase text-[11px] tracking-widest text-on-surface-variant">Empresa</h6>
              <ul className="space-y-2 text-sm text-on-surface/70">
                <li><a href="#" className="hover:text-primary transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Metodologia</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
              </ul>
            </div>
            <div className="space-y-4 hidden sm:block">
              <h6 className="font-bold uppercase text-[11px] tracking-widest text-on-surface-variant">Legal</h6>
              <ul className="space-y-2 text-sm text-on-surface/70">
                <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-between text-[11px] font-bold text-on-surface-variant uppercase tracking-widest gap-4">
          <p>© 2026 QuantoPerdi. O Choque da Verdade.</p>
          <p>feito por mlluizdevtech</p>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-6 pt-3 bg-slate-950/90 backdrop-blur-lg rounded-t-3xl shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.5)] border-t border-outline-variant/20">
        <Link to="/" className={cn("flex flex-col items-center justify-center rounded-2xl px-3 py-2 transition-all", isActive('/') ? "bg-emerald-500/10 text-emerald-400" : "text-slate-500")}>
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-bold tracking-widest uppercase mt-1">Início</span>
        </Link>
        <Link to="/perda-cartao" className={cn("flex flex-col items-center justify-center rounded-2xl px-3 py-2 transition-all", isActive('/perda-cartao') ? "bg-emerald-500/10 text-emerald-400" : "text-slate-500")}>
          <Calculator className="w-5 h-5" />
          <span className="text-[9px] font-bold tracking-widest uppercase mt-1">Cartão</span>
        </Link>
        <Link to="/perda-inflacao" className={cn("flex flex-col items-center justify-center rounded-2xl px-3 py-2 transition-all", isActive('/perda-inflacao') ? "bg-emerald-500/10 text-emerald-400" : "text-slate-500")}>
          <PieChart className="w-5 h-5" />
          <span className="text-[9px] font-bold tracking-widest uppercase mt-1">Inflação</span>
        </Link>
        <Link to="/perda-gastos" className={cn("flex flex-col items-center justify-center rounded-2xl px-3 py-2 transition-all", isActive('/perda-gastos') ? "bg-emerald-500/10 text-emerald-400" : "text-slate-500")}>
          <Compass className="w-5 h-5" />
          <span className="text-[9px] font-bold tracking-widest uppercase mt-1">Gastos</span>
        </Link>
        <Link to="/perda-poupanca" className={cn("flex flex-col items-center justify-center rounded-2xl px-3 py-2 transition-all", isActive('/perda-poupanca') ? "bg-emerald-500/10 text-emerald-400" : "text-slate-500")}>
          <TrendingDown className="w-5 h-5" />
          <span className="text-[9px] font-bold tracking-widest uppercase mt-1">Poupar</span>
        </Link>
      </div>
    </div>
  );
}
