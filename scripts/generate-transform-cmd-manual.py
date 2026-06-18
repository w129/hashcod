from __future__ import annotations

import hashlib
import subprocess
from datetime import datetime, timedelta, timezone
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Flowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
EXPORTS = ROOT / "exports"
PDF_PATH = EXPORTS / "Hashcod-Transform-CMD-Manual-v1.0.pdf"
MD_PATH = EXPORTS / "Hashcod-Transform-CMD-Manual-v1.0.md"
SHA_PATH = PDF_PATH.with_suffix(PDF_PATH.suffix + ".sha256")
DR_TZ = timezone(timedelta(hours=-4))
ISSUED_AT = datetime.now(DR_TZ)

INK = colors.HexColor("#111111")
MUTED = colors.HexColor("#5F6468")
GRID = colors.HexColor("#D5D8DB")
LIGHT = colors.HexColor("#F3F5F6")
GREEN = colors.HexColor("#17663A")
BLUE = colors.HexColor("#123A5B")
WHITE = colors.white

OPERATIONS = [
    ("sha256-domain", "CRYPTO", "SHA-256 con dominio aislado", "digest SHA-256 de domain | value"),
    ("hmac-sha256", "CRYPTO", "Etiqueta HMAC-SHA-256", "HMAC local; usa clave opcional o dominio del comando"),
    ("pbkdf2-sha256", "CRYPTO", "Derivacion PBKDF2-SHA-256", "sal local; iteraciones = 8000 + perfil x 1000"),
    ("hkdf-sha256", "CRYPTO", "Derivacion HKDF-SHA-256", "salt local e info Hashcod-HCX-P{perfil}"),
    ("hash-chain", "CRYPTO", "Cadena iterada SHA-256", "rondas = 2 + (perfil mod 8)"),
    ("base64-encode", "CONVERT", "Conversion UTF-8 a Base64", "conversion reversible; no es cifrado"),
    ("base64-decode", "CONVERT", "Restauracion Base64 a UTF-8", "valida y decodifica Base64"),
    ("hex-encode", "CONVERT", "Conversion UTF-8 a hexadecimal", "conversion reversible; no es cifrado"),
    ("hex-decode", "CONVERT", "Restauracion hexadecimal a UTF-8", "requiere pares completos de bytes"),
    ("url-encode", "CONVERT", "Codificacion URL component", "protege caracteres reservados para transporte"),
    ("url-decode", "CONVERT", "Restauracion URL component", "decodifica transporte URL"),
    ("rotate-left", "TRANSFORM", "Rotacion determinista a la izquierda", "desplazamiento dependiente del perfil"),
    ("rotate-right", "TRANSFORM", "Rotacion determinista a la derecha", "inversa conceptual de rotate-left"),
    ("xor-mask", "TRANSFORM", "Mascara XOR de laboratorio", "salida hexadecimal; reversible con misma mascara"),
    ("reverse-blocks", "TRANSFORM", "Inversion por bloques", "ancho = 4 + (perfil mod 13)"),
    ("chunk-delimit", "FORMAT", "Segmentacion con guiones", "ancho = 4 + (perfil mod 13)"),
    ("window-sample", "ANALYZE", "Muestra determinista por ventana", "offset guiado por SHA-256 y perfil"),
    ("checksum-envelope", "FORMAT", "Sobre con integridad SHA-256", "domain | SHA256 | VALUE"),
    ("json-envelope", "FORMAT", "Sobre de transporte JSON", "incluye dominio, perfil, valor y SHA-256"),
    ("entropy-report", "ANALYZE", "Reporte de entropia y perfil", "chars, bytes, unique, entropy, estimatedBits y SHA-256"),
]


def git_value(*parts: str) -> str:
    return subprocess.check_output(
        ["git", *parts], cwd=ROOT, text=True, encoding="utf-8"
    ).strip()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest().upper()


