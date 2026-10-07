/**
 * Atualiza preços via API.
 * Uso: set ADMIN_PIN=seu_pin && node tools/update_salaminho_precos.js
 * O PIN NÃO fica no código — use variável de ambiente.
 */
const pin = process.env.ADMIN_PIN || "";
if (!pin) {
  console.error("Defina ADMIN_PIN no ambiente antes de rodar.");
  process.exit(1);
}

const precos = { 75: 48, 76: 48, 77: 48, 78: 48, 79: 48, 80: 48, 81: 48, 82: 48 };

fetch("https://marquesmineiro.com.br/api/precos.php")
  .then((r) => r.json())
  .then(async (j) => {
    const mapa = { ...(j.data || {}) };
    Object.entries(precos).forEach(([k, v]) => {
      mapa[String(k)] = v;
    });
    const res = await fetch("https://marquesmineiro.com.br/api/precos.php", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Admin-Pin": pin,
      },
      body: JSON.stringify({ precos: mapa }),
    });
    const out = await res.json();
    console.log("ok", out.ok, "salvos", out.data && out.data.salvos);
    for (const id of Object.keys(precos)) {
      console.log(id, out.data.precos[id]);
    }
  });
