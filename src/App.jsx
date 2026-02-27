import { useState, useEffect } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const ADMIN_PWD = "admin@stv2024";

// ─── DADOS ───────────────────────────────────────────────────────────────────
const MECANISMOS = [
  { id:1,  nome:"Combustível Extra",                     cat:"engajamento", desc:"Trazer audiência de outro lugar para os stories.", ex:"Hoje vou dar uma aula nos stories. Me fala seu nicho!" },
  { id:2,  nome:"Desafio Curto com Promessa de Análise", cat:"engajamento", desc:"Propor desafio prometendo análise. Incentiva interação por inbox.", ex:"Me envia sua página de vendas por inbox que eu analiso ao vivo." },
  { id:3,  nome:"Conversa Sem Privacidade",              cat:"engajamento", desc:"Mostrar trecho de conversa do inbox nos stories.", ex:"Tirar print de uma conversa e postar com comentário." },
  { id:4,  nome:"Dia do Hotseat",                        cat:"engajamento", desc:"Pedir para a audiência contribuir com conteúdo.", ex:"O que vocês acham que tem de errado nessa página? Me manda por inbox." },
  { id:5,  nome:"Meta Coletiva",                         cat:"engajamento", desc:"Estipular uma meta para entregar um benefício.", ex:"Se esse story bater 500 compartilhamentos eu vou [...]." },
  { id:6,  nome:"História com Gancho",                   cat:"conexao",     desc:"Contar uma história que gera contexto para uma ação.", ex:"Hoje eu vou contar a história do dia que eu [...]." },
  { id:7,  nome:"Cultura de Resultado",                  cat:"prova",       desc:"Incentivar audiência a mostrar resultados.", ex:"Me manda prints de faturamento para eu compartilhar aqui." },
  { id:8,  nome:"Piada Interna",                         cat:"conexao",     desc:"Criar uma piada interna por repetição.", ex:"Repetir uma piada recorrente da sua comunidade." },
  { id:9,  nome:"Pânico pelo Conteúdo",                  cat:"antecipacao", desc:"Gerar forte antecipação pelo conteúdo.", ex:"Vou revelar um dos mecanismos que mais me traz vendas hoje à meia-noite." },
  { id:10, nome:"Ansiedade pela Abertura",               cat:"antecipacao", desc:"Incentivar comprovante de ação. Quem não fez percebe que está de fora.", ex:"Se você já comprou o ingresso, manda aqui pra eu saber quem vai." },
  { id:11, nome:"Abertura de Carrinho",                  cat:"vendas",      desc:"Gerar antecipação pela abertura de carrinho.", ex:"Amanhã às 9h eu vou abrir as vendas para [...]." },
  { id:12, nome:"Ative a Notificação",                   cat:"antecipacao", desc:"Gerar expectativa por conteúdo futuro.", ex:"Amanhã eu vou falar sobre [...]." },
  { id:13, nome:"Alerta para Voltar",                    cat:"engajamento", desc:"Convidar o público a voltar os stories.", ex:"Volta os stories e me manda um emoji no que mais fez sentido." },
  { id:14, nome:"BI Apurado",                            cat:"pesquisa",    desc:"Realizar uma pesquisa com a audiência.", ex:"Me conta por que você comprou o [...]." },
  { id:15, nome:"Print Valioso",                         cat:"engajamento", desc:"Incentivar a audiência a tirar print.", ex:"Aproveita pra tirar print do que gerou valor pra você." },
  { id:16, nome:"Identidade do Comunicador",             cat:"conexao",     desc:"Demonstrar sua identidade de comunicador.", ex:"Exagerar suas características naturais em momentos oportunos." },
  { id:17, nome:"Identidade do Produto",                 cat:"vendas",      desc:"Demonstrar a identidade do produto.", ex:"Mostrar respostas em que pessoas falam de aspectos exclusivos do produto." },
  { id:18, nome:"Identidade do Consumidor",              cat:"conexao",     desc:"Dar voz para o consumidor ideal.", ex:"Quando ver uma atitude positiva em um cliente, exalte ela nos stories." },
  { id:19, nome:"Desabafo",                              cat:"conexao",     desc:"Estimular o público a desabafar.", ex:"Você já teve uma experiência ruim com [...]? Me conta aqui." },
  { id:20, nome:"Opinião de Quem Comprou",               cat:"prova",       desc:"Pedir opinião de quem comprou.", ex:"Se você comprou o [produto], me fala o que achou." },
  { id:21, nome:"Peça Compartilhamento",                 cat:"crescimento", desc:"Incentivar o público a compartilhar o conteúdo.", ex:"Se você achou esse conteúdo bom, compartilha com seus amigos." },
  { id:22, nome:"Nomes Esquisitos",                      cat:"conexao",     desc:"Utilizar nomes próprios na comunicação.", ex:"Utilize a técnica do mortal carpado para [...]." },
  { id:23, nome:"Espetacularização",                     cat:"conexao",     desc:"Exaltar determinada ação.", ex:"Mostrar de forma especial algo que aconteceu com você." },
  { id:24, nome:"Você Sabia",                            cat:"conteudo",    desc:"Gerar curiosidade com um fato interessante.", ex:"Você sabia que 90% da população brasileira [...]?" },
  { id:25, nome:"Micro Influência",                      cat:"conexao",     desc:"Recomendar algo para audiência.", ex:"Qualquer pessoa deveria assistir o filme [...]." },
  { id:26, nome:"Presente Difícil",                      cat:"engajamento", desc:"Oferecer um presente para quem engaja.", ex:"Quem fizer isso vai ganhar [...]." },
  { id:27, nome:"Elemento Escondido",                    cat:"engajamento", desc:"Falar que tem uma resposta escondida na sequência.", ex:"Você percebeu a resposta escondida que eu deixei nos últimos stories?" },
  { id:28, nome:"Tarja de Curiosidade",                  cat:"conteudo",    desc:"Esconder a parte importante de uma mensagem.", ex:"Eu fiz 50 mil reais utilizando o @#$%*" },
  { id:29, nome:"Psicologia Reversa",                    cat:"vendas",      desc:"Dar uma resposta contra intuitiva.", ex:"Tô doido pra comprar seu curso. R: Não compre [...]." },
  { id:30, nome:"Resumo",                                cat:"conteudo",    desc:"Pedir um resumo do seu conteúdo.", ex:"O melhor resumo da Live vai ganhar [...]." },
  { id:31, nome:"7 Erros",                               cat:"engajamento", desc:"Pedir para encontrar o erro.", ex:"Nessa página tem apenas um erro. Você identificou?" },
  { id:32, nome:"Diário",                                cat:"conexao",     desc:"Fazer um diário de algum momento especial.", ex:"Fazer um diário do seu natal, aniversário, viagem especial..." },
  { id:33, nome:"Crítica",                               cat:"engajamento", desc:"Deixar uma deixa para crítica.", ex:"O que você diria para esse sujeito [...]?" },
  { id:34, nome:"Demonstração Curta",                    cat:"vendas",      desc:"Mostrar como sua solução funciona na prática.", ex:"Vídeo de 30s mostrando o produto/serviço com resultado real." },
  { id:35, nome:"Enquete com Curiosidade Real",          cat:"pesquisa",    desc:"Perguntas que o público tem curiosidade em saber.", ex:"Usar a enquete para saber quais pessoas mais precisam da sua ajuda." },
  { id:36, nome:"Link Oculto",                           cat:"vendas",      desc:"Colocar o link do produto com um nome chamativo.", ex:"Não seja curioso - clique aqui." },
  { id:37, nome:"Indicação Pretensiosa",                 cat:"engajamento", desc:"Pedir aos seguidores para enviarem indicações.", ex:"Queria assistir um filme bom hoje à noite. Você conhece algum?" },
  { id:38, nome:"Levante a Mão",                         cat:"vendas",      desc:"Fazer triagem no público para achar os mais prontos para comprar.", ex:"Se você tem interesse em [produto] me manda 'eu quero' por inbox." },
];

const CATS = {
  engajamento: { label:"Engajamento", color:"#cc6600", emoji:"🔥" },
  conexao:     { label:"Conexão",     color:"#6633cc", emoji:"💜" },
  vendas:      { label:"Vendas",      color:"#006600", emoji:"💰" },
  antecipacao: { label:"Antecipação", color:"#0055aa", emoji:"⏰" },
  prova:       { label:"Prova Social",color:"#cc0033", emoji:"⭐" },
  conteudo:    { label:"Conteúdo",    color:"#996600", emoji:"💡" },
  crescimento: { label:"Crescimento", color:"#006633", emoji:"📈" },
  pesquisa:    { label:"Pesquisa",    color:"#660066", emoji:"🔍" },
};

const TIPOS_COM   = ["Venda de produto digital","Venda de produto físico","Consciência de produto","Engajamento puro","Aquecimento para pico de vendas","Pré-abertura de carrinho","Caixinha por tema","Caixinha geral"];
const CTAS        = ["Resposta Inbox","Enquete","Link de vendas","Link de conteúdo","Captura de dados","Caixinha","Sem CTA"];
const TIPOS_MURAL = ["Categorias","Situações de identificação","Urgências ocultas","Tema livre"];
const STATUS_LIST = ["Rascunho","Gravando","No Ar"];

// ─── UTILS ────────────────────────────────────────────────────────────────────
function uid()     { return Math.random().toString(36).slice(2,9); }
function pwdGen(n) { return n.toLowerCase().replace(/\s+/g,"").slice(0,5)+Math.floor(1000+Math.random()*9000); }

// ─── STORAGE ─────────────────────────────────────────────────────────────────
function getUsers()         { try { return JSON.parse(localStorage.getItem("stv_users")||"[]"); } catch { return []; } }
function saveUsers(u)       { localStorage.setItem("stv_users",JSON.stringify(u)); }
function getUserData(id)    { try { return JSON.parse(localStorage.getItem("stv_d_"+id)||"{}"); } catch { return {}; } }
function saveUserData(id,d) { localStorage.setItem("stv_d_"+id,JSON.stringify(d)); }
function getSession()       {
  try {
    const s=JSON.parse(localStorage.getItem("stv_sess")||"null");
    if(!s) return null;
    if(s.role==="admin") return s;
    if(new Date()>new Date(s.exp)){localStorage.removeItem("stv_sess");return null;}
    return s;
  } catch { return null; }
}
function saveSession(s) { localStorage.setItem("stv_sess",JSON.stringify(s)); }
function clearSession() { localStorage.removeItem("stv_sess"); }

