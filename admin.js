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

    setSyncStatus("Carregando…");
    const syncProdutos = await sincronizarProdutosCustom(
        typeof PRODUTOS_BASE !== "undefined" ? PRODUTOS_BASE : produtos.filter((p) => !p.custom)
    );
    const sync = await inicializarRotasServidor();
    const syncPrecos = await sincronizarPrecosDoServidor(produtos, { migrarLocal: true });
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
    renderProdutos();
    renderProdutosCustomLista();
    renderPlanilha();
    renderVendas();
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
                return `
                    <article class="venda-card fin-baixa-card">
                        <header>
                            <div>
                                <strong>Viagem ${formatDataBR(r.data)}${deHoje ? "" : " (outro dia)"}</strong>
                                <p>${r.observacao || "Sem observação"} · ${r.totalPecas || 0} peças · carga ${formatBRLAdmin(r.totalReceita)}</p>
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
        .sort((a, b) => {
            const precoA = Number(precosAtuais[a.id] ?? a.preco);
            const precoB = Number(precosAtuais[b.id] ?? b.preco);
            const lucroA = precoA - getCusto(a.id, custosAtuais);
            const lucroB = precoB - getCusto(b.id, custosAtuais);
            return lucroB - lucroA;
        });

    tbody.innerHTML = lista
        .map((p) => {
            const custo = getCusto(p.id, custosAtuais);
            const preco = Number(precosAtuais[p.id] ?? p.preco);
            const lucro = preco - custo;
            const margem = preco > 0 ? (lucro / preco) * 100 : 0;
            const lucroClass = lucro >= 0 ? "positivo" : "negativo";
            return `
                <tr data-id="${p.id}">
                    <td>
                        <div class="prod-nome">${p.nome}</div>
                        <div class="prod-detalhe">${p.detalhes}</div>
                    </td>
                    <td>${p.categoria}</td>
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
                    <td class="${lucroClass}">${formatBRLAdmin(lucro)}</td>
                    <td class="${lucroClass}">${formatPct(margem)}</td>
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
            const porCidade = {};
            r.itens.forEach((i) => {
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
                                return `<li><span>${i.nome}</span><span>levou ${i.qtd} · vendeu ${i.qtdVendida || 0}</span></li>`;
                            }
                            return `<li><span>${i.qtd}× ${i.nome}</span><span>${formatBRLAdmin(i.preco * i.qtd)}</span></li>`;
                        })
                        .join("");
                    return `
                        <div class="cidade-bloco">
                            <strong>${cidade}</strong>
                            <span class="muted">(${baixada ? `${vendidas}/${pecas} vendidas` : `${pecas} peças`})</span>
                            <ul>${linhas}</ul>
                        </div>
                    `;
                })
                .join("");

            return `
                <article class="venda-card ${baixada ? "baixada" : ""}">
                    <header>
                        <div>
                            <strong>Viagem ${formatDataBR(r.data)}</strong>
                            <p>${r.observacao || "Sem observação"} · ${baixada ? "Baixada" : "Aguardando baixa"}</p>
                        </div>
                        <div class="venda-totais">
                            <span>Carga ${formatBRLAdmin(r.totalReceita)} (${r.totalPecas || 0} peças)</span>
                            ${
                                baixada
                                    ? `<span>Vendeu ${r.pecasVendidas || 0} · ${formatBRLAdmin(r.receitaReal || 0)}</span>
                                       <strong class="positivo">Lucro ${formatBRLAdmin(r.lucroReal || 0)}</strong>`
                                    : `<strong>Lucro após a baixa</strong>`
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
    const porCidade = {};
    rota.itens.forEach((i) => {
        if (!porCidade[i.cidade]) porCidade[i.cidade] = [];
        porCidade[i.cidade].push(i);
    });

    const baixada = rota.status === "baixada";

    return Object.entries(porCidade)
        .map(([cidade, itens]) => {
            const pecas = itens.reduce((s, i) => s + (Number(i.qtd) || 0), 0);
            const vendidas = itens.reduce((s, i) => s + (Number(i.qtdVendida) || 0), 0);
            const linhas = itens
                .map((i) => {
                    if (baixada) {
                        return `<li><span>${i.nome}</span><span>levou ${i.qtd} · vendeu ${i.qtdVendida || 0}</span></li>`;
                    }
                    return `<li><span>${i.qtd}× ${i.nome}</span><span>${formatBRLAdmin(i.preco * i.qtd)}</span></li>`;
                })
                .join("");
            return `
                <div class="cidade-bloco">
                    <strong>${cidade}</strong>
                    <span class="muted">(${baixada ? `${vendidas}/${pecas} vendidas` : `${pecas} peças`})</span>
                    <ul>${linhas}</ul>
                </div>
            `;
        })
        .join("");
}

function verRota(rotaId) {
    const rota = getRota(rotaId);
    if (!rota) return;

    document.getElementById("rota-view-titulo").textContent = `Rota ${formatDataBR(rota.data)}`;
    document.getElementById("rota-view-subtitulo").textContent =
        rota.observacao || `${rota.totalPecas || 0} peças · carga ${formatBRLAdmin(rota.totalReceita)}`;
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

function abrirBaixa(rotaId) {
    const rota = getRota(rotaId);
    if (!rota) return;
    rotaBaixaId = rotaId;

    document.getElementById("baixa-subtitulo").textContent =
        `Viagem de ${formatDataBR(rota.data)} — informe quanto levou e quanto vendeu.`;

    const detalhe = document.getElementById("baixa-rota-detalhe");
    if (detalhe) {
        detalhe.hidden = true;
        detalhe.classList.add("hidden");
        detalhe.innerHTML = "";
    }
    const btnVerRota = document.getElementById("btn-ver-rota-baixa");
    if (btnVerRota) btnVerRota.textContent = "Ver rota";

    const box = document.getElementById("baixa-lista");
    box.innerHTML = rota.itens
        .map((item) => {
            const vendida = item.qtdVendida ?? 0;
            const key = `${item.cidade}|${item.produtoId}`;
            return `
                <div class="baixa-row">
                    <div>
                        <strong>${item.nome}</strong>
                        <p>${item.cidade} · ${formatBRLAdmin(item.preco)} / un.</p>
                    </div>
                    <div class="baixa-row__inputs">
                        <label>
                            Levou
                            <input type="number" min="0" step="1" inputmode="numeric"
                                value="${item.qtd}"
                                data-baixa-levou-key="${key}"
                                data-baixa-vendeu-for="${key}">
                        </label>
                        <label>
                            Vendeu
                            <input type="number" min="0" max="${item.qtd}" step="1" inputmode="numeric"
                                value="${vendida}"
                                data-baixa-key="${key}"
                                data-baixa-preco="${item.preco}"
                                data-baixa-custo="${item.custo}">
                        </label>
                    </div>
                </div>
            `;
        })
        .join("");

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

    const atualizarPreview = () => {
        let pecas = 0;
        let receita = 0;
        let custo = 0;
        box.querySelectorAll("[data-baixa-key]").forEach((input) => {
            let q = Number(input.value) || 0;
            if (q < 0) q = 0;
            const levouInput = box.querySelector(`[data-baixa-levou-key="${input.dataset.baixaKey}"]`);
            const max = levouInput ? Number(levouInput.value) || 0 : q;
            if (q > max) q = max;
            pecas += q;
            receita += q * (Number(input.dataset.baixaPreco) || 0);
            custo += q * (Number(input.dataset.baixaCusto) || 0);
        });
        document.getElementById("baixa-pecas").textContent = String(pecas);
        document.getElementById("baixa-receita").textContent = formatBRLAdmin(receita);
        document.getElementById("baixa-custo").textContent = formatBRLAdmin(custo);
        document.getElementById("baixa-lucro").textContent = formatBRLAdmin(receita - custo);
    };

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
    document.getElementById("baixa-modal").close();
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

function showTab(tab) {
    const target = tab === "planilha" || tab === "vendas" ? "mais" : tab;
    const titles = {
        financeiro: "Início",
        rotas: "Viagem",
        aprazo: "Fiado",
        produtos: "Produtos",
        mais: "Mais"
    };

    document.querySelectorAll(".sidebar__link[data-page]").forEach((b) => {
        b.classList.toggle("active", b.dataset.page === target);
    });
    // compat com tabs antigas, se existirem
    document.querySelectorAll(".tab[data-tab]").forEach((b) => {
        b.classList.toggle("active", b.dataset.tab === target);
    });

    ["financeiro", "rotas", "aprazo", "produtos", "mais"].forEach((name) => {
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
    if (target === "produtos") {
        renderProdutos();
        renderProdutosCustomLista();
    }
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
