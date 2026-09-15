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
    0: 19.20, 1: 19.20, 2: 19.20, 3: 17.50, 4: 19.20, 5: 19.20,
    6: 25.60, 7: 32.00, 8: 19.20, 9: 23.27, 10: 19.20, 11: 26.40,
    12: 26.40, 13: 5.00, 14: 24.24, 15: 19.95, 16: 26.00,
    17: 11.00, 18: 11.00, 19: 18.01, 20: 11.00, 21: 15.43, 22: 11.00, 23: 11.00,
    24: 23.94, 25: 28.63, 26: 19.57, 28: 23.94, 29: 23.94, 30: 27.50, 31: 26.63,
    32: 30.34, 33: 28.86, 34: 24.70, 35: 28.86, 36: 30.34, 37: 24.70,
    38: 24.90, 39: 37.05, 40: 24.90, 41: 45.88,
    42: 25.50, 43: 19.35, 44: 88.80, 45: 24.70, 46: 0, 47: 10.00,
    48: 0, 49: 0, 50: 0, 51: 0, 52: 37.38, 53: 19.90, 54: 26.00,
    55: 10.00, 56: 10.00, 57: 19.90, 58: 14.80, 59: 0,
    60: 11.77, 61: 19.27, 62: 55.50, 63: 8.79, 64: 15.90,
    66: 8.88, 67: 17.00,
    69: 9.00, 70: 10.00, 71: 10.00, 72: 10.00, 73: 10.00, 74: 10.00,
    75: 12.72, 76: 12.72, 77: 30.50, 78: 11.77, 79: 12.72, 80: 12.09, 81: 12.09, 82: 12.72,
    83: 19.20, 84: 19.20, 85: 22.01, 86: 16.31, 87: 7.77, 88: 9.99,
    89: 16.31, 90: 18.80, 91: 18.80, 92: 22.55, 93: 12.41, 94: 19.50, 95: 13.87, 96: 21.96
};

const CUSTOS_STORAGE_KEY = "marques_custos_v2";
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
 * Preço de VENDA da rota = Onesio da planilha (se Onesio < custo, usa Atacado).
 * Custo = custo da planilha.
 * Catálogo PDF fica pra loja; na viagem o Onesio vende pela planilha.
 */
