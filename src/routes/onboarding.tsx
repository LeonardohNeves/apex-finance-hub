import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Shield, TrendingUp, Flame, Sparkles } from "lucide-react";
import { useAuth, type InvestorProfile } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AnimatedBackdrop } from "./login";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding — VaultPro" },
      { name: "description", content: "Descubra seu perfil de investidor em poucos passos." },
    ],
  }),
  component: OnboardingPage,
});

type Q = { id: string; question: string; options: { label: string; value: 0 | 1 | 2 }[] };

const QUESTIONS: Q[] = [
  {
    id: "objective",
    question: "Qual seu principal objetivo?",
    options: [
      { label: "Preservar patrimônio", value: 0 },
      { label: "Crescimento equilibrado", value: 1 },
      { label: "Alto crescimento", value: 2 },
    ],
  },
  {
    id: "loss",
    question: "Como você reage a perdas temporárias?",
    options: [
      { label: "Evito qualquer perda", value: 0 },
      { label: "Aceito pequenas oscilações", value: 1 },
      { label: "Aceito grandes oscilações", value: 2 },
    ],
  },
  {
    id: "horizon",
    question: "Qual seu horizonte de investimento?",
    options: [
      { label: "Curto prazo (até 2 anos)", value: 0 },
      { label: "Médio prazo (2 a 5 anos)", value: 1 },
      { label: "Longo prazo (5+ anos)", value: 2 },
    ],
  },
  {
    id: "experience",
    question: "Qual sua experiência com investimentos?",
    options: [
      { label: "Iniciante", value: 0 },
      { label: "Intermediário", value: 1 },
      { label: "Avançado", value: 2 },
    ],
  },
  {
    id: "asset",
    question: "Qual ativo mais te atrai?",
    options: [
      { label: "Renda fixa", value: 0 },
      { label: "Fundos e FIIs", value: 1 },
      { label: "Ações e criptomoedas", value: 2 },
    ],
  },
];

const PROFILES: Record<InvestorProfile, {
  title: string;
  icon: typeof Shield;
  desc: string;
  strategy: string;
  allocation: { name: string; value: number; color: string }[];
}> = {
  conservador: {
    title: "Conservador",
    icon: Shield,
    desc: "Você prioriza segurança e previsibilidade. Foco em proteção do capital com baixa volatilidade.",
    strategy: "Maior alocação em renda fixa, tesouro direto e fundos de baixo risco.",
    allocation: [
      { name: "Renda Fixa", value: 65, color: "oklch(0.72 0.18 165)" },
      { name: "FIIs", value: 20, color: "oklch(0.65 0.2 280)" },
      { name: "Ações", value: 10, color: "oklch(0.78 0.16 75)" },
      { name: "Cripto", value: 5, color: "oklch(0.7 0.2 30)" },
    ],
  },
  moderado: {
    title: "Moderado",
    icon: TrendingUp,
    desc: "Você busca equilíbrio entre segurança e crescimento, aceitando oscilações controladas.",
    strategy: "Mix balanceado entre renda fixa, FIIs e ações de qualidade.",
    allocation: [
      { name: "Renda Fixa", value: 40, color: "oklch(0.72 0.18 165)" },
      { name: "FIIs", value: 25, color: "oklch(0.65 0.2 280)" },
      { name: "Ações", value: 25, color: "oklch(0.78 0.16 75)" },
      { name: "Cripto", value: 10, color: "oklch(0.7 0.2 30)" },
    ],
  },
  agressivo: {
    title: "Agressivo",
    icon: Flame,
    desc: "Você busca alta rentabilidade e aceita maior volatilidade no curto prazo.",
    strategy: "Alta exposição a renda variável, ações de crescimento, cripto e exterior.",
    allocation: [
      { name: "Ações", value: 45, color: "oklch(0.78 0.16 75)" },
      { name: "Cripto", value: 25, color: "oklch(0.7 0.2 30)" },
      { name: "FIIs", value: 15, color: "oklch(0.65 0.2 280)" },
      { name: "Renda Fixa", value: 15, color: "oklch(0.72 0.18 165)" },
    ],
  },
};

