import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, TrendingUp, Flame, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil do Investidor — VaultPro" },
      { name: "description", content: "Veja e atualize seu perfil de investidor." },
    ],
  }),
  component: PerfilPage,
});

const META = {
  conservador: { title: "Conservador", Icon: Shield, desc: "Foco em segurança e preservação de capital." },
  moderado: { title: "Moderado", Icon: TrendingUp, desc: "Equilíbrio entre segurança e crescimento." },
  agressivo: { title: "Agressivo", Icon: Flame, desc: "Busca alta rentabilidade aceitando volatilidade." },
} as const;

function PerfilPage() {
  const { profile, user } = useAuth();
  const p = profile?.investor_profile;
  const m = p ? META[p] : null;

  return (
    <PageShell title="Perfil do Investidor" subtitle="Sua estratégia personalizada">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 max-w-2xl"
      >
        {m ? (
          <>
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl gradient-primary grid place-items-center shadow-glow">
                <m.Icon className="size-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Perfil atual</p>
                <h2 className="font-display text-2xl font-semibold gradient-text">{m.title}</h2>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">{m.desc}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <Info label="Nome" value={profile?.full_name || "—"} />
              <Info label="Email" value={user?.email ?? "—"} />
            </div>
            <Link
              to="/onboarding"
              className="mt-7 inline-flex items-center gap-2 px-5 h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-95 transition"
            >
              <Sparkles className="size-4" /> Refazer questionário
            </Link>
          </>
        ) : (
          <p className="text-muted-foreground">Nenhum perfil definido ainda.</p>
        )}
      </motion.div>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/30 border border-border p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-sm mt-1 font-medium truncate">{value}</p>
    </div>
  );
}
