const formatBRLAdmin = (v) =>
    Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const formatPct = (v) =>
    `${Number.isFinite(v) ? v.toFixed(1) : "0.0"}%`;

const formatDataBR = (iso) => {
    if (!iso) return "—";
    const [y, m, d] = String(iso).slice(0, 10).split("-");
    if (!y || !m || !d) return iso;
    return `${d}/${m}/${y}`;
};

let custosAtuais = loadCustos();
let precosAtuais = loadPrecos();
let cargaDraft = [];
let cidadeAtiva = "";
let rotaBaixaId = null;

function isAutenticado() {
    return sessionStorage.getItem("marques_admin") === "1";
}

function autenticar() {
    sessionStorage.setItem("marques_admin", "1");
}

function sair() {
    sessionStorage.removeItem("marques_admin");
    location.reload();
}

function hojeISO() {
    return new Date().toISOString().slice(0, 10);
}

function getQtdCarga(cidade, produtoId) {
    const item = cargaDraft.find((i) => i.cidade === cidade && i.produtoId === produtoId);
    return item ? item.qtd : 0;
}

function setQtdCarga(cidade, produtoId, qtd) {
    const produto = produtos.find((p) => p.id === produtoId);
    if (!produto || !cidade) return;

    const valor = Math.max(0, Math.floor(Number(qtd) || 0));
    const idx = cargaDraft.findIndex((i) => i.cidade === cidade && i.produtoId === produtoId);

    if (valor === 0) {
        if (idx >= 0) cargaDraft.splice(idx, 1);
        return;
    }

    const custo = getCusto(produto.id, custosAtuais);
    if (idx >= 0) {
        cargaDraft[idx].qtd = valor;
        cargaDraft[idx].preco = produto.preco;
        cargaDraft[idx].custo = custo;
        cargaDraft[idx].nome = produto.nome;
    } else {
        cargaDraft.push({
            cidade,
            produtoId: produto.id,
            nome: produto.nome,
            qtd: valor,
            preco: produto.preco,
            custo
        });
    }
}

async function mostrarApp() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("admin-app").classList.remove("hidden");
    document.body.classList.remove("login-page");

    document.getElementById("rota-data").value = hojeISO();
    document.getElementById("aprazo-data").value = hojeISO();
    document.getElementById("financeiro-data").value = hojeISO();
    const despesaData = document.getElementById("despesa-data");
    const despesaFiltro = document.getElementById("despesa-filtro-data");
    if (despesaData) despesaData.value = hojeISO();
    if (despesaFiltro) despesaFiltro.value = hojeISO();

    setSyncStatus("Carregando…");
    const syncProdutos = await sincronizarProdutosCustom(
        typeof PRODUTOS_BASE !== "undefined" ? PRODUTOS_BASE : produtos.filter((p) => !p.custom)
    );
    const sync = await inicializarRotasServidor();
    const syncPrecos = await sincronizarPrecosDoServidor(produtos, { migrarLocal: true });
    await syncDespesasDoServidor();
    precosAtuais = loadPrecos();
    custosAtuais = loadCustos();
    if (sync.ok && syncPrecos.ok && syncProdutos.ok) {
        setSyncStatus(`No site · ${sync.total} viagens`);
    } else if (sync.ok) {
        setSyncStatus("Parcial · checar sync");
    } else {
        setSyncStatus(`Só neste aparelho`);
    }

    renderStats();
    fillCategorias();
    renderCidadesUI();
    fillCidadeSelects();
    renderListaProdutosCarga();
    renderTotaisCarga();
    renderFinanceiro();
    renderRotas();
    renderAprazo();
    renderDespesas();
    renderProdutos();
    renderProdutosCustomLista();
    renderPlanilha();
    renderVendas();
    renderHistorico();
    updateEasyBaixaHint();
    showTab("financeiro");
}

function setSyncStatus(texto) {
    const el = document.getElementById("sync-status");
    if (el) el.textContent = texto;
}

function fillCategorias() {
    const select = document.getElementById("filtro-categoria");
    const novoCat = document.getElementById("novo-prod-categoria");
    const cats = [...new Set(produtos.map((p) => p.categoria))].sort();

    if (select && select.options.length <= 1) {
        cats.forEach((c) => {
            const opt = document.createElement("option");
            opt.value = c;
            opt.textContent = c;
            select.appendChild(opt);
        });
    }

    if (novoCat) {
        const atual = novoCat.value;
        novoCat.innerHTML = "";
        cats.forEach((c) => {
            const opt = document.createElement("option");
            opt.value = c;
            opt.textContent = c;
            novoCat.appendChild(opt);
        });
        const outra = document.createElement("option");
        outra.value = "__nova__";
        outra.textContent = "Outra categoria…";
        novoCat.appendChild(outra);
        if ([...novoCat.options].some((o) => o.value === atual)) novoCat.value = atual;
    }
}

function renderProdutosCustomLista() {
    const box = document.getElementById("produtos-custom-lista");
    if (!box) return;
    const extras = produtos.filter((p) => p.custom || Number(p.id) >= 1000);
    if (!extras.length) {
        box.innerHTML = `<p class="toolbar-note" style="margin:0">Nenhum produto novo ainda. Cadastre acima para aparecer na loja.</p>`;
        return;
    }
    box.innerHTML = `
        <h3 class="panel-title" style="font-size:1rem;margin:0 0 0.5rem">Produtos que você adicionou</h3>
                ${extras
            .map(
                (p) => `
            <article class="venda-card">
                <header>
                    <div>
                        <strong>${p.nome}</strong>
                        <p>${p.categoria} · ${p.detalhes || "—"}</p>
                    </div>
                    <strong>${formatBRLAdmin(p.preco)}</strong>
                </header>
                <div class="card-actions">
                    <button type="button" class="btn-ghost danger" data-remover-produto="${p.id}">Remover do site</button>
                </div>
            </article>`
            )
            .join("")}
    `;
    box.querySelectorAll("[data-remover-produto]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = Number(btn.dataset.removerProduto);
            if (!confirm("Remover este produto da loja?")) return;
            try {
                await removerProdutoCustom(id);
                await sincronizarProdutosCustom(
                    typeof PRODUTOS_BASE !== "undefined" ? PRODUTOS_BASE : produtos.filter((p) => !p.custom)
                );
                precosAtuais = loadPrecos();
                custosAtuais = loadCustos();
                fillCategorias();
                renderProdutosCustomLista();
                renderProdutos();
                renderListaProdutosCarga();
                alert("Produto removido da loja.");
            } catch (e) {
                alert("Não removeu: " + (e.message || e));
            }
        });
    });
}

function fillCidadeSelects() {
    const cidades = loadCidades();
    if (!cidadeAtiva || !cidades.includes(cidadeAtiva)) cidadeAtiva = cidades[0] || "";

    const selectCarga = document.getElementById("carga-cidade");
    selectCarga.innerHTML = cidades.map((c) => `<option value="${c}">${c}</option>`).join("");
    selectCarga.value = cidadeAtiva;

    const selectAprazo = document.getElementById("aprazo-cidade");
    selectAprazo.innerHTML = cidades.map((c) => `<option value="${c}">${c}</option>`).join("");

    renderCidadeChips();
}

function renderCidadeChips() {
    const box = document.getElementById("cidade-chips");
    const cidades = loadCidades();
    box.innerHTML = cidades
        .map(
            (c) => `
            <button type="button" class="cidade-chip ${c === cidadeAtiva ? "active" : ""}" data-cidade="${c}">
                ${c}
                <small>${pecasNaCidade(c)} peças</small>
            </button>`
        )
        .join("");

    box.querySelectorAll("[data-cidade]").forEach((btn) => {
        btn.addEventListener("click", () => {
            cidadeAtiva = btn.dataset.cidade;
            document.getElementById("carga-cidade").value = cidadeAtiva;
            renderCidadeChips();
            renderListaProdutosCarga();
        });
    });
}

function pecasNaCidade(cidade) {
    return cargaDraft.filter((i) => i.cidade === cidade).reduce((s, i) => s + i.qtd, 0);
}

function renderCidadesUI() {
    const grid = document.getElementById("cidades-grid");
    const cidades = loadCidades();
    grid.innerHTML = cidades
        .map(
            (c, i) => `
            <label>
                Cidade ${i + 1}
                <input type="text" data-cidade-idx="${i}" value="${c}" placeholder="Nome da cidade">
            </label>`
        )
        .join("");
}

function renderStats() {
    const hoje = hojeISO();
    const resumo = resumoFinanceiroDia(hoje);

    document.getElementById("stat-faturado-hoje").textContent = formatBRLAdmin(resumo.faturado);
    document.getElementById("stat-lucro-hoje").textContent = formatBRLAdmin(resumo.lucro);
    document.getElementById("stat-aprazo").textContent = formatBRLAdmin(totalAprazoPendente());
    document.getElementById("stat-sem-baixa").textContent = String(totalRotasSemBaixa());
    updateEasyBaixaHint();
}

function getFinanceiroDia() {
    return document.getElementById("financeiro-data")?.value || hojeISO();
}

