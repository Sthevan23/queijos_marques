/**
 * Planilha Custo Queijo (1).pdf — abas resumidas Custo | Atacado
 * e custos mapeados aos produtos do catálogo.
 */
const PLANILHA_CUSTOS = [
    { nome: "Canastra Divino", custo: 25.50, atacado: 36.00 },
    { nome: "Parmesão", custo: 19.35, atacado: 28.00 },
    { nome: "Parmesão capa preta", custo: 20.35, atacado: 28.00 },
    { nome: "Palitos", custo: 18.26, atacado: 21.40 },
    { nome: "Provolone com salame temperado", custo: 19.20, atacado: 23.60 },
    { nome: "Provolone com salame", custo: 19.20, atacado: 23.60 },
    { nome: "Palito Puro", custo: 19.20, atacado: 22.60 },
    { nome: "Palito Temperado", custo: 19.20, atacado: 22.60 },
    { nome: "Provolone Defumado", custo: 19.20, atacado: 22.60 },
    { nome: "Provolone Ervas Finas", custo: 19.20, atacado: 22.60 },
    { nome: "Golda", custo: 19.20, atacado: 22.60 },
    { nome: "Trança Temperada", custo: 19.20, atacado: 22.60 },
    { nome: "Trança Pura", custo: 19.20, atacado: 22.60 },
    { nome: "Trança no alho Defumada", custo: 19.20, atacado: 22.60 },
    { nome: "Minas Padrão", custo: 19.20, atacado: 22.60 },
    { nome: "Reino", custo: 19.20, atacado: 22.60 },
    { nome: "4 Queijo", custo: 19.20, atacado: 22.60 },
    { nome: "Nozinho puro", custo: 19.20, atacado: 22.60 },
    { nome: "Nozinho temperado defumado", custo: 19.20, atacado: 22.60 },
    { nome: "Kit Provoleto", custo: 25.60, atacado: 33.00 },
    { nome: "Frescal Light Puro", custo: 5.00, atacado: 10.00 },
    { nome: "Frescal Light Temperado", custo: 5.00, atacado: 10.00 },
    { nome: "Trança de vinho", custo: 24.24, atacado: 28.00 },
    { nome: "Requeijão de Bufala", custo: 23.94, atacado: 28.00 },
    { nome: "Mussarela de Bufala", custo: 23.94, atacado: 28.00 },
    { nome: "Trufado Bufala", custo: 28.63, atacado: 35.00 },
    { nome: "Queijo Coalho", custo: 19.95, atacado: 25.00 },
    { nome: "Manteiga 500 gramas", custo: 15.90, atacado: 19.00 },
    { nome: "Lombo Puro", custo: 12.72, atacado: 17.00 },
    { nome: "Lombo Biquinha", custo: 12.72, atacado: 17.00 },
    { nome: "Lombo Calabresa", custo: 12.72, atacado: 17.00 },
    { nome: "Frango", custo: 12.09, atacado: 17.00 },
    { nome: "Lombo Alho", custo: 12.72, atacado: 17.00 },
    { nome: "Trufado Damasco Avela", custo: 30.34, atacado: 35.00 },
    { nome: "Trufado Tomate seco", custo: 28.86, atacado: 33.00 },
    { nome: "Trufado Azeitona", custo: 28.86, atacado: 33.00 },
    { nome: "Trufado Cheddar carne seca", custo: 30.34, atacado: 35.00 },
    { nome: "Trufado Damasco Avela 1/2", custo: 13.50, atacado: 20.00 },
    { nome: "Trufado Tomate seco 1/2", custo: 12.90, atacado: 20.00 },
    { nome: "Trufado Azeitona 1/2", custo: 12.90, atacado: 20.00 },
    { nome: "Trufado Cheddar carne seca 1/2", custo: 13.50, atacado: 20.00 },
    { nome: "Trufado Puro no vacuo", custo: 24.70, atacado: 30.00 },
    { nome: "Queijo Morbier Real", custo: 26.00, atacado: 29.50 },
    { nome: "Kit Real", custo: 28.00, atacado: 32.50 },
    { nome: "Granapadano", custo: 14.80, atacado: 20.00 },
    { nome: "Brie, gorgonzola e camembert", custo: 10.00, atacado: 13.00 },
    { nome: "Geleia trem bão", custo: 10.00, atacado: 13.00 },
    { nome: "Kit parmesão", custo: 37.38, atacado: 40.00 },
    { nome: "Kit provolone c salame", custo: 32.00, atacado: 35.00 },
    { nome: "Trufado Doces", custo: 24.90, atacado: 28.00 },
    { nome: "Trufado Nutella", custo: 37.05, atacado: 40.00 },
    { nome: "Kit Parmesao Vinho", custo: 24.70, atacado: 30.00 },
    { nome: "Pão de queijo Tradicional", custo: 13.00, atacado: 17.00 },
    { nome: "Pão de queijo diversos", custo: 15.50, atacado: 19.00 },
    { nome: "Salame Fatiado", custo: 30.50, atacado: 33.50 },
    { nome: "Picanha Suina", custo: 19.27, atacado: 23.00 },
    { nome: "Doce de leite vmilk plastico 700", custo: 12.41, atacado: 17.00 },
    { nome: "Minas zero Lactose", custo: 19.57, atacado: 28.00 },
    { nome: "Jamon Puro", custo: 11.77, atacado: 17.00 },
    { nome: "Jamon biquinha", custo: 11.77, atacado: 17.00 },
    { nome: "Jamon Azeitona", custo: 11.77, atacado: 17.00 },
    { nome: "Jamon Alho", custo: 11.77, atacado: 17.00 },
    { nome: "Jamon limao peper", custo: 11.77, atacado: 17.00 },
    { nome: "Jamon Malagueta", custo: 11.77, atacado: 17.00 },
    { nome: "Gruyere", custo: 26.63, atacado: 32.00 },
    { nome: "Kit Trançinha", custo: 17.50, atacado: 25.00 },
    { nome: "Mel", custo: 19.96, atacado: 23.00 },
    { nome: "Goiabada Zelia cascão 800", custo: 22.01, atacado: 20.00 },
    { nome: "Geleia Uai pimenta Defumada", custo: 8.79, atacado: 13.00 },
    { nome: "Geleia Mostarda Maracuja Trem Bao", custo: 8.88, atacado: 13.00 },
    { nome: "Paçoca", custo: 7.77, atacado: 10.00 },
    { nome: "Bala Banana sem açucar", custo: 9.99, atacado: 13.00 },
    { nome: "Rocca Doce de Leite", custo: 18.80, atacado: 18.00 },
    { nome: "Desidratado goiabada", custo: 18.01, atacado: 21.00 },
    { nome: "Coalho Desidratado", custo: 15.43, atacado: 18.50 },
    { nome: "Trufado musa vacuo", custo: 18.99, atacado: 22.50 },
    { nome: "Requeijão musa", custo: 16.06, atacado: 20.50 },
    { nome: "Doce leite blue zero", custo: 22.55, atacado: 30.00 },
    { nome: "Vinho bordo suave Datta Valle", custo: 12.21, atacado: 18.00 },
    { nome: "Banana faduni zero", custo: 18.98, atacado: 22.00 },
    { nome: "Banana faduni", custo: 16.31, atacado: 20.00 },
    { nome: "Desidratados variados", custo: 11.00, atacado: 16.00 },
    { nome: "Beliscao e Casadinho", custo: 10.00, atacado: 15.00 },
    { nome: "Rosquinha Nata", custo: 9.00, atacado: 12.00 },
    { nome: "Viçosa 800", custo: 19.20, atacado: 23.00 },
    { nome: "cachaça amarela 670", custo: 14.00, atacado: 19.00 },
    { nome: "Cachaça magnate 750 ml", custo: 49.00, atacado: 55.00 },
    { nome: "Queijo minas", custo: 26.40, atacado: 31.00 },
    { nome: "Cabacinha", custo: 23.27, atacado: 30.00 },
    { nome: "Requeijão em barra", custo: 26.00, atacado: 0 },
    { nome: "Queijo Serjão", custo: 88.80, atacado: 95.00 },
    { nome: "Burrata", custo: 19.90, atacado: 25.00 },
    { nome: "Bolinha de búfala", custo: 19.90, atacado: 25.00 },
    { nome: "Costela", custo: 55.50, atacado: 62.00 },
    { nome: "Mel bisnaga", custo: 17.00, atacado: 22.00 },
    { nome: "Palito zero lactose", custo: 27.50, atacado: 30.00 },
    { nome: "Trufado requeijão carne seca", custo: 45.88, atacado: 54.00 },
    { nome: "Cocada Prove e Aprove", custo: 21.96, atacado: 24.00 },
    { nome: "Pingo goiaba", custo: 13.87, atacado: 19.00 },
    { nome: "Bala Serra negra", custo: 19.50, atacado: 23.00 }
];

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

