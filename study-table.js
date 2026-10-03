(() => {
  const tables = {
    'builtin-vectors-v2': {
      subject:'Algebra liniowa z geometrią analityczną',
      title:'Векторы — таблица формул и примеров',
      rows:[
        ['1','Что такое вектор','Стрелка с длиной и направлением. В 2D записывается как a=(x,y).','a=(3,4) означает 3 вправо и 4 вверх.'],
        ['2','Длина','По теореме Пифагора.','<span class="formula">|a| = √(x²+y²)</span><span class="mini-note">(3,4) → 5</span>'],
        ['3','Сложение','Складываем координаты отдельно.','<span class="formula">(x₁,y₁)+(x₂,y₂)=(x₁+x₂,y₁+y₂)</span><span class="mini-note">(2,1)+(3,4)=(5,5)</span>'],
        ['4','Вычитание','Вычитаем соответствующие координаты.','<span class="formula">(x₁,y₁)-(x₂,y₂)</span><span class="mini-note">(5,4)-(2,1)=(3,3)</span>'],
        ['5','Умножение на число','Каждую координату умножаем на k.','<span class="formula">k(x,y)=(kx,ky)</span><span class="mini-note">2(3,4)=(6,8)</span>'],
        ['6','Вектор AB','Из координат точки B вычитаем координаты A.','<span class="formula">AB=(x₂-x₁,y₂-y₁)</span><span class="mini-note">A=(1,2), B=(5,5) → (4,3)</span>'],
        ['7','Единичный вектор','Делим вектор на его длину.','<span class="formula">â = a/|a|</span><span class="mini-note">(3,4) → (3/5,4/5)</span>'],
        ['8','Скалярное произведение','Перемножаем координаты и складываем.','<span class="formula">a·b=x₁x₂+y₁y₂</span>'],
        ['9','Перпендикулярность','Если скалярное произведение равно нулю, ненулевые векторы перпендикулярны.','<span class="formula">a·b=0 ⇒ a ⟂ b</span><span class="mini-note">(1,2)·(2,-1)=0</span>'],
        ['10','Угол','Через скалярное произведение и длины.','<span class="formula">cos θ=(a·b)/(|a||b|)</span>'],
        ['11','Параллельность','Один вектор является числом, умноженным на другой.','<span class="formula">b=k·a</span><span class="mini-note">(2,4)=2(1,2)</span>'],
        ['12','Базис','Стандартный базис плоскости.','<div class="chips"><span>e₁=(1,0)</span><span>e₂=(0,1)</span><span>(x,y)=x·e₁+y·e₂</span></div>']
      ]
    },
    'builtin-python-full-v2': {
      subject:'Programowanie w języku Python 1',
      title:'Python — таблица по темам',
      rows:[
        ['1','Переменные и типы','Храним значения в именах.','<pre>x = 10\nname = "Herman"\nok = True</pre>'],
        ['2','Ввод / вывод','input() читает строку, print() выводит.','<pre>age = int(input("Возраст: "))\nprint(f"Тебе {age}")</pre>'],
        ['3','Условия','Выбор ветки по условию.','<pre>if age >= 18:\n    print("18+")\nelse:\n    print("младше")</pre>'],
        ['4','for','Перебор диапазона или коллекции.','<pre>for i in range(5):\n    print(i)</pre>'],
        ['5','while','Повторяем, пока условие истинно.','<pre>while x < 5:\n    x += 1</pre>'],
        ['6','Функции','Оборачивают повторяемую логику.','<pre>def add(a, b):\n    return a + b</pre>'],
        ['7','list','Упорядоченная изменяемая коллекция.','<pre>nums=[1,2,3]\nnums.append(4)</pre>'],
        ['8','tuple','Похож на list, но неизменяемый.','<pre>point=(3,4)</pre>'],
        ['9','set','Уникальные элементы.','<pre>s={1,2,3}\nprint(2 in s)</pre>'],
        ['10','dict','Ключ → значение.','<pre>user={"name":"Herman"}\nprint(user["name"])</pre>'],
        ['11','Строки','Индексы, срезы и методы.','<pre>s="Python"\ns[0]\ns[1:4]\ns.upper()</pre>'],
        ['12','Ошибки','try/except перехватывает исключение.','<pre>try:\n    x=int(input())\nexcept ValueError:\n    print("Не число")</pre>'],
        ['13','Файлы','with автоматически закрывает файл.','<pre>with open("data.txt", encoding="utf-8") as f:\n    text=f.read()</pre>'],
        ['14','Классы','Шаблоны объектов.','<pre>class Student:\n    def __init__(self,name):\n        self.name=name</pre>']
      ]
    },
    'builtin-data-structures-v2': {
      subject:'Algorytmy i struktury danych',
      title:'Структуры данных — сравнительная таблица',
      rows:[
        ['1','Big O','Показывает, как растёт стоимость алгоритма.','<div class="chips"><span>O(1)</span><span>O(log n)</span><span>O(n)</span><span>O(n log n)</span><span>O(n²)</span></div>'],
        ['2','Array / list','Быстрый индекс, дорогая вставка в середину.','<div class="chips"><span>index O(1)</span><span>append ≈ O(1)</span><span>search O(n)</span></div>'],
        ['3','Linked list','Узлы со ссылками друг на друга.','Вставка после известного узла O(1), доступ по позиции O(n).'],
        ['4','Stack','LIFO: последний вошёл — первый вышел.','<pre>stack.append(x)\nstack.pop()</pre>'],
        ['5','Queue / deque','FIFO: первый вошёл — первый вышел.','<pre>q.append(x)\nq.popleft()</pre>'],
        ['6','Set','Уникальные значения, быстрый поиск.','В среднем проверка x in set — O(1).'],
        ['7','Dict / hash table','Ключ → значение через хеш.','В среднем get/set/delete — O(1).'],
        ['8','Tree','Иерархия root → children → leaves.','Подходит для иерархических данных.'],
        ['9','BST','Слева меньше, справа больше.','Сбалансированное дерево: поиск около O(log n).'],
        ['10','Heap','Быстрый минимум/максимум.','<div class="chips"><span>min O(1)</span><span>push O(log n)</span><span>pop O(log n)</span></div>'],
        ['11','Graph','Вершины + рёбра.','BFS идёт слоями, DFS — в глубину.'],
        ['12','Что выбрать','Выбор зависит от основной операции.','<div class="chips"><span>индекс → list</span><span>уникальность → set</span><span>ключ → dict</span><span>FIFO → deque</span><span>min → heap</span></div>']
      ]
    }
  };

  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  function ensureModal(){
    if(document.getElementById('studyTableModal')) return;
    document.body.insertAdjacentHTML('beforeend',`<div class="study-table-modal" id="studyTableModal" aria-hidden="true"><div class="study-table-shell" role="dialog" aria-modal="true"><header class="study-table-head"><div><small id="studyTableSubject"></small><h2 id="studyTableTitle"></h2></div><button class="study-table-close" id="studyTableClose" type="button">✕</button></header><div class="study-table-wrap"><table class="study-table"><thead><tr><th>№</th><th>Тема</th><th>Что это значит</th><th>Формула / пример</th></tr></thead><tbody id="studyTableBody"></tbody></table></div><div class="study-table-legend"><span>Клик по конспекту → таблица</span><span>Esc → закрыть</span></div></div></div>`);
    document.getElementById('studyTableClose').onclick=close;
    document.getElementById('studyTableModal').addEventListener('click',e=>{if(e.target.id==='studyTableModal')close()});
  }

  function open(id){
    const data=tables[id]; if(!data) return;
    ensureModal();
    const old=document.getElementById('readerModal'); if(old) old.classList.remove('open');
    document.getElementById('studyTableSubject').textContent=data.subject;
    document.getElementById('studyTableTitle').textContent=data.title;
    document.getElementById('studyTableBody').innerHTML=data.rows.map(r=>`<tr><td class="st-num">${esc(r[0])}</td><td class="st-topic">${esc(r[1])}</td><td class="st-main">${esc(r[2])}</td><td class="st-example">${r[3]}</td></tr>`).join('');
    const modal=document.getElementById('studyTableModal'); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }

  function close(){const m=document.getElementById('studyTableModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}

  document.addEventListener('click',e=>{
    const card=e.target.closest('.visual-card'); if(!card || !tables[card.dataset.id]) return;
    e.preventDefault(); e.stopImmediatePropagation(); open(card.dataset.id);
  },true);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();