from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether
from pathlib import Path
import html
import re

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "output" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)

pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuMono", "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"))

styles = getSampleStyleSheet()
BODY = ParagraphStyle("BodyRU", parent=styles["BodyText"], fontName="DejaVu", fontSize=9.2, leading=13.2, textColor=colors.HexColor("#182230"), spaceAfter=5)
TITLE = ParagraphStyle("TitleRU", parent=styles["Title"], fontName="DejaVu-Bold", fontSize=20, leading=25, alignment=TA_CENTER, textColor=colors.HexColor("#0B5563"), spaceAfter=10)
SUBTITLE = ParagraphStyle("SubtitleRU", parent=BODY, fontSize=10, leading=14, alignment=TA_CENTER, textColor=colors.HexColor("#4B6471"), spaceAfter=16)
H1 = ParagraphStyle("H1RU", parent=styles["Heading1"], fontName="DejaVu-Bold", fontSize=14, leading=18, textColor=colors.HexColor("#0B5563"), spaceBefore=10, spaceAfter=7)
H2 = ParagraphStyle("H2RU", parent=styles["Heading2"], fontName="DejaVu-Bold", fontSize=11, leading=15, textColor=colors.HexColor("#16394A"), spaceBefore=7, spaceAfter=5)
BOX = ParagraphStyle("BoxRU", parent=BODY, backColor=colors.HexColor("#EEF7F7"), borderColor=colors.HexColor("#A8DADC"), borderWidth=.6, borderPadding=7, spaceBefore=4, spaceAfter=8)
MONO = ParagraphStyle("MonoRU", parent=BODY, fontName="DejaVuMono", fontSize=8.1, leading=11.4, leftIndent=6, backColor=colors.HexColor("#F5F7F9"), borderPadding=6)
SMALL = ParagraphStyle("SmallRU", parent=BODY, fontSize=7.8, leading=10.5, textColor=colors.HexColor("#50606C"))

def esc(s):
    return html.escape(str(s)).replace("\n", "<br/>")

def p(story, text, style=BODY):
    story.append(Paragraph(text, style))

def mono(story, text):
    p(story, esc(text), MONO)

def task(story, n, title, paragraphs):
    story.append(Paragraph(f"Задание {n}. {title}", H2))
    for text, style in paragraphs:
        story.append(Paragraph(text, style))
    story.append(Spacer(1, 3*mm))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("DejaVu", 7.5)
    canvas.setFillColor(colors.HexColor("#6A7A86"))
    canvas.drawString(18*mm, 10*mm, "CloudPath · подробные решения на русском языке")
    canvas.drawRightString(192*mm, 10*mm, f"стр. {doc.page}")
    canvas.restoreState()