function renderFinanceiro() {
    const dataInput = document.getElementById("financeiro-data");
    if (dataInput && !dataInput.value) dataInput.value = hojeISO();

    const dia = getFinanceiroDia();
    const resumo = resumoFinanceiroDia(dia);

    document.getElementById("fin-faturado").textContent = formatBRLAdmin(resumo.faturado);
    document.getElementById("fin-lucro").textContent = formatBRLAdmin(resumo.lucro);
    document.getElementById("fin-pecas").textContent = String(resumo.pecas);
    document.getElementById("fin-pendentes").textContent = String(resumo.pendentes.length);

    const boxPend = document.getElementById("financeiro-pendentes");
    // Também mostra cargas de outros dias ainda abertas, pra não esquecer à noite
    const outrasAbertas = loadRotas().filter(
        (r) => r.status !== "baixada" && dataISO(r.data) !== dia
    );
    const pendentes = [...resumo.pendentes, ...outrasAbertas];

    if (!pendentes.length) {
        boxPend.innerHTML = `<div class="empty-state">Tudo em dia.<br>Quando voltar da rota, aparece aqui pra dar baixa.</div>`;
    } else {
        boxPend.innerHTML = pendentes
            .map((r) => {
                const deHoje = dataISO(r.data) === dia;
                const totais = totaisRotaExibicao(r);
                return `
                    <article class="venda-card fin-baixa-card">
                        <header>
                            <div>
                                <strong>Viagem ${formatDataBR(r.data)}${deHoje ? "" : " (outro dia)"}</strong>
                                <p>${r.observacao || "Sem observação"} · ${totais.totalPecas || 0} peças</p>
                                <p class="carga-valores">
                                    Valor carga <strong>${formatBRLAdmin(totais.totalReceita)}</strong>
                                    · Custo <strong>${formatBRLAdmin(totais.totalCusto)}</strong>
                                </p>
                            </div>
                        </header>
                        <div class="card-actions">
                        <button type="button" class="btn-admin btn-grande" data-baixa-rota="${r.id}">
                            Dar baixa agora
                        </button>
                            <button type="button" class="btn-ghost" data-ver-rota="${r.id}">Ver rota</button>
                        </div>
                    </article>
                `;
            })
            .join("");
    }

    const boxOk = document.getElementById("financeiro-baixadas");
    const temBaixadas = resumo.baixadas.length || resumo.vendasDia.length;

    if (!temBaixadas) {
        boxOk.innerHTML = `<div class="empty-state">Ainda não tem faturamento neste dia.<br>Dê baixa nas cargas acima pra aparecer aqui.</div>`;
    } else {
        const rotasHtml = resumo.baixadas
            .map(
                (r) => `
                <article class="venda-card baixada">
                    <header>
                        <div>
                            <strong>Rota ${formatDataBR(r.data)}</strong>
                            <p>Baixada em ${formatDataBR(r.baixadaEm)} · ${r.pecasVendidas || 0} peças vendidas</p>
                        </div>
                        <div class="venda-totais">
                            <span>Faturou ${formatBRLAdmin(r.receitaReal)}</span>
                            <strong class="positivo">Lucro ${formatBRLAdmin(r.lucroReal)}</strong>
                        </div>
                    </header>
                    <div class="card-actions">
                        <button type="button" class="btn-ghost" data-ver-rota="${r.id}">Ver rota</button>
                        <button type="button" class="btn-ghost" data-baixa-rota="${r.id}">Corrigir</button>
                    </div>
                </article>`
            )
            .join("");

        const siteHtml = resumo.vendasDia
            .map(
                (v) => `
                <article class="venda-card">
                    <header>
                        <div>
                            <strong>Venda site #${String(v.id).slice(-6)}</strong>
                            <p>${new Date(v.data).toLocaleString("pt-BR")}</p>
                        </div>
                        <div class="venda-totais">
                            <span>Faturou ${formatBRLAdmin(v.receita)}</span>
                            <strong class="positivo">Lucro ${formatBRLAdmin(v.lucro)}</strong>
                        </div>
                    </header>
                </article>`
            )
            .join("");

        boxOk.innerHTML = rotasHtml + siteHtml;
    }

    boxPend.querySelectorAll("[data-baixa-rota]").forEach((btn) => {
        btn.addEventListener("click", () => abrirBaixa(Number(btn.dataset.baixaRota)));
    });
    boxPend.querySelectorAll("[data-ver-rota]").forEach((btn) => {
        btn.addEventListener("click", () => verRota(Number(btn.dataset.verRota)));
    });
    boxOk.querySelectorAll("[data-baixa-rota]").forEach((btn) => {
        btn.addEventListener("click", () => abrirBaixa(Number(btn.dataset.baixaRota)));
    });
    boxOk.querySelectorAll("[data-ver-rota]").forEach((btn) => {
        btn.addEventListener("click", () => verRota(Number(btn.dataset.verRota)));
    });
}

function syncPrecoNoCatalogo(id, preco) {
    const produto = produtos.find((p) => p.id === Number(id));
    if (!produto) return;
    if (produto.precoBase == null) produto.precoBase = Number(produto.preco) || 0;
    produto.preco = Number(preco) || 0;
}

function renderProdutos() {
    const tbody = document.getElementById("produtos-tbody");
    const busca = document.getElementById("busca-produto").value.trim().toLowerCase();
    const cat = document.getElementById("filtro-categoria").value;

    const lista = produtos
        .filter((p) => !cat || p.categoria === cat)
        .filter((p) => !busca || p.nome.toLowerCase().includes(busca) || p.categoria.toLowerCase().includes(busca))
        .slice()
        .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    tbody.innerHTML = lista
        .map((p) => {
            const custo = getCusto(p.id, custosAtuais);
            const preco = Number(precosAtuais[p.id] ?? p.preco);
            return `
                <tr data-id="${p.id}">
                    <td>
                        <div class="prod-nome">${p.nome}</div>
                        <div class="prod-detalhe">${p.categoria}</div>
                    </td>
                    <td>
                        <label class="custo-input">
                            R$
                            <input type="number" min="0" step="0.01" value="${custo.toFixed(2)}" data-custo-id="${p.id}">
                        </label>
                    </td>
                    <td>
                        <label class="custo-input preco-input">
                            R$
                            <input type="number" min="0" step="0.01" value="${preco.toFixed(2)}" data-preco-id="${p.id}">
                        </label>
                    </td>
                </tr>
            `;
        })
        .join("");

    tbody.querySelectorAll("input[data-custo-id]").forEach((input) => {
        input.addEventListener("change", () => {
            custosAtuais[Number(input.dataset.custoId)] = Number(input.value) || 0;
            renderProdutos();
        });
    });

    tbody.querySelectorAll("input[data-preco-id]").forEach((input) => {
        input.addEventListener("change", () => {
            const id = Number(input.dataset.precoId);
            const valor = Number(input.value) || 0;
            precosAtuais[id] = valor;
            syncPrecoNoCatalogo(id, valor);
            renderProdutos();
            renderListaProdutosCarga();
            renderTotaisCarga();
        });
    });
}

function renderPlanilha() {
    const tbody = document.getElementById("planilha-tbody");
    if (!tbody || typeof PLANILHA_CUSTOS === "undefined") return;

    const busca = (document.getElementById("busca-planilha")?.value || "").trim().toLowerCase();
    const lista = PLANILHA_CUSTOS.filter((row) => !busca || row.nome.toLowerCase().includes(busca));

    tbody.innerHTML = lista
        .map((row, i) => {
            const ref = row.onesio != null ? row.onesio : row.atacado;
            const diff = (ref || 0) - (row.custo || 0);
            const diffClass = diff >= 0 ? "positivo" : "negativo";
            return `
                <tr>
                    <td>${i + 1}</td>
                    <td><div class="prod-nome">${row.nome}</div></td>
                    <td>${formatBRLAdmin(row.custo)}</td>
                    <td>${row.onesio != null ? formatBRLAdmin(row.onesio) : "—"}</td>
                    <td>${row.atacado ? formatBRLAdmin(row.atacado) : "—"}</td>
                    <td class="${diffClass}">${formatBRLAdmin(diff)}</td>
                </tr>
            `;
        })
        .join("");
}

function renderVendas() {
    const box = document.getElementById("vendas-lista");
    const vendas = loadVendas();

    if (!vendas.length) {
        box.innerHTML = `<div class="empty-state">Nenhuma venda do site ainda.<br>Quando o cliente finaliza no WhatsApp, aparece aqui.</div>`;
        return;
    }

    box.innerHTML = vendas
        .map((v) => {
            const data = new Date(v.data).toLocaleString("pt-BR");
            const itens = v.itens
                .map(
                    (i) => `
                    <li>
                        <span>${i.qtd}× ${i.nome}</span>
                        <span class="positivo">${formatBRLAdmin(i.lucro)}</span>
                    </li>`
                )
                .join("");

            return `
                <article class="venda-card">
                    <header>
                        <div>
                            <strong>Pedido #${String(v.id).slice(-6)}</strong>
                            <p>${data}</p>
                        </div>
                        <div class="venda-totais">
                            <span>Receita ${formatBRLAdmin(v.receita)}</span>
                            <span>Custo ${formatBRLAdmin(v.custo)}</span>
                            <strong class="positivo">Lucro ${formatBRLAdmin(v.lucro)}</strong>
                        </div>
                    </header>
                    <ul>${itens}</ul>
                </article>
            `;
        })
        .join("");
}

