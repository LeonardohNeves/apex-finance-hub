import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { Bell, TrendingUp, Calendar as CalIcon, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/agenda")({
  head: () => ({ meta: [{ title: "Agenda Financeira — VaultPro" }] }),
  component: Page,
});

const events = [
  { day: 5, title: "Pagamento de dividendo MXRF11", type: "income", icon: TrendingUp },
  { day: 12, title: "Vencimento fatura cartão", type: "alert", icon: AlertCircle },
  { day: 15, title: "Reunião assembleia HGLG11", type: "event", icon: CalIcon },
  { day: 18, title: "Decisão FOMC — Juros EUA", type: "alert", icon: Bell },
  { day: 22, title: "Aporte programado Tesouro", type: "income", icon: TrendingUp },
  { day: 28, title: "Reajuste anual dos planos", type: "event", icon: CalIcon },
];

const colorMap = {
  income: "var(--color-success)",
  alert: "var(--color-warning)",
  event: "var(--color-accent)",
};

function Page() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <PageShell title="Agenda Financeira" subtitle="Eventos, vencimentos e oportunidades de mercado">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-lg mb-1">Dezembro 2026</h3>
          <p className="text-xs text-muted-foreground mb-4">Calendário interativo</p>
          <div className="grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {days.map((d) => {
              const ev = events.find((e) => e.day === d);
              return (
                <motion.div
                  key={d}
                  whileHover={{ scale: 1.06 }}
                  className={`aspect-square rounded-xl p-2 flex flex-col justify-between text-left transition-colors cursor-pointer ${
                    ev ? "border border-border" : "bg-muted/30"
                  }`}
                  style={ev ? { background: `${colorMap[ev.type as keyof typeof colorMap]}20` } : undefined}
                >
                  <span className="text-xs font-medium">{d}</span>
                  {ev && (
                    <span className="size-1.5 rounded-full" style={{ background: colorMap[ev.type as keyof typeof colorMap] }} />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg mb-1">Próximos Eventos</h3>
          <p className="text-xs text-muted-foreground mb-4">Esta semana</p>
          <div className="space-y-3">
            {events.map((e, i) => {
              const Icon = e.icon;
              const c = colorMap[e.type as keyof typeof colorMap];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors"
                >
                  <div className="size-9 rounded-lg grid place-items-center shrink-0" style={{ background: `${c}25` }}>
                    <Icon className="size-4" style={{ color: c }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{e.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{e.day} Dez</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
