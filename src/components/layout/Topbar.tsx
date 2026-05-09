import { Search, Bell, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [hidden, setHidden] = useState(false);
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center glass rounded-xl h-10 px-3 gap-2 w-72">
          <Search className="size-4 text-muted-foreground" />
          <input
            placeholder="Buscar ativos, metas, relatórios..."
            className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground/70"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setHidden((h) => !h)}
          className="glass rounded-xl size-10"
          aria-label="Alternar visibilidade dos valores"
        >
          {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="glass rounded-xl size-10 relative">
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary shadow-glow" />
        </Button>
        <div className="size-10 rounded-xl gradient-accent grid place-items-center text-sm font-semibold text-accent-foreground shadow-elegant">
          AM
        </div>
      </div>
    </motion.header>
  );
}
