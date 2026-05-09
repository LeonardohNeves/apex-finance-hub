import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthShell, Field } from "./login";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — VaultPro" },
      { name: "description", content: "Recupere o acesso à sua conta VaultPro." },
    ],
  }),
  component: ResetPage,
});

function ResetPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setSent(true);
    toast.success("Verifique seu email para redefinir a senha.");
  };

  return (
    <AuthShell title="Recuperar senha" subtitle="Enviaremos um link de redefinição por email">
      {sent ? (
        <div className="rounded-xl bg-muted/40 p-5 text-sm text-muted-foreground">
          Link enviado para <span className="text-foreground font-medium">{email}</span>. Verifique sua caixa de entrada.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field icon={Mail} type="email" placeholder="seu@email.com" value={email} onChange={setEmail} />
          <button
            type="submit"
            disabled={busy}
            className="w-full h-11 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Enviar link
          </button>
        </form>
      )}
      <p className="text-center text-sm text-muted-foreground mt-6">
        <Link to="/login" className="text-primary font-medium hover:underline">Voltar para o login</Link>
      </p>
    </AuthShell>
  );
}