// ─── IA — SYSTEM PROMPT ──────────────────────────────────────────────────────
function buildSystemPrompt(userData) {
  const { nicho, prods, seqs } = userData;
  const topMecs = {};
  (seqs||[]).forEach(s=>(s.stories||[]).forEach(r=>{ if(r.mec) topMecs[r.mec]=(topMecs[r.mec]||0)+1; }));
  const mecsFav = Object.entries(topMecs).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([m])=>m).join(", ")||"nenhum ainda";
  const prodList = (prods||[]).map(p=>p.nome).join(", ")||"nenhum cadastrado";

  return `Você é um especialista em stories estratégicos que vendem, treinado no método "Stories que Vendem" (STV).

CONTEXTO DO USUÁRIO:
- Nicho: ${nicho||"não informado — pergunte se relevante"}
- Produtos na vitrine: ${prodList}
- Mecanismos favoritos do usuário: ${mecsFav}
- Total de comunidades criadas: ${(seqs||[]).length}

CONHECIMENTO DO MÉTODO STV:
Os 38 mecanismos de conexão são organizados em 8 categorias:
${Object.entries(CATS).map(([k,c])=>`- ${c.emoji} ${c.label}: ${MECANISMOS.filter(m=>m.cat===k).map(m=>m.nome).join(", ")}`).join("\n")}

REGRAS DO MÉTODO (OBRIGATÓRIAS):
1. O 1º story SEMPRE deve ter um destes CTAs de engajamento: Resposta Inbox, Enquete ou Caixinha
2. Mínimo de 5 mecanismos diferentes por comunidade
3. Mínimo de 5 CTAs ativos por comunidade
4. Mínimo de 15 recados (stories) por comunidade
5. Distribuir mecanismos de forma estratégica: engajamento no início, conexão no meio, vendas no final
6. Nunca fazer mais de 3 recados de venda seguidos sem intercalar com conexão/engajamento

ESTRUTURA IDEAL DE UMA COMUNIDADE:
- Recados 1-3: Engajamento forte (prender atenção, gerar interação imediata)
- Recados 4-7: Conexão e história (criar vínculo, identificação)
- Recados 8-12: Conteúdo + Prova Social (entregar valor, mostrar resultados)
- Recados 13-15+: Antecipação → Vendas (conduzir para a ação)

ESTILO DE RESPOSTA:
- Sempre responda em JSON quando solicitado — sem markdown, sem texto extra
- Seja prático e específico ao nicho do usuário
- Use linguagem próxima, como um mentor experiente em marketing digital
- Quando sugerir roteiros, escreva como o próprio criador de conteúdo falaria`;
}

// ─── IA — CHAMADAS ────────────────────────────────────────────────────────────
// ─── CHAVE DA API OPENAI ─────────────────────────────────────────────────────
// IMPORTANTE: Substitua pela sua chave em https://platform.openai.com/api-keys
// Para produção, use uma variável de ambiente — nunca exponha a chave publicamente
async function callAI(systemPrompt, userPrompt) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({
      error: { message: res.statusText }
    }));
    throw new Error(err?.error?.message || "Erro na API");
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}
function parseJSON(txt) {
  try {
    const clean = txt.replace(/```json|```/g,"").trim();
    return JSON.parse(clean);
  } catch { return null; }
}

