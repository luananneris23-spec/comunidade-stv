import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("users")
    .select("id, user_code, name, email, password, expires_at, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Mapeia campos do Supabase para o formato que o App.jsx espera
  const mapped = data.map(u => ({
    id:    u.user_code,   // App usa u.id para lógica interna
    dbId:  u.id,         // ID real do banco (para operações)
    nome:  u.name,
    email: u.email || "",
    senha: u.password,
    exp:   u.expires_at,
  }));

  return res.status(200).json(mapped);
}