def command_rows() -> list[dict[str, object]]:
    rows = []
    for index in range(1000):
        number = index + 1
        profile = index // len(OPERATIONS) + 1
        operation, category, summary, detail = OPERATIONS[index % len(OPERATIONS)]
        width = 4 + profile % 13
        rounds = 2 + profile % 8
        iterations = 8000 + profile * 1000
        parameters = f"P{profile}; width={width}; rounds={rounds}; PBKDF2={iterations}"
        rows.append(
            {
                "id": f"hcx{number:04d}",
                "profile": profile,
                "operation": operation,
                "category": category,
                "summary": summary,
                "detail": detail.format(perfil=profile),
                "parameters": parameters,
            }
        )
    return rows


class TerminalLogo(Flowable):
    def __init__(self, size: float = 42):
        super().__init__()
        self.width = size
        self.height = size
        self.size = size

    def draw(self):
        canvas = self.canv
        s = self.size
        canvas.saveState()
        canvas.setStrokeColor(INK)
        canvas.setLineWidth(max(1.5, s * 0.075))
        canvas.setLineCap(1)
        canvas.setLineJoin(1)
        canvas.roundRect(s * 0.16, s * 0.08, s * 0.68, s * 0.84, s * 0.06, stroke=1, fill=0)
        canvas.line(s * 0.58, s * 0.92, s * 0.58, s * 0.71)
        canvas.line(s * 0.58, s * 0.71, s * 0.84, s * 0.71)
        canvas.line(s * 0.30, s * 0.48, s * 0.40, s * 0.39)
        canvas.line(s * 0.40, s * 0.39, s * 0.30, s * 0.30)
        canvas.line(s * 0.50, s * 0.23, s * 0.70, s * 0.23)
        canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(ParagraphStyle("TitleCustom", fontName="Helvetica-Bold", fontSize=25, leading=29, textColor=INK, spaceAfter=3))
styles.add(ParagraphStyle("SubtitleCustom", fontName="Helvetica", fontSize=10, leading=14, textColor=MUTED, spaceAfter=8))
styles.add(ParagraphStyle("Kicker", fontName="Helvetica-Bold", fontSize=7.3, leading=9, textColor=BLUE, tracking=1.4, spaceAfter=4))
styles.add(ParagraphStyle("H1Custom", fontName="Helvetica-Bold", fontSize=14, leading=17, textColor=BLUE, spaceBefore=8, spaceAfter=5))
styles.add(ParagraphStyle("H2Custom", fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=INK, spaceBefore=5, spaceAfter=3))
styles.add(ParagraphStyle("BodyCustom", fontName="Helvetica", fontSize=8.7, leading=12, textColor=INK, spaceAfter=4))
styles.add(ParagraphStyle("SmallCustom", fontName="Helvetica", fontSize=7.1, leading=9, textColor=MUTED))
styles.add(ParagraphStyle("Cell", fontName="Helvetica", fontSize=6.4, leading=7.5, textColor=INK))
styles.add(ParagraphStyle("CellMono", fontName="Courier", fontSize=6.3, leading=7.3, textColor=INK))
styles.add(ParagraphStyle("CellHead", fontName="Helvetica-Bold", fontSize=6.7, leading=7.8, textColor=WHITE))
styles.add(ParagraphStyle("PageTitle", fontName="Helvetica-Bold", fontSize=8, leading=9.5, textColor=BLUE, alignment=TA_CENTER))


def p(text: str, style: str = "BodyCustom") -> Paragraph:
    return Paragraph(text, styles[style])


def table(data, widths, header=True, font_size=7):
    output = Table(data, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.25, GRID),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("FONTSIZE", (0, 0), (-1, -1), font_size),
    ]
    if header:
        commands.extend(
            [
                ("BACKGROUND", (0, 0), (-1, 0), INK),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
            ]
        )
    for row_index in range(1 if header else 0, len(data)):
        if row_index % 2 == 0:
            commands.append(("BACKGROUND", (0, row_index), (-1, row_index), LIGHT))
    output.setStyle(TableStyle(commands))
    return output