function getPreco(id, lista = typeof produtos !== "undefined" ? produtos : []) {
    const salvos = loadPrecos();
    const key = String(id);
    if (salvos[key] != null || salvos[id] != null) {
        const v = Number(salvos[key] ?? salvos[id]);
        if (Number.isFinite(v)) return v;
    }
    const p = lista.find((item) => item.id === Number(id));
    if (p && p.precoBase != null) return Number(p.precoBase);
    return p ? Number(p.preco) || 0 : 0;
}

function aplicarPrecosCatalogo(lista) {
    const salvos = loadPrecos();
    lista.forEach((p) => {
        if (p.precoBase == null) p.precoBase = Number(p.preco) || 0;
        const override = salvos[p.id] ?? salvos[String(p.id)];
        if (override != null && Number.isFinite(Number(override))) {
            p.preco = Number(override);
        } else {
            p.preco = p.precoBase;
        }
    });
    return lista;
}

function resetPrecosCatalogo(lista) {
    localStorage.removeItem(PRECOS_STORAGE_KEY);
    if (Array.isArray(lista)) {
        lista.forEach((p) => {
            if (p.precoBase != null) p.preco = p.precoBase;
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

function registrarBaixaRota(id, vendasPorChave) {
    const rotas = loadRotas().map((rota) => {
        if (rota.id !== id) return rota;
        const itens = rota.itens.map((item) => {
            const key = `${item.cidade}|${item.produtoId}`;
            let qtdVendida = Number(vendasPorChave[key]);
            if (!Number.isFinite(qtdVendida) || qtdVendida < 0) qtdVendida = 0;
            if (qtdVendida > item.qtd) qtdVendida = item.qtd;
            return { ...item, qtdVendida };
        });
        return {
            ...rota,
            itens,
            status: "baixada",
            baixadaEm: new Date().toISOString().slice(0, 10),
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
