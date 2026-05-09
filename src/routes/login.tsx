import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — VaultPro" },
      { name: "description", content: "Acesse sua conta VaultPro para gerenciar seus investimentos." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/" });
  }, [user, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Bem-vindo de volta!");
    navigate({ to: "/" });
  };

  const oauth = async (p: "google" | "apple") => {
    const r = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin });
    if (r.error) toast.error(r.error.message ?? "Falha no login social");
  };

  return <AuthShell title="Bem-vindo de volta" subtitle="Acesse sua plataforma de investimentos">
    <form onSubmit={onSubmit} className="space-y-4">
      <Field icon={Mail} type="email" placeholder="seu@email.com" value={email} onChange={setEmail} />
      <Field
        icon={Lock}
        type={showPwd ? "text" : "password"}
        placeholder="Sua senha"
        value={password}
        onChange={setPassword}
        right={
          <button type="button" onClick={() => setShowPwd((v) => !v)} className="text-muted-foreground hover:text-foreground">
            {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />
      <div className="flex justify-end">
        <Link to="/reset-password" className="text-xs text-muted-foreground hover:text-primary">Esqueci minha senha</Link>
      </div>
      <button
        type="submit"
        disabled={busy}
        className="w-full h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
        Entrar
      </button>
    </form>

    <Divider />

    <div className="grid grid-cols-2 gap-3">
      <SocialButton label="Google" onClick={() => oauth("google")} />
      <SocialButton label="Apple" onClick={() => oauth("apple")} />
    </div>

    <p className="text-center text-sm text-muted-foreground mt-6">
      Não tem uma conta?{" "}
      <Link to="/signup" className="text-primary font-medium hover:underline">Criar conta</Link>
    </p>
  </AuthShell>;
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center px-4 relative overflow-hidden">
      <AnimatedBackdrop />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative z-10 w-full max-w-md rounded-3xl p-8 shadow-elegant"
      >
        <div className="flex items-center gap-3 mb-7">
          <div className="size-10 rounded-2xl gradient-primary grid place-items-center shadow-glow">
            <Sparkles className="size-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display font-semibold text-base leading-tight">Vault<span className="gradient-text">Pro</span></p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Investimentos</p>
          </div>
        </div>
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-6">{subtitle}</p>
        {children}
      </motion.div>
    </div>
  );
}

export function AnimatedBackdrop() {
  return (
    <>
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
      <motion.div
        className="absolute -top-32 -left-32 size-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 size-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-accent)" }}
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export function Field({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  right,
}: {
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  right?: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full h-11 rounded-xl bg-muted/40 border border-border pl-10 pr-10 text-sm outline-none focus:border-primary/60 focus:bg-muted/60 focus:shadow-[0_0_0_3px_oklch(0.72_0.18_165_/_0.15)] transition-all"
      />
      {right && <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>}
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs uppercase tracking-wider text-muted-foreground">ou continue com</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export function SocialButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/40 text-sm font-medium transition-all"
    >
      {label}
    </button>
  );
}
