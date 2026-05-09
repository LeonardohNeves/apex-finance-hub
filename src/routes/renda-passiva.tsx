import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { Coins, TrendingUp, Calendar } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "@/components/dashboard/StatCard";

export const Route = createFileRoute("/renda-passiva")({
  head: () => ({ meta: [{ title: "Renda Passiva — VaultPro" }] }),
  component: Page,
});

const data = Array.from({ length: 12 }, (_, i) => ({
  m: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i],
  v: 800 + i * 95 + Math.round(Math.sin(i) * 80),
}));

const proximos = [
  { date: "15 Dez", asset: "MXRF11", value: 76.50 },
  { date: "18 Dez", asset: "HGLG11", value: 58.20 },
  { date: "22 Dez", asset: "ITSA4", value: 184.00 },
  { date: "28 Dez", asset: "BBAS3", value: 124.80 },
];

function Page() {
  return (
    <PageShell title="Renda Passiva" subtitle="Dividendos, juros e proventos da sua carteira">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <StatCard label="Recebido no mês" value="R$ 1.926" delta={4.8} icon={Coins} accent="primary" index={0} />
        <StatCard label="Yield mensal" value="0.81%" delta={0.12} icon={TrendingUp} accent="accent" index={1} />
        <StatCard label="Próximo recebimento" value="R$ 76,50" delta={0} icon={Calendar} accent="warm" index={2} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold text-lg mb-1">Evolução da Renda Passiva</h3>
        <p className="text-xs text-muted-foreground mb-4">Últimos 12 meses</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ left: -10 }}>
            <defs>
              <linearGradient id="rp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.18 165)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="oklch(0.72 0.18 165)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
            <XAxis dataKey="m" stroke="oklch(0.65 0.025 260)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="oklch(0.65 0.025 260)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ background: "oklch(0.18 0.02 265 / 0.95)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, fontSize: 12 }}
              formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
            />
            <Area type="monotone" dataKey="v" stroke="oklch(0.72 0.18 165)" strokeWidth={2.5} fill="url(#rp)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 mt-4">
        <h3 className="font-display font-semibold text-lg mb-4">Próximos Recebimentos</h3>
        <div className="space-y-2">
          {proximos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg gradient-primary grid place-items-center text-xs font-bold text-primary-foreground">
                  {p.asset.slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium text-sm">{p.asset}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
              </div>
              <span className="font-semibold tabular-nums text-success">R$ {p.value.toFixed(2)}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageShell>
  );
}