// ─── CSS ─────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Tahoma&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background-color:#c0d8f0;background-image:linear-gradient(45deg,#b0cce8 25%,transparent 25%),linear-gradient(-45deg,#b0cce8 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#b0cce8 75%),linear-gradient(-45deg,transparent 75%,#b0cce8 75%);background-size:4px 4px;background-position:0 0,0 2px,2px -2px,-2px 0;font-family:Tahoma,Verdana,Arial,sans-serif;font-size:12px;color:#222;min-height:100vh}
.topbar{background:linear-gradient(180deg,#f07020 0%,#d05000 45%,#b03800 100%);border-bottom:3px solid #882800;height:50px;display:flex;align-items:stretch;box-shadow:0 2px 6px rgba(0,0,0,.35)}
.tbrand{padding:0 16px;display:flex;align-items:center;border-right:1px solid rgba(0,0,0,.2);min-width:180px;background:linear-gradient(180deg,rgba(255,255,255,.12) 0%,transparent 100%)}
.tlogo{font-size:15px;font-weight:bold;color:#fff;font-family:Verdana,Arial;text-shadow:1px 2px 3px rgba(0,0,0,.4);letter-spacing:-.3px}
.tlogo em{color:#ffe566;font-style:normal}
.ttagline{font-size:9px;color:#ffddb0;margin-top:2px;letter-spacing:.4px}
.tnav{display:flex;align-items:stretch}
.tni{padding:0 13px;display:flex;align-items:center;gap:5px;color:#ffddb0;font-size:11px;font-weight:bold;cursor:pointer;border-right:1px solid rgba(0,0,0,.12);transition:background .1s;white-space:nowrap}
.tni:hover{background:rgba(0,0,0,.18);color:#fff}
.tni.on{background:rgba(0,0,0,.28);color:#fff;border-bottom:3px solid #ffe566}
.tni .ni{font-size:14px}
.tright{margin-left:auto;padding:0 14px;display:flex;align-items:center;gap:8px;font-size:10px;color:#ffddb0}
.odot{width:8px;height:8px;border-radius:50%;background:#66ff44;border:1px solid #33cc22;box-shadow:0 0 5px #44ff22;flex-shrink:0}
.lay{display:flex;min-height:calc(100vh - 82px)}
.sb{width:188px;min-width:188px;padding:9px 7px;display:flex;flex-direction:column;gap:7px}
.ct{flex:1;padding:9px 9px 9px 2px;overflow-y:auto}
.box{background:#fff;border:1px solid #9ac0e0;border-radius:5px;overflow:hidden;box-shadow:1px 2px 4px rgba(0,40,100,.1),inset 0 1px 0 rgba(255,255,255,.7);margin-bottom:8px}
.bh{background:linear-gradient(180deg,#6699cc 0%,#4477aa 50%,#336699 100%);color:#fff;font-weight:bold;font-size:11px;padding:5px 10px;display:flex;align-items:center;justify-content:space-between;gap:6px;text-shadow:0 1px 2px rgba(0,0,0,.4);border-bottom:1px solid #2255aa;letter-spacing:.3px}
.bh.or{background:linear-gradient(180deg,#ff8833 0%,#dd5500 50%,#cc4400 100%);border-bottom-color:#aa2200}
.bh.gr{background:linear-gradient(180deg,#55bb55 0%,#338833 50%,#226622 100%);border-bottom-color:#115511}
.bh.pu{background:linear-gradient(180deg,#9966cc 0%,#7744aa 50%,#552288 100%);border-bottom-color:#331166}
.bh.rd{background:linear-gradient(180deg,#dd4444 0%,#bb2222 50%,#991111 100%);border-bottom-color:#770000}
.bh.dk{background:linear-gradient(180deg,#444466 0%,#222244 50%,#111133 100%);border-bottom-color:#000022}
.bh.ai{background:linear-gradient(180deg,#aa44cc 0%,#882299 50%,#661177 100%);border-bottom-color:#440066}
.bb{padding:8px 10px}.bbl{padding:12px 14px}
.scrap{background:#fffef5;border:1px solid #ddd8b8;border-radius:3px;padding:7px 9px;margin-bottom:5px;font-size:11px;transition:border-color .1s}
.scrap:hover{border-color:#4477aa;background:#f5f9ff}
.sname{font-weight:bold;color:#2255aa;margin-bottom:2px;font-size:11px}
.stxt{color:#555;line-height:1.4}.smeta{color:#aaa;font-size:10px;margin-top:3px}
.ci{display:flex;align-items:center;gap:8px;padding:5px 8px;border-bottom:1px solid #e0ecf8;cursor:pointer;transition:background .1s}
.ci:hover{background:#e8f4ff}.ci:last-child{border-bottom:none}
.cii{width:34px;height:34px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:16px;border:1px solid #c0d8f0;background:#f0f8ff;flex-shrink:0}
.cin{font-weight:bold;color:#2255aa;font-size:11px}.cis{color:#999;font-size:10px}
.sbl{width:9px;height:9px;border-radius:50%;display:inline-block;border:1px solid rgba(0,0,0,.2);flex-shrink:0;vertical-align:middle;margin-right:3px}
.sbl.g{background:radial-gradient(circle at 35% 35%,#88ee88,#22aa22)}
.sbl.y{background:radial-gradient(circle at 35% 35%,#ffee66,#ddaa00)}
.sbl.o{background:radial-gradient(circle at 35% 35%,#ffaa44,#dd6600)}
.sbl.gz{background:radial-gradient(circle at 35% 35%,#ccc,#888)}
.btn{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:3px;font-size:11px;font-weight:bold;cursor:pointer;font-family:Tahoma,Arial,sans-serif;border:1px solid;white-space:nowrap;transition:filter .1s}
.btn:hover{filter:brightness(1.08)}.btn:active{filter:brightness(.92)}
.btn:disabled{opacity:.5;cursor:not-allowed;filter:none}
.bl{background:linear-gradient(180deg,#7aaddd 0%,#4488cc 100%);border-color:#2266aa;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.25)}
.bo{background:linear-gradient(180deg,#ffaa55 0%,#ee6600 100%);border-color:#cc4400;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.25)}
.bgn{background:linear-gradient(180deg,#77cc66 0%,#449933 100%);border-color:#227711;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.25)}
.bw{background:linear-gradient(180deg,#fff 0%,#e8e8e8 100%);border-color:#aaa;color:#333}
.brd{background:linear-gradient(180deg,#ff7777 0%,#cc2222 100%);border-color:#991111;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.25)}
.bai{background:linear-gradient(180deg,#cc66ee 0%,#882299 100%);border-color:#661177;color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.25)}
.bsm{padding:2px 7px;font-size:10px}
.fl{font-size:11px;font-weight:bold;color:#444;margin-bottom:3px;display:block}
.fi,.fs,.ft{width:100%;border:1px solid #99bbdd;border-radius:2px;padding:4px 6px;font-size:11px;font-family:Tahoma,Arial,sans-serif;color:#222;background:#fff;outline:none;box-shadow:inset 1px 1px 3px rgba(0,0,80,.06);transition:border-color .15s}
.fi:focus,.fs:focus,.ft:focus{border-color:#2255aa;background:#f0f8ff}
.ft{min-height:65px;resize:vertical}.fg{margin-bottom:9px}.fr{display:flex;gap:8px}.fr>*{flex:1}
.ot{width:100%;border-collapse:collapse;font-size:11px}
.ot th{background:linear-gradient(180deg,#ddeeff 0%,#b8d8ff 100%);border:1px solid #a0c8f0;padding:4px 8px;text-align:left;color:#1144aa;font-weight:bold;font-size:10px;text-transform:uppercase;letter-spacing:.4px}
.ot td{border:1px solid #d0e8ff;padding:5px 8px;vertical-align:middle}
.ot tr:nth-child(even) td{background:#f0f8ff}.ot tr:hover td{background:#ddeeff}
.tabs{display:flex;border-bottom:2px solid #4477aa;margin-bottom:10px;gap:2px}
.tab{padding:4px 14px;font-size:11px;font-weight:bold;cursor:pointer;background:linear-gradient(180deg,#ddeeff 0%,#bbddff 100%);border:1px solid #99bbee;border-bottom:none;color:#2255aa;border-radius:4px 4px 0 0;transition:all .1s}
.tab:hover:not(.on){background:linear-gradient(180deg,#eef6ff 0%,#ccddff 100%)}
.tab.on{background:linear-gradient(180deg,#4477aa 0%,#2255aa 100%);color:#fff;border-color:#2255aa;text-shadow:0 1px 1px rgba(0,0,0,.3)}
.wb{background:#fffbe0;border:1px solid #ffcc44;border-left:3px solid #ff8800;border-radius:3px;padding:6px 10px;font-size:11px;color:#554400;margin-bottom:7px}
.wb ul{padding-left:14px;margin-top:3px}.wb li{margin-bottom:2px}
.ob{background:#efffec;border:1px solid #77cc77;border-left:3px solid #33aa33;border-radius:3px;padding:6px 10px;font-size:11px;color:#1a3a1a;margin-bottom:7px}
.hb{background:#eef8ff;border:1px solid #99ccee;border-radius:3px;padding:6px 10px;font-size:11px;color:#224466;margin-bottom:7px}
.aib{background:linear-gradient(135deg,#f5eaff 0%,#ecdeff 100%);border:1px solid #cc88ee;border-left:3px solid #9922cc;border-radius:3px;padding:8px 10px;font-size:11px;color:#441166;margin-bottom:8px}
.ailoading{display:flex;align-items:center;gap:8px;color:#882299;font-size:11px;font-weight:bold;padding:8px;background:#f9f0ff;border:1px solid #cc88ee;border-radius:3px;margin-bottom:8px}
.spin{display:inline-block;animation:spin 1s linear infinite}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.ai-sugg{background:#fff;border:1px solid #cc88ee;border-radius:3px;padding:8px 10px;margin-bottom:5px;cursor:pointer;font-size:11px;transition:all .1s}
.ai-sugg:hover{background:#f5eaff;border-color:#9922cc}
.ai-sugg .as-title{font-weight:bold;color:#661199;margin-bottom:3px}
.ai-sugg .as-desc{color:#555;line-height:1.5}
.ai-sugg .as-mec{font-size:10px;color:#9922cc;margin-top:3px}
.mo{position:fixed;inset:0;background:rgba(0,20,80,.45);display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px}
.md{background:#fff;border:2px solid #4477aa;border-radius:5px;width:100%;max-width:540px;max-height:88vh;overflow-y:auto;box-shadow:4px 6px 20px rgba(0,20,80,.4)}
.md.wide{max-width:680px}
.mh{background:linear-gradient(180deg,#6699cc 0%,#336699 100%);color:#fff;font-weight:bold;font-size:12px;padding:6px 12px;display:flex;align-items:center;justify-content:space-between;text-shadow:0 1px 2px rgba(0,0,0,.3)}
.mh.ai{background:linear-gradient(180deg,#aa44cc 0%,#661177 100%)}
.mb{padding:14px}
.sr{display:flex;align-items:center;gap:8px;padding:5px 8px;background:#f5f9ff;border:1px solid #c8dff5;border-radius:3px;margin-bottom:3px;cursor:pointer;transition:all .1s;font-size:11px}
.sr:hover,.sr.op{background:#deeeff;border-color:#3366aa}
.sn{width:22px;height:22px;background:linear-gradient(180deg,#6699cc 0%,#3366aa 100%);color:#fff;font-weight:bold;font-size:10px;border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid #2255aa;text-shadow:0 1px 1px rgba(0,0,0,.3)}
.sd{background:#f0f7ff;border:1px solid #3366aa;border-top:none;border-radius:0 0 3px 3px;padding:10px;margin-bottom:3px}
.dg{display:grid;grid-template-columns:repeat(auto-fill,minmax(205px,1fr));gap:6px}
.di{background:#f8f8f8;border:1px solid #ddd;border-radius:3px;padding:8px;cursor:pointer;font-size:11px;transition:all .1s;border-left:3px solid #ccc}
.di:hover{background:#eef6ff;border-color:#3366aa}
.dn{font-weight:bold;color:#333;margin-bottom:3px}.dd{color:#666;line-height:1.4;font-size:10px}
.de{background:#fffce0;border:1px solid #ddcc77;border-radius:2px;padding:4px 6px;margin-top:5px;color:#554400;font-size:10px;line-height:1.4}
.li2{display:flex;align-items:center;gap:6px;padding:4px 8px;background:#eef6ff;border:1px solid #aaccee;border-radius:3px;margin-bottom:4px;font-size:11px}
.str{display:flex;justify-content:space-around;text-align:center;padding:8px 4px}
.sv{font-size:20px;font-weight:bold;color:#2255aa;display:block;font-family:Verdana,Arial}
.sl{font-size:10px;color:#888;margin-top:1px}
.badge{display:inline-block;padding:1px 5px;border-radius:8px;font-size:9px;font-weight:bold;border:1px solid}
.dvd{height:1px;background:linear-gradient(90deg,#a0c8e8,#e8f4ff,#a0c8e8);margin:8px 0}
.gate{min-height:100vh;display:flex;align-items:center;justify-content:center;background-color:#c0d8f0;background-image:linear-gradient(45deg,#b0cce8 25%,transparent 25%),linear-gradient(-45deg,#b0cce8 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#b0cce8 75%),linear-gradient(-45deg,transparent 75%,#b0cce8 75%);background-size:4px 4px}
.ep{text-align:center;padding:24px 16px;color:#aaa}
.ei{font-size:28px;margin-bottom:6px}.et{font-size:12px;font-weight:bold;color:#777;margin-bottom:3px}.es{font-size:11px}
.foot{background:linear-gradient(180deg,#d8eaf8 0%,#c4d8ee 100%);border-top:1px solid #a0c8e8;text-align:center;padding:7px;font-size:10px;color:#7799bb}
.pw-cell{font-family:monospace;background:#f8f8f8;font-size:11px}
.act{color:#228822;font-weight:bold}.exp2{color:#cc2222;font-weight:bold}
::-webkit-scrollbar{width:10px}::-webkit-scrollbar-track{background:#c0d8f0}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#88aacc,#5588aa);border:1px solid #4477aa;border-radius:2px}
@media(max-width:640px){.sb{display:none}.tni span:not(.ni){display:none}.fr{flex-direction:column}}
`;

// ─── GATE ─────────────────────────────────────────────────────────────────────
function Gate({ onLogin }) {
  const [pw,setPw]=useState(""); const [err,setErr]=useState("");
  const login = async () => {
    if(pw===ADMIN_PWD){const s={role:"admin"};saveSession(s);onLogin(s);return;}
    const response = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password: pw })
});

const data = await response.json();

if (!response.ok) {
  setErr(data.error);
  return;
}

saveSession(data);
onLogin(data);
    if(!user){setErr("Senha incorreta. Verifique com quem te enviou o acesso.");return;}
    if(new Date()>new Date(user.expires_at)){setErr("Seu acesso expirou. Entre em contato com o administrador.");return;}
    const s={role:"user",userId:user.id,nome:user.nome,exp:user.exp};
    saveSession(s);onLogin(s);
  };
  return (
    <div className="gate">
      <div style={{width:330}}>
        <div className="box">
          <div className="bh or">🔐 Área restrita — acesso por convite</div>
          <div className="bb" style={{padding:22,textAlign:"center"}}>
            <div style={{fontSize:24,fontWeight:"bold",color:"#2255aa",fontFamily:"Verdana,Arial",letterSpacing:-1,marginBottom:3}}>Comunidade <em style={{color:"#ee5500",fontStyle:"normal"}}>STV</em></div>
            <div style={{fontSize:10,color:"#3366aa",marginBottom:4,letterSpacing:1,textTransform:"uppercase"}}>Stories que Vendem</div>
            <div style={{color:"#666",fontSize:11,marginBottom:16,lineHeight:1.6}}>Bem-vindo à nossa comunidade! 💛<br/>Aqui você vai construir conexões reais<br/>com a sua audiência através dos stories.</div>
            <div className="fg"><label className="fl">Sua senha de acesso:</label><input className="fi" type="password" placeholder="••••••••" value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&login()}/></div>
            <button className="btn bo" style={{width:"100%",justifyContent:"center"}} onClick={login}>▶ Entrar na comunidade</button>
            {err&&<div style={{color:"#cc0000",fontSize:11,marginTop:7,fontWeight:"bold"}}>⚠ {err}</div>}
            <div style={{color:"#bbb",fontSize:10,marginTop:14}}>Comunidade STV © 2024 · Todos os direitos reservados</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminPanel({ onLogout }) {
  const [users,setUsersState]=useState([]);

useEffect(()=>{
  fetch("/api/list-users")
    .then(res=>res.json())
    .then(data=>setUsersState(data));
},[]);
  const [show,setShow]=useState(false);
  const [form,setForm]=useState({nome:"",email:"",dias:30});
  const [copied,setCopied]=useState(null);
  const sync=fn=>{setUsersState(prev=>{const next=typeof fn==="function"?fn(prev):fn;saveUsers(next);return next;});};
  const criar = async () => {
    console.log("CRIAR FOI CHAMADO");
  if (!form.nome.trim()) return;

  const exp = new Date();
  exp.setDate(exp.getDate() + Number(form.dias));

  const newUser = {
    id: crypto.randomUUID(),
    nome: form.nome,
    email: form.email,
    senha: pwdGen(form.nome),
    exp: exp.toISOString()
  };

  const response = await fetch("/api/create-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.error || "Erro ao criar usuário");
    return;
  }

  // 🔥 BUSCA A LISTA ATUALIZADA DO BANCO
  const res = await fetch("/api/list-users");
  const listaAtualizada = await res.json();
  setUsersState(listaAtualizada);

  setForm({ nome: "", email: "", dias: 30 });
  setShow(false);
};
  const remover=id=>{if(!confirm("Remover membro?"))return;sync(u=>u.filter(x=>x.id!==id));localStorage.removeItem("stv_d_"+id);};
  const renovar=(id,dias)=>sync(u=>u.map(x=>{if(x.id!==id)return x;const exp=new Date();exp.setDate(exp.getDate()+dias);return{...x,exp:exp.toISOString()};}));
  const copiar=(txt,id)=>{navigator.clipboard.writeText(txt).catch(()=>{});setCopied(id);setTimeout(()=>setCopied(null),2000);};
  const agora=new Date();
  return (
    <div>
      <div className="topbar">
        <div className="tbrand"><div><div className="tlogo">Comunidade <em>STV</em></div><div className="ttagline">Painel do Administrador</div></div></div>
        <div className="tnav"><div className="tni on"><span className="ni">👥</span><span>Membros</span></div></div>
        <div className="tright"><span style={{color:"#ffe566",fontWeight:"bold"}}>⚙ ADMIN</span><button className="btn bw bsm" onClick={onLogout}>sair</button></div>
      </div>
      <div style={{maxWidth:980,margin:"0 auto",padding:14}}>
        <div className="box"><div className="bh dk">⚙ Painel de controle</div><div className="str"><div><span className="sv">{users.length}</span><span className="sl">Membros</span></div><div><span className="sv" style={{color:"#228822"}}>{users.filter(u=>agora<new Date(u.exp)).length}</span><span className="sl">Ativos</span></div><div><span className="sv" style={{color:"#cc2222"}}>{users.filter(u=>agora>=new Date(u.exp)).length}</span><span className="sl">Expirados</span></div></div></div>
        <div className="wb">🔑 <strong>Senha admin:</strong>&nbsp;<code style={{background:"#f8f8f8",padding:"1px 6px",borderRadius:2,fontFamily:"monospace"}}>{ADMIN_PWD}</code>&nbsp;— Troque na linha <code>ADMIN_PWD</code> antes de publicar.</div>
        <div className="box">
          <div className="bh">👥 Membros cadastrados <button className="btn bgn bsm" onClick={()=>setShow(true)}>+ novo membro</button></div>
          <div className="bbl">
            {users.length===0&&<div className="ep"><div className="ei">👥</div><div className="et">Nenhum membro ainda</div><div className="es">Cadastre o primeiro membro</div></div>}
            {users.length>0&&<table className="ot"><thead><tr><th>Nome</th><th>E-mail</th><th>Senha</th><th>Expira</th><th>Status</th><th>Ações</th></tr></thead><tbody>{users.map(u=>{const ativo=agora<new Date(user.expires_at);const diasRest=Math.max(0,Math.ceil((new Date(u.exp)-agora)/86400000));return(<tr key={u.id}><td style={{fontWeight:"bold"}}>{u.nome}</td><td style={{color:"#666"}}>{u.email||"—"}</td><td className="pw-cell"><span style={{letterSpacing:1}}>{u.senha}</span><button className="btn bw bsm" style={{marginLeft:5}} onClick={()=>copiar(u.senha,u.id)}>{copied===u.id?"✔":"📋"}</button></td><td>{new Date(u.exp).toLocaleDateString("pt-BR")}</td><td>{ativo?<span className="act"><span className="sbl g"/>{diasRest}d</span>:<span className="exp2"><span className="sbl gz"/>Expirado</span>}</td><td><div style={{display:"flex",gap:3}}><button className="btn bl bsm" onClick={()=>renovar(u.id,30)}>+30d</button><button className="btn bo bsm" onClick={()=>renovar(u.id,7)}>+7d</button><button className="btn brd bsm" onClick={()=>remover(u.id)}>✕</button></div></td></tr>);})}</tbody></table>}
          </div>
        </div>
        <div className="box"><div className="bh or">📖 Como funciona</div><div className="bb" style={{fontSize:11,lineHeight:1.9,color:"#444"}}><div>1. Cadastre o membro e defina os dias de acesso</div><div>2. O sistema gera a senha automaticamente — clique 📋 para copiar</div><div>3. Envie a senha para o cliente</div><div>4. O cliente entra com a senha e usa o app com IA integrada</div><div>5. Use +30d ou +7d para renovar o acesso</div></div></div>
      </div>
      <div className="foot">Comunidade STV © 2024 · Painel Administrativo</div>
      {show&&(<div className="mo" onClick={e=>e.target===e.currentTarget&&setShow(false)}><div className="md"><div className="mh">👥 Novo membro <button className="btn bw bsm" onClick={()=>setShow(false)}>✕</button></div><div className="mb"><div className="hb">💡 A senha será gerada automaticamente!</div><div className="fg"><label className="fl">Nome *</label><input className="fi" placeholder="Ex: Maria Silva" value={form.nome} onChange={e=>setForm(f=>({...f,nome:e.target.value}))}/></div><div className="fg"><label className="fl">E-mail (opcional)</label><input className="fi" placeholder="maria@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div><div className="fg"><label className="fl">Dias de acesso *</label><div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}><input className="fi" type="number" min="1" max="3650" style={{width:80}} value={form.dias} onChange={e=>setForm(f=>({...f,dias:e.target.value}))}/>{[7,30,60,90,365].map(d=>(<button key={d} className={`btn bsm ${Number(form.dias)===d?"bl":"bw"}`} onClick={()=>setForm(f=>({...f,dias:d}))}>{d}d</button>))}</div></div><div className="dvd"/><div style={{display:"flex",gap:5,justifyContent:"flex-end"}}><button className="btn bw" onClick={()=>setShow(false)}>Cancelar</button><button className="btn bgn" onClick={criar}>✔ Cadastrar e gerar senha</button></div></div></div></div>)}
    </div>
  );
}

// ─── IA MODAL — GERAR COMUNIDADE COMPLETA ────────────────────────────────────
function AIGerarComunidade({ userData, onAplicar, onClose }) {
  const [loading,setLoading]=useState(false);
  const [result,setResult]=useState(null);
  const [erro,setErro]=useState("");
  const [form,setForm]=useState({tipo:TIPOS_COM[0],produto:"",objetivo:""});

  const gerar=async()=>{
    setLoading(true);setErro("");setResult(null);
    try {
      const sys=buildSystemPrompt(userData);
      const prompt=`Gere uma comunidade de stories completa com EXATAMENTE 15 recados.

Tipo: ${form.tipo}
Produto/Serviço: ${form.produto||"produto do usuário"}
Objetivo: ${form.objetivo||"gerar vendas"}

Responda SOMENTE com JSON válido neste formato exato:
{
  "nome": "nome criativo para a comunidade",
  "recados": [
    {
      "mec": "nome exato do mecanismo da lista",
      "cta": "um dos CTAs válidos",
      "ideia": "roteiro detalhado do que falar neste story (2-3 frases)"
    }
  ]
}

CTAs válidos: ${CTAS.join(", ")}
Lembre: 1º story DEVE ter Resposta Inbox, Enquete ou Caixinha. Mínimo 5 mecanismos diferentes. Mínimo 5 CTAs ativos.`;

      const txt=await callAI(sys,prompt);
      const data=parseJSON(txt);
      if(!data||!data.recados) throw new Error("Resposta inválida da IA");
      setResult(data);
    } catch(e) { setErro("Erro ao gerar. Tente novamente. "+e.message); }
    setLoading(false);
  };

  return (
    <div className="mo" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="md wide">
        <div className="mh ai">🤖 IA — Gerar Comunidade Completa <button className="btn bw bsm" onClick={onClose}>✕</button></div>
        <div className="mb">
          {!result&&(
            <>
              <div className="aib">✨ A IA vai criar uma comunidade completa de 15 recados, já com mecanismos, CTAs e roteiro, personalizada para o seu nicho e produto!</div>
              <div className="fg"><label className="fl">Tipo da comunidade</label><select className="fs" value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}>{TIPOS_COM.map(t=><option key={t}>{t}</option>)}</select></div>
              <div className="fg"><label className="fl">Produto ou serviço que vai vender</label><input className="fi" placeholder="Ex: Mentoria de tráfego pago, Curso de confeitaria..." value={form.produto} onChange={e=>setForm(f=>({...f,produto:e.target.value}))}/></div>
              <div className="fg"><label className="fl">Objetivo principal</label><input className="fi" placeholder="Ex: Gerar leads qualificados, vender ingresso do evento..." value={form.objetivo} onChange={e=>setForm(f=>({...f,objetivo:e.target.value}))}/></div>
              {erro&&<div style={{color:"#cc2222",fontSize:11,marginBottom:8}}>⚠ {erro}</div>}
              {loading&&<div className="ailoading"><span className="spin">⚙</span> Gerando sua comunidade com IA... aguarde</div>}
              <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
                <button className="btn bw" onClick={onClose}>Cancelar</button>
                <button className="btn bai" disabled={loading} onClick={gerar}>🤖 {loading?"Gerando...":"Gerar com IA"}</button>
              </div>
            </>
          )}
          {result&&(
            <>
              <div className="ob">✔ Comunidade gerada! Revise os {result.recados.length} stories abaixo e clique em "Aplicar" para criar.</div>
              <div style={{maxHeight:380,overflowY:"auto",marginBottom:12}}>
                {result.recados.map((r,i)=>(
                  <div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:"1px solid #eee",fontSize:11}}>
                    <div style={{width:22,height:22,background:"linear-gradient(180deg,#aa44cc,#661177)",color:"#fff",borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:"bold",flexShrink:0}}>{i+1}</div>
                    <div>
                      <div><span style={{color:"#9922cc",fontWeight:"bold"}}>{r.mec}</span> · <span style={{color:"#226600"}}>{r.cta}</span></div>
                      <div style={{color:"#555",marginTop:2,lineHeight:1.4}}>{r.ideia}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
                <button className="btn bw" onClick={()=>setResult(null)}>← Refazer</button>
                <button className="btn bgn" onClick={()=>onAplicar(result)}>✔ Aplicar essa comunidade</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── IA MODAL — SUGERIR MECANISMO ────────────────────────────────────────────
function AISugerirMecanismo({ userData, storyIndex, storyIdeia, onAplicar, onClose }) {
  const [loading,setLoading]=useState(false);
  const [sugestoes,setSugestoes]=useState([]);
  const [erro,setErro]=useState("");

  const gerar=async()=>{
    setLoading(true);setErro("");
    try {
      const sys=buildSystemPrompt(userData);
      const prompt=`Sugira 3 mecanismos ideais para o story de número ${storyIndex+1} de uma comunidade de stories.

Contexto do story: "${storyIdeia||"não informado"}"
Posição na sequência: story ${storyIndex+1}

Responda SOMENTE com JSON:
{
  "sugestoes": [
    { "mec": "nome exato do mecanismo", "motivo": "por que esse mecanismo funciona aqui (1 frase)", "cta": "CTA recomendado" }
  ]
}`;
      const txt=await callAI(sys,prompt);
      const data=parseJSON(txt);
      if(!data?.sugestoes) throw new Error("Resposta inválida");
      setSugestoes(data.sugestoes);
    } catch(e){setErro("Erro ao gerar. Tente novamente.");}
    setLoading(false);
  };

  useEffect(()=>{ gerar(); },[]);

  return (
    <div className="mo" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="md">
        <div className="mh ai">🤖 IA — Sugerir Mecanismo <button className="btn bw bsm" onClick={onClose}>✕</button></div>
        <div className="mb">
          {loading&&<div className="ailoading"><span className="spin">⚙</span> Analisando o melhor mecanismo para este recado...</div>}
          {erro&&<div style={{color:"#cc2222",fontSize:11,marginBottom:8}}>⚠ {erro} <button className="btn bw bsm" onClick={gerar}>Tentar de novo</button></div>}
          {sugestoes.length>0&&(
            <>
              <div className="hb">Clique em uma sugestão para aplicar ao story {storyIndex+1}:</div>
              {sugestoes.map((s,i)=>(
                <div key={i} className="ai-sugg" onClick={()=>onAplicar(s)}>
                  <div className="as-title">⚙ {s.mec}</div>
                  <div className="as-desc">{s.motivo}</div>
                  <div className="as-mec">CTA recomendado: {s.cta}</div>
                </div>
              ))}
            </>
          )}
          <div style={{marginTop:8,display:"flex",justifyContent:"flex-end"}}><button className="btn bw" onClick={onClose}>Fechar</button></div>
        </div>
      </div>
    </div>
  );
}

// ─── IA MODAL — IDEIAS PARA O MURAL ──────────────────────────────────────────
function AIIdeiaMural({ userData, onAplicar, onClose }) {
  const [loading,setLoading]=useState(false);
  const [ideias,setIdeias]=useState([]);
  const [erro,setErro]=useState("");
  const [tipo,setTipo]=useState(TIPOS_MURAL[0]);

  const gerar=async()=>{
    setLoading(true);setErro("");
    try {
      const sys=buildSystemPrompt(userData);
      const prompt=`Gere 5 ideias criativas para o Mural de ideias do usuário.

Tipo de ideia: ${tipo}

Responda SOMENTE com JSON:
{
  "ideias": [
    { "titulo": "título curto e criativo", "desc": "descrição breve de como usar essa ideia (1-2 frases)" }
  ]
}`;
      const txt=await callAI(sys,prompt);
      const data=parseJSON(txt);
      if(!data?.ideias) throw new Error("Resposta inválida");
      setIdeias(data.ideias);
    } catch(e){setErro("Erro ao gerar. Tente novamente.");}
    setLoading(false);
  };

  return (
    <div className="mo" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="md">
        <div className="mh ai">🤖 IA — Ideias para o Mural <button className="btn bw bsm" onClick={onClose}>✕</button></div>
        <div className="mb">
          <div className="fg"><label className="fl">Tipo de ideia</label><select className="fs" value={tipo} onChange={e=>setTipo(e.target.value)}>{TIPOS_MURAL.map(t=><option key={t}>{t}</option>)}</select></div>
          {loading&&<div className="ailoading"><span className="spin">⚙</span> Gerando ideias personalizadas para seu nicho...</div>}
          {erro&&<div style={{color:"#cc2222",fontSize:11,marginBottom:8}}>⚠ {erro}</div>}
          {ideias.length>0&&(
            <>
              <div className="hb">Clique nas ideias que quer adicionar ao mural:</div>
              {ideias.map((id,i)=>(
                <div key={i} className="ai-sugg" onClick={()=>onAplicar({...id,tipo})}>
                  <div className="as-title">📌 {id.titulo}</div>
                  <div className="as-desc">{id.desc}</div>
                </div>
              ))}
            </>
          )}
          <div style={{marginTop:8,display:"flex",gap:5,justifyContent:"flex-end"}}>
            <button className="btn bw" onClick={onClose}>Fechar</button>
            <button className="btn bai" disabled={loading} onClick={gerar}>🤖 {loading?"Gerando...":"Gerar inspirações"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STORY ROW ────────────────────────────────────────────────────────────────
function StoryRow({ s, i, tot, prods, userData, onChange, onRem, onDup, onUp, onDown }) {
  const [open,setOpen]=useState(false);
  const [dt,setDt]=useState("lista");
  const [aiModal,setAiModal]=useState(false);
  const w=[];
  if(i===0&&!["Resposta Inbox","Enquete","Caixinha"].includes(s.cta))w.push("1º story: Resposta Inbox, Enquete ou Caixinha");
  if(!s.mec)w.push("Adicione um mecanismo");
  if(!s.cta)w.push("Adicione um CTA");
  const ps=prods.find(p=>p.id===s.produtoId);
  return (
    <div>
      <div className={`sr ${open?"op":""}`} onClick={()=>setOpen(!open)}>
        <div className="sn">{i+1}</div>
        <div style={{flex:1,display:"flex",gap:10}}>
          <div style={{flex:1}}><span style={{color:"#999",fontSize:10}}>Mecanismo: </span><span style={{fontWeight:s.mec?"bold":"normal",color:s.mec?"#222":"#aaa"}}>{s.mec||"—"}</span></div>
          <div style={{flex:1}}><span style={{color:"#999",fontSize:10}}>CTA: </span><span style={{fontWeight:s.cta?"bold":"normal",color:s.cta?"#226600":"#aaa"}}>{s.cta||"—"}</span></div>
        </div>
        <div style={{display:"flex",gap:3}} onClick={e=>e.stopPropagation()}>
          {i>0&&<button className="btn bw bsm" onClick={onUp}>↑</button>}
          {i<tot-1&&<button className="btn bw bsm" onClick={onDown}>↓</button>}
          <button className="btn bw bsm" onClick={onDup}>⧉</button>
          <button className="btn brd bsm" onClick={onRem}>✕</button>
        </div>
      </div>
      {open&&(
        <div className="sd">
          {w.length>0&&<div className="wb">⚠ <strong>Atenção:</strong><ul>{w.map((x,j)=><li key={j}>{x}</li>)}</ul></div>}
          <div className="fg"><label className="fl">Roteiro do story</label><textarea className="ft" style={{minHeight:50}} placeholder="Descreva o que vai falar nesse story..." value={s.ideia||""} onChange={e=>onChange({...s,ideia:e.target.value})}/></div>
          <div className="fr" style={{marginBottom:8}}>
            <div className="fg" style={{marginBottom:0}}>
              <label className="fl" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                Mecanismo
                <button className="btn bai bsm" onClick={e=>{e.stopPropagation();setAiModal(true);}}>🤖 Sugerir com IA</button>
              </label>
              <div style={{display:"flex",gap:3,marginBottom:3}}>
                <button className={`btn bsm ${dt==="lista"?"bl":"bw"}`} onClick={()=>setDt("lista")}>Lista</button>
                <button className={`btn bsm ${dt==="manual"?"bl":"bw"}`} onClick={()=>setDt("manual")}>Escrever</button>
              </div>
              {dt==="lista"
                ?<select className="fs" value={s.mec||""} onChange={e=>onChange({...s,mec:e.target.value})}>
                  <option value="">-- selecione --</option>
                  {Object.entries(CATS).map(([cat,info])=>(<optgroup key={cat} label={`${info.emoji} ${info.label}`}>{MECANISMOS.filter(d=>d.cat===cat).map(d=><option key={d.id} value={d.nome}>{d.nome}</option>)}</optgroup>))}
                </select>
                :<input className="fi" placeholder="Descreva o mecanismo..." value={s.mec||""} onChange={e=>onChange({...s,mec:e.target.value})}/>
              }
            </div>
            <div className="fg" style={{marginBottom:0}}>
              <label className="fl">CTA</label>
              <select className="fs" value={s.cta||""} onChange={e=>onChange({...s,cta:e.target.value})}>
                <option value="">-- selecione --</option>
                {CTAS.map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {prods.length>0&&(
            <div className="fr">
              <div className="fg" style={{marginBottom:0}}><label className="fl">Produto vinculado</label><select className="fs" value={s.produtoId||""} onChange={e=>onChange({...s,produtoId:e.target.value,linkId:""})}><option value="">-- nenhum --</option>{prods.map(p=><option key={p.id} value={p.id}>{p.nome}</option>)}</select></div>
              {ps&&(ps.links||[]).length>0&&(<div className="fg" style={{marginBottom:0}}><label className="fl">Link</label><select className="fs" value={s.linkId||""} onChange={e=>onChange({...s,linkId:e.target.value})}><option value="">-- selecione --</option>{ps.links.map(l=><option key={l.id} value={l.id}>{l.rotulo}</option>)}</select>{s.linkId&&<div style={{fontSize:10,color:"#2255aa",marginTop:2,wordBreak:"break-all"}}>🔗 {ps.links.find(l=>l.id===s.linkId)?.url}</div>}</div>)}
            </div>
          )}
        </div>
      )}
      {aiModal&&<AISugerirMecanismo userData={userData} storyIndex={i} storyIdeia={s.ideia} onAplicar={sg=>{onChange({...s,mec:sg.mec,cta:sg.cta||s.cta});setAiModal(false);}} onClose={()=>setAiModal(false)}/>}
    </div>
  );
}

// ─── COM DETAIL ───────────────────────────────────────────────────────────────
function ComDetail({ com, setSeqs, prods, userData, onBack }) {
  const [tab,setTab]=useState("recados");
  const [ls,setLs]=useState(com);
  const sv=u=>{setLs(u);setSeqs(x=>x.map(s=>s.id===u.id?u:s));};
  const addR=()=>sv({...ls,stories:[...(ls.stories||[]),{id:uid(),mec:"",cta:"",ideia:""}]});
  const remR=i=>sv({...ls,stories:ls.stories.filter((_,j)=>j!==i)});
  const updR=(i,u)=>sv({...ls,stories:ls.stories.map((s,j)=>j===i?u:s)});
  const dupR=i=>{const a=[...ls.stories];a.splice(i+1,0,{...a[i],id:uid()});sv({...ls,stories:a});};
  const movR=(i,d)=>{const a=[...ls.stories];[a[i],a[i+d]]=[a[i+d],a[i]];sv({...ls,stories:a});};
  const st=ls.stories||[];
  const m5=st.filter(s=>s.mec).length;
  const c5=st.filter(s=>s.cta&&s.cta!=="Sem CTA").length;
  const f1ok=st[0]&&["Resposta Inbox","Enquete","Caixinha"].includes(st[0].cta);
  const ok=m5>=5&&c5>=5&&st.length>=15&&f1ok;
  const sbm={Rascunho:"gz",Gravando:"y","No Ar":"g"};
  return (
    <div style={{padding:10}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <button className="btn bw bsm" onClick={onBack}>◄ Voltar</button>
        <strong style={{fontSize:13,flex:1}}>{ls.nome}</strong>
        <span style={{color:"#999",fontSize:11}}>{ls.tipo} · {st.length} recados</span>
        <select className="fs" style={{width:"auto"}} value={ls.status||"Rascunho"} onChange={e=>sv({...ls,status:e.target.value})}>{STATUS_LIST.map(s=><option key={s}>{s}</option>)}</select>
        <span className={`sbl ${sbm[ls.status||"Rascunho"]}`}/>
      </div>
      <div className="box">
        <div className="bh">📱 {ls.nome}</div>
        <div style={{padding:10}}>
          <div className="tabs">
            {[["recados","📱 Stories"],["ajustes","⚙ Ajustes"],["diario","📊 Resultados"]].map(([id,lb])=>(
              <div key={id} className={`tab ${tab===id?"on":""}`} onClick={()=>setTab(id)}>{lb}</div>
            ))}
          </div>
          {tab==="ajustes"&&(
            <div>
              <div className="fr"><div className="fg"><label className="fl">Nome</label><input className="fi" value={ls.nome} onChange={e=>sv({...ls,nome:e.target.value})}/></div><div className="fg"><label className="fl">Data de publicação</label><input className="fi" type="date" value={ls.data||""} onChange={e=>sv({...ls,data:e.target.value})}/></div></div>
              <div className="fr"><div className="fg"><label className="fl">Tipo</label><select className="fs" value={ls.tipo||""} onChange={e=>sv({...ls,tipo:e.target.value})}><option value="">-- selecione --</option>{TIPOS_COM.map(t=><option key={t}>{t}</option>)}</select></div><div className="fg"><label className="fl">Cadência</label><select className="fs" value={ls.cadencia||""} onChange={e=>sv({...ls,cadencia:e.target.value})}><option value="">-- selecione --</option><option>Alta</option><option>Baixa</option></select></div></div>
              <div className="fg"><label className="fl">Anotações</label><textarea className="ft" value={ls.obs||""} onChange={e=>sv({...ls,obs:e.target.value})} placeholder="Notas sobre essa comunidade..."/></div>
            </div>
          )}
          {tab==="recados"&&(
            <div>
              {!ok&&<div className="wb">⚠ <strong>Critérios não atingidos:</strong><ul>{!f1ok&&<li>1º story: Resposta Inbox, Enquete ou Caixinha</li>}{m5<5&&<li>Mínimo 5 mecanismos ({m5} agora)</li>}{c5<5&&<li>Mínimo 5 CTAs ({c5} agora)</li>}{st.length<15&&<li>Mínimo 15 stories ({st.length} agora)</li>}</ul></div>}
              {ok&&<div className="ob">✔ Comunidade no padrão! Hora de publicar! 🚀</div>}
              <div style={{display:"flex",justifyContent:"flex-end",gap:6,marginBottom:7}}>
                <button className="btn bgn" onClick={addR}>+ Novo story</button>
              </div>
              {st.length===0&&<div className="ep"><div className="ei">📱</div><div className="et">Nenhum story ainda</div><div className="es">Clique em "Novo story" ou use o botão 🤖 para gerar com IA!</div></div>}
              {st.map((s,i)=><StoryRow key={s.id} s={s} i={i} tot={st.length} prods={prods} userData={userData} onChange={u=>updR(i,u)} onRem={()=>remR(i)} onDup={()=>dupR(i)} onUp={()=>movR(i,-1)} onDown={()=>movR(i,1)}/>)}
            </div>
          )}
          {tab==="diario"&&(
            <div>
              <div className="hb">📔 Preencha após publicar para registrar e evoluir!</div>
              <table className="ot" style={{marginBottom:10}}><thead><tr><th>Métrica</th><th>Valor</th></tr></thead><tbody><tr><td>Visualizações do 1º story</td><td><input className="fi" type="number" style={{width:90}} value={ls.v1||""} onChange={e=>sv({...ls,v1:e.target.value})} placeholder="0"/></td></tr><tr><td>Visualizações do último story</td><td><input className="fi" type="number" style={{width:90}} value={ls.vl||""} onChange={e=>sv({...ls,vl:e.target.value})} placeholder="0"/></td></tr><tr><td>Soma de respostas</td><td><input className="fi" type="number" style={{width:90}} value={ls.resp||""} onChange={e=>sv({...ls,resp:e.target.value})} placeholder="0"/></td></tr><tr><td><strong>Taxa de retenção</strong></td><td><strong style={{color:"#226600",fontSize:13}}>{ls.v1&&ls.vl?`${((ls.vl/ls.v1)*100).toFixed(1)}%`:"—"}</strong></td></tr></tbody></table>
              <div className="fr"><div className="fg"><label className="fl">O que conectou?</label><textarea className="ft" value={ls.dbom||""} onChange={e=>sv({...ls,dbom:e.target.value})} placeholder="Mecanismos que geraram mais resposta..."/></div><div className="fg"><label className="fl">O que melhorar?</label><textarea className="ft" value={ls.dmel||""} onChange={e=>sv({...ls,dmel:e.target.value})} placeholder="Recados que caíram muito..."/></div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── COMUNIDADES ──────────────────────────────────────────────────────────────
function Comunidades({ seqs, setSeqs, prods, userData }) {
  const [show,setShow]=useState(false);
  const [det,setDet]=useState(null);
  const [aiModal,setAiModal]=useState(false);
  const [form,setForm]=useState({nome:"",tipo:"",cadencia:""});
  const cr=()=>{if(!form.nome.trim())return;const n={id:uid(),...form,status:"Rascunho",stories:[]};setSeqs(x=>[...x,n]);setForm({nome:"",tipo:"",cadencia:""});setShow(false);setDet(n.id);};
  const aplicarIA=result=>{
    const n={id:uid(),nome:result.nome,tipo:form.tipo||TIPOS_COM[0],status:"Rascunho",stories:result.recados.map(r=>({id:uid(),mec:r.mec,cta:r.cta,ideia:r.ideia}))};
    setSeqs(x=>[...x,n]);setAiModal(false);setDet(n.id);
  };
  if(det){const s=seqs.find(x=>x.id===det);if(!s){setDet(null);return null;}return <ComDetail com={s} setSeqs={setSeqs} prods={prods} userData={userData} onBack={()=>setDet(null)}/>;}
  const sbm={Rascunho:"gz",Gravando:"y","No Ar":"g"};
  return (
    <div style={{padding:10}}>
      <div className="box">
        <div className="bh">📱 Minhas Sequências de Stories
          <div style={{display:"flex",gap:5}}>
            <button className="btn bai bsm" onClick={()=>setAiModal(true)}>🤖 Gerar com IA</button>
            <button className="btn bgn bsm" onClick={()=>setShow(true)}>+ nova</button>
          </div>
        </div>
        <div className="bbl">
          {seqs.length===0&&<div className="ep"><div className="ei">📱</div><div className="et">Nenhuma sequência ainda</div><div className="es">Crie manualmente ou use 🤖 para gerar com IA!</div></div>}
          {seqs.length>0&&(<table className="ot"><thead><tr><th>Comunidade</th><th>Tipo</th><th>Recados</th><th>Status</th><th>Data</th><th>Ações</th></tr></thead><tbody>{seqs.map(s=>(<tr key={s.id}><td><span style={{fontWeight:"bold",color:"#2255aa",cursor:"pointer"}} onClick={()=>setDet(s.id)}>{s.nome}</span></td><td style={{color:"#666"}}>{s.tipo||"—"}</td><td style={{textAlign:"center"}}>{(s.stories||[]).length}</td><td><span className={`sbl ${sbm[s.status||"Rascunho"]}`}/>{s.status||"Rascunho"}</td><td style={{color:"#666"}}>{s.data?new Date(s.data).toLocaleDateString("pt-BR"):"—"}</td><td><div style={{display:"flex",gap:3}}><button className="btn bl bsm" onClick={()=>setDet(s.id)}>▶ abrir</button><button className="btn brd bsm" onClick={()=>{if(confirm("Remover?"))setSeqs(x=>x.filter(q=>q.id!==s.id));}}>✕</button></div></td></tr>))}</tbody></table>)}
        </div>
      </div>
      {show&&(<div className="mo" onClick={e=>e.target===e.currentTarget&&setShow(false)}><div className="md"><div className="mh">📱 Nova comunidade <button className="btn bw bsm" onClick={()=>setShow(false)}>✕</button></div><div className="mb"><div className="fg"><label className="fl">Nome *</label><input className="fi" placeholder="Ex: Lançamento de março" value={form.nome} onChange={e=>setForm(f=>({...f,nome:e.target.value}))}/></div><div className="fr"><div className="fg"><label className="fl">Tipo</label><select className="fs" value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}><option value="">-- selecione --</option>{TIPOS_COM.map(t=><option key={t}>{t}</option>)}</select></div><div className="fg"><label className="fl">Cadência</label><select className="fs" value={form.cadencia} onChange={e=>setForm(f=>({...f,cadencia:e.target.value}))}><option value="">-- selecione --</option><option>Alta</option><option>Baixa</option></select></div></div><div style={{display:"flex",gap:5,justifyContent:"flex-end"}}><button className="btn bw" onClick={()=>setShow(false)}>Cancelar</button><button className="btn bo" onClick={cr}>Criar ▶</button></div></div></div></div>)}
      {aiModal&&<AIGerarComunidade userData={userData} onAplicar={aplicarIA} onClose={()=>setAiModal(false)}/>}
    </div>
  );
}

// ─── VITRINE ──────────────────────────────────────────────────────────────────
function Vitrine({ prods, setProds }) {
  const [show,setShow]=useState(false);const [ed,setEd]=useState(null);
  const [form,setForm]=useState({nome:"",desc:"",links:[]});const [nl,setNl]=useState({rotulo:"",url:""});
  const open=p=>{setEd(p?p.id:null);setForm(p?{nome:p.nome,desc:p.desc||"",links:p.links||[]}:{nome:"",desc:"",links:[]});setShow(true);};
  const save=()=>{if(!form.nome.trim())return;if(ed)setProds(x=>x.map(p=>p.id===ed?{...p,...form}:p));else setProds(x=>[...x,{id:uid(),...form}]);setShow(false);};
  const addL=()=>{if(!nl.rotulo.trim()||!nl.url.trim())return;setForm(f=>({...f,links:[...f.links,{id:uid(),...nl}]}));setNl({rotulo:"",url:""});};
  return (
    <div style={{padding:10}}>
      <div className="box">
        <div className="bh rd">🛍️ Meus Produtos &amp; Links <button className="btn bgn bsm" onClick={()=>open(null)}>+ novo produto</button></div>
        <div className="bbl">
          <div className="hb">💡 Cadastre seus produtos uma vez e a IA vai personalizar os roteiros para cada um deles!</div>
          {prods.length===0&&<div className="ep"><div className="ei">🛍️</div><div className="et">Nenhum produto cadastrado</div><div className="es">Adicione produtos para usar nas sequências e personalizar a IA</div></div>}
          {prods.map(p=>(<div key={p.id} className="scrap" style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}><div className="sname">🛍️ {p.nome}</div><div style={{display:"flex",gap:3}}><button className="btn bw bsm" onClick={()=>open(p)}>✏</button><button className="btn brd bsm" onClick={()=>{if(confirm("Remover?"))setProds(x=>x.filter(q=>q.id!==p.id));}}>✕</button></div></div>{p.desc&&<div className="stxt" style={{marginBottom:5}}>{p.desc}</div>}{(p.links||[]).length>0?p.links.map(l=>(<div key={l.id} className="li2"><span>🔗</span><div style={{flex:1}}><strong>{l.rotulo}</strong><div style={{color:"#2255aa",wordBreak:"break-all"}}>{l.url}</div></div></div>)):<div style={{color:"#aaa",fontSize:10}}>Nenhum link</div>}</div>))}
        </div>
      </div>
      {show&&(<div className="mo" onClick={e=>e.target===e.currentTarget&&setShow(false)}><div className="md"><div className="mh">🛍️ {ed?"Editar":"Novo"} produto <button className="btn bw bsm" onClick={()=>setShow(false)}>✕</button></div><div className="mb"><div className="fg"><label className="fl">Nome *</label><input className="fi" placeholder="Ex: Mentoria VIP" value={form.nome} onChange={e=>setForm(f=>({...f,nome:e.target.value}))}/></div><div className="fg"><label className="fl">Descrição</label><input className="fi" placeholder="Breve descrição" value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))}/></div><div className="dvd"/><div style={{fontWeight:"bold",marginBottom:6,fontSize:11}}>🔗 Links</div>{form.links.map(l=>(<div key={l.id} className="li2"><div style={{flex:1}}><strong>{l.rotulo}</strong> — <span style={{color:"#2255aa"}}>{l.url}</span></div><button className="btn brd bsm" onClick={()=>setForm(f=>({...f,links:f.links.filter(x=>x.id!==l.id)}))}>✕</button></div>))}<div className="fr" style={{marginTop:5}}><input className="fi" placeholder="Rótulo" value={nl.rotulo} onChange={e=>setNl(n=>({...n,rotulo:e.target.value}))}/><input className="fi" placeholder="https://..." value={nl.url} onChange={e=>setNl(n=>({...n,url:e.target.value}))}/><button className="btn bl bsm" style={{flexShrink:0}} onClick={addL}>+ link</button></div><div className="dvd"/><div style={{display:"flex",gap:5,justifyContent:"flex-end"}}><button className="btn bw" onClick={()=>setShow(false)}>Cancelar</button><button className="btn bgn" onClick={save}>✔ Salvar</button></div></div></div></div>)}
    </div>
  );
}

// ─── MURAL ────────────────────────────────────────────────────────────────────
function Mural({ ideas, setIdeas, userData }) {
  const [show,setShow]=useState(false);const [aiModal,setAiModal]=useState(false);
  const [form,setForm]=useState({titulo:"",tipo:"",desc:""});const [filtro,setFiltro]=useState("todos");
  const tc={"Categorias":"#cc6600","Situações de identificação":"#6633cc","Urgências ocultas":"#cc2222","Tema livre":"#227722"};
  const save=()=>{if(!form.titulo.trim()||!form.tipo)return;setIdeas(x=>[...x,{id:uid(),...form}]);setForm({titulo:"",tipo:"",desc:""});setShow(false);};
  const fil=filtro==="todos"?ideas:ideas.filter(i=>i.tipo===filtro);
  return (
    <div style={{padding:10}}>
      <div className="box">
        <div className="bh pu">📌 Inspirações
          <div style={{display:"flex",gap:5}}>
            <button className="btn bai bsm" onClick={()=>setAiModal(true)}>🤖 Gerar com IA</button>
            <button className="btn bw bsm" onClick={()=>setShow(true)}>+ manual</button>
          </div>
        </div>
        <div className="bbl">
          <div className="hb">💬 Cada ideia é um scrap no mural. Use 🤖 para gerar inspirações personalizadas para o seu nicho!</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>{["todos",...TIPOS_MURAL].map(t=>(<button key={t} className={`btn bsm ${filtro===t?"bl":"bw"}`} onClick={()=>setFiltro(t)}>{t==="todos"?"📋 Todos":t}</button>))}</div>
          {fil.length===0&&<div className="ep"><div className="ei">📌</div><div className="et">Nenhuma inspiração ainda</div><div className="es">Use 🤖 para gerar ideias com IA ou adicione manualmente!</div></div>}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))",gap:7}}>
            {fil.map(i=>(<div key={i.id} className="scrap" style={{borderLeft:`3px solid ${tc[i.tipo]||"#3366aa"}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span className="badge" style={{background:`${tc[i.tipo]}18`,color:tc[i.tipo],borderColor:`${tc[i.tipo]}66`,fontSize:9}}>{i.tipo}</span><button className="btn brd bsm" onClick={()=>setIdeas(x=>x.filter(j=>j.id!==i.id))}>✕</button></div><div className="sname">{i.titulo}</div>{i.desc&&<div className="stxt">{i.desc}</div>}</div>))}
          </div>
        </div>
      </div>
      {show&&(<div className="mo" onClick={e=>e.target===e.currentTarget&&setShow(false)}><div className="md"><div className="mh">💡 Nova inspiração <button className="btn bw bsm" onClick={()=>setShow(false)}>✕</button></div><div className="mb"><div className="fg"><label className="fl">Título *</label><input className="fi" placeholder="Ex: Minha jornada de iniciante a expert" value={form.titulo} onChange={e=>setForm(f=>({...f,titulo:e.target.value}))}/></div><div className="fg"><label className="fl">Tipo *</label><select className="fs" value={form.tipo} onChange={e=>setForm(f=>({...f,tipo:e.target.value}))}><option value="">-- selecione --</option>{TIPOS_MURAL.map(t=><option key={t}>{t}</option>)}</select></div><div className="fg"><label className="fl">Descrição</label><textarea className="ft" value={form.desc} onChange={e=>setForm(f=>({...f,desc:e.target.value}))} placeholder="Descreva melhor essa ideia..."/></div><div style={{display:"flex",gap:5,justifyContent:"flex-end"}}><button className="btn bw" onClick={()=>setShow(false)}>Cancelar</button><button className="btn bo" onClick={save}>💡 Salvar</button></div></div></div></div>)}
      {aiModal&&<AIIdeiaMural userData={userData} onAplicar={ideia=>{setIdeas(x=>[...x,{id:uid(),...ideia}]);}} onClose={()=>setAiModal(false)}/>}
    </div>
  );
}

// ─── MECANISMOS ───────────────────────────────────────────────────────────────
function MecanismosPage() {
  const [filtro,setFiltro]=useState("todos");const [busca,setBusca]=useState("");const [ab,setAb]=useState(null);
  const fil=MECANISMOS.filter(d=>(filtro==="todos"||d.cat===filtro)&&(!busca||d.nome.toLowerCase().includes(busca.toLowerCase())||d.desc.toLowerCase().includes(busca.toLowerCase())));
  return (
    <div style={{padding:10}}>
      <div className="box">
        <div className="bh pu">⚙ 38 Mecanismos de Conexão</div>
        <div className="bbl">
          <input className="fi" style={{width:210,marginBottom:8}} placeholder="🔍 Buscar mecanismo..." value={busca} onChange={e=>setBusca(e.target.value)}/>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
            <button className={`btn bsm ${filtro==="todos"?"bl":"bw"}`} onClick={()=>setFiltro("todos")}>Todos ({MECANISMOS.length})</button>
            {Object.entries(CATS).map(([k,c])=>(<button key={k} className={`btn bsm ${filtro===k?"bo":"bw"}`} onClick={()=>setFiltro(k)}>{c.emoji} {c.label} ({MECANISMOS.filter(d=>d.cat===k).length})</button>))}
          </div>
          <div className="dg">{fil.map(d=>{const c=CATS[d.cat];return(<div key={d.id} className="di" style={{borderLeftColor:c.color}} onClick={()=>setAb(ab===d.id?null:d.id)}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span className="badge" style={{background:`${c.color}18`,color:c.color,borderColor:`${c.color}66`}}>{c.emoji} {c.label}</span><span style={{fontSize:10,color:"#bbb"}}>#{d.id}</span></div><div className="dn">{d.nome}</div><div className="dd">{d.desc}</div>{ab===d.id&&<div className="de">💬 <strong>Exemplo:</strong> {d.ex}</div>}</div>);})}</div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({ seqs, prods, ideas, setPage, session, setData, userData }) {
  const [nicho,setNicho]=useState(userData.nicho||"");
  const [editNicho,setEditNicho]=useState(false);
  const noAr=seqs.filter(s=>s.status==="No Ar").length;
  const rascunho=seqs.filter(s=>!s.status||s.status==="Rascunho").length;
  const gravando=seqs.filter(s=>s.status==="Gravando").length;
  const totalR=seqs.reduce((a,s)=>a+(s.stories||[]).length,0);
  const rec=[...seqs].reverse().slice(0,5);
  const sbm={Rascunho:"gz",Gravando:"y","No Ar":"g"};
  const diasRest=Math.max(0,Math.ceil((new Date(session.exp)-new Date())/86400000));
  const salvarNicho=()=>{setData(d=>({...d,nicho}));setEditNicho(false);};
  return (
    <div className="lay">
      <aside className="sb">
        <div className="box">
          <div className="bh gr">✅ Seu perfil</div>
          <div className="bb" style={{textAlign:"center"}}>
            <div style={{fontSize:26,margin:"4px 0 6px"}}>👤</div>
            <div style={{fontWeight:"bold",color:"#226622",fontSize:12,marginBottom:2}}><span className="sbl g"/>{session.nome}</div>
            <div style={{color:"#aaa",fontSize:10}}>Acesso até {new Date(session.exp).toLocaleDateString("pt-BR")}</div>
            <div style={{color:diasRest<=7?"#cc2222":"#228822",fontSize:10,fontWeight:"bold",marginTop:2}}>{diasRest}d restantes</div>
          </div>
        </div>
        <div className="box">
          <div className="bh">🔗 Acesso rápido</div>
          {[["📱","Sequências","comunidades"],["🛍️","Produtos","vitrine"],["💡","Inspirações","mural"],["⚙","Mecanismos","mecanismos"]].map(([ic,lb,pg])=>(<div key={pg} className="ci" onClick={()=>setPage(pg)}><span style={{fontSize:14}}>{ic}</span><span className="cin">{lb}</span></div>))}
        </div>
        <div className="box">
          <div className="bh or">📖 Critérios</div>
          <div className="bb" style={{fontSize:11,lineHeight:1.7,color:"#444"}}><div>✔ 1º story: CTA engajamento</div><div>✔ Mínimo 5 mecanismos</div><div>✔ Mínimo 5 CTAs</div><div>✔ Mínimo 15 stories</div></div>
        </div>
      </aside>
      <div className="ct">
        {/* NICHO BANNER — sempre visível no topo */}
        <div className="box" style={{border:"2px solid #cc88ee",marginBottom:8}}>
          <div className="bh ai">🤖 Personalizar IA — informe seu nicho</div>
          <div className="bb">
            {!editNicho ? (
              <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,marginBottom:3,color:"#666"}}>Quanto mais detalhes você der, mais precisa a IA fica nas sugestões:</div>
                  <div style={{background:userData.nicho?"#f5eaff":"#fff8e0",border:userData.nicho?"1px solid #cc88ee":"2px dashed #ffaa00",borderRadius:3,padding:"6px 10px",fontSize:12,color:userData.nicho?"#441166":"#886600",fontWeight:"bold",cursor:"pointer"}} onClick={()=>setEditNicho(true)}>
                    {userData.nicho || "⚠ Clique aqui para informar seu nicho — a IA precisa disso!"}
                  </div>
                </div>
                <button className="btn bai" onClick={()=>setEditNicho(true)}>✏ {userData.nicho?"alterar":"informar nicho"}</button>
              </div>
            ) : (
              <div>
                <div style={{fontSize:11,color:"#444",marginBottom:5}}>Descreva seu nicho, público e o que você vende (quanto mais detalhes, melhor!):</div>
                <textarea className="ft" style={{minHeight:60,marginBottom:6}} placeholder="Ex: Sou coach de emagrecimento feminino, atendo mulheres acima de 35 anos que querem emagrecer sem academia. Vendo mentorias online e um curso gravado de 8 semanas." value={nicho} onChange={e=>setNicho(e.target.value)}/>
                <div style={{display:"flex",gap:5,justifyContent:"flex-end"}}>
                  <button className="btn bw" onClick={()=>setEditNicho(false)}>cancelar</button>
                  <button className="btn bai" onClick={salvarNicho}>✔ salvar nicho</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="box">
          <div className="bh">📊 Painel — Comunidade STV</div>
          <div className="str">
            <div><span className="sv">{seqs.length}</span><span className="sl">Comunidades</span></div>
            <div><span className="sv" style={{color:"#888"}}>{rascunho}</span><span className="sl">Rascunho</span></div>
            <div><span className="sv" style={{color:"#cc8800"}}>{gravando}</span><span className="sl">Gravando</span></div>
            <div><span className="sv" style={{color:"#228822"}}>{noAr}</span><span className="sl">No Ar</span></div>
            <div><span className="sv">{totalR}</span><span className="sl">Stories criados</span></div>
            <div><span className="sv" style={{color:"#660088"}}>{ideas.length}</span><span className="sl">Inspirações</span></div>
          </div>
        </div>
        <div className="box">
          <div className="bh or">📋 Comunidades recentes <button className="btn bw bsm" onClick={()=>setPage("comunidades")}>ver todas »</button></div>
          <div className="bb">
            {rec.length===0&&<div className="ep"><div className="ei">📱</div><div className="et">Nenhuma sequência ainda</div><div className="es">Use 🤖 para gerar sua primeira sequência com IA!</div></div>}
            {rec.map(s=>(<div key={s.id} className="scrap" style={{cursor:"pointer"}} onClick={()=>setPage("comunidades")}><div className="sname"><span className={`sbl ${sbm[s.status||"Rascunho"]}`}/>{s.nome}</div><div className="stxt">{s.tipo||"Sem tipo"} · {(s.stories||[]).length} stories</div><div className="smeta">status: {s.status||"Rascunho"}{s.data?` · publicar em ${new Date(s.data).toLocaleDateString("pt-BR")}`:""}</div></div>))}
          </div>
        </div>
        <div className="box">
          <div className="bh pu">⚙ Comunidades de mecanismos</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(155px,1fr))"}}>
            {Object.entries(CATS).map(([k,c])=>(<div key={k} className="ci" onClick={()=>setPage("mecanismos")}><div className="cii" style={{background:`${c.color}15`,border:`1px solid ${c.color}44`}}>{c.emoji}</div><div><div className="cin" style={{color:c.color}}>{c.label}</div><div className="cis">{MECANISMOS.filter(d=>d.cat===k).length} mecanismos</div></div></div>))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── USER APP ─────────────────────────────────────────────────────────────────
function UserApp({ session, onLogout }) {
  const [page,setPage]=useState("home");
  const [data,setDataRaw]=useState(()=>{const d=getUserData(session.userId);return{seqs:[],prods:[],ideas:[],nicho:"",...d};});
  const setData=fn=>{setDataRaw(prev=>{const next=typeof fn==="function"?fn(prev):fn;saveUserData(session.userId,next);return next;});};
  const setSeqs =fn=>setData(d=>({...d,seqs: typeof fn==="function"?fn(d.seqs):fn}));
  const setProds=fn=>setData(d=>({...d,prods:typeof fn==="function"?fn(d.prods):fn}));
  const setIdeas=fn=>setData(d=>({...d,ideas:typeof fn==="function"?fn(d.ideas):fn}));
  const nav=[["home","🏠","Início"],["comunidades","📱","Comunidades"],["mecanismos","⚙","Mecanismos"],["vitrine","🛍️","Produtos"],["mural","📌","Mural"]];
  const userData={nicho:data.nicho,prods:data.prods,seqs:data.seqs};
  return (
    <>
      <style>{CSS}</style>
      <div>
        <div className="topbar">
          <div className="tbrand"><div><div className="tlogo">Comunidade <em>STV</em></div><div className="ttagline">Stories que Vendem</div></div></div>
          <nav className="tnav">{nav.map(([id,ic,lb])=>(<div key={id} className={`tni ${page===id?"on":""}`} onClick={()=>setPage(id)}><span className="ni">{ic}</span><span>{lb}</span></div>))}</nav>
          <div className="tright"><div className="odot"/><span style={{color:"#ffe566",fontWeight:"bold",fontSize:11}}>{session.nome}</span><button className="btn bw bsm" onClick={onLogout}>sair</button></div>
        </div>
        <div style={{maxWidth:1080,margin:"0 auto"}}>
          {page==="home"        &&<Home        seqs={data.seqs} prods={data.prods} ideas={data.ideas} setPage={setPage} session={session} setData={setData} userData={userData}/>}
          {page==="comunidades" &&<Comunidades seqs={data.seqs} setSeqs={setSeqs} prods={data.prods} userData={userData}/>}
          {page==="mecanismos"  &&<MecanismosPage/>}
          {page==="vitrine"     &&<Vitrine     prods={data.prods} setProds={setProds}/>}
          {page==="mural"       &&<Mural       ideas={data.ideas} setIdeas={setIdeas} userData={userData}/>}
        </div>
        <div className="foot">Comunidade STV © 2024 · Stories que Vendem · Acreditamos no poder da conexão genuína 💛</div>
      </div>
    </>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [session,setSession]=useState(getSession);
  const onLogin =s=>{saveSession(s);setSession(s);};
  const onLogout=()=>{clearSession();setSession(null);};
  if(!session)               return <><style>{CSS}</style><Gate onLogin={onLogin}/></>;
  if(session.role==="admin") return <><style>{CSS}</style><AdminPanel onLogout={onLogout}/></>;
  return <UserApp session={session} onLogout={onLogout}/>;
}