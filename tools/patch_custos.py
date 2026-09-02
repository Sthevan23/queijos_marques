import json
import re
from pathlib import Path

ROOT = Path(r"c:\Users\Administrador\Project\queijos_marques")
precos = json.loads((ROOT / "tools/precos_onesio.json").read_text(encoding="utf-8"))
precos["54"] = 32.0
precos["88"] = 22.0
planilha = json.loads((ROOT / "tools/planilha_onesio.json").read_text(encoding="utf-8-sig"))

precos_js = "const PRECOS_PADRAO = {\n" + ",\n".join(
    f"    {k}: {v}" for k, v in sorted(precos.items(), key=lambda x: int(x[0]))
) + "\n};\n"

planilha_lines = []
for row in planilha:
    onesio = "null" if row["onesio"] is None else f'{row["onesio"]:.2f}'.rstrip("0").rstrip(".")
    nome = row["nome"].replace("ParmesÒo", "Parmesão")
    planilha_lines.append(
        f'    {{ nome: "{nome}", custo: {row["custo"]}, atacado: {row["atacado"]}, onesio: {onesio} }},'
    )
planilha_js = "const PLANILHA_CUSTOS = [\n" + "\n".join(planilha_lines) + "\n];\n"

custos = (ROOT / "custos.js").read_text(encoding="utf-8")
custos = re.sub(r"const PLANILHA_CUSTOS = \[.*?\];", planilha_js.strip(), custos, count=1, flags=re.S)
if "const PRECOS_PADRAO" not in custos:
    custos = custos.replace(
        "/** Custo por id do produto no catálogo (mapeado da planilha). */",
        precos_js + "\n/** Custo por id do produto no catálogo (mapeado da planilha). */",
    )

price_helpers = """
function getPrecoPadrao(id, lista = typeof produtos !== \"undefined\" ? produtos : []) {
    if (PRECOS_PADRAO[id] != null || PRECOS_PADRAO[String(id)] != null) {
        const v = Number(PRECOS_PADRAO[id] ?? PRECOS_PADRAO[String(id)]);
        if (Number.isFinite(v)) return v;
    }
    const p = lista.find((item) => item.id === Number(id));
    return p ? Number(p.preco) || 0 : 0;
}
"""

if "function getPrecoPadrao" not in custos:
    custos = custos.replace(
        "function getPreco(id, lista = typeof produtos !== \"undefined\" ? produtos : []) {",
        price_helpers + "\nfunction getPreco(id, lista = typeof produtos !== \"undefined\" ? produtos : []) {",
    )

custos = re.sub(
    r"function getPreco\(id, lista = typeof produtos !== \"undefined\" \? produtos : \[\]\) \{.*?\n\}",
    """function getPreco(id, lista = typeof produtos !== "undefined" ? produtos : []) {
    const salvos = loadPrecos();
    const key = String(id);
    if (salvos[key] != null || salvos[id] != null) {
        const v = Number(salvos[key] ?? salvos[id]);
        if (Number.isFinite(v)) return v;
    }
    return getPrecoPadrao(id, lista);
}""",
    custos,
    count=1,
    flags=re.S,
)

custos = re.sub(
    r"function aplicarPrecosCatalogo\(lista\) \{.*?\n\}",
    """function aplicarPrecosCatalogo(lista) {
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
}""",
    custos,
    count=1,
    flags=re.S,
)

custos = re.sub(
    r"function resetPrecosCatalogo\(lista\) \{.*?\n\}",
    """function resetPrecosCatalogo(lista) {
    localStorage.removeItem(PRECOS_STORAGE_KEY);
    if (Array.isArray(lista)) {
        lista.forEach((p) => {
            const padrao = getPrecoPadrao(p.id, lista);
            p.precoBase = padrao;
            p.preco = padrao;
        });
    }
}""",
    custos,
    count=1,
    flags=re.S,
)

(ROOT / "custos.js").write_text(custos, encoding="utf-8")
print("custos.js updated")