def build(filename, heading, source, intro, tasks, appendix):
    doc = SimpleDocTemplate(str(OUT/filename), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=17*mm, bottomMargin=17*mm, title=heading, author="CloudPath")
    story=[]
    p(story, heading, TITLE)
    p(story, f"Источник: {source}<br/>Формат: полное пошаговое решение с объяснением понятий", SUBTITLE)
    p(story, intro, BOX)
    for item in tasks:
        task(story, *item)
    story.append(PageBreak())
    p(story, "Краткий справочник формул и методов", H1)
    for title, text in appendix:
        p(story, title, H2); p(story, text, BODY)
    p(story, "Проверка: ответы получены из условий исходного листа; перед сдачей рекомендуется сверить принятые преподавателем обозначения ℕ (с нулём или без нуля) и универсальное множество для дополнений.", SMALL)
    doc.build(story, onFirstPage=footer, onLaterPages=footer)

    # Publish the same authored solutions as a first-class CloudPath lesson.
    # The PDF is only an optional download: the main reading experience is HTML.
    page_names = {
        "ALG_lista_1_rozwiazania_RU.pdf": "algebra-list-1.html",
        "AN1_lista_1_rozwiazania_RU.pdf": "analysis-list-1.html",
        "AN1_lista_2_rozwiazania_RU.pdf": "analysis-list-2.html",
    }
    page_name = page_names.get(filename)
    if page_name:
        def web_matrix(match):
            body = match.group(1)
            rows = re.split(r"\],\s*\[", body)
            latex_rows = [row.replace(",", "&") for row in rows]
            return r"\(\begin{bmatrix}" + r"\\".join(latex_rows) + r"\end{bmatrix}\)"

        def web_text(value):
            value = html.unescape(value)
            value = re.sub(r"\[\[([\s\S]*?)\]\]", web_matrix, value)
            value = html.escape(value)
            value = value.replace("&lt;b&gt;", "<b>").replace("&lt;/b&gt;", "</b>")
            return value.replace("\n", "<br>")

        cards = []
        for number, title, paragraphs in tasks:
            body = "".join(f'<p class="solution-copy">{web_text(text)}</p>' for text, _style in paragraphs)
            cards.append(
                f'<article class="lesson-card solution-card" id="task-{number}">'
                f'<span class="lesson-number">ЗАДАНИЕ {number}</span><h2>{title}</h2>{body}</article>'
            )
        appendix_html = "".join(
            f'<article class="lesson-card"><h2>{title}</h2><p>{web_text(text)}</p></article>'
            for title, text in appendix
        )
        pdf_path = f"output/pdf/{filename}"
        if page_name == "algebra-list-1.html":
            visual = '<figure class="lesson-figure"><svg viewBox="0 0 680 190" role="img" aria-label="Схема умножения матриц по совместимым размерностям"><rect x="60" y="44" width="170" height="100" rx="8" fill="#163647" stroke="#61ddc5" stroke-width="3"/><rect x="270" y="44" width="170" height="100" rx="8" fill="#163647" stroke="#80b9e9" stroke-width="3"/><rect x="480" y="44" width="140" height="100" rx="8" fill="#163647" stroke="#f2ca70" stroke-width="3"/><text x="128" y="100" fill="#e9f3ff" font-size="25">A · m×n</text><text x="331" y="100" fill="#e9f3ff" font-size="25">B · n×p</text><text x="512" y="100" fill="#e9f3ff" font-size="25">C · m×p</text><path d="M232 94H263M443 94H473" stroke="#c3d7e3" stroke-width="3"/><text x="225" y="35" fill="#82e0ca" font-size="14">n=n</text><text x="278" y="172" fill="#9fb7c8" font-size="14">внутренние размеры должны совпасть; внешние задают ответ</text></svg><figcaption>Геометрический тест совместимости матриц перед умножением.</figcaption></figure>'
        elif page_name == "analysis-list-1.html":
            visual = '<figure class="lesson-figure"><svg viewBox="0 0 620 155" role="img" aria-label="Таблица истинности для импликации"><rect x="80" y="25" width="460" height="112" rx="12" fill="#102637" stroke="#3b6174"/><path d="M80 62H540M80 99H540M190 25V137M300 25V137M420 25V137" stroke="#3b6174"/><text x="118" y="50" fill="#cfe2ed">p</text><text x="226" y="50" fill="#cfe2ed">q</text><text x="329" y="50" fill="#cfe2ed">¬p</text><text x="449" y="50" fill="#82e0ca">p⇒q</text><text x="126" y="87" fill="#cfe2ed">1</text><text x="236" y="87" fill="#cfe2ed">0</text><text x="337" y="87" fill="#cfe2ed">0</text><text x="467" y="87" fill="#f2ca70">0</text><text x="126" y="125" fill="#cfe2ed">0</text><text x="236" y="125" fill="#cfe2ed">1</text><text x="337" y="125" fill="#cfe2ed">1</text><text x="467" y="125" fill="#82e0ca">1</text></svg><figcaption>Импликация ложна только в одном случае: истинная предпосылка и ложное следствие.</figcaption></figure>'
        else:
            visual = '<figure class="lesson-figure"><svg viewBox="0 0 620 170" role="img" aria-label="Схема включения стандартных числовых множеств"><rect x="58" y="26" width="500" height="116" rx="50" fill="#142c40" stroke="#80b9e9" stroke-width="2"/><rect x="105" y="43" width="390" height="82" rx="40" fill="#18374a" stroke="#61ddc5" stroke-width="2"/><rect x="151" y="58" width="300" height="52" rx="25" fill="#204354" stroke="#f2ca70" stroke-width="2"/><text x="78" y="91" fill="#cfe2ed" font-size="18">ℝ</text><text x="128" y="91" fill="#cfe2ed" font-size="18">ℚ</text><text x="174" y="91" fill="#f2ca70" font-size="18">ℤ</text><text x="217" y="91" fill="#82e0ca" font-size="18">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</text></svg><figcaption>Числовые множества вложены друг в друга: любое натуральное число является целым, рациональным и вещественным.</figcaption></figure>'
        html_page = f'''<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#0b1420"><meta name="robots" content="noindex,nofollow,noarchive">
<title>{html.escape(heading)} · CloudPath</title><link rel="icon" href="cloudpath-icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="dashboard.css?v=20261024-1"><link rel="stylesheet" href="enhanced.css?v=20261024-2">
<link rel="stylesheet" href="study-sections.css?v=20261024-2"><link rel="stylesheet" href="authored-study.css?v=20261024-1">
<script>window.MathJax={{tex:{{inlineMath:[["\\\\(","\\\\)"]],displayMath:[["\\\\[","\\\\]"]]}},svg:{{fontCache:"global"}}}};</script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script></head>
<body><nav class="toc" aria-label="Навигация CloudPath"></nav><main class="main"><article class="material-page">
<header class="material-hero"><a class="material-back" href="tasks.html">← Все задания</a><p class="material-subject">{html.escape(heading.split(':')[0])}</p>
<h1>{html.escape(heading)}</h1><p>{html.escape(intro)}</p><div class="material-actions"><a class="material-button primary" href="#{'task-1'}">Перейти к заданиям</a><a class="material-button" href="{pdf_path}" download>Скачать PDF-версию ↗</a></div></header>
<section class="material-summary"><h2>Как устроен разбор</h2><p>Каждая задача оформлена отдельно. Обозначения, правила и важные ограничения объясняются рядом с вычислением; матрицы набраны как математические формулы.</p></section>{visual}
<section class="authored-content">{''.join(cards)}</section><section class="authored-content"><h2>Справочные правила</h2>{appendix_html}</section>
<aside class="source-note">Источник условий: {html.escape(source)}. Решения предназначены для изучения метода; сверяй обозначения с тем, которые использует преподаватель.</aside>
</article><footer>CloudPath · DSW Ideis</footer></main><script src="site-enhancements.js?v=20261024-3"></script></body></html>'''
        (ROOT / page_name).write_text(html_page, encoding="utf-8")