function renderListaProdutosCarga() {
    const box = document.getElementById("lista-produtos-carga");
    const termo = (document.getElementById("carga-busca")?.value || "").trim().toLowerCase();
    const lista = produtos
        .slice()
        .sort((a, b) => {
            const cat = a.categoria.localeCompare(b.categoria, "pt-BR");
            if (cat !== 0) return cat;
            return a.nome.localeCompare(b.nome, "pt-BR");
        })
        .filter((p) => !termo || p.nome.toLowerCase().includes(termo) || p.categoria.toLowerCase().includes(termo));

    if (!cidadeAtiva) {
        box.innerHTML = `<div class="carga-vazia">Escolha uma cidade acima.</div>`;
        return;
    }

    let categoriaAtual = "";
    const html = lista
        .map((p) => {
            const qtd = getQtdCarga(cidadeAtiva, p.id);
            let catHtml = "";
            if (p.categoria !== categoriaAtual) {
                categoriaAtual = p.categoria;
                catHtml = `<div class="carga-cat">${categoriaAtual}</div>`;
            }
            return `
                ${catHtml}
                <div class="carga-prod-row ${qtd > 0 ? "tem-qtd" : ""}">
                    <div class="carga-prod-info">
                        <strong>${p.nome}</strong>
                        <span>${formatBRLAdmin(p.preco)}</span>
                    </div>
                    <div class="qtd-controle">
                        <button type="button" class="btn-qtd" data-menos="${p.id}" aria-label="Diminuir">−</button>
                        <input type="number" min="0" step="1" inputmode="numeric" value="${qtd}" data-qtd-produto="${p.id}">
                        <button type="button" class="btn-qtd" data-mais="${p.id}" aria-label="Aumentar">+</button>
                    </div>
                </div>
            `;
        })
        .join("");

    box.innerHTML = html || `<div class="carga-vazia">Nenhum produto encontrado.</div>`;

    box.querySelectorAll("[data-qtd-produto]").forEach((input) => {
        const id = Number(input.dataset.qtdProduto);
        const aplicar = () => {
            setQtdCarga(cidadeAtiva, id, input.value);
            input.value = getQtdCarga(cidadeAtiva, id);
            input.closest(".carga-prod-row")?.classList.toggle("tem-qtd", getQtdCarga(cidadeAtiva, id) > 0);
            renderTotaisCarga();
            renderCidadeChips();
        };
        input.addEventListener("change", aplicar);
        input.addEventListener("blur", aplicar);
    });

    box.querySelectorAll("[data-menos]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.menos);
            setQtdCarga(cidadeAtiva, id, getQtdCarga(cidadeAtiva, id) - 1);
            const input = box.querySelector(`[data-qtd-produto="${id}"]`);
            if (input) input.value = getQtdCarga(cidadeAtiva, id);
            btn.closest(".carga-prod-row")?.classList.toggle("tem-qtd", getQtdCarga(cidadeAtiva, id) > 0);
            renderTotaisCarga();
            renderCidadeChips();
        });
    });

    box.querySelectorAll("[data-mais]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.mais);
            setQtdCarga(cidadeAtiva, id, getQtdCarga(cidadeAtiva, id) + 1);
            const input = box.querySelector(`[data-qtd-produto="${id}"]`);
            if (input) input.value = getQtdCarga(cidadeAtiva, id);
            btn.closest(".carga-prod-row")?.classList.toggle("tem-qtd", getQtdCarga(cidadeAtiva, id) > 0);
            renderTotaisCarga();
            renderCidadeChips();
        });
    });
}

function renderTotaisCarga() {
    const totais = calcCargaTotais(cargaDraft);
    document.getElementById("draft-pecas").textContent = String(totais.totalPecas);
    document.getElementById("draft-custo").textContent = formatBRLAdmin(totais.totalCusto);
    document.getElementById("draft-receita").textContent = formatBRLAdmin(totais.totalReceita);
    document.getElementById("draft-lucro").textContent = formatBRLAdmin(totais.lucroEstimado);
}

function totaisRotaExibicao(rota) {
    const itens = aplicarPrecosPlanilhaNosItens(rota?.itens || []);
    return { itens, ...calcCargaTotais(itens) };
}

function renderRotas() {
    const box = document.getElementById("rotas-lista");
    const rotas = loadRotas();

    if (!rotas.length) {
        box.innerHTML = `<div class="empty-state">Nenhuma viagem ainda.<br>Monte a carga acima e clique em Salvar viagem.</div>`;
        return;
    }

    box.innerHTML = rotas
        .map((r) => {
            const baixada = r.status === "baixada";
            const totais = totaisRotaExibicao(r);
            const porCidade = {};
            totais.itens.forEach((i) => {
                if (!porCidade[i.cidade]) porCidade[i.cidade] = [];
                porCidade[i.cidade].push(i);
            });

            const blocos = Object.entries(porCidade)
                .map(([cidade, itens]) => {
                    const pecas = itens.reduce((s, i) => s + i.qtd, 0);
                    const vendidas = itens.reduce((s, i) => s + (i.qtdVendida || 0), 0);
                    const linhas = itens
                        .map((i) => {
                            if (baixada) {
                                const sobrou = Math.max(0, (Number(i.qtd) || 0) - (Number(i.qtdVendida) || 0));
                                return `<li class="rota-item-line">
                                    <span class="rota-item-nome">${i.nome}</span>
                                    <span class="rota-item-meta">levou ${i.qtd} · vendeu ${i.qtdVendida || 0} · sobrou ${sobrou}</span>
                                </li>`;
                            }
                            return `<li class="rota-item-line">
                                <span class="rota-item-nome">${i.qtd}× ${i.nome}</span>
                                <span class="rota-item-meta">${formatBRLAdmin(i.preco * i.qtd)}</span>
                            </li>`;
                        })
                        .join("");
                    return `
                        <div class="cidade-bloco">
                            <div class="cidade-bloco__head">
                                <strong>${cidade}</strong>
                                <span class="muted">${baixada ? `${vendidas}/${pecas} vendidas` : `${pecas} peças`}</span>
                            </div>
                            <ul class="rota-itens-lista">${linhas}</ul>
                        </div>
                    `;
                })
                .join("");

            return `
                <article class="venda-card ${baixada ? "baixada" : ""}">
                    <header>
                        <div>
                            <strong>Viagem ${formatDataBR(r.data)}</strong>
                            <p>${(r.observacao || "Sem observação").split("\n")[0].slice(0, 90)}${(r.observacao || "").length > 90 ? "…" : ""} · ${baixada ? "Baixada" : "Aguardando baixa"}</p>
                        </div>
                        <div class="venda-totais">
                            <span>${totais.totalPecas || 0} peças levadas</span>
                            <span>Valor carga ${formatBRLAdmin(totais.totalReceita)}</span>
                            <span>Custo carga ${formatBRLAdmin(totais.totalCusto)}</span>
                            ${
                                baixada
                                    ? `<span>Vendeu ${r.pecasVendidas || 0} · ${formatBRLAdmin(r.receitaReal || 0)}</span>
                                       <strong class="positivo">Lucro ${formatBRLAdmin(r.lucroReal || 0)}</strong>`
                                    : `<strong class="positivo">Lucro est. ${formatBRLAdmin(totais.lucroEstimado)}</strong>`
                            }
                        </div>
                    </header>
                    ${blocos}
                    <div class="card-actions">
                        <button type="button" class="btn-ghost" data-ver-rota="${r.id}">Ver rota</button>
                        ${
                            baixada
                                ? `<button type="button" class="btn-admin" data-baixa-rota="${r.id}">Corrigir</button>`
                                : `<button type="button" class="btn-admin" data-baixa-rota="${r.id}">Dar baixa</button>`
                        }
                        <button type="button" class="btn-ghost danger" data-del-rota="${r.id}">Excluir viagem</button>
                    </div>
                </article>
            `;
        })
        .join("");

    box.querySelectorAll("[data-baixa-rota]").forEach((btn) => {
        btn.addEventListener("click", () => abrirBaixa(Number(btn.dataset.baixaRota)));
    });

    box.querySelectorAll("[data-ver-rota]").forEach((btn) => {
        btn.addEventListener("click", () => verRota(Number(btn.dataset.verRota)));
    });

    box.querySelectorAll("[data-del-rota]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            if (!confirm("Excluir esta viagem?")) return;
            const res = await removerRota(Number(btn.dataset.delRota));
            renderRotas();
            renderFinanceiro();
            renderStats();
            if (res && res.salvaNoSite === false) {
                alert("Excluiu neste aparelho, mas não no site.\n" + (res.erro || ""));
            }
        });
    });
}

function htmlDetalheRota(rota) {
    const totais = totaisRotaExibicao(rota);
    const porCidade = {};
    totais.itens.forEach((i) => {
        if (!porCidade[i.cidade]) porCidade[i.cidade] = [];
        porCidade[i.cidade].push(i);
    });

    const baixada = rota.status === "baixada";
    const resumo = `
        <div class="rota-carga-valores">
            <span><em>Peças</em><strong>${totais.totalPecas}</strong></span>
            <span><em>Valor da carga</em><strong>${formatBRLAdmin(totais.totalReceita)}</strong></span>
            <span><em>Custo da carga</em><strong>${formatBRLAdmin(totais.totalCusto)}</strong></span>
            <span><em>Lucro est.</em><strong class="positivo">${formatBRLAdmin(totais.lucroEstimado)}</strong></span>
        </div>
    `;

    const blocos = Object.entries(porCidade)
        .map(([cidade, itens]) => {
            const pecas = itens.reduce((s, i) => s + (Number(i.qtd) || 0), 0);
            const vendidas = itens.reduce((s, i) => s + (Number(i.qtdVendida) || 0), 0);
            const linhas = itens
                .map((i) => {
                    if (baixada) {
                        const sobrou = Math.max(0, (Number(i.qtd) || 0) - (Number(i.qtdVendida) || 0));
                        return `<li class="rota-item-line">
                            <span class="rota-item-nome">${i.nome}</span>
                            <span class="rota-item-meta">levou ${i.qtd} · vendeu ${i.qtdVendida || 0} · sobrou ${sobrou}</span>
                        </li>`;
                    }
                    return `<li class="rota-item-line">
                        <span class="rota-item-nome">${i.qtd}× ${i.nome}</span>
                        <span class="rota-item-meta">${formatBRLAdmin(i.preco * i.qtd)}</span>
                    </li>`;
                })
                .join("");
            return `
                <div class="cidade-bloco">
                    <div class="cidade-bloco__head">
                        <strong>${cidade}</strong>
                        <span class="muted">${baixada ? `${vendidas}/${pecas} vendidas` : `${pecas} peças`}</span>
                    </div>
                    <ul class="rota-itens-lista">${linhas}</ul>
                </div>
            `;
        })
        .join("");

    return resumo + blocos;
}

