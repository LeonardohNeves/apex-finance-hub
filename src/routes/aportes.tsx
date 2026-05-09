import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { CalendarDays, TrendingUp, Flame } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "@/components/dashboard/StatCard";

export const Route = createFileRoute("/aportes")({
  head: () => ({ meta: [{ title: "Controle de Aportes — VaultPro" }] }),
  component: Page,
});

const data = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i],
  v: 3000 + Math.round(Math.sin(i / 2) * 1500 + i * 350),
}));

const historico = [
  { date: "12 Dez", asset: "ITSA4", value: 2400, type: "Compra" },
  { date: "08 Dez", asset: "MXRF11", value: 1800, type: "Compra" },
  { date: "05 Dez", asset: "Tesouro IPCA+", value: 2900, type: "Aplicação" },
  { date: "01 Dez", asset: "BTC", value: 1500, type: "Compra" },
  { date: "28 Nov", asset: "VOO", value: 3200, type: "Compra" },
];

function Page() {
  return (
    <PageShell title="Controle de Aportes" subtitle="Histórico, frequência e calendário de investimentos">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <StatCard label="Aportes do Ano" value="R$ 68.420" delta={18.4} icon={TrendingUp} accent="primary" index={0} />
        <StatCard label="Média Mensal" value="R$ 5.701" delta={4.2} icon={CalendarDays} accent="accent" index={1} />
        <StatCard label="Sequência" value="12 meses" delta={0} icon={Flame} accent="warm" index={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-lg mb-1">Frequência de Aportes</h3>
          <p className="text-xs text-muted-foreground mb-4">Evolução mensal</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} margin={{ left: -10 }}>
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 165)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.2 280)" stopOpacity={0.7} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="m" stroke="oklch(0.65 0.025 260)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.65 0.025 260)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: "oklch(0.18 0.02 265 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }}
                cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Bar dataKey="v" fill="url(#bg)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg mb-1">Calendário</h3>
          <p className="text-xs text-muted-foreground mb-4">Dezembro 2026</p>
          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-muted-foreground mb-2">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 31 }, (_, i) => {
              const has = [1, 5, 8, 12, 15, 19, 22, 26, 28].includes(i + 1);
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.15 }}
                  className={`aspect-square rounded-lg grid place-items-center text-xs ${
                    has ? "gradient-primary text-primary-foreground font-semibold shadow-glow" : "bg-muted/40 text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 mt-4">
        <h3 className="font-display font-semibold text-lg mb-4">Aportes Recentes</h3>
        <div className="space-y-2">
          {historico.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg gradient-accent grid place-items-center text-xs font-bold text-accent-foreground">
                  {h.asset.slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium">{h.asset}</p>
                  <p className="text-xs text-muted-foreground">{h.date} · {h.type}</p>
                </div>
              </div>
              <span className="font-medium tabular-nums text-success">+ R$ {h.value.toLocaleString("pt-BR")}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