logic_tasks = [
("1", "Высказывания и значения истинности", [
("<b>Понятие.</b> Высказывание - повествовательное предложение, которому можно однозначно приписать истину или ложь.", BODY),
("а) «Не знаю» - зависит от говорящего и контекста, поэтому не является математическим высказыванием. б) «3 нечётно» - высказывание, <b>истина</b>. в) Δ=b²-4ac - формула с неопределёнными переменными, не замкнутое высказывание. г) 2·4=15 - высказывание, <b>ложь</b>. д) вопрос - не высказывание. е) вопрос - не высказывание. ж) «Я лжец» - самореференциальный парадокс, стандартного значения истинности в классической логике не имеет. з) «Вроцлав был столицей Польши» - повествовательное историческое высказывание; в принятом учебном контексте <b>истина</b> (историческая столица в раннем Средневековье).", BODY)]),
("2", "Проверка тавтологий", [
("Проверяем преобразованиями или таблицей истинности. а) ¬¬p⇔p - тавтология. б) p∨¬p - закон исключённого третьего, тавтология. в) коммутативность ∨ - тавтология. г) ассоциативность ∧ - тавтология. д) дистрибутивность ∧ относительно ∨ - тавтология. е) контрапозиция - тавтология. ж) ¬(p∨q)⇔(¬p∧¬q) - закон де Моргана, тавтология. з) ¬(p∧q)⇔(¬p∨¬q) - закон де Моргана, тавтология. и) [(p∨q)∧¬p]⇒q - дизъюнктивный силлогизм, тавтология. к) [p∧¬p]⇒q - из противоречия следует любое высказывание, тавтология.", BODY)]),
("3", "Запись фразы символами", [("Фраза означает ¬p∧¬q. По закону де Моргана это равносильно <b>¬(p∨q)</b>: неверно, что дождь шёл хотя бы в один из двух дней.", BODY)]),
("4", "Упрощение формулы", [("¬{[(¬p)∨(¬q)]∧[¬(¬p)]}. Сначала ¬¬p=p, поэтому внутри: (¬p∨¬q)∧p. Раскрываем: (p∧¬p)∨(p∧¬q)=0∨(p∧¬q)=p∧¬q. Отрицание даёт <b>¬p∨q</b>, то есть p⇒q.", BODY)]),
("5", "Истинность словесных высказываний", [("а) Форма p⇔¬¬p, всегда истинна. б) (-1)^44=1, поэтому первая часть ложна; 2023 нечётно - истина; ложь∨истина = <b>истина</b>. в) sin x периодична - истина; 3x нечётна - истина; конъюнкция - <b>истина</b>.", BODY)]),
("6", "Множества истинности предикатов", [
("а) [2,∞). б) [2,4). в) полуплоскость x≥2. г) прямая y=x. д) полуплоскость ниже прямой y=x (x&lt;y). е) x≤-y, то есть область x+y≤0. ж) только точка (0,0). з) замкнутый круг радиуса 2. и) вся плоскость без (0,0). к) I и III четверти вместе с осями плюс замкнутый единичный круг. л) пустое множество, потому что |xy|≥0. м) ¬(xy&lt;1), то есть xy≥1. н) импликация с невозможной предпосылкой |xy|&lt;0 всегда истинна, поэтому вся плоскость.", BODY)]),
("7", "Уравнения и неравенства", [
("а) 1/(x-2)=2, ОДЗ x≠2. Получаем 1=2x-4, x=5/2. б) |6-3x|&lt;1 ⇔ -1&lt;6-3x&lt;1 ⇔ 5/3&lt;x&lt;7/3. в) |x-1|=3 ⇔ x-1=3 или x-1=-3, поэтому x=4 или x=-2.", BODY),
("г) (x²-4)/(x²-5x)&lt;0. Критические точки: -2,0,2,5; 0 и 5 исключены. Метод интервалов даёт <b>(-2,0)∪(2,5)</b>. д) log₂(x²-4x)&gt;1/16. Основание 2&gt;1, значит x²-4x&gt;2^(1/16). Корни соответствующего квадратного уравнения: 2±√(4+2^(1/16)); ответ x&lt;2-√(4+2^(1/16)) или x&gt;2+√(4+2^(1/16)). Условие логарифма автоматически выполнено.", BODY)]),
("8", "Истинность высказываний с кванторами", [
("а) Истина: x&gt;2 ⇒ x²&gt;4. б) Ложь: условие x²&gt;4 допускает x&lt;-2; например x=-3, но -3&gt;2 неверно. в) Истина: x²+1&gt;0. г) Истина, достаточно x=√2023 или x=-√2023. д) Ложь: при x&lt;0 √x в ℝ не определён; при x≥0 второе условие ложно. е) Истина: для любого x верно |x|=0 или x≠0. ж) Ложь: при x=0 невозможно 0·y=2023. з) Ложь: не существует наименьшего действительного числа. и) Истина: для любого y можно взять x=y-1.", BODY)]),
("9", "Отрицания кванторных высказываний", [
("Используем ¬∀=∃¬ и ¬∃=∀¬. а) ∃x&gt;2: x²≤4. б) ∃x∈ℝ: x²&gt;4 и x≤2. в) ∃x∈ℝ: x²+1≤0. г) ∀x∈ℝ: x²-2023≠0. д) ∃x∈ℝ: ¬(√x≥0∧x&lt;0). е) ∀x∈ℝ: |x|≠0∧x=0. ж) ∃x∈ℝ ∀y∈ℝ: xy≠2023. з) ∀x∈ℝ ∃y∈ℝ: x≥y. и) ∃y∈ℝ ∀x∈ℝ: x≥y.", BODY)]),
("10", "Тавтологии без таблиц", [
("а) Предположим левую часть и p∧r∧t. Из p⇒q получаем q, из r⇒s - s, из t⇒u - u; значит q∧s∧u. Формула тавтологична. б) Формула <b>не тавтология</b>. Из двух импликаций следует лишь ¬(p∧q), то есть ¬p∨¬q, но не обязательно одновременно ¬p∧¬q∧¬r. Контрпример: p=0, q=1, r=1. Обе посылки истинны, заключение ложно.", BODY)]),
("11", "Порядок кванторов", [
("p: ∀x∈ℝ ∃f:ℝ→ℝ f(x)=0 - истина: для каждого x можно выбрать нулевую функцию (даже одну и ту же). q: ∀f ∃x f(x)=0 - ложь, контрпример f(x)=1. Тогда p=1, q=0. (p∨q)⇒(p∧q) = 1⇒0 =0; p⇒q=1⇒0=0; вся импликация 0⇒0=<b>истина</b>.", BODY)]),
("12", "Добавление предпосылок к тавтологии", [("Если Λ - тавтология, она истинна при любом наборе значений. Импликация Ψn⇒Λ всегда истинна, потому что её заключение истинно. Повторяя рассуждение справа налево, получаем истинность всей цепочки Ψ1⇒(Ψ2⇒…⇒(Ψn⇒Λ)…).", BODY)])]

