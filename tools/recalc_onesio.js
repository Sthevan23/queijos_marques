/**
 * Recalcula rota id=1 com venda = Onesio (amarelo) da PLANILHA_CUSTOS.
 */
const fs = require("fs");
const path = require("path");
const src = fs.readFileSync(path.join(__dirname, "..", "custos.js"), "utf8");

function extrair(nome) {
    const re = new RegExp(`(?:const|let|var)\\s+${nome}\\s*=\\s*`);
    const m = re.exec(src);
    if (!m) throw new Error("não achou " + nome);
    let i = m.index + m[0].length;
    const start = src[i];
    const open = start === "{" ? "{" : "[";
    const close = start === "{" ? "}" : "]";
    if (src[i] !== open) throw new Error("formato inválido " + nome);
    let depth = 0;
    for (; i < src.length; i++) {
        const c = src[i];
        if (c === open) depth++;
        else if (c === close) {
            depth--;
            if (depth === 0) {
                return Function("return (" + src.slice(m.index + m[0].length, i + 1) + ")")();
            }
        }
    }
    throw new Error("fim não achado " + nome);
}

const PLANILHA_CUSTOS = extrair("PLANILHA_CUSTOS");
const PRODUTO_PARA_PLANILHA = extrair("PRODUTO_PARA_PLANILHA");
const CARGA_PRECO_ALIAS = extrair("CARGA_PRECO_ALIAS");

function acharLinhaPlanilha(nome) {
    const key = String(nome).trim().toLowerCase();
    return PLANILHA_CUSTOS.find((r) => r.nome.toLowerCase() === key) || null;
}

function precoOnesioDaLinha(row) {
    if (!row) return 0;
    if (row.onesio != null && Number.isFinite(Number(row.onesio))) return Number(row.onesio);
    if (row.atacado != null && Number.isFinite(Number(row.atacado)) && Number(row.atacado) > 0) {
        return Number(row.atacado);
    }
    return 0;
}

function resolver(item) {
    const pid = Number(item.produtoId);
    let map = PRODUTO_PARA_PLANILHA[pid];
    let fator = 1;
    if (!map) {
        const alias = CARGA_PRECO_ALIAS[pid];
        if (alias) {
            map = PRODUTO_PARA_PLANILHA[Number(alias.id)];
            fator = alias.fator != null ? Number(alias.fator) : 1;
        }
    }
    if (map && typeof map === "object" && map.nome) {
        fator = map.fator != null ? Number(map.fator) : fator;
        map = map.nome;
    }
    const row = typeof map === "string" ? acharLinhaPlanilha(map) : null;
    if (!row) return { preco: Number(item.preco) || 0, custo: Number(item.custo) || 0, miss: true };
    return {
        preco: Math.round(precoOnesioDaLinha(row) * fator * 100) / 100,
        custo: Math.round(Number(row.custo || 0) * fator * 100) / 100,
        miss: false,
        onesio: row.onesio,
        linha: row.nome
    };
}

const ADMIN_PIN = process.env.ADMIN_PIN || "";
if (!ADMIN_PIN) {
    console.error("Defina ADMIN_PIN no ambiente antes de rodar.");
    process.exit(1);
}

fetch("https://marquesmineiro.com.br/api/rotas.php", { headers: { "X-Admin-Pin": ADMIN_PIN } })
    .then((r) => r.json())
    .then(async (j) => {
        const rota = j.data.find((x) => x.id === 1);
        const missing = [];
        const amostra = [];
        const itens = rota.itens.map((item) => {
            const r = resolver(item);
            if (r.miss) missing.push(item.nome + " id=" + item.produtoId);
            if ([32, 35, 52, 59, 9029].includes(Number(item.produtoId))) {
                amostra.push({
                    nome: item.nome,
                    id: item.produtoId,
                    preco: r.preco,
                    custo: r.custo,
                    onesio: r.onesio,
                    linha: r.linha
                });
            }
            return {
                cidade: item.cidade || "Rio de Janeiro",
                produtoId: Number(item.produtoId),
                nome: item.nome,
                qtd: Number(item.qtd) || 0,
                qtdVendida: Number(item.qtdVendida) || 0,
                preco: r.preco,
                custo: r.custo
            };
        });
        const receita = itens.reduce((s, i) => s + i.preco * i.qtdVendida, 0);
        const custoV = itens.reduce((s, i) => s + i.custo * i.qtdVendida, 0);
        console.log("ONESIO AMARELO");
        console.log("receita", receita.toFixed(2), "custo", custoV.toFixed(2), "LUCRO", (receita - custoV).toFixed(2));
        console.log("amostra (corrigidos vs atacado):", JSON.stringify(amostra, null, 2));
        if (missing.length) console.log("SEM MAPA:", missing.join(", "));

        const body = {
            id: 1,
            status: "baixada",
            baixadaEm: rota.baixadaEm || "2026-09-15",
            observacao: rota.observacao || "",
            itens
        };
        const res = await fetch("https://marquesmineiro.com.br/api/rotas.php", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "X-Admin-Pin": ADMIN_PIN },
            body: JSON.stringify(body)
        });
        const out = await res.json();
        console.log("OK", out.ok, "receita", out.data.receitaReal, "custo", out.data.custoVendido, "lucro", out.data.lucroReal);
    });
