import fitz
import re
import json
import unicodedata
from pathlib import Path

def norm(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii").lower().strip()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s

def money(s):
    if not s.startswith("R$"):
        return None
    return float(s.replace("R$", "").replace(".", "").replace(",", ".").strip())

SUPPLIERS = {
    "divino", "celinho", "vila caipira", "bom da fazenda", "kirk", "bubacanastra", "giba",
    "eduardo", "agruque", "quero queijo", "amanda", "aucelia", "vicosa", "vale da canastra",
    "patrick", "julio", "top da serra", "van ita", "manta bufala",
}

doc = fitz.open(r"c:\Users\Administrador\Downloads\Custo Queijo (1).pdf")
onesio = {}
valor_un = {}

for pi in range(2):
    lines = [l.strip() for l in doc[pi].get_text().split("\n") if l.strip()]
    i = 0
    while i < len(lines):
        if i + 7 < len(lines) and norm(lines[i + 1]) in SUPPLIERS:
            name = lines[i].strip()
            o = money(lines[i + 6])
            if o is not None:
                onesio[norm(name)] = o
            i += 8
            continue
        if money(lines[i]) and i > 0:
            prev = lines[i - 1]
            if not prev.startswith("R$") and norm(prev) not in SUPPLIERS:
                p = money(lines[i])
                if p and norm(prev) not in {"onesio", "atacado", "valor un", "lista de queijos", "descricao", "fornecedor", "custo", "gramatura", "c peca", "peca c desconto"}:
                    valor_un[norm(prev)] = p
        i += 1

# Catalog mapping: id -> search keys (priority)
CATALOG = {
    0: ["palito puro"],
    1: ["tranca temperada", "tranca pura"],
    2: ["nozinho puro"],
    3: ["kit trancinha"],
    4: ["reino"],
    5: ["provolone com salame", "provolone com salame temperado"],
    6: ["kit provoleto"],
    7: ["kit provolone c salame"],
    8: ["4 queijo"],
    9: ["cabacinha"],
    10: ["minas padrao"],
    11: ["queijo minas"],
    12: ["queijo minas"],
    13: ["frescal light puro"],
    14: ["tranca de vinho"],
    15: ["queijo coalho"],
    16: ["requeijao"],
    17: ["palito puro", "desidrtado zero lactose"],
    18: ["palito temperado"],
    19: ["desidratado goiabada", "desidrtado zero lactose"],
    20: ["desidratados variados"],
    21: ["desidratados coalho e goiabada", "coalho desidratado"],
    22: ["palito temperado"],
    23: ["palito temperado"],
    24: ["requeijao de bufala"],
    25: ["trufado bufala"],
    26: ["minas zero lactose"],
    28: ["mussarela de bufala"],
    29: ["mussarela de bufala", "bolinha de bufala"],
    30: ["palito zero lactose"],
    31: ["gruyere"],
    32: ["trufado damasco avela 1 2", "trufado damasco avela"],
    33: ["trufado tomate seco 1 2", "trufado tomate seco"],
    34: ["trufado puro no vacuo"],
    35: ["trufado azeitona 1 2", "trufado azeitona"],
    36: ["trufado cheddar carne seca 1 2", "trufado cheddar carne seca"],
    37: ["trufado puro no vacuo"],
    38: ["trufado doces"],
    39: ["trufado nutella"],
    40: ["trufado doces"],
    41: ["trufado requeijao carne seca"],
    42: ["canastra divino"],
    43: ["parmesao", "parmesao cunha defumado"],
    44: ["queijo serjao"],
    45: ["kit parmesao"],
    46: ["canastra divino"],
    47: ["queijo gorgonzola", "gorgonzola"],
    48: ["canastra divino"],
    49: ["canastra divino"],
    50: ["canastra divino"],
    51: ["canastra divino"],
    52: ["kit parmesao"],
    53: ["burrata"],
    54: ["queijo morbier", "morbier"],
    55: ["queijo brie", "bree"],
    56: ["camembert", "bree"],
    57: ["bolinha de bufala"],
    58: ["granapadano"],
    59: ["canastra divino"],
    60: ["salame juliatto inteiro", "jamon puro"],
    61: ["picanha suina"],
    62: ["costela"],
    63: ["geleias uai variadas", "geleia uai pimenta def"],
    64: ["manteiga 500 gramas"],
    66: ["geleia mostarda maracuja trem bao", "geleia mostarda marac"],
    67: ["mel bisnaga", "mel julio 800 ml"],
    69: ["rosquinha nata"],
    70: ["casadinho"],
    71: ["casadinho"],
    72: ["rosquinha nata"],
    73: ["beliscao"],
    74: ["casadinho"],
    75: ["lombos", "lombo puro"],
    76: ["lombos", "lombo alho"],
    77: ["salame fatiado"],
    78: ["lombos", "jamon azeitona"],
    79: ["lombos", "lombo calabresa"],
    80: ["frango"],
    81: ["frango"],
    82: ["lombos", "lombo puro"],
    83: ["vicosa 800"],
    84: ["vicosa 800"],
    85: ["goiabada zelia 800", "goiabada barra 600"],
    86: ["faduni", "bananada"],
    87: ["pacoca"],
    88: ["bala banana sem acucar", "bala banana sem acuc"],
    89: ["faduni"],
    90: ["doce leite rocca", "rocca doce de leite"],
    91: ["doce leite rocca"],
    92: ["doce leite vimilk diet", "doce leite blue zero", "faduni zero"],
    93: ["doce de leite vmilk plastico 700"],
    94: ["bala serra negra"],
    95: ["pingo goiaba"],
    96: ["cocada prove e aprove"],
}

def lookup(keys):
    for key in keys:
        k = norm(key)
        if k in onesio:
            return onesio[k], "onesio"
        if k in valor_un:
            return valor_un[k], "valor_un"
    return None, None

precos = {}
meta = {}
for pid, keys in CATALOG.items():
    val, src = lookup(keys)
    if val is not None:
        precos[pid] = val
        meta[pid] = {"keys": keys, "src": src, "val": val}

missing = [pid for pid in CATALOG if pid not in precos]
print("mapped", len(precos), "missing", missing)
print(json.dumps(precos, indent=2))
Path(r"c:\Users\Administrador\Project\queijos_marques\tools\precos_onesio.json").write_text(json.dumps(precos, indent=2), encoding="utf-8")
