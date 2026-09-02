/**
 * Planilha Custo Queijo (1).pdf — Custo | Onesio | Atacado
 * e custos mapeados aos produtos do catálogo.
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

const PRECOS_PADRAO = {
    0: 30.0,
    1: 30.0,
    2: 30.0,
    3: 43.0,
    4: 30.0,
    5: 30.0,
    6: 38.0,
    7: 40.0,
    8: 30.0,
    9: 27.0,
    10: 30.0,
    11: 42.0,
    12: 42.0,
    13: 16.0,
    14: 33.0,
    15: 27.0,
    16: 26.0,
    17: 30.0,
    18: 30.0,
    19: 20.0,
    20: 20.0,
    21: 23.0,
    22: 30.0,
    23: 30.0,
    24: 33.0,
    25: 38.0,
    26: 37.0,
    28: 33.0,
    29: 33.0,
    30: 34.0,
    31: 48.0,
    32: 22.0,
    33: 19.0,
    34: 39.0,
    35: 19.0,
    36: 28.0,
    37: 39.0,
    38: 35.0,
    39: 50.0,
    40: 35.0,
    41: 52.0,
    42: 37.0,
    43: 37.0,
    44: 95.0,
    45: 36.0,
    46: 37.0,
    47: 24.0,
    48: 37.0,
    49: 37.0,
    50: 37.0,
    51: 37.0,
    52: 36.0,
    53: 26.0,
    54: 32.0,
    55: 26.0,
    56: 23.0,
    57: 26.0,
    58: 31.0,
    59: 37.0,
    60: 27.0,
    61: 26.0,
    62: 62.0,
    63: 15.0,
    64: 20.0,
    66: 15.0,
    67: 23.0,
    69: 17.0,
    70: 20.0,
    71: 20.0,
    72: 17.0,
    73: 19.0,
    74: 20.0,
    75: 16.0,
    76: 16.0,
    77: 46.0,
    78: 16.0,
    79: 16.0,
    80: 16.0,
    81: 16.0,
    82: 16.0,
    83: 38.0,
    84: 38.0,
    85: 26.0,
    86: 30.0,
    87: 15.0,
    88: 22.0,
    89: 30.0,
    90: 25.0,
    91: 25.0,
    92: 30.0,
    93: 26.0,
    94: 26.0,
    95: 20.0,
    96: 28.0
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
const PRECOS_STORAGE_KEY = "marques_precos_v1";

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
    localStorage.setItem(PRECOS_STORAGE_KEY, JSON.stringify(precos));
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

function aplicarPrecosCatalogo(lista) {
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

function resetPrecosCatalogo(lista) {
    localStorage.removeItem(PRECOS_STORAGE_KEY);
    if (Array.isArray(lista)) {
        lista.forEach((p) => {
            const padrao = getPrecoPadrao(p.id, lista);
            p.precoBase = padrao;
            p.preco = padrao;
        });
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

function criarRota({ data, observacao, itens }) {
    const totais = calcCargaTotais(itens);
    const rota = {
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
    const rotas = loadRotas();
    rotas.unshift(rota);
    saveRotas(rotas);
    return rota;
}

function removerRota(id) {
    saveRotas(loadRotas().filter((r) => r.id !== id));
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

function registrarBaixaRota(id, vendasPorChave, levouPorChave = {}) {
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

function getRota(id) {
    return loadRotas().find((r) => r.id === id) || null;
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