logic_appendix=[
("Основные связки", "¬p - отрицание; p∧q - «и»; p∨q - «или»; p⇒q ложно только при p=1, q=0; p⇔q истинно при одинаковых значениях."),
("Законы де Моргана", "¬(p∧q)⇔¬p∨¬q; ¬(p∨q)⇔¬p∧¬q. Для кванторов: ¬∀x P(x)⇔∃x ¬P(x); ¬∃x P(x)⇔∀x ¬P(x)."),
("Метод интервалов", "Найти нули числителя и знаменателя, расположить их на числовой оси, определить знак на каждом интервале, затем учесть строгий/нестрогий знак и ОДЗ.")]

set_tasks=[
("1", "Элементы множеств", [
("а) {a,b,c}. б) {a,b}: повторения не учитываются. в) {a}. г) один элемент {a}, то есть {{a}}. д) три элемента: {{a}}, {a}, a. е) два элемента: {a,b,c} и c. ж) ∅. з) одноэлементное множество {∅}. Если принять ℕ={0,1,2,…}: и) {0,1,2}; к) {2}; л) {0,1,2}; остальные натуральные примеры ниже даны с этим соглашением.", BODY),
("м) ∅, так как √7 иррационально. н) {-1}. о) x²-8x+1&lt;0 между корнями 4±√15; натуральные: {1,2,3,4,5,6,7}. п) ∅. р) [-√3,√3]. с) 1/(x-2)&gt;2 ⇒ (5-2x)/(x-2)&gt;0 ⇒ (2,5/2). т) |2x-2|=2 ⇒ x=0 или 2. у) ℝ, потому что модуль ≥0≥-2. ф) (4x+1)/(2x-3)≤1 ⇒ (2x+4)/(2x-3)≤0 ⇒ [-2,3/2). х) |x²+3x-4|≤0 ⇒ выражение=0 ⇒ {-4,1}. ц) {-1,0,1}. ы) {x∈ℕ:2&lt;x&lt;3}=∅.", BODY)]),
("2", "Отношения включения", [
("а) B⊂A. б) ни A⊂B, ни B⊂A. в) A=∅⊂B. г) ∅⊂B. д) B={a}⊂A. е) B⊂A. ж) общие элементы {a} и b, но ни одно множество не включено в другое ({∅}≠∅). з) A=B. и) B⊂A. к) B⊂A (линейный многочлен - частный случай квадратного с коэффициентом a=0). л) ℕ⊂ℤ⊂ℚ⊂ℝ. м) равносторонние ⊂ равнобедренные. н) квадраты ⊂ прямоугольники. о) ни одно не включено в другое: квадрат площади 1 имеет периметр 4, но множество B содержит только такие квадраты; здесь фактически B⊂A, если «квадрат площади 1» имеет сторону 1 и периметр 4.", BODY),
("Для пункта й: B={целые |x|&gt;2}⊂A={действительные |x|&gt;2}; C=(2,∞)⊂A, но B и C несравнимы (например -3∈B, не C; 2.5∈C, не B).", BODY)]),
("3", "Операции с интервалами", [("A=(-∞,-3], B=(-10,8], C=[-4,8), D={8}. а) A∪C=(-∞,8). б) B∪D=(-10,8]. в) B∩C=[-4,8). г) D∩C=∅. д) A\\C=(-∞,-4). е) C\\B=∅, потому что C⊂B. ж) C\\(A∪B)=∅. з) A'=(-3,∞). и) B\\C=(-10,-4)∪{8}; поэтому (B\\C)'=(-∞,-10]∪[-4,8)∪(8,∞).", BODY)]),
("4", "Дополнения интервалов", [("E=[2,6), F=[3,8], универсум ℝ. а) F'=(-∞,3)∪(8,∞). б) (E')'=E=[2,6). в) E'∪F=(-∞,2)∪[3,∞). г) E∩F'=[2,3), его дополнение (-∞,2)∪[3,∞). д) E∩F=[3,6), дополнение (-∞,3)∪[6,∞). е) F\\E=[6,8], дополнение (-∞,6)∪(8,∞).", BODY)]),
("5", "Квадратные неравенства и разность", [("K: (x-2)(x-7)≤0, значит K=[2,7]. M: √((x-5)²)&gt;1, то есть |x-5|&gt;1, значит M=(-∞,4)∪(6,∞). K'=(-∞,2)∪(7,∞). K'\\M=∅, потому что обе части K' лежат в M. Дополнение этого множества относительно ℝ равно <b>ℝ</b>.", BODY)]),
("6", "Объединение, пересечение и разности", [
("а) A={a,b,c}, B={c,d} (точка в исходнике трактуется как опечатка): A∪B={a,b,c,d}; A∩B={c}; A\\B={a,b}; B\\A={d}. б) A={{a,b},c}, B={c,d}: union={{a,b},c,d}; intersection={c}; A\\B={{a,b}}; B\\A={d}. в) union={{z},x,y,a}; intersection={x,y}; A\\B={{z}}; B\\A={a}.", BODY),
("г) A={{a,{a}},a}, B={a,{a}}: union={{a,{a}},a,{a}}; intersection={a}; A\\B={{a,{a}}}; B\\A={{a}}. д) A={a,{a},{b}}, B={{a},{b}}: union=A; intersection=B; A\\B={a}; B\\A=∅. е) A={0,1,2}, B={3,4,…}: union=ℕ, intersection=∅, A\\B=A, B\\A=B. ж) A=∅, B={2}: union={2}, intersection=∅, A\\B=∅, B\\A={2}.", BODY)]),
("7", "Декартово произведение конечных множеств", [("A×B={(1,a),(1,b),(1,c),(2,a),(2,b),(2,c)}. B×A={(a,1),(a,2),(b,1),(b,2),(c,1),(c,2)}. Порядок координат важен.", BODY)]),
("8", "Декартовы произведения на плоскости", [
("а) A×B: вертикальная полоса 0≤x≤1 и вертикальная прямая x=2, но только при |y|≥2. B×A: |x|≥2, а y∈[0,1]∪{2}. б) A×B=[0,1]×[0,2], прямоугольник; B×A=[0,2]×[0,1]. в) A×B=({0,1}∪[2,3))×[0,2]; B×A=[0,2]×({0,1}∪[2,3)). г) A×B=[2,∞)×(0,2); B×A=(0,2)×[2,∞). д) A×B=[2,∞)×{2}; B×A={2}×[2,∞).", BODY)]),
("9", "Доказательства тождеств", [("а) x∈A∩B ⇔ x∈A и x∈B ⇔ x∈B∩A. б) обе стороны означают «x принадлежит хотя бы одному из A,B,C». в) обе стороны означают x∈A и (x∈B или x∈C). г) элемент A\\B по определению не принадлежит B, поэтому пересечение пусто. д) по де Моргану x∈A'∩B' ⇔ x∉A и x∉B ⇔ x∉A∪B.", BODY)]),
("10", "Проверка равенств", [
("а) Истина; разбор по принадлежности C показывает, что элементы A∩C возвращаются второй частью. б) В общем случае <b>ложь</b>: левая часть равна C\\(A∪B), а не всему C. Контрпример A=C={1}, B=∅. в) Истина - закон поглощения. г) В общем случае ложь: пары имеют обратный порядок; равенство возможно, например при A=B (или при пустых множествах).", BODY)]),
("11", "Обобщённые объединения и пересечения", [
("а) Fn={n}: объединение = {1,2,3,…}=ℕ₊; пересечение =∅. б) Fn=[0,n]: объединение [0,∞), пересечение [0,1]. в) Fn=(-1/n,1/n): объединение (-1,1), потому что самый широкий интервал при n=1; пересечение {0}. г) Fn=(-1/n,n): объединение (-1,∞), пересечение [0,1] при n начиная с 1 (0 включён всегда; 1 принадлежит всем, так как правый конец n открыт и n&gt;1 для n&gt;1, а при n=1 1 исключён - поэтому корректно <b>[0,1)</b>).", BODY)]),
("12", "Симметрическая разность", [("A△B=(A\\B)∪(B\\A). Для A=(-∞,-3], B=(-10,8]: A\\B=(-∞,-10]; B\\A=(-3,8]. Поэтому A△B=(-∞,-10]∪(-3,8].", BODY)]),
("13", "Формула включений-исключений", [("Только французский: |F|-|F∩E|-|F∩R|+|F∩E∩R| =17-8-13+5=<b>1</b>. Французский, но не русский: |F|-|F∩R|=17-13=<b>4</b> (сюда входят и знающие английский, если не знают русский).", BODY)]),
("14", "Булeан - множество всех подмножеств", [
("а) P({a,b,c})={∅,{a},{b},{c},{a,b},{a,c},{b,c},{a,b,c}}. б) P(∅)={∅}. в) P({∅})={∅,{∅}}. г) Пусть u={{a}}, v={a}, w=a. Тогда P(A) содержит 8 множеств: ∅,{u},{v},{w},{u,v},{u,w},{v,w},{u,v,w}; после подстановки это полный ответ без смешивания уровней вложенности.", BODY)])]