function verRota(rotaId) {
    const rota = getRota(rotaId);
    if (!rota) return;
    const totais = totaisRotaExibicao(rota);
    const cidades = [...new Set((rota.itens || []).map((i) => i.cidade).filter(Boolean))];
    const baixada = rota.status === "baixada";

    document.getElementById("rota-view-titulo").textContent = `Rota ${formatDataBR(rota.data)}`;
    document.getElementById("rota-view-subtitulo").textContent = baixada
        ? `${cidades.join(", ") || "—"} · vendeu ${rota.pecasVendidas || 0}/${totais.totalPecas} · faturou ${formatBRLAdmin(rota.receitaReal || 0)}`
        : `${cidades.join(", ") || "—"} · ${totais.totalPecas} peças · valor ${formatBRLAdmin(totais.totalReceita)} · custo ${formatBRLAdmin(totais.totalCusto)}`;
    document.getElementById("rota-view-conteudo").innerHTML = htmlDetalheRota(rota);
    document.getElementById("rota-view-modal").showModal();
}

function toggleDetalheBaixa() {
    const box = document.getElementById("baixa-rota-detalhe");
    const btn = document.getElementById("btn-ver-rota-baixa");
    if (!box || !rotaBaixaId) return;

    const aberto = !box.hidden;
    if (aberto) {
        box.hidden = true;
        box.classList.add("hidden");
        if (btn) btn.textContent = "Ver rota";
        return;
    }

    const rota = getRota(rotaBaixaId);
    if (!rota) return;
    box.innerHTML = htmlDetalheRota(rota);
    box.hidden = false;
    box.classList.remove("hidden");
    if (btn) btn.textContent = "Ocultar rota";
}

function htmlStepperBaixa(kind, key, value, extraAttrs = "") {
    const keyAttr =
        kind === "vendeu"
            ? `data-baixa-key="${key}"`
            : `data-baixa-levou-key="${key}" data-baixa-vendeu-for="${key}"`;
    return `
        <div class="baixa-stepper">
            <button type="button" class="baixa-stepper__btn" data-step="-1" aria-label="Diminuir">−</button>
            <input type="number" min="0" step="1" inputmode="numeric"
                value="${value}" ${keyAttr} ${extraAttrs}>
            <button type="button" class="baixa-stepper__btn" data-step="1" aria-label="Aumentar">+</button>
        </div>
    `;
}

function abrirBaixa(rotaId) {
    const rota = getRota(rotaId);
    if (!rota) return;
    rotaBaixaId = rotaId;

    const itens = aplicarPrecosPlanilhaNosItens(rota.itens || []);
    const totaisCarga = calcCargaTotais(itens);

    document.getElementById("baixa-subtitulo").textContent =
        `Viagem de ${formatDataBR(rota.data)} — venda Onesio (planilha) · custo planilha.`;

    const elLevou = document.getElementById("baixa-levou-total");
    const elCargaRec = document.getElementById("baixa-carga-receita");
    const elCargaCusto = document.getElementById("baixa-carga-custo");
    const elCargaLucro = document.getElementById("baixa-carga-lucro");
    if (elLevou) elLevou.textContent = String(totaisCarga.totalPecas);
    if (elCargaRec) elCargaRec.textContent = formatBRLAdmin(totaisCarga.totalReceita);
    if (elCargaCusto) elCargaCusto.textContent = formatBRLAdmin(totaisCarga.totalCusto);
    if (elCargaLucro) elCargaLucro.textContent = formatBRLAdmin(totaisCarga.lucroEstimado);

    const detalhe = document.getElementById("baixa-rota-detalhe");
    if (detalhe) {
        detalhe.hidden = true;
        detalhe.classList.add("hidden");
        detalhe.innerHTML = "";
    }
    const btnVerRota = document.getElementById("btn-ver-rota-baixa");
    if (btnVerRota) btnVerRota.textContent = "Ver rota";

    const box = document.getElementById("baixa-lista");
    box.innerHTML = itens
        .map((item) => {
            const vendida = item.qtdVendida ?? 0;
            const key = `${item.cidade}|${item.produtoId}`;
            const sobrou = Math.max(0, (Number(item.qtd) || 0) - (Number(vendida) || 0));
            return `
                <div class="baixa-row" data-baixa-row="${key}">
                    <div class="baixa-row__info">
                        <strong>${item.nome}</strong>
                        <p>${item.cidade} · ${formatBRLAdmin(item.preco)} / un. · custo ${formatBRLAdmin(item.custo)}</p>
                    </div>
                    <div class="baixa-row__inputs">
                        <label>
                            Levou
                            ${htmlStepperBaixa("levou", key, item.qtd)}
                        </label>
                        <label>
                            Vendeu
                            ${htmlStepperBaixa(
                                "vendeu",
                                key,
                                vendida,
                                `max="${item.qtd}" data-baixa-preco="${item.preco}" data-baixa-custo="${item.custo}"`
                            )}
                        </label>
                        <div class="baixa-sobrou-box">
                            <span>Sobrou</span>
                            <strong data-baixa-sobrou="${key}">${sobrou}</strong>
                        </div>
                    </div>
                </div>
            `;
        })
        .join("");

    // Persiste preços corrigidos (catálogo + planilha) na viagem local e no site
    const rotas = loadRotas().map((r) => {
        if (r.id !== rotaId && String(r.id) !== String(rotaId)) return r;
        const novos = aplicarPrecosPlanilhaNosItens(r.itens || []);
        return { ...r, itens: novos, ...calcCargaTotais(novos) };
    });
    saveRotas(rotas);
    const rotaCorrigida = rotas.find((r) => r.id === rotaId || String(r.id) === String(rotaId));
    if (rotaCorrigida) {
        apiRotas("PUT", {
            id: rotaCorrigida.id,
            status: rotaCorrigida.status || "aberta",
            observacao: rotaCorrigida.observacao || "",
            itens: rotaCorrigida.itens
        }).catch(() => {});
    }

    const syncVendeuMax = (levouInput) => {
        const key = levouInput.dataset.baixaLevouKey;
        const vendeuInput = box.querySelector(`[data-baixa-key="${key}"]`);
        if (!vendeuInput) return;
        const levou = Math.max(0, Number(levouInput.value) || 0);
        vendeuInput.max = levou;
        let vendeu = Number(vendeuInput.value) || 0;
        if (vendeu > levou) {
            vendeu = levou;
            vendeuInput.value = vendeu;
        }
    };

    const dataViagem = dataISO(rota.data) || hojeISO();

    const atualizarPreview = () => {
        let pecas = 0;
        let sobrouTotal = 0;
        let receita = 0;
        let custo = 0;
        box.querySelectorAll("[data-baixa-key]").forEach((input) => {
            let q = Number(input.value) || 0;
            if (q < 0) q = 0;
            const levouInput = box.querySelector(`[data-baixa-levou-key="${input.dataset.baixaKey}"]`);
            const max = levouInput ? Number(levouInput.value) || 0 : q;
            if (q > max) q = max;
            pecas += q;
            sobrouTotal += Math.max(0, max - q);
            receita += q * (Number(input.dataset.baixaPreco) || 0);
            custo += q * (Number(input.dataset.baixaCusto) || 0);
            const sobrouEl = box.querySelector(`[data-baixa-sobrou="${input.dataset.baixaKey}"]`);
            if (sobrouEl) sobrouEl.textContent = String(Math.max(0, max - q));
        });
        const despesas = totalDespesasBaixa(dataViagem);
        const custoTotal = custo + despesas;
        document.getElementById("baixa-pecas").textContent = String(pecas);
        const sobrouEl = document.getElementById("baixa-sobrou");
        if (sobrouEl) sobrouEl.textContent = String(sobrouTotal);
        document.getElementById("baixa-receita").textContent = formatBRLAdmin(receita);
        document.getElementById("baixa-custo").textContent = formatBRLAdmin(custoTotal);
        document.getElementById("baixa-lucro").textContent = formatBRLAdmin(receita - custoTotal);
        const despTotalEl = document.getElementById("baixa-despesas-total");
        if (despTotalEl) despTotalEl.textContent = formatBRLAdmin(despesas);
    };

    window.__baixaAtualizarPreview = atualizarPreview;
    window.__baixaDataViagem = dataViagem;
    renderBaixaDespesas(dataViagem, atualizarPreview);
    fecharFormBaixaDespesa();

    const ajustarValor = (input, delta) => {
        if (!input) return;
        const isLevou = input.hasAttribute("data-baixa-levou-key");
        let val = Number(input.value) || 0;
        val += delta;
        if (val < 0) val = 0;
        if (!isLevou) {
            const key = input.dataset.baixaKey;
            const levouInput = box.querySelector(`[data-baixa-levou-key="${key}"]`);
            const max = levouInput ? Number(levouInput.value) || 0 : val;
            if (val > max) val = max;
        }
        input.value = val;
        if (isLevou) syncVendeuMax(input);
        atualizarPreview();
    };

    box.querySelectorAll(".baixa-stepper__btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const stepper = btn.closest(".baixa-stepper");
            const input = stepper?.querySelector("input");
            ajustarValor(input, Number(btn.dataset.step) || 0);
        });
    });

    box.querySelectorAll("[data-baixa-levou-key]").forEach((input) => {
        input.addEventListener("input", () => {
            syncVendeuMax(input);
            atualizarPreview();
        });
        input.addEventListener("change", () => {
            if ((Number(input.value) || 0) < 0) input.value = 0;
            syncVendeuMax(input);
            atualizarPreview();
        });
    });

    box.querySelectorAll("[data-baixa-key]").forEach((input) => {
        input.addEventListener("input", atualizarPreview);
        input.addEventListener("change", () => {
            let q = Number(input.value) || 0;
            const levouInput = box.querySelector(`[data-baixa-levou-key="${input.dataset.baixaKey}"]`);
            const max = levouInput ? Number(levouInput.value) || 0 : q;
            if (q < 0) q = 0;
            if (q > max) q = max;
            input.value = q;
            atualizarPreview();
        });
    });

    atualizarPreview();
    document.getElementById("baixa-modal").showModal();
}