def create_markdown(rows: list[dict[str, object]], commit: str):
    def cell(value: object) -> str:
        return str(value).replace("|", r"\|")

    lines = [
        "# Hashcod Transform CMD - Manual v1.0",
        "",
        f"- Emitido: {ISSUED_AT.isoformat()}",
        f"- Commit: `{commit}`",
        "- Catalogo: `hcx0001` a `hcx1000`",
        "",
        "## Proposito",
        "",
        "Transform CMD toma codes guardados en la base de datos local de Hashcod, permite estudiarlos, convertirlos, derivarlos y guardar resultados nuevos.",
        "",
        "Las familias `CRYPTO` usan Web Crypto. Las familias `CONVERT`, `FORMAT`, `TRANSFORM` y `ANALYZE` son utilidades reproducibles y no deben presentarse como cifrado.",
        "",
        "## Uso rapido",
        "",
        "1. Abre `TRANSFORM CMD` desde la barra superior o inferior.",
        "2. Selecciona un code guardado.",
        "3. Escribe `help` para ver la sintaxis.",
        "4. Ejecuta una transformacion, por ejemplo: `run hcx0001`.",
        "5. Guarda el resultado con `save` o exportalo con `export json`.",
        "",
        "## Comandos de consola",
        "",
        "| Comando | Funcion |",
        "| --- | --- |",
        "| `help` | Muestra la sintaxis disponible. |",
        "| `list [pagina]` | Muestra una pagina del catalogo. |",
        "| `find <texto>` | Filtra por ID, operacion o categoria. |",
        "| `select <fila>` | Selecciona un code guardado por numero de fila. |",
        "| `show` | Imprime el valor actual del editor. |",
        "| `run <hcxID>` | Ejecuta un comando HCX. |",
        "| `chain <id,id,...>` | Encadena hasta 12 comandos HCX. |",
        "| `save` | Guarda el resultado en la base de datos. |",
        "| `copy` | Copia el valor actual. |",
        "| `export json` | Descarga un manifiesto JSON. |",
        "| `export txt` | Descarga el resultado TXT. |",
        "| `history` | Lista ejecuciones de la sesion. |",
        "| `reset` | Restaura el code original seleccionado. |",
        "| `clear` | Limpia la terminal. |",
        "",
        "## Catalogo completo",
        "",
        "| ID | Categoria | Perfil | Operacion | Funcion | Parametros |",
        "| --- | --- | --- | --- | --- | --- |",
    ]
    for row in rows:
        lines.append(
            f"| `{row['id']}` | {cell(row['category'])} | P{row['profile']} | `{row['operation']}` | {cell(row['summary'])}. {cell(row['detail'])}. | {cell(row['parameters'])} |"
        )
    MD_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def first_page(story, rows, commit):
    logo_header = Table(
        [[TerminalLogo(47), [p("Hashcod", "TitleCustom"), p("TRANSFORM CMD / TECHNICAL USER MANUAL", "Kicker")]]],
        colWidths=[0.68 * inch, 8.7 * inch],
    )
    logo_header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 0)]))
    story.extend(
        [
            logo_header,
            Spacer(1, 0.06 * inch),
            p("Manual operativo de la consola de transformacion de codes guardados", "SubtitleCustom"),
            table(
                [
                    [p("<b>Version</b>", "CellHead"), p("<b>Catalogo</b>", "CellHead"), p("<b>Commit</b>", "CellHead"), p("<b>Emision</b>", "CellHead")],
                    [p("1.0", "Cell"), p("hcx0001 - hcx1000", "CellMono"), p(commit[:12], "CellMono"), p(ISSUED_AT.strftime("%Y-%m-%d %H:%M AST"), "CellMono")],
                ],
                [1.1 * inch, 2.0 * inch, 2.0 * inch, 2.4 * inch],
            ),
            Spacer(1, 0.12 * inch),
            p("1. Objetivo", "H1Custom"),
            p("Hashcod Transform CMD toma codes guardados en la base de datos de la plataforma y permite convertirlos, derivarlos, estudiarlos, encadenar transformaciones y guardar resultados como nuevos registros."),
            p("Las operaciones CRYPTO usan Web Crypto del navegador. Las operaciones CONVERT, FORMAT, TRANSFORM y ANALYZE son utilidades reproducibles; no equivalen por si solas a cifrado ni demuestran seguridad criptografica."),
            p("2. Acceso", "H1Custom"),
            p("Abre el icono de flechas laterales con puntos desde la barra superior o inferior. Tambien puedes escribir open transformcmd en la consola general de Hashcod."),
            p("3. Flujo recomendado", "H1Custom"),
            table(
                [
                    [p("<b>Paso</b>", "CellHead"), p("<b>Accion</b>", "CellHead"), p("<b>Resultado</b>", "CellHead")],
                    [p("01", "CellMono"), p("Selecciona un code guardado.", "Cell"), p("El editor carga su valor original.", "Cell")],
                    [p("02", "CellMono"), p("Usa find, list o help.", "Cell"), p("Localizas un comando adecuado.", "Cell")],
                    [p("03", "CellMono"), p("Ejecuta run hcx0001 o chain hcx0001,hcx0005.", "Cell"), p("El editor recibe la transformacion.", "Cell")],
                    [p("04", "CellMono"), p("Revisa metricas y terminal.", "Cell"), p("Compruebas longitud, entropia y trazabilidad.", "Cell")],
                    [p("05", "CellMono"), p("Usa save o export json.", "Cell"), p("Guardas o descargas el resultado.", "Cell")],
                ],
                [0.6 * inch, 4.3 * inch, 4.2 * inch],
            ),
            p("4. Comandos de control", "H1Custom"),
            table(
                [
                    [p("<b>Comando</b>", "CellHead"), p("<b>Funcion</b>", "CellHead"), p("<b>Ejemplo</b>", "CellHead")],
                    [p("help", "CellMono"), p("Muestra la sintaxis disponible.", "Cell"), p("help", "CellMono")],
                    [p("list [pagina]", "CellMono"), p("Lista una pagina del catalogo.", "Cell"), p("list 3", "CellMono")],
                    [p("find &lt;texto&gt;", "CellMono"), p("Filtra ID, categoria u operacion.", "Cell"), p("find hkdf", "CellMono")],
                    [p("select &lt;fila&gt;", "CellMono"), p("Selecciona un code guardado.", "Cell"), p("select 2", "CellMono")],
                    [p("run &lt;hcxID&gt;", "CellMono"), p("Ejecuta una transformacion.", "Cell"), p("run hcx0001", "CellMono")],
                    [p("chain &lt;id,id&gt;", "CellMono"), p("Encadena hasta 12 transformaciones.", "Cell"), p("chain hcx0001,hcx0019", "CellMono")],
                    [p("save / copy", "CellMono"), p("Guarda en DB o copia el editor.", "Cell"), p("save", "CellMono")],
                    [p("export json|txt", "CellMono"), p("Descarga manifiesto o texto.", "Cell"), p("export json", "CellMono")],
                    [p("history / reset / clear", "CellMono"), p("Historial, restaurar y limpiar terminal.", "Cell"), p("reset", "CellMono")],
                ],
                [2.0 * inch, 4.8 * inch, 2.3 * inch],
            ),
            PageBreak(),
            p("5. Familias de transformacion", "H1Custom"),
        ]
    )
    family_rows = [[p("<b>Base</b>", "CellHead"), p("<b>Categoria</b>", "CellHead"), p("<b>Funcion</b>", "CellHead"), p("<b>Detalle</b>", "CellHead")]]
    for operation, category, summary, detail in OPERATIONS:
        family_rows.append([p(operation, "CellMono"), p(category, "CellMono"), p(summary, "Cell"), p(detail, "Cell")])
    story.extend(
        [
            table(family_rows, [1.6 * inch, 0.8 * inch, 2.8 * inch, 4.3 * inch]),
            Spacer(1, 0.12 * inch),
            p("6. Como se generan los 1000 comandos", "H1Custom"),
            p("El catalogo combina 20 operaciones base con 50 perfiles: 20 x 50 = 1000 comandos. Cada perfil ajusta parametros reproducibles: ancho de bloque, rondas de hash-chain, iteraciones PBKDF2, dominio aislado y datos de contexto HKDF."),
            p("Formula de perfil: profile = floor((numero - 1) / 20) + 1. Formula de ancho: width = 4 + (profile mod 13). Formula de rondas: rounds = 2 + (profile mod 8). PBKDF2: iterations = 8000 + profile x 1000."),
            p("7. Catalogo completo", "H1Custom"),
            p(f"Las siguientes tablas documentan los {len(rows)} comandos disponibles.", "SmallCustom"),
        ]
    )


