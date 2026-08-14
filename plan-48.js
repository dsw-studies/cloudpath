(() => {
  const tr = (ru, pl, en) => ({ ru, pl, en });
  const weeks = [
    { title: tr('Неделя 1 · Linux без страха', 'Tydzień 1 · Linux bez strachu', 'Week 1 · Linux without fear'), tasks: [
      tr('Установить Linux/WSL2, открыть терминал, проверить pwd и whoami', 'Zainstalować Linux/WSL2, otworzyć terminal, sprawdzić pwd i whoami', 'Install Linux/WSL2, open the terminal, check pwd and whoami'),
      tr('Навигация: ls, cd, pwd; пройти папки /home, /etc, /var', 'Nawigacja: ls, cd, pwd; poznać /home, /etc, /var', 'Navigation: ls, cd, pwd; explore /home, /etc and /var'),
      tr('Файлы и папки: mkdir, touch, cp, mv, rm', 'Pliki i katalogi: mkdir, touch, cp, mv, rm', 'Files and directories: mkdir, touch, cp, mv, rm'),
      tr('Чтение и поиск: cat, less, head, tail, grep', 'Czytanie i wyszukiwanie: cat, less, head, tail, grep', 'Reading and search: cat, less, head, tail, grep'),
      tr('Права: rwx, chmod 755/644, sudo — только с пониманием', 'Uprawnienia: rwx, chmod 755/644, sudo — tylko świadomie', 'Permissions: rwx, chmod 755/644, use sudo deliberately'),
      tr('Практика: собрать папку проекта и выполнить 15 команд без подсказки', 'Praktyka: utworzyć katalog projektu i wykonać 15 poleceń bez podpowiedzi', 'Practice: build a project folder and run 15 commands unaided'),
      tr('Лёгкий день: повторить ошибки недели или отдохнуть', 'Lekki dzień: powtórzyć błędy tygodnia albo odpocząć', 'Light day: review the week’s mistakes or rest')
    ]},
    { title: tr('Неделя 2 · Git и рабочее окружение', 'Tydzień 2 · Git i środowisko pracy', 'Week 2 · Git and work environment'), tasks: [
      tr('Установить Git и VS Code, настроить имя и e-mail Git', 'Zainstalować Git i VS Code, ustawić nazwę i e-mail Git', 'Install Git and VS Code; configure Git name and email'),
      tr('Создать репозиторий: git init, status, add, commit', 'Utworzyć repozytorium: git init, status, add, commit', 'Create a repository: git init, status, add, commit'),
      tr('Посмотреть историю и изменения: log, diff, restore', 'Poznać historię i zmiany: log, diff, restore', 'Inspect history and changes: log, diff, restore'),
      tr('GitHub: создать репозиторий, remote, push и pull', 'GitHub: utworzyć repozytorium, remote, push i pull', 'GitHub: create a repository; use remote, push and pull'),
      tr('Ветки: branch, switch, merge; решить простой конфликт', 'Gałęzie: branch, switch, merge; rozwiązać prosty konflikt', 'Branches: branch, switch, merge; resolve a simple conflict'),
      tr('Практика: оформить README и сделать 5 осмысленных коммитов', 'Praktyka: przygotować README i zrobić 5 sensownych commitów', 'Practice: write a README and make five meaningful commits'),
      tr('Повторение: воспроизвести весь Git-цикл без инструкции', 'Powtórka: wykonać cały cykl Git bez instrukcji', 'Review: reproduce the full Git workflow without instructions')
    ]},
    { title: tr('Неделя 3 · Python: основа', 'Tydzień 3 · Python: podstawy', 'Week 3 · Python foundations'), tasks: [
      tr('Запуск Python, print, переменные и основные типы', 'Uruchamianie Pythona, print, zmienne i podstawowe typy', 'Run Python; learn print, variables and basic types'),
      tr('Ввод, преобразование типов и арифметика', 'Wejście, konwersja typów i arytmetyka', 'Input, type conversion and arithmetic'),
      tr('Условия if/elif/else и логические операторы', 'Warunki if/elif/else i operatory logiczne', 'Conditionals: if/elif/else and logical operators'),
      tr('Циклы for/while, range, break и continue', 'Pętle for/while, range, break i continue', 'Loops: for/while, range, break and continue'),
      tr('Списки, словари, строки и основные методы', 'Listy, słowniki, napisy i podstawowe metody', 'Lists, dictionaries, strings and core methods'),
      tr('Практика: консольный калькулятор с проверкой ошибок', 'Praktyka: kalkulator konsolowy z obsługą błędów', 'Practice: build a console calculator with error handling'),
      tr('Лёгкий день: решить 5 коротких задач и разобрать ошибки', 'Lekki dzień: rozwiązać 5 krótkich zadań i przeanalizować błędy', 'Light day: solve five short exercises and review mistakes')
    ]},
    { title: tr('Неделя 4 · Python: полезная программа', 'Tydzień 4 · Python: użyteczny program', 'Week 4 · Python: a useful program'), tasks: [
      tr('Функции: параметры, return, область видимости', 'Funkcje: parametry, return, zakres zmiennych', 'Functions: parameters, return and scope'),
      tr('Файлы: чтение, запись, with open и пути', 'Pliki: odczyt, zapis, with open i ścieżki', 'Files: reading, writing, with open and paths'),
      tr('Исключения: try/except и понятные сообщения об ошибках', 'Wyjątki: try/except i czytelne komunikaty błędów', 'Exceptions: try/except and clear error messages'),
      tr('Модули, pip, venv и requirements.txt', 'Moduły, pip, venv i requirements.txt', 'Modules, pip, venv and requirements.txt'),
      tr('Начать мини-проект: менеджер задач в JSON', 'Rozpocząć mini-projekt: menedżer zadań w JSON', 'Start a mini-project: a JSON task manager'),
      tr('Доделать проект, README, примеры запуска и GitHub', 'Dokończyć projekt, README, przykłady uruchomienia i GitHub', 'Finish the project; add README, usage examples and GitHub'),
      tr('Ревью: объяснить свой код вслух и исправить слабые места', 'Przegląd: wyjaśnić kod na głos i poprawić słabe miejsca', 'Review: explain your code aloud and fix weak spots')
    ]},
    { title: tr('Неделя 5 · Сети, SSH и облако', 'Tydzień 5 · Sieci, SSH i chmura', 'Week 5 · Networking, SSH and cloud'), tasks: [
      tr('Основы сети: IP, порт, DNS, HTTP/HTTPS', 'Podstawy sieci: IP, port, DNS, HTTP/HTTPS', 'Networking basics: IP, ports, DNS and HTTP/HTTPS'),
      tr('Диагностика: ping, curl, ip, ss и traceroute', 'Diagnostyka: ping, curl, ip, ss i traceroute', 'Diagnostics: ping, curl, ip, ss and traceroute'),
      tr('SSH: подключение, ключи ssh-keygen и known_hosts', 'SSH: połączenie, klucze ssh-keygen i known_hosts', 'SSH: connections, ssh-keygen keys and known_hosts'),
      tr('Передача файлов: scp и rsync', 'Przesyłanie plików: scp i rsync', 'File transfer: scp and rsync'),
      tr('Настроить ~/.ssh/config и безопасный вход по ключу', 'Skonfigurować ~/.ssh/config i bezpieczne logowanie kluczem', 'Configure ~/.ssh/config and secure key-based login'),
      tr('Практика: поднять учебный сервер/VM и загрузить туда проект', 'Praktyka: uruchomić serwer/VM i wgrać na niego projekt', 'Practice: start a learning server/VM and upload the project'),
      tr('Повторение: нарисовать путь запроса браузер → DNS → сервер', 'Powtórka: narysować drogę przeglądarka → DNS → serwer', 'Review: diagram browser → DNS → server request flow')
    ]},
    { title: tr('Неделя 6 · Bash, процессы и Docker', 'Tydzień 6 · Bash, procesy i Docker', 'Week 6 · Bash, processes and Docker'), tasks: [
      tr('Процессы и службы: ps, top, kill, systemctl', 'Procesy i usługi: ps, top, kill, systemctl', 'Processes and services: ps, top, kill and systemctl'),
      tr('Пакеты, переменные окружения, PATH и .bashrc', 'Pakiety, zmienne środowiskowe, PATH i .bashrc', 'Packages, environment variables, PATH and .bashrc'),
      tr('Bash-скрипт: shebang, переменные, аргументы и chmod +x', 'Skrypt Bash: shebang, zmienne, argumenty i chmod +x', 'Bash scripting: shebang, variables, arguments and chmod +x'),
      tr('Bash: условия, циклы, exit codes и set -e', 'Bash: warunki, pętle, kody wyjścia i set -e', 'Bash: conditionals, loops, exit codes and set -e'),
      tr('Docker: образ, контейнер, Dockerfile, build и run', 'Docker: obraz, kontener, Dockerfile, build i run', 'Docker: images, containers, Dockerfile, build and run'),
      tr('Практика: запуск Python-проекта в контейнере', 'Praktyka: uruchomić projekt Python w kontenerze', 'Practice: run the Python project in a container'),
      tr('Лёгкий день: повторить команды и обновить README проекта', 'Lekki dzień: powtórzyć polecenia i uzupełnić README projektu', 'Light day: review commands and update the project README')
    ]},
    { title: tr('Финиш · 25–30 сентября', 'Finał · 25–30 września', 'Final stretch · September 25–30'), tasks: [
      tr('Выбрать итог: улучшить менеджер задач или сделать новый CLI-инструмент', 'Wybrać finał: ulepszyć menedżer zadań albo stworzyć nowe narzędzie CLI', 'Choose the finale: improve the task manager or build a new CLI tool'),
      tr('Реализовать основную функцию и сделать чистую структуру проекта', 'Zaimplementować główną funkcję i uporządkować strukturę projektu', 'Implement the core feature and clean up the project structure'),
      tr('Добавить обработку ошибок и несколько ручных тестов', 'Dodać obsługę błędów i kilka testów ręcznych', 'Add error handling and several manual tests'),
      tr('Запустить проект на Linux/сервере и сохранить команды', 'Uruchomić projekt na Linuxie/serwerze i zapisać polecenia', 'Run the project on Linux/server and record the commands'),
      tr('Оформить GitHub: README, скриншот, установка и запуск', 'Dopracować GitHub: README, zrzut ekranu, instalacja i uruchomienie', 'Polish GitHub: README, screenshot, installation and usage'),
      tr('Финал: повторить Linux, Git, Python и SSH; составить список вопросов к 1 октября', 'Finał: powtórzyć Linux, Git, Python i SSH; przygotować pytania na 1 października', 'Final review: Linux, Git, Python and SSH; write questions for October 1')
    ]}
  ];

  const oldGroups = [...document.querySelectorAll('.todo-group[id^="group-p0-"]')];
  if (!oldGroups.length) return;
  const anchor = oldGroups[0];
  const fragment = document.createDocumentFragment();
  let day = 0;
  const start = new Date('2026-08-14T12:00:00');
  weeks.forEach((week, weekIndex) => {
    const group = document.createElement('div');
    group.className = 'todo-group';
    group.id = `group-p0-w${weekIndex + 1}`;
    const heading = document.createElement('h4');
    heading.dataset.i18nRu = week.title.ru;
    heading.dataset.i18nPl = week.title.pl;
    heading.dataset.i18nEn = week.title.en;
    heading.innerHTML = `${week.title.ru} <span class="cnt"></span>`;
    group.append(heading);
    week.tasks.forEach(task => {
      day += 1;
      const date = new Date(start); date.setDate(start.getDate() + day - 1);
      const dateText = date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' });
      const item = document.createElement('div'); item.className = 'todo-item';
      const input = document.createElement('input'); input.type = 'checkbox'; input.id = `p0-d${String(day).padStart(2, '0')}`;
      const label = document.createElement('label'); label.htmlFor = input.id;
      label.dataset.i18nRu = `День ${day} · ${dateText}: ${task.ru} · английский 20 минут`;
      label.dataset.i18nPl = `Dzień ${day}: ${task.pl} · angielski 20 minut`;
      label.dataset.i18nEn = `Day ${day}: ${task.en} · 20 minutes of English`;
      label.textContent = label.dataset.i18nRu;
      item.append(input, label); group.append(item);
    });
    fragment.append(group);
  });
  anchor.before(fragment);
  oldGroups.forEach(group => group.remove());

  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.dataset.i18nRu = 'Roadmap: 48 дней до старта';
    heroTitle.dataset.i18nPl = 'Roadmapa: 48 dni do startu';
    heroTitle.dataset.i18nEn = 'Roadmap: 48 days to launch';
    heroTitle.textContent = heroTitle.dataset.i18nRu;
  }
})();
