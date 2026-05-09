import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  PiggyBank,
  Coins,
  ArrowUpRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { PageShell } from "@/components/layout/PageShell";
import { StatCard } from "@/components/dashboard/StatCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard Geral — VaultPro" },
      { name: "description", content: "Visão consolidada de patrimônio, rentabilidade e evolução da carteira de investimentos." },
    ],
  }),
  component: Dashboard,
});

const evolution = [
  { m: "Jan", v: 142000, a: 138000 },
  { m: "Fev", v: 148500, a: 142000 },
  { m: "Mar", v: 155200, a: 149000 },
  { m: "Abr", v: 162800, a: 156000 },
  { m: "Mai", v: 171400, a: 164000 },
  { m: "Jun", v: 178200, a: 170000 },
  { m: "Jul", v: 186500, a: 178000 },
  { m: "Ago", v: 195100, a: 186000 },
  { m: "Set", v: 204800, a: 194000 },
  { m: "Out", v: 213600, a: 202000 },
  { m: "Nov", v: 224900, a: 212000 },
  { m: "Dez", v: 238700, a: 224000 },
];

const allocation = [
  { name: "Ações", value: 38, color: "var(--chart-1)" },
  { name: "FIIs", value: 22, color: "var(--chart-2)" },
  { name: "Renda Fixa", value: 18, color: "var(--chart-5)" },
  { name: "Cripto", value: 12, color: "var(--chart-3)" },
  { name: "Exterior", value: 10, color: "var(--chart-4)" },
];

const aportes = [
  { m: "Jul", v: 4200 },
  { m: "Ago", v: 5100 },
  { m: "Set", v: 4800 },
  { m: "Out", v: 6200 },
  { m: "Nov", v: 5500 },
  { m: "Dez", v: 7100 },
];

function Dashboard() {
  return (
    <PageShell title="Dashboard Geral" subtitle="Visão consolidada do seu patrimônio e desempenho">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Patrimônio Total" value="R$ 238.745" delta={6.14} icon={Wallet} accent="primary" index={0} />
        <StatCard label="Rentabilidade Mensal" value="+R$ 13.840" delta={2.42} icon={TrendingUp} accent="accent" index={1} />
        <StatCard label="Aportes do Mês" value="R$ 7.100" delta={29.1} icon={PiggyBank} accent="warm" index={2} />
        <StatCard label="Renda Passiva" value="R$ 1.926" delta={4.8} icon={Coins} accent="primary" index={3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass rounded-2xl p-6 xl:col-span-2"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-lg">Evolução Patrimonial</h3>
              <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
            </div>
            <div className="flex gap-2 text-xs">
              {["1M", "6M", "1A", "Tudo"].map((p, i) => (
                <button
                  key={p}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    i === 2 ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={evolution} margin={{ left: -10, right: 8, top: 10 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 165)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.72 0.18 165)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.2 280)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="oklch(0.65 0.2 280)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="m" stroke="oklch(0.65 0.025 260)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.65 0.025 260)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.18 0.02 265 / 0.95)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                labelStyle={{ color: "oklch(0.97 0.01 250)" }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Area type="monotone" dataKey="a" stroke="oklch(0.65 0.2 280)" strokeWidth={2} fill="url(#g2)" />
              <Area type="monotone" dataKey="v" stroke="oklch(0.72 0.18 165)" strokeWidth={2.5} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-display font-semibold text-lg">Alocação</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribuição da carteira</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={allocation} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                {allocation.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "oklch(0.18 0.02 265 / 0.95)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                formatter={(v: number) => `${v}%`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {allocation.map((a) => (
              <div key={a.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ background: a.color }} />
                  <span className="text-muted-foreground">{a.name}</span>
                </span>
                <span className="font-medium tabular-nums">{a.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="glass rounded-2xl p-6 lg:col-span-2"
        >
          <h3 className="font-display font-semibold text-lg">Aportes Recentes</h3>
          <p className="text-xs text-muted-foreground mb-4">Últimos 6 meses</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={aportes} margin={{ left: -10, right: 8, top: 10 }}>
              <defs>
                <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 165)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.2 280)" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="m" stroke="oklch(0.65 0.025 260)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.65 0.025 260)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.18 0.02 265 / 0.95)",
                  border: "1px solid oklch(1 0 0 / 0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
                cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`}
              />
              <Bar dataKey="v" fill="url(#bar)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="font-display font-semibold text-lg">Resumo Rápido</h3>
          <p className="text-xs text-muted-foreground mb-4">Status financeiro</p>
          <div className="space-y-3">
            {[
              { label: "Lucro acumulado", value: "+R$ 42.380", positive: true },
              { label: "Rentab. ano (CDI)", value: "138%", positive: true },
              { label: "Próx. dividendo", value: "R$ 482", positive: true },
              { label: "Vencimentos", value: "3 esta semana", positive: false },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                <span className="text-sm text-muted-foreground">{r.label}</span>
                <span className={`text-sm font-semibold flex items-center gap-1 ${r.positive ? "text-success" : "text-warning"}`}>
                  {r.value}
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
