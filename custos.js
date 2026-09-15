/**
 * Planilha de custos + preços de VENDA do catálogo Marques Mineiro.
 */
const PLANILHA_CUSTOS = [
    { nome: "Canastra Divino", custo: 25.5, atacado: 36.0, onesio: 37 },
    { nome: "Parmesão", custo: 19.35, atacado: 28.0, onesio: 37 },
    { nome: "Parmesão capa preta", custo: 20.35, atacado: 28.0, onesio: 39 },
    { nome: "Palitos", custo: 18.26, atacado: 21.4, onesio: null },
    { nome: "Provolone com salame temperado", custo: 19.2, atacado: 23.6, onesio: 30 },
    { nome: "Provolone com salame", custo: 19.2, atacado: 23.6, onesio: 30 },
    { nome: "Palito Puro", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Palito Temperado", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Provolone Defumado", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Provolone Ervas Finas", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Golda", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Trança Temperada", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Trança Pura", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Trança no alho Defumada", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Minas Padrão", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Reino", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "4 Queijo", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Nozinho puro", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Nozinho temperado defumado", custo: 19.2, atacado: 22.6, onesio: 30 },
    { nome: "Kit Provoleto", custo: 25.6, atacado: 33.0, onesio: 38 },
    { nome: "Frescal Light Puro", custo: 5.0, atacado: 10.0, onesio: 16 },
    { nome: "Frescal Light Temperado", custo: 5.0, atacado: 10.0, onesio: 16 },
    { nome: "Trança de vinho", custo: 24.24, atacado: 28.0, onesio: 33 },
    { nome: "Requeijão de Bufala", custo: 23.94, atacado: 28.0, onesio: 33 },
    { nome: "Mussarela de Bufala", custo: 23.94, atacado: 28.0, onesio: 33 },
    { nome: "Trufado Bufala", custo: 28.63, atacado: 35.0, onesio: 38 },
    { nome: "Queijo Coalho", custo: 19.95, atacado: 25.0, onesio: 27 },
    { nome: "Manteiga 500 gramas", custo: 15.9, atacado: 19.0, onesio: 20 },
    { nome: "Lombo Puro", custo: 12.72, atacado: 17.0, onesio: 17 },
    { nome: "Lombo Biquinha", custo: 12.72, atacado: 17.0, onesio: 17 },
    { nome: "Lombo Calabresa", custo: 12.72, atacado: 17.0, onesio: 17 },
    { nome: "Frango", custo: 12.09, atacado: 17.0, onesio: 16 },
    { nome: "Lombo Alho", custo: 12.72, atacado: 17.0, onesio: 17 },
    { nome: "Trufado Damasco Avela", custo: 30.34, atacado: 35.0, onesio: 20 },
    { nome: "Trufado Tomate seco", custo: 28.86, atacado: 33.0, onesio: 20 },
    { nome: "Trufado Azeitona", custo: 28.86, atacado: 33.0, onesio: 19 },
    { nome: "Trufado Cheddar carne seca", custo: 30.34, atacado: 35.0, onesio: 28 },
    { nome: "Trufado Damasco Avela 1/2", custo: 13.5, atacado: 20.0, onesio: 22 },
    { nome: "Trufado Tomate seco 1/2", custo: 12.9, atacado: 20.0, onesio: 19 },
    { nome: "Trufado Azeitona 1/2", custo: 12.9, atacado: 20.0, onesio: 19 },
    { nome: "Trufado Cheddar carne seca 1/2", custo: 13.5, atacado: 20.0, onesio: 28 },
    { nome: "Trufado Puro no vacuo", custo: 24.7, atacado: 30.0, onesio: 39 },
    { nome: "Queijo Morbier Real", custo: 26.0, atacado: 29.5, onesio: null },
    { nome: "Kit Real", custo: 28.0, atacado: 32.5, onesio: null },
    { nome: "Granapadano", custo: 14.8, atacado: 20.0, onesio: 31 },
    { nome: "Brie, gorgonzola e camembert", custo: 10.0, atacado: 13.0, onesio: 21 },
    { nome: "Geleia trem bão", custo: 10.0, atacado: 13.0, onesio: null },
    { nome: "Kit parmesão", custo: 37.38, atacado: 40.0, onesio: 36 },
    { nome: "Kit provolone c salame", custo: 32.0, atacado: 35.0, onesio: 40 },
    { nome: "Trufado Doces", custo: 24.9, atacado: 28.0, onesio: 35 },
    { nome: "Trufado Nutella", custo: 37.05, atacado: 40.0, onesio: 50 },
    { nome: "Kit Parmesao Vinho", custo: 24.7, atacado: 30.0, onesio: 37 },
    { nome: "Pão de queijo Tradicional", custo: 13.0, atacado: 17.0, onesio: 23 },
    { nome: "Pão de queijo diversos", custo: 15.5, atacado: 19.0, onesio: 28 },
    { nome: "Salame Fatiado", custo: 30.5, atacado: 33.5, onesio: 46 },
    { nome: "Picanha Suina", custo: 19.27, atacado: 23.0, onesio: 26 },
    { nome: "Doce de leite vmilk plastico 700", custo: 12.41, atacado: 17.0, onesio: 26 },
    { nome: "Minas zero Lactose", custo: 19.57, atacado: 28.0, onesio: 37 },
    { nome: "Jamon Puro", custo: 11.77, atacado: 17.0, onesio: null },
    { nome: "Jamon biquinha", custo: 11.77, atacado: 17.0, onesio: null },
    { nome: "Jamon Azeitona", custo: 11.77, atacado: 17.0, onesio: null },
    { nome: "Jamon Alho", custo: 11.77, atacado: 17.0, onesio: null },
    { nome: "Jamon limao peper", custo: 11.77, atacado: 17.0, onesio: null },
    { nome: "Jamon Malagueta", custo: 11.77, atacado: 17.0, onesio: null },
    { nome: "Gruyere", custo: 26.63, atacado: 32.0, onesio: 48 },
    { nome: "Kit Trançinha", custo: 17.5, atacado: 25.0, onesio: 43 },
    { nome: "Mel", custo: 19.96, atacado: 23.0, onesio: 23 },
    { nome: "Goiabada Zelia cascão 800", custo: 22.01, atacado: 20.0, onesio: 26 },
    { nome: "Geleia Uai pimenta Defumada", custo: 8.79, atacado: 13.0, onesio: 12 },
    { nome: "Geleia Mostarda Maracuja Trem Bao", custo: 8.88, atacado: 13.0, onesio: 15 },
    { nome: "Paçoca", custo: 7.77, atacado: 10.0, onesio: 15 },
    { nome: "Bala Banana sem açucar", custo: 9.99, atacado: 13.0, onesio: null },
    { nome: "Rocca Doce de Leite", custo: 18.8, atacado: 18.0, onesio: 22 },
    { nome: "Desidratado goiabada", custo: 18.01, atacado: 21.0, onesio: 20 },
    { nome: "Coalho Desidratado", custo: 15.43, atacado: 18.5, onesio: 20 },
    { nome: "Trufado musa vacuo", custo: 18.99, atacado: 22.5, onesio: 33 },
    { nome: "Requeijão musa", custo: 16.06, atacado: 20.5, onesio: 29 },
    { nome: "Doce leite blue zero", custo: 22.55, atacado: 30.0, onesio: null },
    { nome: "Vinho bordo suave Datta Valle", custo: 12.21, atacado: 18.0, onesio: 22 },
    { nome: "Banana faduni zero", custo: 18.98, atacado: 22.0, onesio: 35 },
    { nome: "Banana faduni", custo: 16.31, atacado: 20.0, onesio: 30 },
    { nome: "Desidratados variados", custo: 11.0, atacado: 16.0, onesio: 20 },
    { nome: "Beliscao e Casadinho", custo: 10.0, atacado: 15.0, onesio: 22 },
    { nome: "Rosquinha Nata", custo: 9.0, atacado: 12.0, onesio: 17 },
    { nome: "Viçosa 800", custo: 19.2, atacado: 23.0, onesio: 38 },
    { nome: "cachaça amarela 670", custo: 14.0, atacado: 19.0, onesio: 30.7 },
    { nome: "Cachaça magnate 750 ml", custo: 49.0, atacado: 55.0, onesio: 57 },
    { nome: "Queijo minas", custo: 26.4, atacado: 31.0, onesio: 42 },
    { nome: "Cabacinha", custo: 23.27, atacado: 30.0, onesio: 27 },
    { nome: "Requeijão em barra", custo: 26.0, atacado: 0.0, onesio: 26 },
    { nome: "Queijo Serjão", custo: 88.8, atacado: 95.0, onesio: 95 },
    { nome: "Burrata", custo: 19.9, atacado: 25.0, onesio: 26 },
    { nome: "Bolinha de búfala", custo: 19.9, atacado: 25.0, onesio: 26 },
    { nome: "Costela", custo: 55.5, atacado: 62.0, onesio: 62 },
    { nome: "Mel bisnaga", custo: 17.0, atacado: 22.0, onesio: 23 },
    { nome: "Palito zero lactose", custo: 27.5, atacado: 30.0, onesio: 34 },
    { nome: "Trufado requeijão carne seca", custo: 45.88, atacado: 54.0, onesio: 52 },
    { nome: "Cocada Prove e Aprove", custo: 21.96, atacado: 24.0, onesio: 28 },
    { nome: "Pingo goiaba", custo: 13.87, atacado: 19.0, onesio: 20 },
    { nome: "Bala Serra negra", custo: 19.5, atacado: 23.0, onesio: 26 },
];

/** Preços de VENDA do PDF CATÁLOGO MARQUÊS MINEIRO. */
const PRECOS_PADRAO = {
    0: 70.0,
    1: 70.0,
    2: 70.0,
    3: 85.0,
    4: 60.0,
    5: 60.0,
    6: 75.0,
    7: 85.0,
    8: 75.0,
    9: 60.0,
    10: 60.0,
    11: 80.0,
    12: 80.0,
    13: 60.0,
    14: 65.0,
    15: 60.0,
    16: 65.0,
    17: 40.0,
    18: 40.0,
    19: 45.0,
    20: 40.0,
    21: 45.0,
    22: 40.0,
    23: 40.0,
    24: 70.0,
    25: 85.0,
    26: 70.0,
    28: 70.0,
    29: 90.0,
    30: 65.0,
    31: 85.0,
    32: 60.0,
    33: 55.0,
    34: 65.0,
    35: 55.0,
    36: 65.0,
    37: 65.0,
    38: 65.0,
    39: 70.0,
    40: 65.0,
    41: 65.0,
    42: 130.0,
    43: 70.0,
    44: 195.0,
    45: 75.0,
    46: 180.0,
    47: 45.0,
    48: 150.0,
    49: 70.0,
    50: 180.0,
    51: 195.0,
    52: 85.0,
    53: 45.0,
    54: 70.0,
    55: 45.0,
    56: 45.0,
    57: 45.0,
    58: 60.0,
    59: 140.0,
    60: 85.0,
    61: 70.0,
    62: 115.0,
    63: 38.0,
    64: 40.0,
    66: 38.0,
    67: 50.0,
    69: 45.0,
    70: 45.0,
    71: 45.0,
    72: 45.0,
    73: 45.0,
    74: 45.0,
    75: 45.0,
    76: 45.0,
    77: 75.0,
    78: 45.0,
    79: 45.0,
    80: 45.0,
    81: 45.0,
    82: 45.0,
    83: 65.0,
    84: 45.0,
    85: 50.0,
    86: 45.0,
    87: 45.0,
    88: 45.0,
    89: 60.0,
    90: 45.0,
    91: 45.0,
    92: 60.0,
    93: 45.0,
    94: 45.0,
    95: 45.0,
    96: 55.0
};

/** Custo por id do produto no catálogo (mapeado da planilha). */
const CUSTOS_PADRAO = {
    0: 27.0, 1: 27.0, 2: 27.0, 3: 43.0, 4: 27.0, 5: 27.0,
    6: 35.0, 7: 40.0, 8: 27.0, 9: 27.0, 10: 27.0, 11: 26.40,
    12: 39.0, 13: 13.0, 14: 33.0, 15: 27.0, 16: 26.0,
    17: 17.0, 18: 11.00, 19: 20.0, 20: 11.00, 21: 15.43, 22: 11.00, 23: 11.00,
    24: 33.0, 25: 38.0, 26: 34.0, 28: 33.0, 29: 23.94, 30: 31.0, 31: 45.0,
    32: 30.34, 33: 28.86, 34: 24.70, 35: 30.0, 36: 30.34, 37: 30.0,
    38: 34.0, 39: 50.0, 40: 24.90, 41: 20.0,
    42: 37.0, 43: 26.0, 44: 92.0, 45: 24.70, 46: 0, 47: 21.0,
    48: 0, 49: 0, 50: 0, 51: 0, 52: 36.0, 53: 23.0, 54: 32.0,
    55: 10.00, 56: 10.00, 57: 23.0, 58: 28.0, 59: 0,
    60: 11.77, 61: 23.0, 62: 59.0, 63: 12.0, 64: 20.0,
    66: 12.0, 67: 20.0,
    69: 20.0, 70: 10.00, 71: 10.00, 72: 10.00, 73: 19.0, 74: 10.00,
    75: 12.72, 76: 12.72, 77: 43.0, 78: 11.77, 79: 12.72, 80: 12.09, 81: 16.0, 82: 16.0,
    83: 35.0, 84: 19.20, 85: 18.0, 86: 18.0, 87: 12.0, 88: 22.0,
    89: 27.0, 90: 22.0, 91: 18.80, 92: 27.0, 93: 23.0, 94: 23.0, 95: 23.0, 96: 25.0
};

const CUSTOS_STORAGE_KEY = "marques_custos_v3";
const VENDAS_STORAGE_KEY = "marques_vendas";
const ADMIN_PIN = "2025";

function loadCustos() {
    try {
        const saved = localStorage.getItem(CUSTOS_STORAGE_KEY);
        if (saved) {
            return { ...CUSTOS_PADRAO, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.error("Erro ao carregar custos:", e);
    }
    return { ...CUSTOS_PADRAO };
}

function saveCustos(custos) {
    localStorage.setItem(CUSTOS_STORAGE_KEY, JSON.stringify(custos));
}

function getCusto(id, custos = loadCustos()) {
    const v = Number(custos[id]);
    return Number.isFinite(v) ? v : 0;
}

/* ——— Preços de venda (editáveis no admin e no site) ——— */
const PRECOS_STORAGE_KEY = "marques_precos_v4";
const ADMIN_API_PIN = typeof ADMIN_PIN !== "undefined" ? ADMIN_PIN : "2025";

function apiPrecosUrl() {
    try {
        return new URL("api/precos.php", window.location.href).href;
    } catch {
        return "api/precos.php";
    }
}

function loadPrecos() {
    try {
        const saved = localStorage.getItem(PRECOS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch (e) {
        console.error("Erro ao carregar preços:", e);
        return {};
    }
}

function savePrecos(precos) {
    localStorage.setItem(PRECOS_STORAGE_KEY, JSON.stringify(precos || {}));
}

function normalizarMapaPrecos(mapa) {
    const out = {};
    if (!mapa || typeof mapa !== "object") return out;
    Object.keys(mapa).forEach((k) => {
        const v = Number(mapa[k]);
        if (Number.isFinite(v)) out[String(k)] = v;
    });
    return out;
}

async function fetchPrecosDoServidor() {
    const res = await fetch(apiPrecosUrl(), { method: "GET", cache: "no-store" });
    const json = await res.json().catch(() => ({ ok: false }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return normalizarMapaPrecos(json.data);
}

async function salvarPrecosNoServidor(precos) {
    const res = await fetch(apiPrecosUrl(), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Admin-Pin": ADMIN_API_PIN
        },
        body: JSON.stringify({ precos: normalizarMapaPrecos(precos) })
    });
    const json = await res.json().catch(() => ({ ok: false, erro: "Resposta inválida da API" }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        err.payload = json;
        throw err;
    }
    return normalizarMapaPrecos(json.data?.precos || json.data || {});
}

async function limparPrecosNoServidor() {
    const res = await fetch(apiPrecosUrl(), {
        method: "DELETE",
        headers: { "X-Admin-Pin": ADMIN_API_PIN }
    });
    const json = await res.json().catch(() => ({ ok: false, erro: "Resposta inválida da API" }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return true;
}

/** Busca preços do banco e aplica no catálogo (com fallback local). */
async function sincronizarPrecosDoServidor(lista = typeof produtos !== "undefined" ? produtos : [], opts = {}) {
    const migrarLocal = !!opts.migrarLocal;
    try {
        let remoto = await fetchPrecosDoServidor();
        if (migrarLocal && Object.keys(remoto).length === 0) {
            const local = normalizarMapaPrecos(loadPrecos());
            if (Object.keys(local).length > 0) {
                remoto = await salvarPrecosNoServidor(local);
            }
        }
        savePrecos(remoto);
        aplicarPrecosCatalogo(lista);
        return { ok: true, precos: remoto };
    } catch (e) {
        aplicarPrecosCatalogo(lista);
        return { ok: false, erro: e.message || "sem conexão", precos: loadPrecos() };
    }
}

function getPrecoPadrao(id, lista = typeof produtos !== "undefined" ? produtos : []) {
    if (PRECOS_PADRAO[id] != null || PRECOS_PADRAO[String(id)] != null) {
        const v = Number(PRECOS_PADRAO[id] ?? PRECOS_PADRAO[String(id)]);
        if (Number.isFinite(v)) return v;
    }
    const p = lista.find((item) => item.id === Number(id));
    return p ? Number(p.preco) || 0 : 0;
}

function getPreco(id, lista = typeof produtos !== "undefined" ? produtos : []) {
    const salvos = loadPrecos();
    const key = String(id);
    if (salvos[key] != null || salvos[id] != null) {
        const v = Number(salvos[key] ?? salvos[id]);
        if (Number.isFinite(v)) return v;
    }
    return getPrecoPadrao(id, lista);
}

/** Alias de SKUs da carga (WhatsApp/planilha) → id do catálogo + fator (ex.: metade = 0.5). */
const CARGA_PRECO_ALIAS = {
    9001: { id: 0 },
    9002: { id: 0 },
    9003: { id: 13 },
    9004: { id: 13 },
    9005: { id: 2 },
    9006: { id: 6 },
    9007: { id: 6 },
    9008: { id: 1 },
    9009: { id: 5 },
    9010: { id: 5 },
    9011: { id: 5 },
    9012: { id: 12, fator: 0.5 },
    9013: { id: 42, fator: 0.5 },
    9014: { id: 7 },
    9015: { id: 17 },
    9016: { id: 43 },
    9017: { id: 89 },
    9018: { id: 86 },
    9019: { id: 86 },
    9020: { id: 86 },
    9021: { id: 86 },
    9022: { id: 70 },
    9023: { id: 37 },
    9024: { id: 37 },
    9025: { id: 37 },
    9026: { id: 78 },
    9027: { id: 16 },
    9028: { id: 38 },
    9029: { id: 35 },
    9030: { id: 73 },
    9031: { id: 85 },
    9032: { id: 63 },
    9033: { id: 63 },
    9034: { id: 92 }
};

/**
 * Mapa produto → linha da planilha.
 * Venda da viagem = coluna Onesio (amarelo). Nunca usa varejo do catálogo.
 * Se Onesio estiver vazio, usa Atacado só como fallback da planilha.
 */
const PRODUTO_PARA_PLANILHA = {
    0: "Palito Puro",
    1: "Trança Temperada",
    2: "Nozinho temperado defumado",
    3: "Kit Trançinha",
    4: "Reino",
    5: "Provolone Defumado",
    6: "Kit Provoleto",
    7: "Kit provolone c salame",
    8: "4 Queijo",
    9: "Cabacinha",
    10: "Minas Padrão",
    12: "Queijo minas",
    13: "Frescal Light Puro",
    14: "Trança de vinho",
    15: "Queijo Coalho",
    16: "Requeijão musa",
    17: "Desidratados variados",
    19: "Desidratado goiabada",
    21: "Coalho Desidratado",
    22: "Desidratados variados",
    24: "Requeijão de Bufala",
    26: "Minas zero Lactose",
    28: "Mussarela de Bufala",
    30: "Palito zero lactose",
    31: "Gruyere",
    32: "Trufado Damasco Avela",
    33: "Trufado Tomate seco",
    34: "Trufado Cheddar carne seca",
    35: "Trufado Azeitona",
    36: "Trufado Cheddar carne seca",
    37: "Trufado Puro no vacuo",
    38: "Trufado Doces",
    39: "Trufado Nutella",
    42: "Canastra Divino",
    43: "Parmesão",
    44: "Queijo Serjão",
    47: "Brie, gorgonzola e camembert",
    52: "Kit parmesão",
    53: "Burrata",
    54: "Queijo Morbier Real",
    55: "Brie, gorgonzola e camembert",
    56: "Brie, gorgonzola e camembert",
    57: "Bolinha de búfala",
    58: "Granapadano",
    59: "Queijo Serjão",
    61: "Picanha Suina",
    62: "Costela",
    63: "Geleia Uai pimenta Defumada",
    64: "Manteiga 500 gramas",
    66: "Geleia Mostarda Maracuja Trem Bao",
    67: "Mel bisnaga",
    69: "Rosquinha Nata",
    70: "Beliscao e Casadinho",
    71: "Beliscao e Casadinho",
    73: "Beliscao e Casadinho",
    75: "Lombo Biquinha",
    76: "Lombo Alho",
    77: "Salame Fatiado",
    78: "Lombo Puro",
    79: "Lombo Calabresa",
    81: "Frango",
    82: "Lombo Puro",
    83: "Viçosa 800",
    85: "Goiabada Zelia cascão 800",
    86: "Banana faduni",
    89: "Banana faduni",
    91: "Rocca Doce de Leite",
    92: "Doce leite blue zero",
    93: "Doce de leite vmilk plastico 700",
    94: "Bala Serra negra",
    95: "Pingo goiaba",
    96: "Cocada Prove e Aprove",
    9001: "Palito Puro",
    9002: "Palito Temperado",
    9003: "Frescal Light Temperado",
    9004: "Frescal Light Puro",
    9005: "Nozinho temperado defumado",
    9006: "Kit Provoleto",
    9007: "Kit Provoleto",
    9008: "Trança no alho Defumada",
    9009: "Provolone Defumado",
    9010: "Provolone Ervas Finas",
    9011: "Golda",
    9012: { nome: "Queijo minas", fator: 0.5 },
    9013: { nome: "Canastra Divino", fator: 0.5 },
    9014: "Kit provolone c salame",
    9015: "Desidratados variados",
    9016: "Parmesão capa preta",
    9017: "Banana faduni zero",
    9018: "Banana faduni",
    9019: "Banana faduni",
    9020: "Banana faduni",
    9021: "Banana faduni",
    9022: "Beliscao e Casadinho",
    9023: "Trufado musa vacuo",
    9024: "Trufado musa vacuo",
    9025: "Trufado musa vacuo",
    9026: "Lombo Puro",
    9027: "Requeijão musa",
    9028: "Trufado Doces",
    9029: "Trufado Azeitona",
    9030: "Beliscao e Casadinho",
    9031: "Goiabada Zelia cascão 800",
    9032: "Geleia Uai pimenta Defumada",
    9033: "Geleia Uai pimenta Defumada",
    9034: "Doce leite blue zero"
};

function acharLinhaPlanilha(nome) {
    if (!nome) return null;
    const key = String(nome).trim().toLowerCase();
    return PLANILHA_CUSTOS.find((r) => r.nome.toLowerCase() === key) || null;
}

/** Coluna amarela Onesio; se vazia, Atacado da planilha. Nunca varejo. */
function precoOnesioDaLinha(row) {
    if (!row) return 0;
    if (row.onesio != null && Number.isFinite(Number(row.onesio))) return Number(row.onesio);
    if (row.atacado != null && Number.isFinite(Number(row.atacado)) && Number(row.atacado) > 0) {
        return Number(row.atacado);
    }
    return 0;
}

function resolverPrecoCustoItem(item) {
    const pid = Number(item?.produtoId ?? item?.id);
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
    if (row) {
        return {
            preco: Math.round(precoOnesioDaLinha(row) * fator * 100) / 100,
            custo: Math.round(Number(row.custo || 0) * fator * 100) / 100
        };
    }

    // Sem linha na planilha: não cai no varejo do catálogo
    return {
        preco: Math.round((Number(item?.preco) || 0) * 100) / 100,
        custo: Math.round((Number(item?.custo) || 0) * 100) / 100
    };
}

function aplicarPrecosPlanilhaNosItens(itens, lista = typeof produtos !== "undefined" ? produtos : []) {
    return (itens || []).map((item) => {
        const { preco, custo } = resolverPrecoCustoItem(item, lista);
        return { ...item, preco, custo };
    });
}

function aplicarPrecosCatalogo(lista) {
    try {
        localStorage.removeItem("marques_precos_v1");
        localStorage.removeItem("marques_precos_v2");
        localStorage.removeItem("marques_precos_v3");
    } catch (e) {}
    const salvos = loadPrecos();
    lista.forEach((p) => {
        const padrao = getPrecoPadrao(p.id, lista);
        if (p.precoBase == null) p.precoBase = padrao;
        const override = salvos[p.id] ?? salvos[String(p.id)];
        if (override != null && Number.isFinite(Number(override))) {
            p.preco = Number(override);
        } else {
            p.preco = padrao;
        }
    });
    return lista;
}

async function resetPrecosCatalogo(lista) {
    localStorage.removeItem(PRECOS_STORAGE_KEY);
    try {
        await limparPrecosNoServidor();
    } catch (e) {
        console.warn("Não limpou preços no servidor:", e.message || e);
    }
    if (Array.isArray(lista)) {
        lista.forEach((p) => {
            const padrao = getPrecoPadrao(p.id, lista);
            p.precoBase = padrao;
            p.preco = padrao;
        });
    }
}

/* ——— Produtos cadastrados no admin ——— */
function apiProdutosUrl() {
    try {
        return new URL("api/produtos.php", window.location.href).href;
    } catch {
        return "api/produtos.php";
    }
}

function apiUploadImagemUrl() {
    try {
        return new URL("api/upload_imagem.php", window.location.href).href;
    } catch {
        return "api/upload_imagem.php";
    }
}

function normalizarProdutoCustom(p) {
    return {
        id: Number(p.id),
        categoria: String(p.categoria || "Diversos"),
        nome: String(p.nome || ""),
        detalhes: String(p.detalhes || ""),
        preco: Number(p.preco) || 0,
        custo: Number(p.custo) || 0,
        imagem: String(p.imagem || "assets/imagens/tradicionais/foto1.png"),
        custom: true,
        precoBase: Number(p.preco) || 0
    };
}

async function fetchProdutosCustom(todos = false) {
    const url = apiProdutosUrl() + (todos ? "?todos=1" : "");
    const headers = {};
    if (todos) headers["X-Admin-Pin"] = ADMIN_API_PIN;
    const res = await fetch(url, { method: "GET", cache: "no-store", headers });
    const json = await res.json().catch(() => ({ ok: false }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return Array.isArray(json.data) ? json.data.map(normalizarProdutoCustom) : [];
}

async function criarProdutoCustom(payload) {
    const res = await fetch(apiProdutosUrl(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Admin-Pin": ADMIN_API_PIN
        },
        body: JSON.stringify(payload)
    });
    const json = await res.json().catch(() => ({ ok: false, erro: "Resposta inválida" }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return normalizarProdutoCustom(json.data);
}

async function removerProdutoCustom(id) {
    const res = await fetch(apiProdutosUrl() + `?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "X-Admin-Pin": ADMIN_API_PIN }
    });
    const json = await res.json().catch(() => ({ ok: false, erro: "Resposta inválida" }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return json.data;
}

async function uploadImagemProduto(file) {
    const fd = new FormData();
    fd.append("imagem", file);
    const res = await fetch(apiUploadImagemUrl(), {
        method: "POST",
        headers: { "X-Admin-Pin": ADMIN_API_PIN },
        body: fd
    });
    const json = await res.json().catch(() => ({ ok: false, erro: "Resposta inválida" }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return json.data.imagem || json.data.url;
}

/** Remove extras antigos e injeta os do servidor na lista global `produtos`. */
function mesclarProdutosCustomNaLista(listaCustom, listaBase) {
    const base = Array.isArray(listaBase) ? listaBase : [];
    const extras = (listaCustom || []).map(normalizarProdutoCustom);
    const mesclados = base.filter((p) => !p.custom && Number(p.id) < 1000).concat(extras);

    if (typeof produtos !== "undefined" && Array.isArray(produtos)) {
        produtos.length = 0;
        mesclados.forEach((p) => produtos.push(p));
    }

    // Custos dos extras
    try {
        const custos = loadCustos();
        let mudou = false;
        extras.forEach((p) => {
            if (p.custo != null && Number.isFinite(Number(p.custo))) {
                custos[p.id] = Number(p.custo);
                mudou = true;
            }
        });
        if (mudou) saveCustos(custos);
    } catch (e) {}

    if (typeof aplicarPrecosCatalogo === "function") {
        aplicarPrecosCatalogo(typeof produtos !== "undefined" ? produtos : mesclados);
    }
    return typeof produtos !== "undefined" ? produtos : mesclados;
}

async function sincronizarProdutosCustom(listaBase) {
    try {
        const remoto = await fetchProdutosCustom(false);
        const lista = mesclarProdutosCustomNaLista(remoto, listaBase);
        return { ok: true, produtos: remoto, lista };
    } catch (e) {
        return { ok: false, erro: e.message || "sem conexão", produtos: [], lista: listaBase };
    }
}

function loadVendas() {
    try {
        const saved = localStorage.getItem(VENDAS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Erro ao carregar vendas:", e);
        return [];
    }
}

function saveVendas(vendas) {
    localStorage.setItem(VENDAS_STORAGE_KEY, JSON.stringify(vendas));
}

function registrarVenda(itens) {
    const custos = loadCustos();
    const linhas = itens.map(({ id, name, price, qty }) => {
        const custo = getCusto(id, custos);
        return {
            id,
            nome: name,
            qtd: qty,
            preco: price,
            custo,
            lucro: (price - custo) * qty,
            receita: price * qty
        };
    });

    const venda = {
        id: Date.now(),
        data: new Date().toISOString(),
        itens: linhas,
        receita: linhas.reduce((s, i) => s + i.receita, 0),
        custo: linhas.reduce((s, i) => s + i.custo * i.qtd, 0),
        lucro: linhas.reduce((s, i) => s + i.lucro, 0)
    };

    const vendas = loadVendas();
    vendas.unshift(venda);
    saveVendas(vendas);
    return venda;
}

/* ——— Rotas / cidades / a prazo ——— */
const CIDADES_STORAGE_KEY = "marques_cidades";
const ROTAS_STORAGE_KEY = "marques_rotas";
const APRAZO_STORAGE_KEY = "marques_aprazo";
const CIDADES_PADRAO = ["Rio Verde", "Rio de Janeiro", "Goiânia", "Três Lagoas"];

function apiRotasUrl() {
    try {
        return new URL("api/rotas.php", window.location.href).href;
    } catch {
        return "api/rotas.php";
    }
}

async function apiRotas(method, body = null, query = "") {
    const opts = {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-Admin-Pin": ADMIN_API_PIN
        }
    };
    if (body != null) opts.body = JSON.stringify(body);
    const res = await fetch(apiRotasUrl() + query, opts);
    const json = await res.json().catch(() => ({ ok: false, erro: "Resposta inválida da API" }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        err.payload = json;
        throw err;
    }
    return json.data;
}

function loadCidades() {
    try {
        const saved = localStorage.getItem(CIDADES_STORAGE_KEY);
        if (saved) {
            const arr = JSON.parse(saved);
            if (Array.isArray(arr) && arr.length === 4) {
                const isPlaceholder = arr.every((c, i) => c === `Cidade ${i + 1}`);
                if (!isPlaceholder) return arr;
            }
        }
    } catch (e) {
        console.error("Erro ao carregar cidades:", e);
    }
    return [...CIDADES_PADRAO];
}

function saveCidades(cidades) {
    localStorage.setItem(CIDADES_STORAGE_KEY, JSON.stringify(cidades));
}

function loadRotas() {
    try {
        const saved = localStorage.getItem(ROTAS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Erro ao carregar rotas:", e);
        return [];
    }
}

function saveRotas(rotas) {
    localStorage.setItem(ROTAS_STORAGE_KEY, JSON.stringify(rotas));
}

/** Busca viagens no servidor e atualiza o cache local. */
async function syncRotasDoServidor() {
    const remoto = await apiRotas("GET");
    const lista = Array.isArray(remoto) ? remoto : [];
    saveRotas(lista);
    return lista;
}

/**
 * Se o servidor estiver vazio e o celular tiver viagens locais,
 * envia as locais para o banco (migração única).
 */
async function migrarRotasLocaisSePreciso(remoto) {
    const locais = loadRotas();
    if ((remoto && remoto.length) || !locais.length) return remoto || [];

    const enviadas = [];
    for (const r of locais) {
        try {
            const criada = await apiRotas("POST", {
                data: r.data,
                observacao: r.observacao || "",
                itens: r.itens || []
            });
            if (r.status === "baixada") {
                const atualizada = await apiRotas("PUT", {
                    id: criada.id,
                    status: "baixada",
                    baixadaEm: r.baixadaEm || r.data,
                    observacao: r.observacao || "",
                    itens: (r.itens || []).map((i) => ({
                        ...i,
                        qtdVendida: i.qtdVendida || 0
                    }))
                });
                enviadas.push(atualizada);
            } else {
                enviadas.push(criada);
            }
        } catch (e) {
            console.warn("Falha ao migrar rota local:", e);
        }
    }
    if (enviadas.length) saveRotas(enviadas);
    return enviadas;
}

async function inicializarRotasServidor() {
    try {
        let remoto = await syncRotasDoServidor();
        if (!remoto.length) {
            remoto = await migrarRotasLocaisSePreciso(remoto);
            if (remoto.length) remoto = await syncRotasDoServidor();
        }
        return { ok: true, total: remoto.length };
    } catch (e) {
        console.warn("API de rotas indisponível, usando só este aparelho:", e);
        return { ok: false, erro: e.message || String(e), total: loadRotas().length };
    }
}

function calcCargaTotais(itens) {
    const totalPecas = itens.reduce((s, i) => s + (Number(i.qtd) || 0), 0);
    const totalCusto = itens.reduce((s, i) => s + (Number(i.custo) || 0) * (Number(i.qtd) || 0), 0);
    const totalReceita = itens.reduce((s, i) => s + (Number(i.preco) || 0) * (Number(i.qtd) || 0), 0);
    return {
        totalPecas,
        totalCusto,
        totalReceita,
        lucroEstimado: totalReceita - totalCusto
    };
}

function montarRotaLocal({ data, observacao, itens }) {
    const totais = calcCargaTotais(itens);
    return {
        id: Date.now(),
        data: data || new Date().toISOString().slice(0, 10),
        observacao: observacao || "",
        status: "aberta",
        itens: itens.map((i) => ({
            cidade: i.cidade,
            produtoId: i.produtoId,
            nome: i.nome,
            qtd: Number(i.qtd) || 0,
            qtdVendida: 0,
            preco: Number(i.preco) || 0,
            custo: Number(i.custo) || 0
        })),
        ...totais,
        pecasVendidas: 0,
        receitaReal: 0,
        custoVendido: 0,
        lucroReal: 0,
        baixadaEm: null
    };
}

async function criarRota({ data, observacao, itens }) {
    const payload = {
        data: data || new Date().toISOString().slice(0, 10),
        observacao: observacao || "",
        itens: itens.map((i) => ({
            cidade: i.cidade,
            produtoId: i.produtoId,
            nome: i.nome,
            qtd: Number(i.qtd) || 0,
            qtdVendida: 0,
            preco: Number(i.preco) || 0,
            custo: Number(i.custo) || 0
        }))
    };

    try {
        const rota = await apiRotas("POST", payload);
        const rotas = loadRotas().filter((r) => r.id !== rota.id);
        rotas.unshift(rota);
        saveRotas(rotas);
        return { rota, salvaNoSite: true };
    } catch (e) {
        console.warn("Não salvou no site, ficou só neste aparelho:", e);
        const rota = montarRotaLocal(payload);
        const rotas = loadRotas();
        rotas.unshift(rota);
        saveRotas(rotas);
        return { rota, salvaNoSite: false, erro: e.message };
    }
}

async function removerRota(id) {
    saveRotas(loadRotas().filter((r) => r.id !== id));
    try {
        await apiRotas("DELETE", null, `?id=${encodeURIComponent(id)}`);
        return { ok: true, salvaNoSite: true };
    } catch (e) {
        console.warn("Excluiu local, mas falhou no site:", e);
        return { ok: true, salvaNoSite: false, erro: e.message };
    }
}

function calcBaixaTotais(itens) {
    const pecasVendidas = itens.reduce((s, i) => s + (Number(i.qtdVendida) || 0), 0);
    const receitaReal = itens.reduce((s, i) => s + (Number(i.preco) || 0) * (Number(i.qtdVendida) || 0), 0);
    const custoVendido = itens.reduce((s, i) => s + (Number(i.custo) || 0) * (Number(i.qtdVendida) || 0), 0);
    return {
        pecasVendidas,
        receitaReal,
        custoVendido,
        lucroReal: receitaReal - custoVendido
    };
}

function aplicarBaixaLocal(id, vendasPorChave, levouPorChave = {}) {
    const rotas = loadRotas().map((rota) => {
        if (rota.id !== id) return rota;
        const itens = rota.itens.map((item) => {
            const key = `${item.cidade}|${item.produtoId}`;
            let qtd = Number(levouPorChave[key]);
            if (!Number.isFinite(qtd) || qtd < 0) qtd = item.qtd;
            let qtdVendida = Number(vendasPorChave[key]);
            if (!Number.isFinite(qtdVendida) || qtdVendida < 0) qtdVendida = 0;
            if (qtdVendida > qtd) qtdVendida = qtd;
            return { ...item, qtd, qtdVendida };
        });
        const totaisCarga = calcCargaTotais(itens);
        return {
            ...rota,
            itens,
            status: "baixada",
            baixadaEm: new Date().toISOString().slice(0, 10),
            totalPecas: totaisCarga.totalPecas,
            totalCusto: totaisCarga.totalCusto,
            totalReceita: totaisCarga.totalReceita,
            lucroEstimado: totaisCarga.lucroEstimado,
            ...calcBaixaTotais(itens)
        };
    });
    saveRotas(rotas);
    return rotas.find((r) => r.id === id);
}

async function registrarBaixaRota(id, vendasPorChave, levouPorChave = {}) {
    const local = aplicarBaixaLocal(id, vendasPorChave, levouPorChave);
    if (!local) return { rota: null, salvaNoSite: false };

    try {
        const rota = await apiRotas("PUT", {
            id,
            status: "baixada",
            baixadaEm: local.baixadaEm,
            observacao: local.observacao || "",
            itens: local.itens
        });
        const rotas = loadRotas().map((r) => (r.id === id ? rota : r));
        saveRotas(rotas);
        return { rota, salvaNoSite: true };
    } catch (e) {
        console.warn("Baixa ficou só neste aparelho:", e);
        return { rota: local, salvaNoSite: false, erro: e.message };
    }
}

function getRota(id) {
    return loadRotas().find((r) => r.id === id || String(r.id) === String(id)) || null;
}

function dataISO(valor) {
    if (!valor) return "";
    return String(valor).slice(0, 10);
}

function resumoFinanceiroDia(dia) {
    const diaISO = dataISO(dia) || new Date().toISOString().slice(0, 10);
    const rotas = loadRotas();
    const vendas = loadVendas();

    const pendentes = rotas.filter((r) => dataISO(r.data) === diaISO && r.status !== "baixada");
    const baixadas = rotas.filter(
        (r) => r.status === "baixada" && dataISO(r.baixadaEm || r.data) === diaISO
    );
    const vendasDia = vendas.filter((v) => dataISO(v.data) === diaISO);

    const faturadoRotas = baixadas.reduce((s, r) => s + (Number(r.receitaReal) || 0), 0);
    const lucroRotas = baixadas.reduce((s, r) => s + (Number(r.lucroReal) || 0), 0);
    const pecasRotas = baixadas.reduce((s, r) => s + (Number(r.pecasVendidas) || 0), 0);

    const faturadoSite = vendasDia.reduce((s, v) => s + (Number(v.receita) || 0), 0);
    const lucroSite = vendasDia.reduce((s, v) => s + (Number(v.lucro) || 0), 0);

    return {
        dia: diaISO,
        pendentes,
        baixadas,
        vendasDia,
        faturado: faturadoRotas + faturadoSite,
        lucro: lucroRotas + lucroSite,
        pecas: pecasRotas,
        faturadoRotas,
        lucroRotas,
        faturadoSite,
        lucroSite
    };
}

function totalRotasSemBaixa() {
    return loadRotas().filter((r) => r.status !== "baixada").length;
}

function loadAprazo() {
    try {
        const saved = localStorage.getItem(APRAZO_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Erro ao carregar a prazo:", e);
        return [];
    }
}

function saveAprazo(lista) {
    localStorage.setItem(APRAZO_STORAGE_KEY, JSON.stringify(lista));
}

function criarAprazo({ cliente, cidade, valor, data, vencimento, rotaId, observacao }) {
    const item = {
        id: Date.now(),
        cliente: (cliente || "").trim(),
        cidade: cidade || "",
        valor: Number(valor) || 0,
        data: data || new Date().toISOString().slice(0, 10),
        vencimento: vencimento || "",
        rotaId: rotaId || null,
        observacao: observacao || "",
        status: "pendente",
        pagoEm: null
    };
    const lista = loadAprazo();
    lista.unshift(item);
    saveAprazo(lista);
    return item;
}

function marcarAprazoPago(id) {
    const lista = loadAprazo().map((item) =>
        item.id === id
            ? { ...item, status: "pago", pagoEm: new Date().toISOString().slice(0, 10) }
            : item
    );
    saveAprazo(lista);
}

function removerAprazo(id) {
    saveAprazo(loadAprazo().filter((i) => i.id !== id));
}

function totalAprazoPendente() {
    return loadAprazo()
        .filter((i) => i.status === "pendente")
        .reduce((s, i) => s + (Number(i.valor) || 0), 0);
}

/* ——— Despesas / Contas ——— */
const DESPESAS_STORAGE_KEY = "marques_despesas_v1";
const DESPESAS_CATEGORIAS = ["Hospedagem", "Alimentação", "Uber", "Combustível", "Outros"];

function apiDespesasUrl() {
    try {
        return new URL("api/despesas.php", window.location.href).href;
    } catch {
        return "api/despesas.php";
    }
}

function loadDespesas() {
    try {
        const saved = localStorage.getItem(DESPESAS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error("Erro ao carregar despesas:", e);
        return [];
    }
}

function saveDespesas(lista) {
    localStorage.setItem(DESPESAS_STORAGE_KEY, JSON.stringify(lista || []));
}

async function apiDespesas(method, body = null, query = "") {
    const opts = {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-Admin-Pin": ADMIN_API_PIN
        }
    };
    if (body != null) opts.body = JSON.stringify(body);
    const res = await fetch(apiDespesasUrl() + query, opts);
    const json = await res.json().catch(() => ({ ok: false, erro: "Resposta inválida da API" }));
    if (!res.ok || !json.ok) {
        const err = new Error(json.erro || `Erro HTTP ${res.status}`);
        err.status = res.status;
        throw err;
    }
    return json.data;
}

async function syncDespesasDoServidor() {
    try {
        const remoto = await apiDespesas("GET");
        const lista = Array.isArray(remoto) ? remoto : [];
        saveDespesas(lista);
        return { ok: true, lista };
    } catch (e) {
        return { ok: false, erro: e.message || "sem conexão", lista: loadDespesas() };
    }
}

async function criarDespesa({ categoria, descricao, valor, data }) {
    const payload = {
        categoria: (categoria || "").trim() || "Outros",
        descricao: (descricao || "").trim(),
        valor: Number(valor) || 0,
        data: data || new Date().toISOString().slice(0, 10)
    };
    try {
        const criada = await apiDespesas("POST", payload);
        const lista = loadDespesas();
        lista.unshift(criada);
        saveDespesas(lista);
        return { ok: true, item: criada, salvaNoSite: true };
    } catch (e) {
        const item = {
            id: Date.now(),
            ...payload,
            localOnly: true
        };
        const lista = loadDespesas();
        lista.unshift(item);
        saveDespesas(lista);
        return { ok: true, item, salvaNoSite: false, erro: e.message || "offline" };
    }
}

async function removerDespesa(id) {
    try {
        await apiDespesas("DELETE", null, `?id=${encodeURIComponent(id)}`);
    } catch (e) {
        // continua e remove local
    }
    saveDespesas(loadDespesas().filter((i) => Number(i.id) !== Number(id)));
}

function totalDespesas(filtroData = null) {
    return loadDespesas()
        .filter((i) => !filtroData || i.data === filtroData)
        .reduce((s, i) => s + (Number(i.valor) || 0), 0);
}

function totalDespesasPorCategoria(filtroData = null) {
    const mapa = {};
    loadDespesas()
        .filter((i) => !filtroData || i.data === filtroData)
        .forEach((i) => {
            const k = i.categoria || "Outros";
            mapa[k] = (mapa[k] || 0) + (Number(i.valor) || 0);
        });
    return mapa;
}