function fecharBaixa() {
    rotaBaixaId = null;
    window.__baixaAtualizarPreview = null;
    window.__baixaDataViagem = null;
    fecharFormBaixaDespesa();
    document.getElementById("baixa-modal").close();
}

function totalDespesasBaixa(dataViagem) {
    const dia = dataISO(dataViagem) || hojeISO();
    return loadDespesas()
        .filter((i) => dataISO(i.data) === dia)
        .reduce((s, i) => s + (Number(i.valor) || 0), 0);
}

function fecharFormBaixaDespesa() {
    const form = document.getElementById("baixa-despesa-form");
    if (!form) return;
    form.hidden = true;
    form.classList.add("hidden");
    const valor = document.getElementById("baixa-despesa-valor");
    const desc = document.getElementById("baixa-despesa-descricao");
    if (valor) valor.value = "";
    if (desc) desc.value = "";
}

function abrirFormBaixaDespesa() {
    const form = document.getElementById("baixa-despesa-form");
    if (!form) return;
    form.hidden = false;
    form.classList.remove("hidden");
    document.getElementById("baixa-despesa-valor")?.focus();
}

function renderBaixaDespesas(dataViagem, onChange) {
    const box = document.getElementById("baixa-despesas-lista");
    const totalEl = document.getElementById("baixa-despesas-total");
    if (!box) return;

    const dia = dataISO(dataViagem) || hojeISO();
    const lista = loadDespesas().filter((i) => dataISO(i.data) === dia);
    const total = lista.reduce((s, i) => s + (Number(i.valor) || 0), 0);
    if (totalEl) totalEl.textContent = formatBRLAdmin(total);

    if (!lista.length) {
        box.innerHTML = `<p class="baixa-despesas-empty">Nenhuma despesa nesta viagem ainda.</p>`;
    } else {
        box.innerHTML = lista
            .map(
                (item) => `
            <div class="baixa-despesa-item">
                <div>
                    <strong>${item.categoria || "Outros"}</strong>
                    <span>${item.descricao || "—"}</span>
                </div>
                <div class="baixa-despesa-item__right">
                    <strong class="negativo">${formatBRLAdmin(item.valor)}</strong>
                    <button type="button" class="btn-ghost danger btn--sm" data-del-baixa-despesa="${item.id}">Excluir</button>
                </div>
            </div>`
            )
            .join("");
    }

    box.querySelectorAll("[data-del-baixa-despesa]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            if (!confirm("Excluir esta despesa?")) return;
            await removerDespesa(btn.dataset.delBaixaDespesa);
            renderBaixaDespesas(dia, onChange);
            renderDespesas();
            renderStats();
            if (typeof onChange === "function") onChange();
        });
    });

    if (typeof onChange === "function") onChange();
}

async function confirmarBaixa() {
    if (!rotaBaixaId) return;
    const vendas = {};
    const levou = {};
    document.querySelectorAll("#baixa-lista [data-baixa-key]").forEach((input) => {
        vendas[input.dataset.baixaKey] = Number(input.value) || 0;
    });
    document.querySelectorAll("#baixa-lista [data-baixa-levou-key]").forEach((input) => {
        levou[input.dataset.baixaLevouKey] = Number(input.value) || 0;
    });
    const res = await registrarBaixaRota(rotaBaixaId, vendas, levou);
    fecharBaixa();
    renderRotas();
    renderFinanceiro();
    renderStats();
    if (res && res.salvaNoSite) {
        alert("Baixa ok! Já está salva no site.");
    } else {
        alert("Baixa ficou só neste aparelho.\n" + ((res && res.erro) || "Confira a conexão / banco."));
    }
}

function renderAprazo() {
    const box = document.getElementById("aprazo-lista");
    const lista = loadAprazo();
    document.getElementById("aprazo-total-pendente").textContent = formatBRLAdmin(totalAprazoPendente());

    if (!lista.length) {
        box.innerHTML = `<div class="empty-state">Nenhum fiado.<br>Anote acima quando alguém ficar pra pagar depois.</div>`;
        return;
    }

    box.innerHTML = lista
        .map((item) => {
            const pendente = item.status === "pendente";
            return `
                <article class="venda-card ${pendente ? "" : "pago"}">
                    <header>
                        <div>
                            <strong>${item.cliente || "Sem nome"}</strong>
                            <p>${item.cidade || "—"} · ${formatDataBR(item.data)}${item.vencimento ? ` · vence ${formatDataBR(item.vencimento)}` : ""}</p>
                            ${item.observacao ? `<p>${item.observacao}</p>` : ""}
                        </div>
                        <div class="venda-totais">
                            <strong class="${pendente ? "negativo" : "positivo"}">${formatBRLAdmin(item.valor)}</strong>
                            <span>${pendente ? "Pendente" : `Pago em ${formatDataBR(item.pagoEm)}`}</span>
                        </div>
                    </header>
                    <div class="card-actions">
                        ${pendente ? `<button type="button" class="btn-admin" data-pagar-aprazo="${item.id}">Já pagou</button>` : ""}
                        <button type="button" class="btn-ghost danger" data-del-aprazo="${item.id}">Excluir</button>
                    </div>
                </article>
            `;
        })
        .join("");

    box.querySelectorAll("[data-pagar-aprazo]").forEach((btn) => {
        btn.addEventListener("click", () => {
            marcarAprazoPago(Number(btn.dataset.pagarAprazo));
            renderAprazo();
            renderStats();
        });
    });

    box.querySelectorAll("[data-del-aprazo]").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!confirm("Excluir este registro a prazo?")) return;
            removerAprazo(Number(btn.dataset.delAprazo));
            renderAprazo();
            renderStats();
        });
    });
}

function renderDespesas() {
    const box = document.getElementById("despesa-lista");
    const catsBox = document.getElementById("despesa-resumo-cats");
    const totalEl = document.getElementById("despesa-total");
    if (!box) return;

    const filtro = document.getElementById("despesa-filtro-data")?.value || hojeISO();
    const lista = loadDespesas().filter((i) => i.data === filtro);
    const total = lista.reduce((s, i) => s + (Number(i.valor) || 0), 0);
    if (totalEl) totalEl.textContent = formatBRLAdmin(total);

    const porCat = {};
    lista.forEach((i) => {
        const k = i.categoria || "Outros";
        porCat[k] = (porCat[k] || 0) + (Number(i.valor) || 0);
    });
    if (catsBox) {
        const keys = Object.keys(porCat);
        catsBox.innerHTML = keys.length
            ? keys
                  .map(
                      (k) =>
                          `<div class="despesa-cat-chip"><span>${k}</span><strong>${formatBRLAdmin(porCat[k])}</strong></div>`
                  )
                  .join("")
            : "";
    }

    if (!lista.length) {
        box.innerHTML = `<div class="empty-state">Nenhuma despesa neste dia.<br>Adicione hospedagem, alimentação, Uber…</div>`;
        return;
    }

    box.innerHTML = lista
        .map(
            (item) => `
        <article class="venda-card">
            <header>
                <div>
                    <strong>${item.categoria || "Outros"}</strong>
                    <p>${formatDataBR(item.data)}${item.descricao ? ` · ${item.descricao}` : ""}</p>
                </div>
                <div class="venda-totais">
                    <strong class="negativo">${formatBRLAdmin(item.valor)}</strong>
                </div>
            </header>
            <div class="card-actions">
                <button type="button" class="btn-ghost danger" data-del-despesa="${item.id}">Excluir</button>
            </div>
        </article>`
        )
        .join("");

    box.querySelectorAll("[data-del-despesa]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            if (!confirm("Excluir esta despesa?")) return;
            await removerDespesa(btn.dataset.delDespesa);
            renderDespesas();
            renderStats();
        });
    });
}

