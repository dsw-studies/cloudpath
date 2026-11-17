# PROGRESS — CloudPath (DSW Informatyka, Ćw1S + WykS)

Обновлено: 2026-11-16. Node нет, python запускать с `-X utf8 -I`. Git нет.

## Сделано
- Расписание обновлено по `Plany (3).pdf` (`schedule.js`, бэкап `schedule.js.bak`).
- Пересборка конспектов и решений из Drive (папка `dsw`), на русском:
  - **Физика**: `physics-lectures.html` (лекции 1–4 + формулы), `physics-list-2.html` (задачи 2.1–2.17). Список 1 — `physics-list-1.html` (рендерится `physics-authored.js`).
  - **Анализ**: `analysis-list-1.html` (исправлено задание 6), `analysis-list-2.html` (переписан целиком, бэкап `.bak`).
  - **Алгебра**: `algebra-list-1.html` (исправлены 6б, 7г, 7д; бэкап `.bak`).
  - **Информатика**: `informatics-list-1.html` (группа 1, задачи 1–7), `informatics-notes.html` (единицы памяти, носители, шпаргалка), `informatics-theory.html` (скрипт: Хомский, автоматы, P/NP и др.), `informatics-architecture.html` (лекция 1 «Od bitu do komputera»).
- Ссылки: `tasks.html`, `lectures.html`; `search-data.js` (SITE_PAGES); `service-worker.js` → `cloudpath-v31` + новые страницы в CORE.

- GitHub: репозиторий `dsw-studies/cloudpath`, ветка `main`. Моя версия слита с удалённой (практика и математика с GitHub сохранены; tasks/lectures/search-data/service-worker — база с GitHub + мои карточки, кэш v40). Пуш делает пользователь вручную (в оболочке Claude нет входа в GitHub).
- Практика: practice-sheets.js — 28 типов генераторов «как в листах» (физика, анализ, алгебра, информатика), подключён в practice.html, кэш v41.

## Не сделано / ограничения
- `material.js`: часть соответствий Drive-id подозрительна, не правилась.
- Информатика: «Podstawy informatyki 2025» — только силлабус (вошёл в theory); не разобраны тематические zip-архивы.
- Рисунки в задачах 2.x физики и графики 8 (Анализ 2) описаны текстом.
- Визуальная проверка в браузере не делалась (локальные файлы недоступны панели); проверен только баланс тегов.
- Не обновлены `?v=` у старых страниц; новые используют `20261116-1`.

## Коллоквиумы (16.11.2026)
- `colloquium.html` + `colloquium-an1.js` — Analiza matematyczna I (образец wersja A + генератор: P/F, тавтология, промежутки).
- `colloquium-alg1.html` + `colloquium-alg1.js` — Matematyka 1 (образец от 17.11 + генератор: прямые, матрицы, det).

## Генераторы (scratchpad, могут быть очищены)
`D:\DevTemp\claude\1749d964b6bf66df\76b42cb9-...\scratchpad\`: shell.py, gen_list2.py, gen_lect.py, gen_an2.py, gen_inf.py, gen_theory.py, gen_arch.py.

## Следующие шаги
1. Информатика: тематические zip-архивы.
2. Выложить сайт и проверить страницы в браузере (MathJax, мобильная вёрстка).
3. Исправить соответствия в `material.js`.

## 2026-11-17: доска на страницах коллоквиумов
- `colloquium-board.js` вставляет `CloudPathBoard` (practice-board.js) в карточки ЗАДАНИЕ/ZADANIE обоих генераторов (MutationObserver на #app). Рисунок только на время сессии. SW cache v48.

## 2026-11-17: физика, список 3
- `physics-list-3.html` — решения 3.1–3.20 (из Lista zadań nr 3.pdf, Moodle). Генератор страницы: `D:\lectures_work\gen_list3.py`. Допущения: 3.3 без массы (формула), справочные данные в 3.1–3.2, стрелки рисунка в 3.20. В навигации, tasks.html, search-data.js, SW (cache v49).
- Moodle физика (Rokosa): ćwiczenia — неоправданных пропусков >30% = нет классификации; лекции без посещаемости, экзамен в 2 срока; итог 0,7 ćw + 0,3 лекция.
- Whisper (faster-whisper-xxl, medium, pl): тексты лекций в `D:\lectures_work\srt` (13.11 Analiza/Algebra готовы; Fizyka/ASD 13.11 в работе). Конспекты по ним — не написаны.
