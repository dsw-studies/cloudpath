(() => {
  const L = (ru, pl, en) => ({ ru, pl, en });
  const get = (value, lang) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) return value[lang] ?? value.ru ?? '';
    return value ?? '';
  };

  const tables = {
    'builtin-vectors-v2': {
      subject:'Algebra liniowa z geometrią analityczną',
      title:L('Векторы — таблица формул и примеров','Wektory — tabela wzorów i przykładów','Vectors — formulas and examples table'),
      rows:[
        ['1',L('Что такое вектор','Czym jest wektor','What is a vector'),L('Стрелка с длиной и направлением. В 2D записывается как a=(x,y).','Strzałka mająca długość i kierunek. W 2D zapisujemy ją jako a=(x,y).','An arrow with a length and direction. In 2D it is written as a=(x,y).'),L('a=(3,4) означает 3 вправо и 4 вверх.','a=(3,4) oznacza 3 w prawo i 4 w górę.','a=(3,4) means 3 right and 4 up.')],
        ['2',L('Длина','Długość','Length'),L('По теореме Пифагора.','Z twierdzenia Pitagorasa.','Using the Pythagorean theorem.'),'<span class="formula">|a| = √(x²+y²)</span><span class="mini-note">(3,4) → 5</span>'],
        ['3',L('Сложение','Dodawanie','Addition'),L('Складываем координаты отдельно.','Dodajemy odpowiadające sobie współrzędne.','Add corresponding coordinates separately.'),'<span class="formula">(x₁,y₁)+(x₂,y₂)=(x₁+x₂,y₁+y₂)</span><span class="mini-note">(2,1)+(3,4)=(5,5)</span>'],
        ['4',L('Вычитание','Odejmowanie','Subtraction'),L('Вычитаем соответствующие координаты.','Odejmujemy odpowiadające sobie współrzędne.','Subtract corresponding coordinates.'),'<span class="formula">(x₁,y₁)-(x₂,y₂)</span><span class="mini-note">(5,4)-(2,1)=(3,3)</span>'],
        ['5',L('Умножение на число','Mnożenie przez skalar','Scalar multiplication'),L('Каждую координату умножаем на k.','Każdą współrzędną mnożymy przez k.','Multiply every coordinate by k.'),'<span class="formula">k(x,y)=(kx,ky)</span><span class="mini-note">2(3,4)=(6,8)</span>'],
        ['6',L('Вектор AB','Wektor AB','Vector AB'),L('Из координат точки B вычитаем координаты A.','Od współrzędnych punktu B odejmujemy współrzędne A.','Subtract point A coordinates from point B coordinates.'),'<span class="formula">AB=(x₂-x₁,y₂-y₁)</span><span class="mini-note">A=(1,2), B=(5,5) → (4,3)</span>'],
        ['7',L('Единичный вектор','Wektor jednostkowy','Unit vector'),L('Делим вектор на его длину.','Dzielimy wektor przez jego długość.','Divide the vector by its length.'),'<span class="formula">â = a/|a|</span><span class="mini-note">(3,4) → (3/5,4/5)</span>'],
        ['8',L('Скалярное произведение','Iloczyn skalarny','Dot product'),L('Перемножаем координаты и складываем.','Mnożymy odpowiadające współrzędne i dodajemy wyniki.','Multiply corresponding coordinates and add the results.'),'<span class="formula">a·b=x₁x₂+y₁y₂</span>'],
        ['9',L('Перпендикулярность','Prostopadłość','Perpendicularity'),L('Если скалярное произведение равно нулю, ненулевые векторы перпендикулярны.','Jeśli iloczyn skalarny jest równy zero, niezerowe wektory są prostopadłe.','If the dot product is zero, non-zero vectors are perpendicular.'),'<span class="formula">a·b=0 ⇒ a ⟂ b</span><span class="mini-note">(1,2)·(2,-1)=0</span>'],
        ['10',L('Угол','Kąt','Angle'),L('Через скалярное произведение и длины.','Korzystamy z iloczynu skalarnego i długości.','Use the dot product and vector lengths.'),'<span class="formula">cos θ=(a·b)/(|a||b|)</span>'],
        ['11',L('Параллельность','Równoległość','Parallelism'),L('Один вектор является числом, умноженным на другой.','Jeden wektor jest wielokrotnością drugiego.','One vector is a scalar multiple of the other.'),'<span class="formula">b=k·a</span><span class="mini-note">(2,4)=2(1,2)</span>'],
        ['12',L('Базис','Baza','Basis'),L('Стандартный базис плоскости.','Standardowa baza płaszczyzny.','The standard basis of the plane.'),'<div class="chips"><span>e₁=(1,0)</span><span>e₂=(0,1)</span><span>(x,y)=x·e₁+y·e₂</span></div>']
      ]
    },

    'builtin-python-full-v2': {
      subject:'Programowanie w języku Python 1',
      title:L('Python — таблица по темам','Python — tabela tematów','Python — topic table'),
      rows:[
        ['1',L('Переменные и типы','Zmienne i typy','Variables and types'),L('Храним значения в именах.','Przechowujemy wartości pod nazwami.','Store values under names.'),'<pre>x = 10\nname = "Herman"\nok = True</pre>'],
        ['2',L('Ввод / вывод','Wejście / wyjście','Input / output'),L('input() читает строку, print() выводит.','input() wczytuje tekst, print() wyświetla wynik.','input() reads text, print() outputs it.'),L('<pre>age = int(input("Возраст: "))\nprint(f"Тебе {age}")</pre>','<pre>age = int(input("Wiek: "))\nprint(f"Masz {age} lat")</pre>','<pre>age = int(input("Age: "))\nprint(f"You are {age}")</pre>')],
        ['3',L('Условия','Warunki','Conditions'),L('Выбор ветки по условию.','Wybór gałęzi programu na podstawie warunku.','Choose a branch based on a condition.'),L('<pre>if age >= 18:\n    print("18+")\nelse:\n    print("младше")</pre>','<pre>if age >= 18:\n    print("18+")\nelse:\n    print("mniej niż 18")</pre>','<pre>if age >= 18:\n    print("18+")\nelse:\n    print("under 18")</pre>')],
        ['4','for',L('Перебор диапазона или коллекции.','Iterowanie po zakresie lub kolekcji.','Iterate over a range or collection.'),'<pre>for i in range(5):\n    print(i)</pre>'],
        ['5','while',L('Повторяем, пока условие истинно.','Powtarzamy, dopóki warunek jest prawdziwy.','Repeat while the condition is true.'),'<pre>while x < 5:\n    x += 1</pre>'],
        ['6',L('Функции','Funkcje','Functions'),L('Оборачивают повторяемую логику.','Grupują powtarzalną logikę.','Package reusable logic.'),'<pre>def add(a, b):\n    return a + b</pre>'],
        ['7','list',L('Упорядоченная изменяемая коллекция.','Uporządkowana, mutowalna kolekcja.','Ordered, mutable collection.'),'<pre>nums=[1,2,3]\nnums.append(4)</pre>'],
        ['8','tuple',L('Похож на list, но неизменяемый.','Podobny do list, ale niemutowalny.','Like a list, but immutable.'),'<pre>point=(3,4)</pre>'],
        ['9','set',L('Уникальные элементы.','Unikalne elementy.','Unique elements.'),'<pre>s={1,2,3]\nprint(2 in s)</pre>'],
        ['10','dict',L('Ключ → значение.','Klucz → wartość.','Key → value.'),'<pre>user={"name":"Herman"}\nprint(user["name"])</pre>'],
        ['11',L('Строки','Napisy','Strings'),L('Индексы, срезы и методы.','Indeksy, wycinki i metody.','Indexes, slices and methods.'),'<pre>s="Python"\ns[0]\ns[1:4]\ns.upper()</pre>'],
        ['12',L('Ошибки','Wyjątki','Exceptions'),L('try/except перехватывает исключение.','try/except przechwytuje wyjątek.','try/except catches an exception.'),L('<pre>try:\n    x=int(input())\nexcept ValueError:\n    print("Не число")</pre>','<pre>try:\n    x=int(input())\nexcept ValueError:\n    print("To nie jest liczba")</pre>','<pre>try:\n    x=int(input())\nexcept ValueError:\n    print("Not a number")</pre>')],
        ['13',L('Файлы','Pliki','Files'),L('with автоматически закрывает файл.','with automatycznie zamyka plik.','with closes the file automatically.'),'<pre>with open("data.txt", encoding="utf-8") as f:\n    text=f.read()</pre>'],
        ['14',L('Классы','Klasy','Classes'),L('Шаблоны объектов.','Szablony obiektów.','Blueprints for objects.'),'<pre>class Student:\n    def __init__(self,name):\n        self.name=name</pre>']
      ]
    },

    'builtin-data-structures-v2': {
      subject:'Algorytmy i struktury danych',
      title:L('Структуры данных — сравнительная таблица','Struktury danych — tabela porównawcza','Data structures — comparison table'),
      rows:[
        ['1','Big O',L('Показывает, как растёт стоимость алгоритма.','Pokazuje, jak rośnie koszt algorytmu.','Shows how algorithm cost grows.'),'<div class="chips"><span>O(1)</span><span>O(log n)</span><span>O(n)</span><span>O(n log n)</span><span>O(n²)</span></div>'],
        ['2','Array / list',L('Быстрый индекс, дорогая вставка в середину.','Szybki dostęp po indeksie, kosztowne wstawianie w środku.','Fast indexing, expensive insertion in the middle.'),'<div class="chips"><span>index O(1)</span><span>append ≈ O(1)</span><span>search O(n)</span></div>'],
        ['3','Linked list',L('Узлы со ссылками друг на друга.','Węzły połączone odwołaniami.','Nodes linked to one another.'),L('Вставка после известного узла O(1), доступ по позиции O(n).','Wstawienie po znanym węźle O(1), dostęp po pozycji O(n).','Insert after a known node O(1), positional access O(n).')],
        ['4','Stack',L('LIFO: последний вошёл — первый вышел.','LIFO: ostatni wszedł — pierwszy wyszedł.','LIFO: last in, first out.'),'<pre>stack.append(x)\nstack.pop()</pre>'],
        ['5','Queue / deque',L('FIFO: первый вошёл — первый вышел.','FIFO: pierwszy wszedł — pierwszy wyszedł.','FIFO: first in, first out.'),'<pre>q.append(x)\nq.popleft()</pre>'],
        ['6','Set',L('Уникальные значения, быстрый поиск.','Unikalne wartości i szybkie wyszukiwanie.','Unique values and fast membership checks.'),L('В среднем проверка x in set — O(1).','Średnio sprawdzenie x in set — O(1).','Average x in set check — O(1).')],
        ['7','Dict / hash table',L('Ключ → значение через хеш.','Klucz → wartość przez haszowanie.','Key → value via hashing.'),L('В среднем get/set/delete — O(1).','Średnio get/set/delete — O(1).','Average get/set/delete — O(1).')],
        ['8','Tree',L('Иерархия root → children → leaves.','Hierarchia root → children → leaves.','Hierarchy root → children → leaves.'),L('Подходит для иерархических данных.','Dobre do danych hierarchicznych.','Useful for hierarchical data.')],
        ['9','BST',L('Слева меньше, справа больше.','Mniejsze wartości po lewej, większe po prawej.','Smaller values on the left, larger on the right.'),L('Сбалансированное дерево: поиск около O(log n).','Zrównoważone drzewo: wyszukiwanie około O(log n).','Balanced tree: search around O(log n).')],
        ['10','Heap',L('Быстрый минимум/максимум.','Szybki dostęp do minimum/maksimum.','Fast minimum/maximum access.'),'<div class="chips"><span>min O(1)</span><span>push O(log n)</span><span>pop O(log n)</span></div>'],
        ['11','Graph',L('Вершины + рёбра.','Wierzchołki + krawędzie.','Vertices + edges.'),L('BFS идёт слоями, DFS — в глубину.','BFS przechodzi warstwami, DFS — w głąb.','BFS explores by layers, DFS goes deep.')],
        ['12',L('Что выбрать','Co wybrać','What to choose'),L('Выбор зависит от основной операции.','Wybór zależy od najczęstszej operacji.','The choice depends on the main operation.'),L('<div class="chips"><span>индекс → list</span><span>уникальность → set</span><span>ключ → dict</span><span>FIFO → deque</span><span>min → heap</span></div>','<div class="chips"><span>indeks → list</span><span>unikalność → set</span><span>klucz → dict</span><span>FIFO → deque</span><span>min → heap</span></div>','<div class="chips"><span>index → list</span><span>unique → set</span><span>key → dict</span><span>FIFO → deque</span><span>min → heap</span></div>')]
      ]
    }
  };

  const ui = {
    ru:{headers:['№','Тема','Что это значит','Формула / пример'],legend:['Клик по конспекту → таблица','Esc → закрыть'],close:'Закрыть'},
    pl:{headers:['№','Temat','Co to znaczy','Wzór / przykład'],legend:['Kliknij notatkę → tabela','Esc → zamknij'],close:'Zamknij'},
    en:{headers:['#','Topic','What it means','Formula / example'],legend:['Click a note → table','Esc → close'],close:'Close'}
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[c]));

  let activeId = null;

  function currentLanguage() {
    try {
      const saved = localStorage.getItem('cloudpath-language');
      if (ui[saved]) return saved;
    } catch (_) {}
    return ui[document.documentElement.lang] ? document.documentElement.lang : 'ru';
  }

  function ensureModal() {
    if (document.getElementById('studyTableModal')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="study-table-modal" id="studyTableModal" aria-hidden="true">
        <div class="study-table-shell" role="dialog" aria-modal="true" aria-labelledby="studyTableTitle">
          <header class="study-table-head">
            <div>
              <small id="studyTableSubject"></small>
              <h2 id="studyTableTitle"></h2>
            </div>
            <button class="study-table-close" id="studyTableClose" type="button">✕</button>
          </header>
          <div class="study-table-wrap">
            <table class="study-table">
              <thead><tr id="studyTableHeaders"></tr></thead>
              <tbody id="studyTableBody"></tbody>
            </table>
          </div>
          <div class="study-table-legend" id="studyTableLegend"></div>
        </div>
      </div>
    `);
    document.getElementById('studyTableClose').onclick = close;
    document.getElementById('studyTableModal').addEventListener('click', e => {
      if (e.target.id === 'studyTableModal') close();
    });
  }

  function render(id, lang = currentLanguage()) {
    const data = tables[id];
    if (!data) return;
    if (!ui[lang]) lang = 'ru';

    ensureModal();
    const t = ui[lang];
    document.getElementById('studyTableSubject').textContent = data.subject;
    document.getElementById('studyTableTitle').textContent = get(data.title, lang);
    document.getElementById('studyTableClose').setAttribute('aria-label', t.close);
    document.getElementById('studyTableHeaders').innerHTML = t.headers.map(h => `<th>${esc(h)}</th>`).join('');
    document.getElementById('studyTableLegend').innerHTML = t.legend.map(x => `<span>${esc(x)}</span>`).join('');
    document.getElementById('studyTableBody').innerHTML = data.rows.map(row => {
      const example = get(row[3], lang);
      return `<tr>
        <td class="st-num">${esc(row[0])}</td>
        <td class="st-topic">${esc(get(row[1], lang))}</td>
        <td class="st-main">${esc(get(row[2], lang))}</td>
        <td class="st-example">${example}</td>
      </tr>`;
    }).join('');
  }

  function open(id) {
    const data = tables[id];
    if (!data) return;
    activeId = id;
    render(id);
    const old = document.getElementById('readerModal');
    if (old) old.classList.remove('open');
    const modal = document.getElementById('studyTableModal');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const modal = document.getElementById('studyTableModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeId = null;
  }

  document.addEventListener('click', e => {
    const card = e.target.closest('.visual-card');
    if (!card || !tables[card.dataset.id]) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    open(card.dataset.id);
  }, true);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  window.addEventListener('cloudpath:language', e => {
    if (activeId) render(activeId, e.detail?.lang || currentLanguage());
  });
})();