function analisarViagem(rota) {
    const itens = aplicarPrecosPlanilhaNosItens(rota?.itens || []);
    const totais = calcCargaTotais(itens);
    const baixada = rota.status === "baixada";
    const linhas = itens.map((i) => {
        const levou = Number(i.qtd) || 0;
        const vendeu = baixada ? Number(i.qtdVendida) || 0 : 0;
        const sobrou = Math.max(0, levou - vendeu);
        return {
            nome: i.nome,
            levou,
            vendeu,
            sobrou,
            preco: Number(i.preco) || 0,
            custo: Number(i.custo) || 0,
            receita: vendeu * (Number(i.preco) || 0),
            custoVendido: vendeu * (Number(i.custo) || 0),
            valorSobra: sobrou * (Number(i.preco) || 0)
        };
    });
    const pecasLevou = linhas.reduce((s, i) => s + i.levou, 0);
    const pecasVendidas = baixada
        ? Number(rota.pecasVendidas) || linhas.reduce((s, i) => s + i.vendeu, 0)
        : 0;
    const pecasSobra = Math.max(0, pecasLevou - pecasVendidas);
    const receita = baixada
        ? Number(rota.receitaReal) || linhas.reduce((s, i) => s + i.receita, 0)
        : totais.totalReceita;
    const custoVendido = baixada
        ? Number(rota.custoVendido) || linhas.reduce((s, i) => s + i.custoVendido, 0)
        : totais.totalCusto;
    const lucro = baixada
        ? Number(rota.lucroReal) || receita - custoVendido
        : totais.lucroEstimado;
    const despesas = totalDespesasBaixa(rota.data);
    const giro = pecasLevou > 0 ? Math.round((pecasVendidas / pecasLevou) * 100) : 0;
    const topSobra = linhas
        .filter((i) => i.sobrou > 0)
        .sort((a, b) => b.valorSobra - a.valorSobra || b.sobrou - a.sobrou)
        .slice(0, 8);
    const topVenda = linhas
        .filter((i) => i.vendeu > 0)
        .sort((a, b) => b.receita - a.receita)
        .slice(0, 8);
    const maisVendeuQtd = linhas
        .filter((i) => i.vendeu > 0)
        .sort((a, b) => b.vendeu - a.vendeu || b.receita - a.receita)
        .slice(0, 8);
    const maisFaturou = linhas
        .filter((i) => i.receita > 0)
        .sort((a, b) => b.receita - a.receita)
        .slice(0, 8);
    const menosVendeu = linhas
        .filter((i) => i.levou > 0)
        .sort((a, b) => a.vendeu - b.vendeu || b.levou - a.levou || b.valorSobra - a.valorSobra)
        .slice(0, 8);
    const zeroVenda = linhas.filter((i) => i.levou > 0 && i.vendeu === 0);
    return {
        rota,
        baixada,
        pecasLevou,
        pecasVendidas,
        pecasSobra,
        receita,
        custoVendido,
        lucro,
        despesas,
        lucroLiquido: lucro - despesas,
        giro,
        valorCarga: totais.totalReceita,
        custoCarga: totais.totalCusto,
        topSobra,
        topVenda,
        maisVendeuQtd,
        maisFaturou,
        menosVendeu,
        zeroVenda,
        valorSobra: linhas.reduce((s, i) => s + i.valorSobra, 0)
    };
}