set_appendix=[
("Операции", "A∪B: принадлежит хотя бы одному; A∩B: принадлежит обоим; A\\B: принадлежит A, но не B; A'=U\\A; A△B=(A\\B)∪(B\\A)."),
("Декартово произведение", "A×B={(a,b):a∈A,b∈B}. Обычно A×B≠B×A, потому что (a,b) и (b,a) - разные упорядоченные пары."),
("Включения-исключения", "Для трёх множеств: |A∪B∪C|=|A|+|B|+|C|-|A∩B|-|A∩C|-|B∩C|+|A∩B∩C|.")]

matrix_tasks=[
("1", "Типы и размеры матриц", [
("Квадратные: A(2×2), B(2×2), D,E,F,I₃ (3×3), I₂ (2×2). Степени 3: D,E,F,I₃. Размер 2×3: C. Четыре столбца: H(1×4). Диагональные: I₂ и I₃ (также нулевая матрица была бы диагональной). Нижнетреугольные: F, I₂, I₃. Симметричные: I₂, I₃. Единичные: I₂, I₃. Все перечисленные матрицы ненулевые. Главная диагональ - элементы aᵢᵢ: A=(2,4), B=(2,-4), D=(1,-1,0), E=(2,0,0), F=(1,1,1).", BODY)]),
("2", "Действия над матрицами", [
("Правило: складывать можно только одинаковые размеры; произведение m×n на n×k имеет размер m×k. Поэтому C-3E и A-C² не определены (несовпадающие размеры; C² тоже не определено).", BODY),
("а) A+B=[[4,0],[0,0]]. б) 2A-B=[[2,-9],[-3,12]]. г) D-Fᵀ=[[0,-1,-2],[0,-2,3],[2,-4,-1]]. д) (A-B)C=[[0,-18,-6],[-2,20,2]]. е) Cᵀ(A+B)=[[4,0],[8,0],[12,0]]. ж) DEF=[[-1,2,-1],[-5,6,-2],[-2,4,-2]]. з) FI₃=F. и) B³=[[8,45],[15,-82]]. к) E⁴=[[35,56,57],[25,39,41],[27,21,48]]. л) GH=[[4,8,12,16],[3,6,9,12],[2,4,6,8],[1,2,3,4]].", BODY)]),
("3", "Свойства и некоммутативность", [
("а) D+E=E+D по покомпонентному сложению. б) (AB)ᵀ=BᵀAᵀ=[[1,2],[18,-19]]. в) GH - матрица 4×4, а HG=[[20]] размера 1×1, значит равенства нет. г) (A-B)²=[[12,-48],[-16,76]], тогда как A²-2AB+B²=[[12,-60],[-12,76]]. Причина: (A-B)²=A²-AB-BA+B²; заменить -AB-BA на -2AB можно только если AB=BA. Исключительные случаи: коммутирующие матрицы; для GH=HG - совместимые квадратные матрицы, которые коммутируют.", BODY)]),
("4", "Проверка размеров выражений", [
("A 4×2, B 3×2, C 2×4. а) A+B не определено. б) C-2Aᵀ: обе 2×4, результат 2×4. в) CA: (2×4)(4×2)=2×2; затем ·Bᵀ (2×3) ⇒ 2×3. г) AB не определено (2≠3). д) BAᵀ: (3×2)(2×4)=3×4; умножение на Cᵀ (4×2) ⇒3×2. е) C+Aᵀ имеет размер 2×4; B(3×2)·(...) ⇒3×4.", BODY)]),
("5", "Нахождение неизвестных", [
("а) После умножения [x,2,1]·M получаем [x,2x+2,3x+5]. Скалярное произведение с [x,2,0]ᵀ равно x²+2(2x+2)=(x+2)². Следовательно x=-2. б) Правая транспонированная матрица равна [[3,y],[6,z]]. Сравниваем элементы: 2(x+2)=3 ⇒ x=-1/2; 2(y+3)=y ⇒ y=-6; 2·3=6 выполняется; 0=z ⇒ z=0.", BODY)]),
("6", "Нильпотентность и произведение", [
("а) [[-6,-9],[4,6]]²=[[36-36,54-54],[-24+24,-36+36]]=0. б) Перемножая матрицы 3×4 и 4×3, получаем строки [1,0,0], [0,1,0], [0,0,1], то есть I₃. Это пример правой обратной прямоугольной матрицы.", BODY)]),
("7", "Матричные уравнения без обращения матриц", [
("а) Решая по столбцам систему [[2,1],[3,2]]X=[[1,2],[3,4]], получаем X=[[-1,0],[3,2]]. б) Складываем первое уравнение и подходящую комбинацию: из X-Y=P и -X+4Y=Q следует 3Y=P+Q, Y=(P+Q)/3, X=P+Y. При P=[[0,2],[3,-1]], Q=[[3,2],[0,4]]: Y=[[1,4/3],[1,1]], X=[[1,10/3],[4,0]].", BODY),
("в) XP=Q даёт X=[[-4,3],[-6,5]]. г) В X·diag(1,2,0)=2(X-N) второй столбец слева и справа приводит к условию 0= -2N₂; но N₂=[0,4]ᵀ≠0, поэтому решений нет. д) X+Y=I и X-Y=J (матрица с единицами на побочной диагонали): X=(I+J)/2, Y=(I-J)/2.", BODY)]),
("8", "Гипотеза для степеней", [
("а) A=[[1,1],[0,1]] ⇒ Aⁿ=[[1,n],[0,1]]. б) Матрица меняет местами 1-ю и 3-ю координаты: A²=I, поэтому Aⁿ=A при нечётном n и I при чётном. в) A²=I, та же чётность. г) A имеет блок [[1,1],[1,1]] на координатах 1 и 3; Aⁿ=[[2^(n-1),0,2^(n-1)],[0,1,0],[2^(n-1),0,2^(n-1)]] для n≥1.", BODY)]),
("9", "Применение матриц: витамины", [
("а) Умножаем A·[5,10,8]ᵀ. Получаем [66,41,46,60]ᵀ единиц по 0,1 мг для B₁,B₂,B₆,C соответственно. б) Вектор цен [0,15;0,25;0,30;0,50] умножаем слева на A. Стоимость витаминного содержимого единицы продуктов: [1,85;2,35;3,90] zł.", BODY)]),
("10", "Матричный многочлен", [("Сначала A²=[[7,4,7],[4,9,6],[3,5,4]]. Затем f(A)=2A²-5A+5I₃=[[19,-7,9],[-2,18,2],[1,5,8]]. Порядок действий тот же, что для числового многочлена, но свободный член 5 означает 5I₃.", BODY)]),
("11", "Матрицы, коммутирующие с A", [("Пусть X=[[x,y],[z,w]]. Из AX=XA получаем y=3z и w=x+3z; остальные уравнения совпадают. Поэтому все решения: <b>X=[[α,3β],[β,α+3β]]</b>, где α,β∈ℝ.", BODY)]),
("12", "Разложение Холецкого", [("Ищем L=[[l11,0,0],[l21,l22,0],[l31,l32,l33]] с положительной диагональю. Последовательно: l11=√1=1; l21=-2; l31=1; l22=√(5-4)=1; l32=(-3-l31·l21)/l22=-1; l33=√(6-l31²-l32²)=2. Ответ L=[[1,0,0],[-2,1,0],[1,-1,2]]. Прямое умножение LLᵀ возвращает исходную матрицу.", BODY)]),
("13", "Матрица расстояний", [("Пример для Варшавы, Берлина, Праги и Вены (округлённые дорожные расстояния, км): D=[[0,575,680,680],[575,0,350,680],[680,350,0,335],[680,680,335,0]]. Диагональ нулевая, а Dᵀ=D, потому что расстояние i→j принято равным j→i. В учебной работе допустимы другие города и проверенные расстояния.", BODY)])]

