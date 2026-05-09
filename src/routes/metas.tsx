import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { Trophy, Plane, Home, GraduationCap, Car, Plus } from "lucide-react";

export const Route = createFileRoute("/metas")({
  head: () => ({ meta: [{ title: "Metas Financeiras — VaultPro" }] }),
  component: Page,
});

const metas = [
  { icon: Home, title: "Entrada do Apartamento", current: 78000, target: 120000, color: "var(--chart-1)" },
  { icon: Plane, title: "Viagem para o Japão", current: 14500, target: 22000, color: "var(--chart-2)" },
  { icon: GraduationCap, title: "MBA Internacional", current: 32000, target: 80000, color: "var(--chart-3)" },
  { icon: Car, title: "Carro novo", current: 9000, target: 65000, color: "var(--chart-4)" },
  { icon: Trophy, title: "Independência Financeira", current: 238745, target: 1000000, color: "var(--chart-5)" },
];

function Page() {
  return (
    <PageShell title="Metas Financeiras" subtitle="Acompanhe o progresso dos seus sonhos">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metas.map((m, i) => {
          const pct = (m.current / m.target) * 100;
          const Icon = m.icon;
          return (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-xl grid place-items-center shrink-0" style={{ background: m.color, opacity: 0.9 }}>
                  <Icon className="size-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold">{m.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    R$ {m.current.toLocaleString("pt-BR")} / R$ {m.target.toLocaleString("pt-BR")}
                  </p>
                </div>
                <span className="font-display font-bold text-lg gradient-text shrink-0">{pct.toFixed(0)}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-muted/60 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                  className="h-full rounded-full relative"
                  style={{ background: `linear-gradient(90deg, ${m.color}, oklch(0.65 0.2 280))` }}
                >
                  <span className="absolute inset-0 animate-shimmer rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: metas.length * 0.06 }}
          whileHover={{ y: -3 }}
          className="glass rounded-2xl p-6 border-2 border-dashed border-primary/30 hover:border-primary/60 hover:shadow-glow transition-all flex flex-col items-center justify-center gap-2 min-h-[180px] group"
        >
          <div className="size-12 rounded-xl gradient-primary grid place-items-center group-hover:scale-110 transition-transform">
            <Plus className="size-5 text-primary-foreground" />
          </div>
          <span className="font-display font-medium">Nova Meta</span>
          <span className="text-xs text-muted-foreground">Defina seu próximo objetivo</span>
        </motion.button>
      </div>
    </PageShell>
  );
}
