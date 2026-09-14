from pathlib import Path
import re

s = Path(r"c:\Users\Administrador\Project\queijos_marques\script.js").read_text(encoding="utf-8")
c = Path(r"c:\Users\Administrador\Project\queijos_marques\custos.js").read_text(encoding="utf-8")
m = re.search(r"const PRECOS_PADRAO = \{([\s\S]*?)\n\};", c)
padrao = {}
for km in re.finditer(r"(\d+):\s*([\d.]+)", m.group(1)):
    padrao[int(km.group(1))] = float(km.group(2))

items = []
cur = {}
for line in s.splitlines():
    id_m = re.search(r"^\s*id:\s*(\d+)", line)
    nome_m = re.search(r'^\s*nome:\s*"([^"]+)"', line)
    preco_m = re.search(r"^\s*preco:\s*([\d.]+)", line)
    if id_m:
        cur = {"id": int(id_m.group(1))}
    if nome_m and cur:
        cur["nome"] = nome_m.group(1)
    if preco_m and cur and "id" in cur:
        cur["preco"] = float(preco_m.group(1))
        items.append(cur)
        cur = {}

print(f"produtos: {len(items)}  padrao: {len(padrao)}")
diffs = []
for it in items:
    p = padrao.get(it["id"])
    mark = ""
    if p is None:
        mark = " NO_PADRAO"
    elif abs(p - it["preco"]) > 0.001:
        mark = f" DIFF padrao={p}"
        diffs.append(it["id"])
    print(f"{it['id']:3d} R${it['preco']:7.2f}{mark:20s} {it['nome']}")
print("diffs", diffs)
