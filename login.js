const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { password } = req.body;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("password", password)
      .single();

    if (!user) {
      return res.status(401).json({
        error: "Senha incorreta."
      });
    }

    if (new Date() > new Date(user.expires_at)) {
      return res.status(403).json({
        error: "Seu acesso expirou."
      });
    }

    return res.status(200).json({
      role: "user",
      userId: user.user_code,
      nome: user.name,
      exp: user.expires_at
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro interno",
      detail: error.message
    });
  }
};