function calcProfile(answers: Record<string, number>): InvestorProfile {
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const max = QUESTIONS.length * 2;
  const pct = total / max;
  if (pct < 0.34) return "conservador";
  if (pct < 0.7) return "moderado";
  return "agressivo";
}

function OnboardingPage() {
  const navigate = useNavigate();
  const { user, profile, loading, refreshProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<InvestorProfile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/login" });
    else if (profile?.onboarding_completed) navigate({ to: "/" });
  }, [user, profile, loading, navigate]);

  const total = QUESTIONS.length;
  const progress = useMemo(() => ((step + (result ? 1 : 0)) / (total + 1)) * 100, [step, result]);
  const current = QUESTIONS[step];

  const select = (val: number) => {
    const next = { ...answers, [current.id]: val };
    setAnswers(next);
    setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setResult(calcProfile(next));
    }, 220);
  };

  const finish = async () => {
    if (!user || !result) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        investor_profile: result,
        onboarding_completed: true,
        onboarding_answers: answers as never,
      })
      .eq("id", user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    await refreshProfile();
    toast.success("Perfil salvo com sucesso!");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden grid place-items-center px-4 py-10">
      <AnimatedBackdrop />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl glass-strong rounded-3xl p-8 shadow-elegant"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Onboarding</p>
              <p className="font-display font-semibold">Perfil de Investidor</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {result ? "Concluído" : `Etapa ${step + 1} de ${total}`}
          </p>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden mt-4 mb-8">
          <motion.div
            className="h-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-display text-2xl font-semibold mb-6">{current.question}</h2>
              <div className="space-y-3">
                {current.options.map((opt) => {
                  const active = answers[current.id] === opt.value;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => select(opt.value)}
                      className={`w-full text-left px-5 h-14 rounded-2xl border transition-all flex items-center justify-between group ${
                        active
                          ? "border-primary bg-primary/10 shadow-glow"
                          : "border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/40"
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span
                        className={`size-6 rounded-full grid place-items-center border ${
                          active ? "border-primary gradient-primary" : "border-border group-hover:border-primary/60"
                        }`}
                      >
                        {active && <Check className="size-3.5 text-primary-foreground" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 transition"
                >
                  <ArrowLeft className="size-4" /> Voltar
                </button>
                <button
                  onClick={() => answers[current.id] !== undefined && (step < total - 1 ? setStep(step + 1) : setResult(calcProfile(answers)))}
                  disabled={answers[current.id] === undefined}
                  className="flex items-center gap-2 text-sm font-medium text-primary disabled:opacity-40 hover:underline"
                >
                  {step < total - 1 ? "Próximo" : "Ver resultado"} <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <ResultView profile={result} onConfirm={finish} saving={saving} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ResultView({ profile, onConfirm, saving }: { profile: InvestorProfile; onConfirm: () => void; saving: boolean }) {
  const data = PROFILES[profile];
  const Icon = data.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="size-20 rounded-3xl gradient-primary grid place-items-center shadow-glow mx-auto mb-4"
      >
        <Icon className="size-9 text-primary-foreground" />
      </motion.div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">Seu perfil é</p>
      <h2 className="font-display text-3xl font-semibold mt-1 gradient-text">{data.title}</h2>
      <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">{data.desc}</p>

      <div className="grid sm:grid-cols-2 gap-4 mt-7 text-left">
        <div className="rounded-2xl bg-muted/30 border border-border p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Estratégia recomendada</p>
          <p className="text-sm">{data.strategy}</p>
        </div>
        <div className="rounded-2xl bg-muted/30 border border-border p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Alocação sugerida</p>
          <div className="flex items-center gap-3">
            <ResponsiveContainer width={90} height={90}>
              <PieChart>
                <Pie data={data.allocation} dataKey="value" innerRadius={24} outerRadius={42} paddingAngle={3} stroke="none">
                  {data.allocation.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1">
              {data.allocation.map((a) => (
                <div key={a.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ background: a.color }} />
                    {a.name}
                  </span>
                  <span className="tabular-nums font-medium">{a.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        disabled={saving}
        className="mt-8 w-full sm:w-auto sm:px-10 h-12 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-95 transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
      >
        {saving ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
        Acessar meu dashboard
      </button>
    </motion.div>
  );
}
