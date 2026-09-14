"""Apply CATÁLOGO MARQUÊS MINEIRO retail prices to script.js + custos.js"""
import re
from pathlib import Path

ROOT = Path(r"c:\Users\Administrador\Project\queijos_marques")

# id -> preço de venda do PDF (valores não-zero do catálogo)
PRECOS = {
    # tradicionais (pág 2-3)
    0: 60,   # palito
    1: 60,   # trança
    2: 60,   # nozinho
    3: 75,   # kit trançinha
    4: 60,   # reino
    5: 60,   # provolone
    6: 75,   # kit provoleto
    7: 85,   # kit provolone c/lombo
    8: 75,   # kit quatro queijos
    9: 60,   # cabacinha
    10: 60,  # minas padrão
    11: 80,  # minas goiabada
    12: 80,  # minas
    13: 60,  # frescal
    14: 65,  # trança vinho
    15: 60,  # coalho
    16: 65,  # requeijão barra
    # chips (pág 4-5)
    17: 40, 18: 40, 19: 45, 20: 40, 21: 45, 22: 40, 23: 40,
    # especiais (pág 6)
    24: 70,  # requeijão búfala
    25: 85,  # búfala trufado
    26: 70,  # minas zero lactose
    28: 70,  # mussarela búfala
    29: 90,  # palito mussarela búfala (não listado claro; mantém)
    30: 65,  # palito zero lactose
    31: 85,  # gruyere
    # trufados (pág 7-8) — preços visíveis do catálogo
    32: 65,  # damasco avelã
    33: 65,  # tomate seco
    34: 65,  # cheddar
    35: 65,  # azeitona
    36: 65,  # cheddar carne seca
    37: 65,  # requeijão
    38: 65,  # goiabada
    39: 70,  # nutella
    40: 65,  # doce de leite
    41: 65,  # requeijão carne seca
    # finos (pág 9-11)
    42: 130, # canastra meia-cura
    43: 70,  # parmesão cunha
    44: 195, # serjão
    45: 75,  # kit parmesão artesanal
    46: 180, # moldura (sem preço claro no PDF; mantém)
    47: 45,  # gorgonzola
    48: 150, # barreirinha
    49: 70,  # kit especial real → 70 no PDF
    50: 180, # johnne
    51: 195, # reinaldo
    52: 85,  # kit parmesão
    53: 45,  # burrata
    54: 70,  # morbier
    55: 45,  # brie
    56: 45,  # camembert (PDF 45)
    57: 45,  # bolinha
    58: 50,  # grana
    59: 140, # colonial
    # diversos / salames / rosquinhas / doces
    60: 85, 61: 70, 62: 115,
    63: 38, 64: 40, 66: 38, 67: 50,
    69: 45, 70: 45, 71: 45, 72: 45, 73: 45, 74: 45,
    75: 45, 76: 45, 77: 75, 78: 45, 79: 45, 80: 45, 81: 45, 82: 45,
    83: 65, 84: 45, 85: 50, 86: 45, 87: 45, 88: 45,
    89: 60, 90: 45, 91: 45, 92: 60, 93: 45, 94: 45, 95: 45, 96: 55,
}

# --- script.js: replace preco inside each product block by id ---
script = (ROOT / "script.js").read_text(encoding="utf-8")

def repl_block(m):
    block = m.group(0)
    id_m = re.search(r"id:\s*(\d+)", block)
    if not id_m:
        return block
    pid = int(id_m.group(1))
    if pid not in PRECOS:
        return block
    price = PRECOS[pid]
    return re.sub(r"preco:\s*[\d.]+", f"preco: {price:.2f}", block, count=1)

# Replace object literals that have id + preco close together
script2 = re.sub(
    r"\{\s*id:\s*\d+,[\s\S]*?preco:\s*[\d.]+",
    lambda m: repl_block(m) if "imagem:" in m.group(0) or "categoria:" in m.group(0) else m.group(0),
    script,
)

# Safer: line-by-line state machine on static itens
out = []
cur_id = None
for line in script.splitlines(True):
    id_m = re.search(r"^\s*id:\s*(\d+)\s*,", line)
    if id_m:
        cur_id = int(id_m.group(1))
    if cur_id is not None and re.search(r"^\s*preco:\s*[\d.]+", line) and cur_id in PRECOS:
        line = re.sub(r"(preco:\s*)[\d.]+", lambda m: f"{m.group(1)}{PRECOS[cur_id]:.2f}", line)
        cur_id = None
    out.append(line)
(ROOT / "script.js").write_text("".join(out), encoding="utf-8")

# --- custos.js PRECOS_PADRAO ---
custos = (ROOT / "custos.js").read_text(encoding="utf-8")
body = ",\n".join(f"    {k}: {v:.1f}" for k, v in sorted(PRECOS.items()))
new_block = (
    "/**\n"
    " * Preços de VENDA do catálogo PDF \"CATÁLOGO MARQUÊS MINEIRO\".\n"
    " */\n"
    "const PRECOS_PADRAO = {\n" + body + "\n};"
)
custos = re.sub(
    r"/\*\*[\s\S]*?\*/\s*const PRECOS_PADRAO = \{[\s\S]*?\n\};",
    new_block,
    custos,
    count=1,
)
custos = custos.replace('marques_precos_v2', 'marques_precos_v3')
# also clear old keys when applying
if "marques_precos_v1" not in custos or "removeItem(\"marques_precos_v1\")" not in custos:
    custos = custos.replace(
        "function aplicarPrecosCatalogo(lista) {\n    const salvos = loadPrecos();",
        "function aplicarPrecosCatalogo(lista) {\n"
        "    try {\n"
        "        localStorage.removeItem(\"marques_precos_v1\");\n"
        "        localStorage.removeItem(\"marques_precos_v2\");\n"
        "    } catch (e) {}\n"
        "    const salvos = loadPrecos();",
    )
(ROOT / "custos.js").write_text(custos, encoding="utf-8")
print("ok", len(PRECOS), "prices")
