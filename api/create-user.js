# Query: api/create-user.js
# ContextLines: 1

No Results
const { createClient } = import("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id, nome, email, senha, exp } = req.body;

    const { error } = await supabase
      .from("users")
      .insert({
        user_code: id,
        name: nome,
        email: email || null,
        password: senha,
        expires_at: exp
      });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({
      error: "Erro interno",
      detail: err.message
    });
  }
};