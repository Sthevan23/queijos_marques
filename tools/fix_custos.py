from pathlib import Path
import re

ROOT = Path(r"c:\Users\Administrador\Project\queijos_marques")
prev = (ROOT / "tools/custos_prev.js").read_text(encoding="utf-8")
cur = (ROOT / "custos.js").read_text(encoding="utf-8")

m = re.search(r"(const PLANILHA_CUSTOS = \[[\s\S]*?\n\];)", prev)
if not m:
    raise SystemExit("no planilha in prev")
planilha = m.group(1)

if "const PRECOS_PADRAO" not in cur:
    raise SystemExit("no PRECOS_PADRAO in current")

# Current file wrongly starts with PRECOS — rebuild properly
precos_m = re.search(r"(const PRECOS_PADRAO = \{[\s\S]*?\n\};)", cur)
if not precos_m:
    raise SystemExit("precos block missing")
precos = precos_m.group(1)

# Everything after PRECOS_PADRAO block in current (CUSTOS_PADRAO onwards)
after = cur[precos_m.end():].lstrip()
# If CUSTOS_PADRAO missing, take from prev
if "const CUSTOS_PADRAO" not in after:
    after_m = re.search(r"(const CUSTOS_PADRAO = \{[\s\S]*)", prev)
    after = after_m.group(1)

# Fix storage + clear helpers in after from prev if needed
if "marques_precos_v3" not in after and "PRECOS_STORAGE_KEY" in after:
    after = after.replace("marques_precos_v2", "marques_precos_v3")
    after = after.replace("marques_precos_v1", "marques_precos_v3")

new = (
    "/**\n"
    " * Planilha de custos + preços de VENDA do catálogo Marques Mineiro.\n"
    " */\n"
    f"{planilha}\n\n"
    "/** Preços de VENDA do PDF CATÁLOGO MARQUÊS MINEIRO. */\n"
    f"{precos}\n\n"
    f"{after}"
)

# Ensure clear old price caches on apply
if 'removeItem("marques_precos_v1")' not in new:
    new = new.replace(
        "function aplicarPrecosCatalogo(lista) {\n    const salvos = loadPrecos();",
        "function aplicarPrecosCatalogo(lista) {\n"
        '    try {\n'
        '        localStorage.removeItem("marques_precos_v1");\n'
        '        localStorage.removeItem("marques_precos_v2");\n'
        "    } catch (e) {}\n"
        "    const salvos = loadPrecos();",
    )

# Force storage key v3
new = re.sub(
    r'const PRECOS_STORAGE_KEY = "[^"]+";',
    'const PRECOS_STORAGE_KEY = "marques_precos_v3";',
    new,
)

(ROOT / "custos.js").write_text(new, encoding="utf-8")
text = (ROOT / "custos.js").read_text(encoding="utf-8")
print("PLANILHA", "const PLANILHA_CUSTOS" in text)
print("PRECOS", "0: 60.0" in text)
print("CUSTOS", "const CUSTOS_PADRAO" in text)
print("API", "apiRotas" in text or "syncRotasDoServidor" in text)
print("len", len(text))
