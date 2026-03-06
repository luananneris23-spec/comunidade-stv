import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const { user_id, data } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id obrigatório" });
    }

    const { error } = await supabase
      .from("user_data")
      .upsert(
        { user_id, data: JSON.stringify(data), updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: "Erro interno", detail: err.message });
  }
}