def build_pdf(rows: list[dict[str, object]], commit: str):
    EXPORTS.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=landscape(letter),
        rightMargin=0.35 * inch,
        leftMargin=0.35 * inch,
        topMargin=0.42 * inch,
        bottomMargin=0.42 * inch,
        title="Hashcod Transform CMD Manual v1.0",
        author="Hashcod",
        subject="Manual de la consola Transform CMD y catalogo hcx0001-hcx1000",
    )
    story = []
    first_page(story, rows, commit)
    chunk_size = 34
    for start in range(0, len(rows), chunk_size):
        chunk = rows[start : start + chunk_size]
        data = [[p("<b>ID</b>", "CellHead"), p("<b>Categoria</b>", "CellHead"), p("<b>Perfil</b>", "CellHead"), p("<b>Operacion</b>", "CellHead"), p("<b>Funcion exacta</b>", "CellHead"), p("<b>Parametros</b>", "CellHead")]]
        for row in chunk:
            data.append(
                [
                    p(str(row["id"]), "CellMono"),
                    p(str(row["category"]), "CellMono"),
                    p(f"P{row['profile']}", "CellMono"),
                    p(str(row["operation"]), "CellMono"),
                    p(f"{row['summary']}. {row['detail']}.", "Cell"),
                    p(str(row["parameters"]), "CellMono"),
                ]
            )
        story.append(table(data, [0.75 * inch, 0.7 * inch, 0.42 * inch, 1.25 * inch, 4.65 * inch, 1.65 * inch], font_size=6.3))
        if start + chunk_size < len(rows):
            story.append(PageBreak())

    def decorate(canvas, document):
        canvas.saveState()
        canvas.setStrokeColor(GRID)
        canvas.line(0.35 * inch, 0.30 * inch, 10.65 * inch, 0.30 * inch)
        canvas.setFont("Helvetica", 6.8)
        canvas.setFillColor(MUTED)
        canvas.drawString(0.35 * inch, 0.16 * inch, "Hashcod Transform CMD Manual v1.0")
        canvas.drawRightString(10.65 * inch, 0.16 * inch, f"Page {document.page}")
        canvas.restoreState()

    doc.build(story, onFirstPage=decorate, onLaterPages=decorate)


def main():
    EXPORTS.mkdir(parents=True, exist_ok=True)
    rows = command_rows()
    commit = git_value("rev-parse", "HEAD")
    create_markdown(rows, commit)
    build_pdf(rows, commit)
    digest = sha256_file(PDF_PATH)
    SHA_PATH.write_text(f"{digest}  {PDF_PATH.name}\n", encoding="ascii")
    pages = len(PdfReader(str(PDF_PATH)).pages)
    print(f"created {PDF_PATH.name}: {PDF_PATH.stat().st_size} bytes, {pages} pages")
    print(f"created {MD_PATH.name}: {MD_PATH.stat().st_size} bytes")
    print(f"sha256 {digest}")


if __name__ == "__main__":
    main()
