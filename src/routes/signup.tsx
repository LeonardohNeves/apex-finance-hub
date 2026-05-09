import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Mail, Lock, User as UserIcon, Loader2, Sparkles, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AuthShell, Field, Divider, SocialButton } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Criar conta — VaultPro" },
      { name: "description", content: "Crie sua conta VaultPro e comece a organizar sua vida financeira." },
    ],
  }),
  component: SignupPage,
});

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s; // 0..4
}

function SignupPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accept, setAccept] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/" });
  }, [user, loading, navigate]);

  const s = useMemo(() => strength(password), [password]);
  const labels = ["Muito fraca", "Fraca", "Razoável", "Boa", "Forte"];
  const colors = ["bg-destructive", "bg-destructive", "bg-warning", "bg-primary", "bg-success"];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return toast.error("As senhas não coincidem");
    if (!accept) return toast.error("Aceite os termos para continuar");
    if (s < 2) return toast.error("Escolha uma senha mais forte");

    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { full_name: name },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Conta criada! Vamos personalizar seu perfil.");
    navigate({ to: "/onboarding" });
  };

  const oauth = async (p: "google" | "apple") => {
    const r = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin });
    if (r.error) toast.error(r.error.message ?? "Falha no login social");
  };

  return (
    <AuthShell title="Crie sua conta" subtitle="Comece sua jornada de investimentos premium">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field icon={UserIcon} placeholder="Seu nome completo" value={name} onChange={setName} />
        <Field icon={Mail} type="email" placeholder="seu@email.com" value={email} onChange={setEmail} />
        <Field
          icon={Lock}
          type={showPwd ? "text" : "password"}
          placeholder="Crie uma senha"
          value={password}
          onChange={setPassword}
          right={
            <button type="button" onClick={() => setShowPwd((v) => !v)} className="text-muted-foreground hover:text-foreground">
              {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          }
        />
        {password && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: i < s ? 1 : 0.15 }}
                  className={`h-1 flex-1 rounded-full origin-left transition-colors ${i < s ? colors[s] : "bg-muted"}`}
                />
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">Força: <span className="text-foreground font-medium">{labels[s]}</span></p>
          </div>
        )}
        <Field icon={Lock} type={showPwd ? "text" : "password"} placeholder="Confirme sua senha" value={confirm} onChange={setConfirm} />

        <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
            className="mt-0.5 size-4 rounded border-border accent-[oklch(0.72_0.18_165)]"
          />
          <span>
            Aceito os <span className="text-primary">Termos de Uso</span> e a <span className="text-primary">Política de Privacidade</span>.
          </span>
        </label>

        <button
          type="submit"
          disabled={busy}
          className="w-full h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          Criar conta
        </button>
      </form>

      <Divider />

      <div className="grid grid-cols-2 gap-3">
        <SocialButton label="Google" onClick={() => oauth("google")} />
        <SocialButton label="Apple" onClick={() => oauth("apple")} />
      </div>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Já tem uma conta?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">Entrar</Link>
      </p>
    </AuthShell>
  );
}