function gerarDicasHistorico(analises) {
    const dicas = [];
    const baixadas = analises.filter((a) => a.baixada);
    if (!analises.length) {
        return ["Salve e baixe viagens pra aparecer o histórico e as dicas."];
    }
    if (!baixadas.length) {
        dicas.push("Tem viagem aberta. Dê a baixa pra saber o que vendeu de verdade.");
        return dicas;
    }

    const mediaGiro =
        baixadas.reduce((s, a) => s + a.giro, 0) / Math.max(1, baixadas.length);
    if (mediaGiro < 70) {
        dicas.push(
            `Giro médio ${Math.round(mediaGiro)}%. Leve menos variedade e mais do que sempre vende.`
        );
    } else if (mediaGiro >= 85) {
        dicas.push(`Giro ótimo (${Math.round(mediaGiro)}%). Pode testar um pouco mais dos campeões de venda.`);
    }

    const sobraCount = {};
    const vendaCount = {};
    baixadas.forEach((a) => {
        a.topSobra.forEach((i) => {
            sobraCount[i.nome] = (sobraCount[i.nome] || 0) + i.sobrou;
        });
        a.topVenda.forEach((i) => {
            vendaCount[i.nome] = (vendaCount[i.nome] || 0) + i.vendeu;
        });
        a.zeroVenda.forEach((i) => {
            sobraCount[i.nome] = (sobraCount[i.nome] || 0) + i.levou;
        });
    });

    const piores = Object.entries(sobraCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    if (piores.length) {
        dicas.push(
            `Mais sobra: ${piores.map(([n, q]) => `${n} (${q})`).join(", ")}. Na próxima, leve menos.`
        );
    }

    const melhores = Object.entries(vendaCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    if (melhores.length) {
        dicas.push(
            `Mais vendeu: ${melhores.map(([n, q]) => `${n} (${q})`).join(", ")}. Priorize esses na montagem.`
        );
    }

    const ultima = baixadas[0];
    if (ultima && ultima.valorSobra > 3000) {
        dicas.push(
            `Última viagem: sobrou ${formatBRLAdmin(ultima.valorSobra)} em estoque. Corte kits/trufados/geleias que não giram.`
        );
    }
    if (ultima && ultima.despesas > 0) {
        dicas.push(
            `Despesas da última viagem: ${formatBRLAdmin(ultima.despesas)}. Lucro líquido ${formatBRLAdmin(ultima.lucroLiquido)}.`
        );
    } else {
        dicas.push("Anote hospedagem, Uber e comida em Contas pra ver o lucro líquido real.");
    }

    const lombos = piores.filter(([n]) => /lombo|frango/i.test(n));
    if (lombos.length) {
        dicas.push("Lombo/frango sobrou bastante no Rio — leve metade na próxima.");
    }
    const trufados = piores.filter(([n]) => /trufado|geleia|tropical/i.test(n));
    if (trufados.length) {
        dicas.push("Trufado, geleia e tropical: só repor o que o cliente pedir.");
    }

    return dicas;
}

function htmlRankingColuna(titulo, itens, modo) {
    if (!itens.length) {
        return `<div class="hist-rank-col"><strong>${titulo}</strong><p class="muted">Sem dados</p></div>`;
    }
    const linhas = itens
        .map((i, idx) => {
            let detalhe = "";
            if (modo === "qtd") detalhe = `${i.vendeu} un. · ${formatBRLAdmin(i.receita)}`;
            else if (modo === "faturou") detalhe = `${formatBRLAdmin(i.receita)} · ${i.vendeu} un.`;
            else detalhe = `vendeu ${i.vendeu}/${i.levou} · sobrou ${i.sobrou}`;
            return `<li><span class="hist-rank-pos">${idx + 1}.</span><span class="hist-rank-nome">${i.nome}</span><span class="hist-rank-meta">${detalhe}</span></li>`;
        })
        .join("");
    return `<div class="hist-rank-col"><strong>${titulo}</strong><ul>${linhas}</ul></div>`;
}

function renderHistoricoRanking(analise) {
    const box = document.getElementById("historico-ranking");
    const titulo = document.getElementById("historico-ranking-titulo");
    if (!box) return;
    if (!analise || !analise.baixada) {
        box.innerHTML = `<div class="empty-state">Dê baixa numa viagem pra ver o ranking.</div>`;
        if (titulo) titulo.textContent = "Última viagem baixada";
        return;
    }
    const r = analise.rota;
    const cidades = [...new Set((r.itens || []).map((i) => i.cidade).filter(Boolean))];
    if (titulo) {
        titulo.textContent = `${formatDataBR(r.data)}${cidades.length ? ` · ${cidades.join(", ")}` : ""} · faturou ${formatBRLAdmin(analise.receita)}`;
    }
    box.innerHTML = `
        <div class="hist-ranking-grid">
            ${htmlRankingColuna("Mais vendeu", analise.maisVendeuQtd.slice(0, 6), "qtd")}
            ${htmlRankingColuna("Mais faturou", analise.maisFaturou.slice(0, 6), "faturou")}
            ${htmlRankingColuna("Menos vendeu", analise.menosVendeu.slice(0, 6), "menos")}
        </div>
        <div class="hist-ranking-resumo">
            <span>Vendeu <strong>${analise.pecasVendidas}</strong> de ${analise.pecasLevou} (${analise.giro}%)</span>
            <span>Faturou <strong>${formatBRLAdmin(analise.receita)}</strong></span>
            <span>Lucro <strong class="positivo">${formatBRLAdmin(analise.lucroLiquido)}</strong></span>
        </div>
    `;
}

function renderHistorico() {
    const filtro = document.getElementById("historico-filtro")?.value || "todas";
    const rotas = loadRotas()
        .slice()
        .sort((a, b) => String(b.data).localeCompare(String(a.data)) || Number(b.id) - Number(a.id));
    const analises = rotas.map(analisarViagem);
    const filtradas = analises.filter((a) => {
        if (filtro === "baixada") return a.baixada;
        if (filtro === "aberta") return !a.baixada;
        return true;
    });

    const baixadas = analises.filter((a) => a.baixada);
    const faturado = baixadas.reduce((s, a) => s + a.receita, 0);
    const lucro = baixadas.reduce((s, a) => s + a.lucroLiquido, 0);
    const levou = baixadas.reduce((s, a) => s + a.pecasLevou, 0);
    const vendeu = baixadas.reduce((s, a) => s + a.pecasVendidas, 0);
    const giro = levou > 0 ? Math.round((vendeu / levou) * 100) : 0;

    const elV = document.getElementById("hist-viagens");
    const elF = document.getElementById("hist-faturado");
    const elL = document.getElementById("hist-lucro");
    const elG = document.getElementById("hist-giro");
    if (elV) elV.textContent = String(analises.length);
    if (elF) elF.textContent = formatBRLAdmin(faturado);
    if (elL) elL.textContent = formatBRLAdmin(lucro);
    if (elG) elG.textContent = `${giro}%`;

    renderHistoricoRanking(baixadas[0] || null);

    const dicasBox = document.getElementById("historico-dicas");
    if (dicasBox) {
        const dicas = gerarDicasHistorico(analises);
        dicasBox.innerHTML = dicas.map((d) => `<div class="historico-dica">${d}</div>`).join("");
    }

    const box = document.getElementById("historico-lista");
    if (!box) return;
    if (!filtradas.length) {
        box.innerHTML = `<div class="empty-state">Nenhuma viagem neste filtro.</div>`;
        return;
    }

    box.innerHTML = filtradas
        .map((a) => {
            const r = a.rota;
            const cidades = [...new Set((r.itens || []).map((i) => i.cidade).filter(Boolean))];
            const rankingHtml = a.baixada
                ? `<div class="hist-ranking-grid hist-ranking-grid--card">
                        ${htmlRankingColuna("Mais vendeu", a.maisVendeuQtd.slice(0, 5), "qtd")}
                        ${htmlRankingColuna("Mais faturou", a.maisFaturou.slice(0, 5), "faturou")}
                        ${htmlRankingColuna("Menos vendeu", a.menosVendeu.slice(0, 5), "menos")}
                   </div>`
                : "";
            return `
            <article class="venda-card ${a.baixada ? "baixada" : ""}">
                <header>
                    <div>
                        <strong>Viagem ${formatDataBR(r.data)}</strong>
                        <p>${cidades.join(", ") || "—"} · ${a.baixada ? "Baixada" : "Aberta"} · ${a.pecasLevou} peças</p>
                    </div>
                    <div class="venda-totais">
                        ${
                            a.baixada
                                ? `<span>Vendeu ${a.pecasVendidas} (${a.giro}%)</span>
                                   <span>Sobrou ${a.pecasSobra} · ${formatBRLAdmin(a.valorSobra)}</span>
                                   <span>Faturou ${formatBRLAdmin(a.receita)}</span>
                                   <strong class="positivo">Lucro ${formatBRLAdmin(a.lucroLiquido)}</strong>`
                                : `<span>Valor carga ${formatBRLAdmin(a.valorCarga)}</span>
                                   <span>Custo ${formatBRLAdmin(a.custoCarga)}</span>
                                   <strong>Aguardando baixa</strong>`
                        }
                    </div>
                </header>
                ${rankingHtml}
                <div class="card-actions">
                    <button type="button" class="btn-ghost" data-ver-rota="${r.id}">Ver rota</button>
                    <button type="button" class="btn-admin" data-baixa-rota="${r.id}">${a.baixada ? "Corrigir baixa" : "Dar baixa"}</button>
                    ${a.baixada ? `<button type="button" class="btn-ghost" data-hist-ranking="${r.id}">Ver ranking</button>` : ""}
                </div>
            </article>`;
        })
        .join("");

    box.querySelectorAll("[data-ver-rota]").forEach((btn) => {
        btn.addEventListener("click", () => verRota(Number(btn.dataset.verRota)));
    });
    box.querySelectorAll("[data-baixa-rota]").forEach((btn) => {
        btn.addEventListener("click", () => abrirBaixa(Number(btn.dataset.baixaRota)));
    });
    box.querySelectorAll("[data-hist-ranking]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.histRanking);
            const a = analises.find((x) => Number(x.rota.id) === id);
            if (!a) return;
            renderHistoricoRanking(a);
            document.getElementById("historico-ranking")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

function showTab(tab) {
    const target = tab === "planilha" || tab === "vendas" ? "mais" : tab;
    const titles = {
        financeiro: "Início",
        rotas: "Viagem",
        aprazo: "Fiado",
        contas: "Contas",
        produtos: "Preços",
        historico: "Histórico",
        mais: "Outros"
    };

    document.querySelectorAll(".sidebar__link[data-page]").forEach((b) => {
        b.classList.toggle("active", b.dataset.page === target);
    });
    // compat com tabs antigas, se existirem
    document.querySelectorAll(".tab[data-tab]").forEach((b) => {
        b.classList.toggle("active", b.dataset.tab === target);
    });

    ["financeiro", "rotas", "aprazo", "contas", "produtos", "historico", "mais"].forEach((name) => {
        const el = document.getElementById(`tab-${name}`);
        if (!el) return;
        const on = name === target;
        el.classList.toggle("active", on);
        el.classList.toggle("hidden", !on);
    });

    const titleEl = document.getElementById("page-title");
    if (titleEl) titleEl.textContent = titles[target] || "Painel";

    fecharSidebar();

    if (target === "financeiro") {
        renderFinanceiro();
        updateEasyBaixaHint();
    }
    if (target === "rotas") {
        fillCidadeSelects();
        renderListaProdutosCarga();
        renderTotaisCarga();
        renderRotas();
    }
    if (target === "aprazo") {
        fillCidadeSelects();
        renderAprazo();
    }
    if (target === "contas") renderDespesas();
    if (target === "produtos") {
        renderProdutos();
        renderProdutosCustomLista();
    }
    if (target === "historico") renderHistorico();
    if (target === "mais") {
        renderPlanilha();
        renderVendas();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function abrirSidebar() {
    document.getElementById("sidebar")?.classList.add("open");
    document.getElementById("sidebar-backdrop")?.classList.add("is-visible");
    document.body.classList.add("sidebar-open");
}

function fecharSidebar() {
    document.getElementById("sidebar")?.classList.remove("open");
    document.getElementById("sidebar-backdrop")?.classList.remove("is-visible");
    document.body.classList.remove("sidebar-open");
}

function updateEasyBaixaHint() {
    const n = totalRotasSemBaixa();
    const hint = document.getElementById("easy-baixa-hint");
    const btn = document.getElementById("btn-easy-baixa");
    if (hint) {
        hint.textContent = n
            ? `${n} viagem${n === 1 ? "" : "ns"} esperando`
            : "Nenhuma viagem pendente";
    }
    if (btn) btn.classList.toggle("easy-action--alert", n > 0);
}

function abrirPrimeiraBaixa() {
    const abertas = loadRotas().filter((r) => r.status !== "baixada");
    if (!abertas.length) {
        alert("Nenhuma viagem esperando baixa.\nMonte uma viagem primeiro.");
        showTab("rotas");
        return;
    }
    abrirBaixa(abertas[0].id);
}

document.addEventListener("DOMContentLoaded", () => {
    if (isAutenticado()) mostrarApp();

    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const pin = document.getElementById("admin-pin").value.trim();
        const err = document.getElementById("login-error");
        if (pin === ADMIN_PIN) {
            autenticar();
            err.classList.add("hidden");
            mostrarApp();
        } else {
            err.classList.remove("hidden");
        }
    });

    document.getElementById("btn-logout").addEventListener("click", sair);

    document.querySelectorAll(".tab[data-tab]").forEach((btn) => {
        btn.addEventListener("click", () => showTab(btn.dataset.tab));
    });
    document.querySelectorAll(".sidebar__link[data-page]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showTab(btn.dataset.page);
        });
    });
    document.getElementById("sidebar-toggle")?.addEventListener("click", abrirSidebar);
    document.getElementById("sidebar-backdrop")?.addEventListener("click", fecharSidebar);

    document.getElementById("busca-produto").addEventListener("input", renderProdutos);
    document.getElementById("filtro-categoria").addEventListener("change", renderProdutos);
    document.getElementById("busca-planilha").addEventListener("input", renderPlanilha);

    document.getElementById("financeiro-data").addEventListener("change", () => {
        renderFinanceiro();
        renderStats();
    });

    document.getElementById("btn-salvar-cidades").addEventListener("click", () => {
        const inputs = [...document.querySelectorAll("[data-cidade-idx]")];
        const cidades = inputs
            .sort((a, b) => Number(a.dataset.cidadeIdx) - Number(b.dataset.cidadeIdx))
            .map((input, i) => input.value.trim() || `Cidade ${i + 1}`);
        saveCidades(cidades);
        fillCidadeSelects();
        renderListaProdutosCarga();
        alert("Cidades salvas!");
    });

    document.getElementById("carga-busca").addEventListener("input", () => {
        renderListaProdutosCarga();
    });

    document.getElementById("btn-salvar-rota").addEventListener("click", async () => {
        if (!cargaDraft.length) {
            alert("Coloque a quantidade de pelo menos um produto.");
            return;
        }
        const btn = document.getElementById("btn-salvar-rota");
        btn.disabled = true;
        btn.textContent = "Salvando...";
        try {
            const res = await criarRota({
                data: document.getElementById("rota-data").value || hojeISO(),
                observacao: document.getElementById("rota-obs").value.trim(),
                itens: cargaDraft
            });
            cargaDraft = [];
            document.getElementById("rota-obs").value = "";
            document.getElementById("carga-busca").value = "";
            renderCidadeChips();
            renderListaProdutosCarga();
            renderTotaisCarga();
            renderRotas();
            renderFinanceiro();
            renderStats();
            if (res.salvaNoSite) {
                setSyncStatus("Viagens salvas no site");
                alert("Viagem salva no site!\nDe noite: Início → Dar baixa.");
            } else {
                setSyncStatus("Salvando só neste aparelho");
                alert("Viagem ficou só neste celular.\nMotivo: " + (res.erro || "API/banco offline") + "\n\nRode o SQL no phpMyAdmin se ainda não rodou.");
            }
            showTab("financeiro");
        } finally {
            btn.disabled = false;
            btn.textContent = "3 · Salvar viagem";
        }
    });

    document.querySelectorAll("[data-go-tab]").forEach((btn) => {
        btn.addEventListener("click", () => showTab(btn.dataset.goTab));
    });
    document.getElementById("btn-easy-baixa").addEventListener("click", abrirPrimeiraBaixa);

    document.getElementById("btn-fechar-baixa").addEventListener("click", fecharBaixa);
    document.getElementById("btn-ver-rota-baixa").addEventListener("click", toggleDetalheBaixa);
    document.getElementById("btn-fechar-rota-view").addEventListener("click", () => {
        document.getElementById("rota-view-modal").close();
    });
    document.getElementById("baixa-form").addEventListener("submit", (e) => {
        e.preventDefault();
        confirmarBaixa();
    });

    document.getElementById("btn-baixa-add-despesa")?.addEventListener("click", abrirFormBaixaDespesa);
    document.getElementById("btn-baixa-cancelar-despesa")?.addEventListener("click", fecharFormBaixaDespesa);
    document.getElementById("btn-baixa-salvar-despesa")?.addEventListener("click", async () => {
        const categoria = document.getElementById("baixa-despesa-categoria")?.value || "Outros";
        const valor = Number(document.getElementById("baixa-despesa-valor")?.value) || 0;
        const descricao = document.getElementById("baixa-despesa-descricao")?.value.trim() || "";
        const data = window.__baixaDataViagem || hojeISO();
        if (valor <= 0) {
            alert("Informe o valor da despesa.");
            return;
        }
        const btn = document.getElementById("btn-baixa-salvar-despesa");
        if (btn) btn.disabled = true;
        try {
            await criarDespesa({ categoria, descricao, valor, data });
            fecharFormBaixaDespesa();
            renderBaixaDespesas(data, window.__baixaAtualizarPreview);
            renderDespesas();
            renderStats();
        } finally {
            if (btn) btn.disabled = false;
        }
    });

    document.getElementById("btn-salvar-aprazo").addEventListener("click", () => {
        const cliente = document.getElementById("aprazo-cliente").value.trim();
        const valor = Number(document.getElementById("aprazo-valor").value) || 0;
        if (!cliente || valor <= 0) {
            alert("Informe o cliente e um valor válido.");
            return;
        }
        criarAprazo({
            cliente,
            cidade: document.getElementById("aprazo-cidade").value,
            valor,
            data: document.getElementById("aprazo-data").value || hojeISO(),
            vencimento: document.getElementById("aprazo-vencimento").value,
            observacao: document.getElementById("aprazo-obs").value.trim()
        });
        document.getElementById("aprazo-cliente").value = "";
        document.getElementById("aprazo-valor").value = "";
        document.getElementById("aprazo-obs").value = "";
        renderAprazo();
        renderStats();
        alert("Fiado anotado!");
    });

    document.getElementById("btn-salvar-despesa").addEventListener("click", async () => {
        const categoria = document.getElementById("despesa-categoria").value;
        const valor = Number(document.getElementById("despesa-valor").value) || 0;
        const descricao = document.getElementById("despesa-descricao").value.trim();
        const data = document.getElementById("despesa-data").value || hojeISO();
        if (valor <= 0) {
            alert("Informe o valor da despesa.");
            return;
        }
        const btn = document.getElementById("btn-salvar-despesa");
        btn.disabled = true;
        try {
            const res = await criarDespesa({ categoria, descricao, valor, data });
            document.getElementById("despesa-valor").value = "";
            document.getElementById("despesa-descricao").value = "";
            const filtro = document.getElementById("despesa-filtro-data");
            if (filtro) filtro.value = data;
            renderDespesas();
            renderStats();
            alert(res.salvaNoSite ? "Despesa salva no site." : "Despesa salva neste aparelho.");
        } finally {
            btn.disabled = false;
        }
    });

    document.getElementById("despesa-filtro-data")?.addEventListener("change", renderDespesas);
    document.getElementById("historico-filtro")?.addEventListener("change", renderHistorico);

    document.getElementById("btn-add-produto").addEventListener("click", async () => {
        const nome = document.getElementById("novo-prod-nome").value.trim();
        let categoria = document.getElementById("novo-prod-categoria").value;
        const detalhes = document.getElementById("novo-prod-detalhes").value.trim();
        const preco = Number(document.getElementById("novo-prod-preco").value) || 0;
        const custo = Number(document.getElementById("novo-prod-custo").value) || 0;
        const fotoInput = document.getElementById("novo-prod-foto");

        if (!nome) {
            alert("Digite o nome do produto.");
            return;
        }
        if (categoria === "__nova__") {
            categoria = (prompt("Nome da nova categoria:") || "").trim();
            if (!categoria) return;
        }
        if (preco <= 0) {
            alert("Informe o preço de venda.");
            return;
        }

        const btn = document.getElementById("btn-add-produto");
        btn.disabled = true;
        btn.textContent = "Salvando…";
        try {
            let imagem = "assets/imagens/tradicionais/foto1.png";
            if (fotoInput.files && fotoInput.files[0]) {
                imagem = await uploadImagemProduto(fotoInput.files[0]);
            }
            const criado = await criarProdutoCustom({
                nome,
                categoria,
                detalhes,
                preco,
                custo,
                imagem
            });

            precosAtuais[criado.id] = criado.preco;
            custosAtuais[criado.id] = criado.custo;
            savePrecos({ ...loadPrecos(), [String(criado.id)]: criado.preco });
            saveCustos(custosAtuais);

            await sincronizarProdutosCustom(
                typeof PRODUTOS_BASE !== "undefined" ? PRODUTOS_BASE : produtos.filter((p) => !p.custom)
            );
            await sincronizarPrecosDoServidor(produtos);
            precosAtuais = loadPrecos();
            custosAtuais = loadCustos();

            document.getElementById("novo-prod-nome").value = "";
            document.getElementById("novo-prod-detalhes").value = "";
            document.getElementById("novo-prod-preco").value = "";
            document.getElementById("novo-prod-custo").value = "";
            fotoInput.value = "";

            // Recarrega filtro de categorias
            const filtro = document.getElementById("filtro-categoria");
            if (filtro) {
                const selected = filtro.value;
                filtro.innerHTML = `<option value="">Todas as categorias</option>`;
                fillCategorias();
                filtro.value = selected;
            } else {
                fillCategorias();
            }

            renderProdutosCustomLista();
            renderProdutos();
            renderListaProdutosCarga();
            alert(`"${criado.nome}" adicionado na loja.`);
        } catch (e) {
            alert("Não deu pra adicionar: " + (e.message || e));
        } finally {
            btn.disabled = false;
            btn.textContent = "Adicionar ao site";
        }
    });

    document.getElementById("btn-salvar-custos").addEventListener("click", async () => {
        document.querySelectorAll("input[data-custo-id]").forEach((input) => {
            custosAtuais[Number(input.dataset.custoId)] = Number(input.value) || 0;
        });
        document.querySelectorAll("input[data-preco-id]").forEach((input) => {
            const id = Number(input.dataset.precoId);
            const valor = Number(input.value) || 0;
            precosAtuais[id] = valor;
            syncPrecoNoCatalogo(id, valor);
        });

        const mapa = {};
        produtos.forEach((p) => {
            const v = Number(precosAtuais[p.id] ?? precosAtuais[String(p.id)] ?? p.preco);
            mapa[String(p.id)] = Number.isFinite(v) ? v : 0;
            syncPrecoNoCatalogo(p.id, mapa[String(p.id)]);
        });

        saveCustos(custosAtuais);
        savePrecos(mapa);
        precosAtuais = mapa;
        aplicarPrecosCatalogo(produtos);

        try {
            const remoto = await salvarPrecosNoServidor(mapa);
            savePrecos(remoto);
            precosAtuais = remoto;
            aplicarPrecosCatalogo(produtos);
            alert("Preços salvos no site! Qualquer celular já vê os valores novos.");
        } catch (e) {
            alert("Salvo só neste aparelho. Não deu pra gravar no site: " + (e.message || e));
        }

        renderProdutos();
        renderListaProdutosCarga();
        renderTotaisCarga();
        renderStats();
    });

    document.getElementById("btn-reset-precos").addEventListener("click", async () => {
        if (!confirm("Restaurar os preços do catálogo Marques Mineiro?")) return;
        await resetPrecosCatalogo(produtos);
        precosAtuais = {};
        renderProdutos();
        renderListaProdutosCarga();
        renderTotaisCarga();
        alert("Preços do catálogo aplicados na loja.");
    });

    document.getElementById("btn-reset-custos").addEventListener("click", () => {
        if (!confirm("Restaurar os custos do PDF e descartar edições?")) return;
        localStorage.removeItem(CUSTOS_STORAGE_KEY);
        custosAtuais = loadCustos();
        renderProdutos();
        renderListaProdutosCarga();
        renderTotaisCarga();
    });

    document.getElementById("btn-limpar-vendas").addEventListener("click", () => {
        if (!confirm("Apagar todo o histórico de vendas do site?")) return;
        saveVendas([]);
        renderVendas();
        renderStats();
    });
});