const CARGA_PLANILHA_PRECO = {
    0: { custo: 19.2, venda: 30 },
    1: { custo: 19.2, venda: 30 },
    2: { custo: 19.2, venda: 30 },
    3: { custo: 17.5, venda: 43 },
    4: { custo: 19.2, venda: 30 },
    5: { custo: 19.2, venda: 30 },
    6: { custo: 25.6, venda: 38 },
    7: { custo: 32.0, venda: 40 },
    8: { custo: 19.2, venda: 30 },
    10: { custo: 19.2, venda: 30 },
    12: { custo: 26.4, venda: 42 },
    13: { custo: 5.0, venda: 16 },
    16: { custo: 16.06, venda: 29 },
    17: { custo: 11.0, venda: 20 },
    19: { custo: 18.01, venda: 20 },
    21: { custo: 15.43, venda: 20 },
    22: { custo: 11.0, venda: 20 },
    24: { custo: 23.94, venda: 33 },
    26: { custo: 19.57, venda: 37 },
    28: { custo: 23.94, venda: 33 },
    31: { custo: 26.63, venda: 48 },
    32: { custo: 30.34, venda: 35 },
    33: { custo: 28.86, venda: 33 },
    34: { custo: 30.34, venda: 35 },
    35: { custo: 28.86, venda: 33 },
    36: { custo: 30.34, venda: 35 },
    37: { custo: 24.7, venda: 39 },
    38: { custo: 24.9, venda: 35 },
    42: { custo: 25.5, venda: 37 },
    43: { custo: 19.35, venda: 37 },
    47: { custo: 10.0, venda: 21 },
    52: { custo: 37.38, venda: 40 },
    53: { custo: 19.9, venda: 26 },
    54: { custo: 26.0, venda: 29.5 },
    55: { custo: 10.0, venda: 21 },
    58: { custo: 14.8, venda: 31 },
    59: { custo: 70.0, venda: 95 }, // Colonial ~ Serjão Onesio planilha
    61: { custo: 19.27, venda: 26 },
    63: { custo: 8.79, venda: 12 },
    64: { custo: 15.9, venda: 20 },
    66: { custo: 8.88, venda: 15 },
    67: { custo: 17.0, venda: 23 },
    69: { custo: 9.0, venda: 17 },
    70: { custo: 10.0, venda: 22 },
    71: { custo: 10.0, venda: 22 },
    73: { custo: 10.0, venda: 22 },
    75: { custo: 12.72, venda: 17 },
    76: { custo: 12.72, venda: 17 },
    77: { custo: 30.5, venda: 46 },
    78: { custo: 12.72, venda: 17 },
    79: { custo: 12.72, venda: 17 },
    81: { custo: 12.09, venda: 16 },
    82: { custo: 12.72, venda: 17 },
    83: { custo: 19.2, venda: 38 },
    85: { custo: 22.01, venda: 26 },
    86: { custo: 16.31, venda: 30 },
    89: { custo: 16.31, venda: 30 },
    91: { custo: 18.8, venda: 22 },
    92: { custo: 22.55, venda: 30 },
    93: { custo: 12.41, venda: 26 },
    94: { custo: 19.5, venda: 26 },
    9001: { custo: 19.2, venda: 30 },
    9002: { custo: 19.2, venda: 30 },
    9003: { custo: 5.0, venda: 16 },
    9004: { custo: 5.0, venda: 16 },
    9005: { custo: 19.2, venda: 30 },
    9006: { custo: 25.6, venda: 38 },
    9007: { custo: 25.6, venda: 38 },
    9008: { custo: 19.2, venda: 30 },
    9009: { custo: 19.2, venda: 30 },
    9010: { custo: 19.2, venda: 30 },
    9011: { custo: 19.2, venda: 30 },
    9012: { custo: 13.2, venda: 21 },
    9013: { custo: 12.75, venda: 18.5 },
    9014: { custo: 32.0, venda: 40 },
    9015: { custo: 11.0, venda: 20 },
    9016: { custo: 20.35, venda: 39 },
    9017: { custo: 18.98, venda: 35 },
    9018: { custo: 16.31, venda: 30 },
    9019: { custo: 16.31, venda: 30 },
    9020: { custo: 16.31, venda: 30 },
    9021: { custo: 16.31, venda: 30 },
    9022: { custo: 10.0, venda: 22 },
    9023: { custo: 18.99, venda: 33 },
    9024: { custo: 18.99, venda: 33 },
    9025: { custo: 18.99, venda: 33 },
    9026: { custo: 12.72, venda: 17 },
    9027: { custo: 16.06, venda: 29 },
    9028: { custo: 24.9, venda: 35 },
    9029: { custo: 28.86, venda: 33 },
    9030: { custo: 10.0, venda: 22 },
    9031: { custo: 22.01, venda: 26 },
    9032: { custo: 8.79, venda: 12 },
    9033: { custo: 8.79, venda: 12 },
    9034: { custo: 22.55, venda: 30 }
};

function resolverPrecoCustoItem(item, lista = typeof produtos !== "undefined" ? produtos : []) {
    const pid = Number(item?.produtoId ?? item?.id);
    const row = CARGA_PLANILHA_PRECO[pid];
    if (row) {
        return {
            preco: Math.round(Number(row.venda) * 100) / 100,
            custo: Math.round(Number(row.custo) * 100) / 100
        };
    }
    const alias = CARGA_PRECO_ALIAS[pid];
    const baseId = alias ? Number(alias.id) : pid;
    const fator = alias && alias.fator != null ? Number(alias.fator) : 1;
    const base = CARGA_PLANILHA_PRECO[baseId];
    if (base) {
        return {
            preco: Math.round(base.venda * fator * 100) / 100,
            custo: Math.round(base.custo * fator * 100) / 100
        };
    }
    let preco = getPrecoPadrao(baseId, lista) * fator;
    let custo = getCusto(baseId, CUSTOS_PADRAO) * fator;
    if (!Number.isFinite(preco) || preco < 0) preco = Number(item?.preco) || 0;
    if (!Number.isFinite(custo) || custo < 0) custo = Number(item?.custo) || 0;
    return {
        preco: Math.round(preco * 100) / 100,
        custo: Math.round(custo * 100) / 100
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
