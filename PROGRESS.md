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

## Не сделано / ограничения
- `material.js`: часть соответствий Drive-id подозрительна, не правилась.
- Информатика: «Podstawy informatyki 2025» — только силлабус (вошёл в theory); не разобраны тематические zip-архивы.
- Рисунки в задачах 2.x физики и графики 8 (Анализ 2) описаны текстом.
- Визуальная проверка в браузере не делалась (локальные файлы недоступны панели); проверен только баланс тегов.
- Не обновлены `?v=` у старых страниц; новые используют `20261116-1`.

## Генераторы (scratchpad, могут быть очищены)
`D:\DevTemp\claude\1749d964b6bf66df\76b42cb9-...\scratchpad\`: shell.py, gen_list2.py, gen_lect.py, gen_an2.py, gen_inf.py, gen_theory.py, gen_arch.py.

## Следующие шаги
1. Информатика: тематические zip-архивы.
2. Выложить сайт и проверить страницы в браузере (MathJax, мобильная вёрстка).
3. Исправить соответствия в `material.js`.
