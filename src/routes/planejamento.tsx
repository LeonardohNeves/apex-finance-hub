import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Target } from "lucide-react";

export const Route = createFileRoute("/planejamento")({
  head: () => ({
    meta: [
      { title: "Planejamento Financeiro — VaultPro" },
      { name: "description", content: "Organize seu orçamento mensal e anual com objetivos claros e timeline estratégica." },
    ],
  }),
  component: Page,
});

const timeline = [
  { q: "T1 2026", title: "Reserva de emergência completa", done: true },
  { q: "T2 2026", title: "Aporte mensal de R$ 8.000", done: true },
  { q: "T3 2026", title: "Diversificação internacional 15%", done: false },
  { q: "T4 2026", title: "Renda passiva > R$ 3.000/mês", done: false },
  { q: "T1 2027", title: "Patrimônio R$ 500k", done: false },
];

const budget = [
  { cat: "Investimentos", planejado: 8000, atual: 7100, color: "var(--chart-1)" },
  { cat: "Moradia", planejado: 3500, atual: 3500, color: "var(--chart-2)" },
  { cat: "Alimentação", planejado: 1800, atual: 2050, color: "var(--chart-3)" },
  { cat: "Lazer", planejado: 800, atual: 620, color: "var(--chart-4)" },
  { cat: "Saúde", planejado: 600, atual: 540, color: "var(--chart-5)" },
];

function Page() {
  return (
    <PageShell title="Planejamento Financeiro" subtitle="Estratégia mensal, anual e objetivos de longo prazo">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-lg mb-1">Orçamento de Dezembro</h3>
          <p className="text-xs text-muted-foreground mb-5">Comparativo planejado vs. realizado</p>
          <div className="space-y-4">
            {budget.map((b) => {
              const pct = Math.min(100, (b.atual / b.planejado) * 100);
              const over = b.atual > b.planejado;
              return (
                <div key={b.cat}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">{b.cat}</span>
                    <span className={`tabular-nums ${over ? "text-warning" : "text-muted-foreground"}`}>
                      R$ {b.atual.toLocaleString("pt-BR")} <span className="text-muted-foreground">/ R$ {b.planejado.toLocaleString("pt-BR")}</span>
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: over ? "var(--color-warning)" : b.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <Target className="size-4 text-primary" />
            <h3 className="font-display font-semibold text-lg">Objetivo do Ano</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Patrimônio R$ 250.000</p>
          <div className="relative size-40 mx-auto">
            <svg viewBox="0 0 120 120" className="-rotate-90 size-full">
              <circle cx="60" cy="60" r="52" stroke="oklch(1 0 0 / 0.08)" strokeWidth="10" fill="none" />
              <motion.circle
                cx="60" cy="60" r="52"
                stroke="url(#ringg)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 52}
                initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - 0.95) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="ringg" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 165)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.2 280)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">95%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">concluído</p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">R$ 238.745 de R$ 250.000</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 mt-4">
        <h3 className="font-display font-semibold text-lg mb-1">Timeline Estratégica</h3>
        <p className="text-xs text-muted-foreground mb-6">Próximos marcos do seu plano</p>
        <div className="relative pl-6">
          <span className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
          {timeline.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="relative pb-5 last:pb-0"
            >
              <span className={`absolute -left-6 top-0.5 ${t.done ? "text-primary" : "text-muted-foreground"}`}>
                {t.done ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
              </span>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{t.q}</p>
              <p className={`text-sm ${t.done ? "line-through text-muted-foreground" : "font-medium"}`}>{t.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
