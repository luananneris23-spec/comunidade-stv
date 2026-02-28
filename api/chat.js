import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ─── LIMITE DE USO MENSAL ─────────────────────────────────────────────────────
// GPT-4o-mini custa ~$0.001 por chamada (média de 2000 tokens)
// 30 chamadas/mês = ~R$0,15/usuário — bem abaixo de R$10
// Ajuste LIMITE_MENSAL conforme quiser
const LIMITE_MENSAL = 30;
const DIAS_CICLO    = 30;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Usuário não identificado." });
    }

    const now = new Date();

    // ── Buscar uso atual ─────────────────────────────────────────────────────
    const { data: usageData } = await supabase
      .from("usage")
      .select("*")
      .eq("user_id", user_id)
      .maybeSingle();

    let callsUsed = 0;

    if (!usageData) {
      await supabase.from("usage").insert({
        user_id,
        first_call_at: now.toISOString(),
        calls_used: 1,
      });
      callsUsed = 1;
    } else {
      const diffDays = (now - new Date(usageData.first_call_at)) / (1000 * 60 * 60 * 24);

      if (diffDays > DIAS_CICLO) {
        await supabase
          .from("usage")
          .update({ first_call_at: now.toISOString(), calls_used: 1 })
          .eq("user_id", user_id);
        callsUsed = 1;
      } else {
        if (usageData.calls_used >= LIMITE_MENSAL) {
          const resetDate = new Date(usageData.first_call_at);
          resetDate.setDate(resetDate.getDate() + DIAS_CICLO);
          const diasParaReset = Math.ceil((resetDate - now) / (1000 * 60 * 60 * 24));
          return res.status(403).json({
            error: `Você usou todas as ${LIMITE_MENSAL} gerações deste mês. Renova em ${diasParaReset} dia(s).`,
          });
        }
        await supabase
          .from("usage")
          .update({ calls_used: usageData.calls_used + 1 })
          .eq("user_id", user_id);
        callsUsed = usageData.calls_used + 1;
      }
    }

    // ── Chama OpenAI ─────────────────────────────────────────────────────────
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 2500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Erro na OpenAI",
      });
    }

    const restantes = LIMITE_MENSAL - callsUsed;
    return res.status(200).json({
      choices: data.choices,
      limitWarning: restantes <= 5
        ? `Atenção: você tem apenas ${restantes} geração(ões) restante(s) este mês.`
        : null,
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao processar requisição.",
      detail: error?.message || "Erro desconhecido",
    });
  }
}
