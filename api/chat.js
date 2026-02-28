import { createClient } from "@supabase/supabase-js"; // ← BUG 1 CORRIGIDO: era import() dinâmico inválido

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) { // ← BUG 2 CORRIGIDO: era module.exports (mistura CJS+ESM)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Usuário não identificado." });
    }

    const now = new Date();

    // 🔎 Buscar uso atual
    const { data: usageData } = await supabase
      .from("usage")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (!usageData) {
      // 🆕 Primeira geração
      await supabase.from("usage").insert({
        user_id,
        first_call_at: now.toISOString(),
        calls_used: 1,
      });
    } else {
      const firstCall = new Date(usageData.first_call_at);
      const diffDays = (now - firstCall) / (1000 * 60 * 60 * 24);

      if (diffDays > 30) {
        // 🔄 Reinicia ciclo
        await supabase
          .from("usage")
          .update({ first_call_at: now.toISOString(), calls_used: 1 })
          .eq("user_id", user_id);
      } else {
        if (usageData.calls_used >= 60) {
          return res.status(403).json({
            error: "Você atingiu o limite de 60 gerações. Aguarde o próximo ciclo de 30 dias.",
          });
        }
        await supabase
          .from("usage")
          .update({ calls_used: usageData.calls_used + 1 })
          .eq("user_id", user_id);
      }
    }

    // 🚀 Chama OpenAI
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
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Erro na OpenAI",
      });
    }

    return res.status(200).json({ choices: data.choices });

  } catch (error) {
    return res.status(500).json({
      error: "Erro ao processar requisição.",
      detail: error?.message || "Erro desconhecido",
    });
  }
}
