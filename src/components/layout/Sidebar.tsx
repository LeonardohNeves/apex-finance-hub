import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  Target,
  ArrowDownToLine,
  Coins,
  ShieldAlert,
  FileText,
  CalendarDays,
  Settings,
  Plus,
  Sparkles,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const items = [
  { to: "/", label: "Dashboard Geral", icon: LayoutDashboard },
  { to: "/planejamento", label: "Planejamento", icon: Sparkles },
  { to: "/carteira", label: "Carteira", icon: Wallet },
  { to: "/metas", label: "Metas Financeiras", icon: Target },
  { to: "/aportes", label: "Controle de Aportes", icon: ArrowDownToLine },
  { to: "/renda-passiva", label: "Renda Passiva", icon: Coins },
  { to: "/risco", label: "Análise de Risco", icon: ShieldAlert },
  { to: "/relatorios", label: "Relatórios", icon: FileText },
  { to: "/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/perfil", label: "Perfil do Investidor", icon: UserCircle2 },
  { to: "/configuracoes", label: "Configurações", icon: Settings },
] as const;

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{ width: expanded ? 248 : 76 }}
      transition={{ type: "spring", stiffness: 280, damping: 30 }}
      className="glass-strong fixed left-3 top-3 bottom-3 z-40 flex flex-col rounded-2xl shadow-elegant overflow-hidden"
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border/60">
        <div className="size-9 shrink-0 rounded-xl gradient-primary grid place-items-center shadow-glow">
          <Sparkles className="size-5 text-primary-foreground" />
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <p className="font-display font-semibold text-sm leading-tight">Vault<span className="gradient-text">Pro</span></p>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">Investimentos</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Items */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2 space-y-1">
        {items.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 h-11 transition-all",
                "hover:bg-sidebar-accent/70",
                active && "bg-sidebar-accent text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl gradient-primary opacity-15"
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                />
              )}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full gradient-primary" />
              )}
              <Icon
                className={cn(
                  "size-5 shrink-0 relative z-10 transition-colors",
                  active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      "relative z-10 text-sm whitespace-nowrap",
                      active ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Create new area */}
      <div className="p-2 border-t border-border/60">
        <button
          className={cn(
            "group w-full flex items-center gap-3 rounded-xl px-3 h-11 transition-all",
            "hover:bg-sidebar-accent/70 text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="size-7 shrink-0 rounded-lg border border-dashed border-primary/40 grid place-items-center group-hover:border-primary group-hover:shadow-glow transition-all">
            <Plus className="size-4 text-primary" />
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="text-sm whitespace-nowrap"
              >
                Criar Nova Área
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
