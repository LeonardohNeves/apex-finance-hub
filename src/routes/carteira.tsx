import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/carteira")({
  head: () => ({ meta: [{ title: "Carteira — VaultPro" }] }),
  component: Page,
});

const ativos = [
  { ticker: "ITSA4", nome: "Itaúsa", cat: "Ações", qtd: 800, preco: 11.42, var: 1.8 },
  { ticker: "BBAS3", nome: "Banco do Brasil", cat: "Ações", qtd: 200, preco: 56.7, var: -0.6 },
  { ticker: "MXRF11", nome: "Maxi Renda FII", cat: "FIIs", qtd: 600, preco: 10.18, var: 0.4 },
  { ticker: "HGLG11", nome: "CSHG Logística", cat: "FIIs", qtd: 60, preco: 168.5, var: 1.2 },
  { ticker: "BTC", nome: "Bitcoin", cat: "Cripto", qtd: 0.18, preco: 412800, var: 3.4 },
  { ticker: "ETH", nome: "Ethereum", cat: "Cripto", qtd: 2.5, preco: 18900, var: -1.2 },
  { ticker: "Tesouro IPCA+", nome: "Tesouro 2035", cat: "Renda Fixa", qtd: 1, preco: 4250, var: 0.8 },
  { ticker: "VOO", nome: "Vanguard S&P 500", cat: "Exterior", qtd: 12, preco: 2780, var: 2.1 },
];

const cats = ["Todos", "Ações", "FIIs", "Cripto", "Renda Fixa", "Exterior"];

function Page() {
  return (
    <PageShell title="Carteira de Investimentos" subtitle="Todos os seus ativos em um só lugar">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {cats.map((c, i) => (
          <button
            key={c}
            className={`text-xs px-3 py-1.5 rounded-full transition-all ${
              i === 0 ? "gradient-primary text-primary-foreground shadow-glow" : "glass hover:bg-muted/50"
            }`}
          >
            {c}
          </button>
        ))}
        <button className="ml-auto glass text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 hover:bg-muted/50">
          <Filter className="size-3.5" /> Filtros
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left p-4">Ativo</th>
                <th className="text-left p-4">Categoria</th>
                <th className="text-right p-4">Qtd</th>
                <th className="text-right p-4">Preço</th>
                <th className="text-right p-4">Total</th>
                <th className="text-right p-4">Var. dia</th>
              </tr>
            </thead>
            <tbody>
              {ativos.map((a, i) => {
                const total = a.qtd * a.preco;
                const up = a.var >= 0;
                return (
                  <motion.tr
                    key={a.ticker}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-lg gradient-primary grid place-items-center text-xs font-bold text-primary-foreground">
                          {a.ticker.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium">{a.ticker}</p>
                          <p className="text-xs text-muted-foreground">{a.nome}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><Badge variant="secondary" className="font-normal">{a.cat}</Badge></td>
                    <td className="p-4 text-right tabular-nums">{a.qtd}</td>
                    <td className="p-4 text-right tabular-nums">R$ {a.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                    <td className="p-4 text-right tabular-nums font-medium">R$ {total.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</td>
                    <td className="p-4 text-right">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${up ? "text-success" : "text-destructive"}`}>
                        {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                        {up ? "+" : ""}{a.var.toFixed(2)}%
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </PageShell>
  );
}
