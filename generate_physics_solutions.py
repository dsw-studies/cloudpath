from __future__ import annotations

import html
import json
import re
import subprocess
from io import BytesIO
from pathlib import Path
from xml.sax.saxutils import escape

from matplotlib.mathtext import math_to_image
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Image, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "physics-authored.js"
OUTPUT = ROOT / "output" / "pdf" / "Fizyka_I_lista_1_rozwiazania_RU.pdf"
FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")
pdfmetrics.registerFont(TTFont("Study", str(FONT_DIR / "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("Study-Bold", str(FONT_DIR / "DejaVuSans-Bold.ttf")))


def extract_cards() -> list[dict]:
    runner = r'''
const fs=require('fs'),vm=require('vm'),cards=new Map();
const document={head:{append(){}},body:{append(){}},querySelector(s){if(!s.startsWith('#task-'))return null;const n=Number(s.slice(6));return {classList:{add(){}},set innerHTML(v){cards.set(n,v)}}},querySelectorAll(){return[]},createElement(){return {classList:{add(){}},setAttribute(){}}}};
vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),{document,window:{},location:{}});
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const result=[];for(let n=1;n<=26;n++){const h=cards.get(n)||'';const match=r=>{const m=h.match(r);return m?m[1]:''};const steps=[...h.matchAll(/<section class="solution-step">([\s\S]*?)<\/section>/g)].map(m=>({title:plain((m[1].match(/<b>([\s\S]*?)<\/b>/)||[])[1]||''),body:plain((m[1].match(/<p>([\s\S]*?)<\/p>/)||[])[1]||''),answer:plain((m[1].match(/<span class="answer">([\s\S]*?)<\/span>/)||[])[1]||'')}));result.push({title:plain(match(/<h2>([\s\S]*?)<\/h2>/)),prompt:plain(match(/<p class="task-prompt"><b>Условие\.<\/b>([\s\S]*?)<\/p>/)),idea:plain(match(/<p><b>Идея\.<\/b>([\s\S]*?)<\/p>/)),formula:plain(match(/<div class="formula">([\s\S]*?)<\/div>/)).replace(/^\\\[/,'').replace(/\\\]$/,''),steps})}console.log(JSON.stringify(result));
'''
    result = subprocess.run(
        ["node", "-e", runner, str(SOURCE)], check=True, capture_output=True, text=True
    )
    cards = json.loads(result.stdout)
    if len(cards) != 26 or any(not c["title"] or len(c["steps"]) == 0 for c in cards):
        raise ValueError("The 26 authored solution cards could not be extracted completely")
    return cards


def formula_image(formula: str) -> Image | Paragraph:
    if not formula:
        return Paragraph("", STYLES["Body"])
    try:
        stream = BytesIO()
        math_to_image(f"${formula}$", stream, format="png", dpi=220, color="#15394a")
        stream.seek(0)
        # ReportLab's Image accepts the in-memory PNG stream directly; passing
        # an ImageReader here raises a TypeError and silently fell back to raw
        # TeX text in the PDF.
        image = Image(stream)
        image._kind = "proportional"
        image.drawHeight = min(20 * mm, image.drawHeight)
        image.drawWidth = image.imageWidth * image.drawHeight / image.imageHeight
        if image.drawWidth > 165 * mm:
            image.drawWidth = 165 * mm
            image.drawHeight = image.imageHeight * image.drawWidth / image.imageWidth
        return image
    except Exception:
        fallback = formula.replace(r"\quad", "   ").replace(r"\,", " ")
        fallback = re.sub(r"\\(?:mathrm|text|operatorname|left|right)", "", fallback)
        fallback = fallback.replace(r"\frac", "÷").replace(r"\cdot", "·")
        fallback = fallback.replace(r"\sqrt", "√").replace("{", "").replace("}", "")
        return Paragraph(escape(fallback), STYLES["FormulaFallback"])


def footer(canvas, document):
    canvas.saveState()
    canvas.setFont("Study", 8)
    canvas.setFillColor(colors.HexColor("#78909c"))
    canvas.drawString(20 * mm, 12 * mm, "CloudPath · Fizyka 1 · rozwiązania po rosyjsku")
    canvas.drawRightString(190 * mm, 12 * mm, f"{document.page}")
    canvas.restoreState()


styles = getSampleStyleSheet()
STYLES = {
    "Title": ParagraphStyle("StudyTitle", parent=styles["Title"], fontName="Study-Bold", fontSize=20, leading=25, alignment=TA_CENTER, textColor=colors.HexColor("#0b5563"), spaceAfter=8),
    "Sub": ParagraphStyle("StudySub", parent=styles["BodyText"], fontName="Study", fontSize=9, leading=13, alignment=TA_CENTER, textColor=colors.HexColor("#526b77"), spaceAfter=12),
    "Task": ParagraphStyle("TaskTitle", parent=styles["Heading2"], fontName="Study-Bold", fontSize=12, leading=16, textColor=colors.HexColor("#0b5563"), spaceBefore=5, spaceAfter=6),
    "Label": ParagraphStyle("Label", parent=styles["BodyText"], fontName="Study-Bold", fontSize=8.5, leading=12, textColor=colors.HexColor("#0b5563"), spaceAfter=2),
    "Body": ParagraphStyle("Body", parent=styles["BodyText"], fontName="Study", fontSize=8.6, leading=12.4, textColor=colors.HexColor("#182630"), spaceAfter=4),
    "FormulaFallback": ParagraphStyle("FormulaFallback", parent=styles["BodyText"], fontName="Study-Bold", fontSize=9, leading=13, alignment=TA_CENTER, textColor=colors.HexColor("#15394a")),
    "Small": ParagraphStyle("Small", parent=styles["BodyText"], fontName="Study", fontSize=7.5, leading=10, textColor=colors.HexColor("#5a6b73")),
}


def main():
    cards = extract_cards()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, rightMargin=20 * mm, leftMargin=20 * mm, topMargin=18 * mm, bottomMargin=20 * mm, title="Физика I · подробные решения листа 1")
    story = [
        Paragraph("Физика I · лист 1", STYLES["Title"]),
        Paragraph("Подробные решения задач 1.1–1.26 на русском языке. В каждом задании: условие, идея метода, формулы, вычисления и ответ.", STYLES["Sub"]),
        Paragraph("Обозначения: координаты и векторы заданы в СИ, если отдельно не указано иное; g=9,8 м/с². Для броска без сопротивления воздуха предполагается плоская поверхность.", STYLES["Small"]),
        Spacer(1, 5 * mm),
    ]
    for number, card in enumerate(cards, 1):
        block = [Paragraph(f"Задача {number} · {escape(card['title'])}", STYLES["Task"])]
        block.append(Paragraph("Условие. " + escape(card["prompt"]), STYLES["Body"]))
        block.append(Paragraph("Идея решения. " + escape(card["idea"]), STYLES["Body"]))
        equation = formula_image(card["formula"])
        if isinstance(equation, Image):
            formula_box = Table([[equation]], colWidths=[165 * mm])
            formula_box.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#eff7fa")),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#b7d6d4")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]))
            block.extend([formula_box, Spacer(1, 2 * mm)])
        else:
            block.extend([equation, Spacer(1, 2 * mm)])
        for step in card["steps"]:
            cell = [Paragraph(escape(step["title"]), STYLES["Label"]), Paragraph(escape(step["body"]), STYLES["Body"])]
            if step["answer"]:
                cell.append(Paragraph("Ответ: " + escape(step["answer"]), STYLES["Label"]))
            table = Table([[cell]], colWidths=[165 * mm])
            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f0f7f7")),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#b7d6d4")),
                ("LEFTPADDING", (0, 0), (-1, -1), 9), ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]))
            block.extend([table, Spacer(1, 2 * mm)])
        story.append(KeepTogether(block) if len(block) < 8 else block[0])
        if len(block) >= 8:
            story.extend(block[1:])
        story.append(Spacer(1, 3 * mm))
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    main()
