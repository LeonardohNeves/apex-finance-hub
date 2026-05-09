import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — VaultPro" }] }),
  component: Page,
});

function Page() {
  return (
    <PageShell title="Configurações" subtitle="Personalize sua experiência VaultPro">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-lg mb-4">Perfil</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Nome</Label>
              <Input defaultValue="André Mendes" className="mt-1.5 glass border-border h-11 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">E-mail</Label>
              <Input defaultValue="andre@vaultpro.app" className="mt-1.5 glass border-border h-11 rounded-xl" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Moeda padrão</Label>
              <Input defaultValue="BRL — Real" className="mt-1.5 glass border-border h-11 rounded-xl" />
            </div>
            <Button className="gradient-primary text-primary-foreground border-0 rounded-xl shadow-glow hover:opacity-90">
              Salvar alterações
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <h3 className="font-display font-semibold text-lg mb-4">Preferências</h3>
          <div className="space-y-5">
            {[
              { label: "Notificações de mercado", desc: "Eventos importantes" },
              { label: "Alertas de aporte", desc: "Lembrete mensal" },
              { label: "Modo discreto", desc: "Esconder valores" },
              { label: "Atualização em tempo real", desc: "Cotações ao vivo" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
                <Switch defaultChecked={i < 2} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageShell>
  );
}
