(() => {
  const p = name => `assets/study-pdfs/${name}`;
  const f = (title, file, pages) => ({ title, file: p(file), pages });
  const BUNDLES = {
    foundations: { subject:'Podstawy informatyki', title:'Podstawy informatyki', description:'Полный обзор основ информатики, систем счисления, логики и криптографии.', summary:'Большой учебный материал: базовые понятия информатики, представление данных, классические и современные методы шифрования, логические основы и вычисления.', files:[f('Podstawy informatyki — полный материал','foundations-overview.pdf',39)] },
    'ascii-unicode': { subject:'Podstawy informatyki', title:'ASCII и Unicode', description:'Символы, кодовые точки, UTF-8, UTF-16, UTF-32 и ошибки кодировок.', summary:'Материал объясняет различия между ASCII и Unicode, устройство кодировок, BOM, запись символов в байтах и причины появления mojibake.', files:[f('ASCII i Unicode','ascii-unicode.pdf',14)] },
    'number-systems-cheatsheet': { subject:'Podstawy informatyki', title:'Системы счисления — шпаргалка', description:'Краткие алгоритмы перевода чисел между системами счисления.', summary:'Практическая памятка по переводу из десятичной системы и обратно, а также быстрым преобразованиям между двоичной, восьмеричной и шестнадцатеричной системами.', files:[f('Systemy liczbowe — ściąga','number-systems-cheatsheet.pdf',2)] },
    'arithmetic-operations': { subject:'Podstawy informatyki', title:'Арифметические операции', description:'Сложение, вычитание и другие операции в позиционных системах.', summary:'Краткий учебный модуль по выполнению арифметики в различных системах счисления и контролю результата.', files:[f('Operacje arytmetyczne','arithmetic-operations.pdf',6)] },
    'number-system-conversion': { subject:'Podstawy informatyki', title:'Перевод систем счисления', description:'Методы преобразования чисел между различными основаниями.', summary:'Алгоритмы перехода между десятичной, двоичной, восьмеричной, шестнадцатеричной и другими позиционными системами.', files:[f('Przeliczanie systemów liczbowych','number-system-conversion.pdf',2)] },
    'binary-system': { subject:'Podstawy informatyki', title:'Двоичная система', description:'Позиционная запись чисел с основанием 2.', summary:'Разряды, степени двойки, перевод чисел и основные правила работы с двоичной записью.', files:[f('System binarny','binary-system.pdf',3)] },
    'ternary-system': { subject:'Podstawy informatyki', title:'Троичная система', description:'Запись чисел цифрами 0, 1 и 2.', summary:'Позиции как степени тройки, развёрнутая форма числа и базовые примеры.', files:[f('System trójkowy','ternary-system.pdf',1)] },
    'octal-system': { subject:'Podstawy informatyki', title:'Восьмеричная система', description:'Позиционная запись чисел с основанием 8.', summary:'Цифры 0–7, веса разрядов и связь восьмеричной записи с двоичной.', files:[f('System ósemkowy','octal-system.pdf',3)] },
    'hex-system': { subject:'Podstawy informatyki', title:'Шестнадцатеричная система', description:'Запись чисел с основанием 16 и цифрами A–F.', summary:'Разряды, перевод чисел и практическая связь шестнадцатеричной записи с байтами и двоичным кодом.', files:[f('System szesnastkowy','hex-system.pdf',3)] },
    'lecture-1': { subject:'Podstawy informatyki', title:'Wykład 1 — теоретические основы информатики', description:'Экзаменационный конспект по ключевым темам предмета.', summary:'Введение в теоретические основы информатики: информация, системы счисления, кодирование, логика и вычислительные модели.', files:[f('Teoretyczne podstawy informatyki — skrypt','theoretical-foundations.pdf',58)] },
    'lecture-2': { subject:'Podstawy informatyki', title:'Wykład 2 — двоичная арифметика', description:'Позиционные системы и арифметика двоичных чисел.', summary:'Развёрнутая запись, перевод чисел, сложение и вычитание, представление знаковых чисел и практические примеры.', files:[f('Arytmetyka liczb binarnych','binary-arithmetic-lecture.pdf',50)] },
    'boolean-algebra': { subject:'Podstawy informatyki', title:'Алгебра Буля', description:'Логические переменные, операции и выражения.', summary:'Основные законы булевой алгебры и работа с логическими функциями.', files:[f('Algebra Boole’a','boolean-algebra.pdf',2)] },
    'logic-gates': { subject:'Podstawy informatyki', title:'Логические вентили', description:'AND, OR, NOT и другие элементы цифровой логики.', summary:'Обозначения логических элементов, таблицы истинности и соответствие вентилей булевым операциям.', files:[f('Bramki logiczne','logic-gates.pdf',3)] },
    'logic-functions': { subject:'Podstawy informatyki', title:'Реализация логических функций', description:'Построение схем из логических вентилей.', summary:'Переход от булева выражения и таблицы истинности к практической схеме на логических элементах.', files:[f('Realizacja funkcji logicznych na bramkach','logic-functions.pdf',3)] },
    'cryptology-lectures': { subject:'Kryptologia', title:'Полный курс криптологии', description:'Восемь лекций от классических шифров до современных криптосистем.', summary:'Определения и классические шифры, логические функции, симметричная и асимметричная криптография, DES-подобные методы, RSA и протокол Диффи—Хеллмана.', files:[f('Лекции 1–2: определения и техники шифрования','cryptology-01-02.pdf',12),f('Лекция 3: логические функции','cryptology-03.pdf',5),f('Лекции 4–5: симметричные и асимметричные системы','cryptology-04-05.pdf',12),f('Лекции 6–7: симметричные алгоритмы','cryptology-06-07.pdf',11),f('Лекция 8: асимметричные алгоритмы','cryptology-08.pdf',6)] },
    'cryptography-notes': { subject:'Kryptologia', title:'Безопасность компьютерных систем', description:'Сводный курс по защите организаций, сетей и отдельных компьютеров.', summary:'Угрозы, уровни безопасности, организационные процедуры, инфраструктура, рабочие станции и построение политики безопасности.', files:[f('Bezpieczeństwo systemów komputerowych','computer-security.pdf',32)] },
    'message-encryption': { subject:'Kryptologia', title:'Шифрование сообщений', description:'Практические задания с классическими шифрами.', summary:'Вводный материал и упражнения по шифру Цезаря, замене символов и развитию навыков логического кодирования.', files:[f('Szyfrowanie wiadomości','message-encryption.pdf',3)] },
    'systems-gates-crypto': { subject:'Kryptologia', title:'Введение в криптографию', description:'Развёрнутые занятия по классическим шифрам и их реализации.', summary:'Шифр Цезаря, модульная арифметика, кодирование сообщений и практические криптографические упражнения.', files:[f('Wprowadzenie do zajęć z kryptografii','intro-cryptography.pdf',36)] },
    'crypto-materials': { subject:'Podstawy informatyki · Kryptologia', title:'Системы, логика и криптография', description:'Большая объединённая подборка справочных материалов.', summary:'Системы счисления, преобразования и арифметика, булева алгебра, логические схемы, троичная система и формальные грамматики.', files:[f('Грамматика как модель вычислений','formal-grammar.pdf',6),f('Двоичная система','binary-system.pdf',3),f('Восьмеричная система','octal-system.pdf',3),f('Шестнадцатеричная система','hex-system.pdf',3),f('Перевод систем счисления','number-system-conversion.pdf',2),f('Арифметические операции','arithmetic-operations.pdf',6),f('Алгебра Буля','boolean-algebra.pdf',2),f('Логические вентили','logic-gates.pdf',3),f('Реализация логических функций','logic-functions.pdf',3),f('Троичная система','ternary-system.pdf',1),f('Шпаргалка по системам счисления','number-systems-cheatsheet.pdf',2)] }
  };

  const id = new URLSearchParams(location.search).get('id');
  const bundle = BUNDLES[id];
  const page = document.querySelector('#bundlePage');
  if (!bundle) {
    document.title = 'Материал не найден — CloudPath';
    page.innerHTML = '<header class="material-hero"><p class="material-subject">CloudPath</p><h1>Материал не найден</h1><p>Вернись к конспектам и выбери другую подборку.</p></header>';
    return;
  }

  document.title = `${bundle.title} — CloudPath`;
  document.querySelector('#bundleSubject').textContent = bundle.subject;
  document.querySelector('#bundleTitle').textContent = bundle.title;
  document.querySelector('#bundleDescription').textContent = bundle.description;
  document.querySelector('#bundleSummary').textContent = bundle.summary;
  document.querySelector('#fileCount').textContent = `${bundle.files.length} ${bundle.files.length === 1 ? 'документ' : 'документов'}`;

  const list = document.querySelector('#bundleFileList');
  const viewer = document.querySelector('#bundleViewer');
  const viewerTitle = document.querySelector('#viewerTitle');
  const download = document.querySelector('#downloadPdf');
  const openFile = (file, button) => {
    viewer.src = file.file;
    viewerTitle.textContent = file.title;
    download.href = file.file;
    download.setAttribute('download', '');
    list.querySelectorAll('button').forEach(x => x.classList.remove('active'));
    button.classList.add('active');
  };
  bundle.files.forEach((file, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><strong>${file.title}</strong><small>${file.pages} стр.</small>`;
    button.addEventListener('click', () => openFile(file, button));
    list.append(button);
    if (index === 0) openFile(file, button);
  });
})();
