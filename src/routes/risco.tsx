import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/risco")({
  head: () => ({ meta: [{ title: "Análise de Risco — VaultPro" }] }),
  component: Page,
});

const radar = [
  { sector: "Financeiro", value: 28 },
  { sector: "Tech", value: 22 },
  { sector: "Imobiliário", value: 18 },
  { sector: "Energia", value: 12 },
  { sector: "Cripto", value: 12 },
  { sector: "Consumo", value: 8 },
];

const sectors = [
  { name: "Financeiro", value: 28, color: "oklch(0.72 0.18 165)" },
  { name: "Tech (US)", value: 22, color: "oklch(0.65 0.2 280)" },
  { name: "Imobiliário", value: 18, color: "oklch(0.78 0.16 75)" },
  { name: "Energia", value: 12, color: "oklch(0.7 0.2 30)" },
  { name: "Cripto", value: 12, color: "oklch(0.65 0.18 220)" },
  { name: "Consumo", value: 8, color: "oklch(0.6 0.15 320)" },
];

function Page() {
  return (
    <PageShell title="Análise de Risco" subtitle="Diversificação, exposição e indicadores de volatilidade">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg">Score de Risco</h3>
          <p className="text-xs text-muted-foreground mb-6">Perfil moderado</p>
          <div className="relative size-44 mx-auto">
            <svg viewBox="0 0 120 120" className="-rotate-90 size-full">
              <circle cx="60" cy="60" r="50" stroke="oklch(1 0 0 / 0.08)" strokeWidth="12" fill="none" />
              <motion.circle
                cx="60" cy="60" r="50"
                stroke="url(#rg)" strokeWidth="12" fill="none" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 50}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - 0.62) }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="rg" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.16 75)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.2 30)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <p className="text-4xl font-bold">62</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">de 100</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 mt-6 text-center text-xs">
            <div><p className="text-success font-semibold">Conservador</p><p className="text-muted-foreground">0-40</p></div>
            <div><p className="text-warning font-semibold">Moderado</p><p className="text-muted-foreground">40-70</p></div>
            <div><p className="text-destructive font-semibold">Agressivo</p><p className="text-muted-foreground">70-100</p></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-lg mb-1">Diversificação</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribuição por setor</p>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radar}>
              <PolarGrid stroke="oklch(1 0 0 / 0.1)" />
              <PolarAngleAxis dataKey="sector" stroke="oklch(0.65 0.025 260)" fontSize={11} />
              <Radar dataKey="value" stroke="oklch(0.72 0.18 165)" fill="oklch(0.72 0.18 165)" fillOpacity={0.3} />
              <Tooltip
                contentStyle={{ background: "oklch(0.18 0.02 265 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => `${v}%`}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 mt-4">
        <h3 className="font-display font-semibold text-lg mb-4">Heatmap de Exposição</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sectors.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              whileHover={{ scale: 1.04 }}
              className="rounded-2xl p-5 relative overflow-hidden cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${s.color} 0%, oklch(0.18 0.02 265) 140%)`,
                minHeight: 110 + s.value * 2,
              }}
            >
              <p className="text-xs uppercase tracking-wider text-foreground/80">{s.name}</p>
              <p className="text-3xl font-bold mt-2 font-display">{s.value}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
