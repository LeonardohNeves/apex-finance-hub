import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  accent?: "primary" | "accent" | "warm";
  index?: number;
}

export function StatCard({ label, value, delta, icon: Icon, accent = "primary", index = 0 }: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-5 relative overflow-hidden group cursor-pointer"
    >
      <div
        className={cn(
          "absolute -top-12 -right-12 size-40 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity",
          accent === "primary" && "gradient-primary",
          accent === "accent" && "gradient-accent",
          accent === "warm" && "gradient-warm"
        )}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-2xl md:text-3xl font-semibold mt-2 font-display">{value}</p>
        </div>
        <div
          className={cn(
            "size-10 rounded-xl grid place-items-center shrink-0",
            accent === "primary" && "gradient-primary",
            accent === "accent" && "gradient-accent",
            accent === "warm" && "gradient-warm"
          )}
        >
          <Icon className="size-5 text-primary-foreground" />
        </div>
      </div>
      {typeof delta === "number" && (
        <div className="flex items-center gap-1 mt-4 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
              positive ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            )}
          >
            {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            {positive ? "+" : ""}
            {delta.toFixed(2)}%
          </span>
          <span className="text-muted-foreground">vs. mês anterior</span>
        </div>
      )}
    </motion.div>
  );
}
