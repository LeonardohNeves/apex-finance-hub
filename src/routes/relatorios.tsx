import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { FileDown, FileText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/relatorios")({
  head: () => ({ meta: [{ title: "Relatórios — VaultPro" }] }),
  component: Page,
});

const reports = [
  { title: "Relatório Anual 2026", date: "31 Dez 2026", size: "2.4 MB", type: "Anual" },
  { title: "IR — Declaração 2026", date: "15 Dez 2026", size: "1.1 MB", type: "Fiscal" },
  { title: "Performance Mensal Nov", date: "01 Dez 2026", size: "780 KB", type: "Mensal" },
  { title: "Análise de Carteira Q4", date: "20 Nov 2026", size: "1.8 MB", type: "Trimestral" },
  { title: "Histórico de Aportes", date: "10 Nov 2026", size: "640 KB", type: "Histórico" },
];

function Page() {
  return (
    <PageShell title="Histórico e Relatórios" subtitle="Exporte, filtre e analise sua jornada financeira">
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="glass text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 hover:bg-muted/50">
          <Filter className="size-3.5" /> Período
        </button>
        <button className="glass text-xs px-3 py-1.5 rounded-full hover:bg-muted/50">Tipo</button>
        <button className="glass text-xs px-3 py-1.5 rounded-full hover:bg-muted/50">Categoria</button>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm" className="glass border-border rounded-xl">
            <FileDown className="size-4 mr-2" /> Excel
          </Button>
          <Button size="sm" className="gradient-primary text-primary-foreground border-0 rounded-xl shadow-glow hover:opacity-90">
            <FileDown className="size-4 mr-2" /> PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {reports.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 4 }}
            className="glass rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-glow transition-shadow"
          >
            <div className="size-11 rounded-xl gradient-accent grid place-items-center shrink-0">
              <FileText className="size-5 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.date} · {r.size} · {r.type}</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <FileDown className="size-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </PageShell>
  );
}
