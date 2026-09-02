import re
import json
import unicodedata
from pathlib import Path

exec(open(r"c:\Users\Administrador\Project\queijos_marques\tools\parse_onesio.py", encoding="utf-8").read().split("CATALOG =")[0])
lookup = {**valor_un, **onesio}

def norm(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii").lower().strip()
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s

src = Path(r"c:\Users\Administrador\Project\queijos_marques\custos.js").read_text(encoding="utf-8")
block = src.split("const PLANILHA_CUSTOS = [", 1)[1].split("];", 1)[0]
rows = []
for line in block.split("\n"):
    m = re.search(r'\{ nome: "([^"]+)", custo: ([0-9.]+), atacado: ([0-9.]+) \}', line)
    if m:
        name, custo, atacado = m.group(1), float(m.group(2)), float(m.group(3))
        n = norm(name)
        val = lookup.get(n)
        if val is None:
            for k, v in lookup.items():
                if n in k or k in n:
                    val = v
                    break
        rows.append({"nome": name, "custo": custo, "atacado": atacado, "onesio": val})

Path(r"c:\Users\Administrador\Project\queijos_marques\tools\planilha_onesio.json").write_text(
    json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(f"saved {len(rows)} rows")