matrix_appendix=[
("Размеры", "Сумма требует одинакового размера. Для AB число столбцов A равно числу строк B; результат имеет внешние размеры."),
("Транспонирование", "(A+B)ᵀ=Aᵀ+Bᵀ; (AB)ᵀ=BᵀAᵀ - порядок множителей меняется."),
("Степени", "A⁰=I; Aⁿ=A·A·…·A. Раскрытие (A-B)² даёт A²-AB-BA+B²; формула со -2AB верна лишь при AB=BA."),
("Холецкий", "Для симметричной положительно определённой матрицы S существует единственная нижнетреугольная L с положительной диагональю, такая что S=LLᵀ.")]

build("AN1_lista_1_rozwiazania_RU.pdf", "Математический анализ 1: логика и кванторы", "DSW_AN1_L1SN_20262027.pdf", "В этом листе важны три навыка: отличать высказывание от открытой формулы, применять равносильные преобразования и правильно менять кванторы при отрицании.", logic_tasks, logic_appendix)
build("AN1_lista_2_rozwiazania_RU.pdf", "Математический анализ 1: алгебра множеств", "DSW_AN1_L2SN_20262027.pdf", "Все дополнения ниже берутся относительно ℝ, если в пункте не сказано иначе. Принято ℕ={0,1,2,…}; если преподаватель использует ℕ={1,2,…}, в конечных перечислениях нужно убрать 0.", set_tasks, set_appendix)
build("ALG_lista_1_rozwiazania_RU.pdf", "Линейная алгебра: матрицы и действия", "DSW_ALG_L1SN_20262027.pdf", "Матрица - прямоугольная таблица чисел. Размер m×n означает m строк и n столбцов. Перед каждым действием сначала проверяем размеры - это предотвращает большинство ошибок.", matrix_tasks, matrix_appendix)
print("generated", *(str(p) for p in sorted(OUT.glob("*_RU.pdf"))), sep="\n")
