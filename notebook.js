(() => {
  const KEY = 'cloudpath-notes-v1';
  const BUILTIN_KEY = 'cloudpath-builtin-notes-v1-installed';
  const subjects = [
    ['analysis','∑','Analiza matematyczna I'],['algebra','A','Algebra liniowa'],['python','</>','Programowanie w języku Python'],
    ['algorithms','{}','Algorytmy i struktury danych'],['physics','φ','Fizyka'],['intro','01','Podstawy informatyki'],
    ['ethics','§','Etyka inżyniera i prawo autorskie'],['other','·','Inne']
  ];
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  let notes = load(); let editingId = null; let filterSubject = 'all';

  function load(){try{return JSON.parse(localStorage.getItem(KEY)) || []}catch{return []}}
  function save(){localStorage.setItem(KEY, JSON.stringify(notes))}
  function esc(v=''){return v.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#039;'}[c]))}
  function formatDate(s){if(!s)return ''; const d=new Date(s+'T12:00:00'); return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'short',year:'numeric'})}
  function subjectName(id){return subjects.find(s=>s[0]===id)?.[2] || 'Inne'}
  function subjectIcon(id){return subjects.find(s=>s[0]===id)?.[1] || '·'}
  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
  function today(){return new Date().toISOString().slice(0,10)}
  function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1600)}

  function seedIfEmpty(){
    if(notes.length) return;
    notes=[{id:uid(),title:'Организация учёбы',subject:'other',date:today(),tags:['важное'],content:'CloudPath теперь работает как мой учебный блокнот.\n\nЗдесь будут конспекты с лекций, формулы, код и материалы к экзаменам.',updated:Date.now()}];
    save();
  }

  function installBuiltinNotes(){
    try { if(localStorage.getItem(BUILTIN_KEY)==='1') return; } catch(_) {}
    const builtins = [
      {
        id:'builtin-python-full-v1',
        title:'Python — полный конспект с нуля',
        subject:'python',date:'2026-10-03',tags:['python','база','шпаргалка'],updated:Date.now(),
        content:`PYTHON — ПОЛНЫЙ КОНСПЕКТ С НУЛЯ

1. Что такое Python
Python — интерпретируемый язык программирования с простым синтаксисом. Код выполняется сверху вниз. Отступы являются частью синтаксиса.

Пример:
name = "Herman"
age = 19
print(name, age)

2. Переменные и типы
Переменная — имя, которое ссылается на значение.
Основные типы:
int — целое: 5
float — дробное: 3.14
str — строка: "text"
bool — True / False
None — отсутствие значения

Проверка типа:
type(x)

Преобразование:
int("12")
float("3.5")
str(123)
bool(1)

3. Ввод и вывод
print("Привет")
name = input("Имя: ")
age = int(input("Возраст: "))

f-строки:
print(f"Привет, {name}. Тебе {age} лет")

4. Операторы
Арифметика:
+ - * / // % **
/ — обычное деление
// — целая часть
% — остаток
** — степень

Сравнения:
== != > < >= <=

Логика:
and, or, not

5. Условия
if age >= 18:
    print("Совершеннолетний")
elif age >= 16:
    print("Почти")
else:
    print("Младше")

6. Строки
s = "Python"
s[0]       # P
s[-1]      # n
s[1:4]     # yth
len(s)
s.lower()
s.upper()
s.strip()
s.replace("Py", "My")
s.split()
"-".join(["a","b"])

Строки неизменяемые: отдельный символ заменить напрямую нельзя.

7. Списки list
nums = [10, 20, 30]
nums[0]
nums.append(40)
nums.insert(1, 15)
nums.remove(20)
last = nums.pop()
len(nums)
nums.sort()
nums.reverse()

Срезы:
nums[:3]
nums[::2]
nums[::-1]

Копия:
copy = nums.copy()

8. Кортеж tuple
point = (3, 4)
Кортеж похож на список, но его нельзя менять. Удобен для фиксированных данных.

9. Множество set
s = {1,2,3}
s.add(4)
s.remove(2)
Множество хранит уникальные элементы.
Операции:
a | b — объединение
a & b — пересечение
a - b — разность

10. Словарь dict
user = {"name":"Herman", "age":19}
user["name"]
user.get("city", "нет")
user["city"] = "Wrocław"
user.keys()
user.values()
user.items()

Перебор:
for key, value in user.items():
    print(key, value)

11. Цикл for
for i in range(5):
    print(i)

range(5) -> 0..4
range(2, 6) -> 2..5
range(0, 10, 2) -> 0,2,4,6,8

По списку:
for item in nums:
    print(item)

С индексом:
for i, item in enumerate(nums):
    print(i, item)

12. Цикл while
x = 0
while x < 5:
    print(x)
    x += 1

break — выйти из цикла
continue — перейти к следующей итерации

13. Функции
def add(a, b):
    return a + b

result = add(2, 3)

Значение по умолчанию:
def hello(name="мир"):
    print(f"Привет, {name}")

Именованные аргументы:
hello(name="Herman")

14. Область видимости
Переменная внутри функции обычно локальная. Не злоупотребляй global — лучше возвращать значение через return.

15. List comprehension
squares = [x*x for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]

Аналогично существуют set/dict comprehensions:
lookup = {x: x*x for x in range(5)}

16. Полезные встроенные функции
len, sum, min, max, sorted, range, enumerate, zip, any, all, round, abs

Пример zip:
for name, score in zip(names, scores):
    print(name, score)

17. Исключения
try:
    x = int(input("Число: "))
except ValueError:
    print("Это не число")
else:
    print("Ошибки не было")
finally:
    print("Этот блок выполнится всегда")

Своя ошибка:
raise ValueError("Неверное значение")

18. Файлы
Чтение:
with open("data.txt", "r", encoding="utf-8") as f:
    text = f.read()

Запись:
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("Hello")

Режимы: r — чтение, w — перезапись, a — дописывание, b — бинарный.

19. Модули
import math
print(math.sqrt(25))

from math import pi

Свой файл helper.py можно подключить через import helper.

20. pip и виртуальное окружение
Установка пакета:
pip install requests

Создание окружения:
python -m venv .venv

Окружение изолирует зависимости проекта.

21. JSON
import json

text = json.dumps({"a":1}, ensure_ascii=False)
data = json.loads(text)

Для файла:
json.dump(data, f, ensure_ascii=False, indent=2)
json.load(f)

22. Классы и ООП
class Student:
    def __init__(self, name):
        self.name = name

    def hello(self):
        return f"Привет, {self.name}"

s = Student("Herman")
print(s.hello())

self — текущий объект.
__init__ — конструктор.
Наследование:
class ITStudent(Student):
    pass

23. lambda, map, filter
square = lambda x: x*x
Обычно читаемый list comprehension предпочтительнее map/filter для простых задач.

24. Сортировка по ключу
students = [{"name":"A","score":3},{"name":"B","score":5}]
students.sort(key=lambda x: x["score"], reverse=True)

25. Работа с None
if value is None:
    ...
Для None используют is / is not, а не ==.

26. True/False и truthy/falsy
Пустые значения обычно False:
0, "", [], {}, set(), None

if items:
    print("Список не пуст")

27. Распаковка
a, b = 10, 20
a, b = b, a
first, *middle, last = [1,2,3,4,5]

28. *args и **kwargs
def f(*args, **kwargs):
    print(args)
    print(kwargs)

29. Генераторы
Генератор отдаёт значения по одному и экономит память.
def count(n):
    for i in range(n):
        yield i

30. Основная конструкция программы
if __name__ == "__main__":
    main()

Она означает: запускать main() только при прямом запуске файла.

31. Частые ошибки новичка
= — присваивание, == — сравнение.
Не забывать двоеточие после if/for/while/def/class.
Следить за отступами.
input() всегда возвращает str.
Индекс списка начинается с 0.
Не называть переменные list, str, sum — это перекрывает встроенные функции.

32. Мини-шаблон задачи
1) Прочитать условие.
2) Определить входные данные и желаемый результат.
3) Выбрать типы данных.
4) Разбить задачу на маленькие шаги/функции.
5) Проверить на простом примере.
6) Проверить крайние случаи: пустой ввод, 0, отрицательные значения, дубликаты.

Главное для первого семестра: уверенно владеть переменными, условиями, циклами, функциями, строками, list/dict/set, файлами и обработкой ошибок.`
      },
      {
        id:'builtin-data-structures-v1',
        title:'Структуры данных — полный базовый конспект',
        subject:'algorithms',date:'2026-10-03',tags:['структуры данных','алгоритмы','Big O'],updated:Date.now(),
        content:`СТРУКТУРЫ ДАННЫХ — БАЗА

Структура данных — способ организовать данные так, чтобы нужные операции выполнялись удобно и быстро.

1. Сложность Big O
O(1) — постоянное время.
O(log n) — логарифмическое.
O(n) — линейное.
O(n log n) — типично для хороших сортировок.
O(n²) — двойной вложенный перебор.

Big O показывает, как растут затраты при росте входа, а не точное количество миллисекунд.

2. Массив / динамический массив
Элементы лежат по индексам.
Плюс: быстрый доступ по индексу O(1).
Минус: вставка в середину обычно O(n), потому что элементы надо сдвигать.

В Python list — динамический массив.
Доступ: arr[i] — O(1)
append — амортизированно O(1)
поиск значения — O(n)
вставка/удаление в середине — O(n)

3. Связный список
Состоит из узлов. Каждый узел хранит значение и ссылку на следующий узел.
Односвязный: next.
Двусвязный: next + prev.

Плюс: вставка после известного узла O(1).
Минус: получить 100-й элемент нельзя мгновенно — надо пройти от начала O(n).

4. Стек (Stack)
Принцип LIFO: последний вошёл — первый вышел.
Операции:
push — положить
pop — снять верхний
peek/top — посмотреть верхний

Примеры: история отмены, вызовы функций, проверка скобок.
Python:
stack = []
stack.append(x)
x = stack.pop()

5. Очередь (Queue)
Принцип FIFO: первый вошёл — первый вышел.
Операции:
enqueue — добавить в конец
dequeue — забрать из начала

Для Python удобно:
from collections import deque
q = deque()
q.append(x)
x = q.popleft()

Не стоит постоянно делать list.pop(0): это O(n).

6. Deque
Двусторонняя очередь. Можно быстро добавлять и удалять с обоих концов.
append, appendleft, pop, popleft обычно O(1).

7. Множество (Set)
Хранит уникальные элементы.
Обычно основано на хеш-таблице.
Проверка x in set в среднем O(1).
Полезно для удаления дублей и быстрых проверок принадлежности.

8. Хеш-таблица / словарь
Хеш-функция превращает ключ в число, по которому выбирается место хранения.
Python dict — хеш-таблица.

В среднем:
получить по ключу — O(1)
добавить — O(1)
удалить — O(1)

Коллизия — разные ключи дали одинаковую область хеша; структура должна уметь это обработать.

9. Дерево
Иерархическая структура из узлов.
Термины:
root — корень
parent — родитель
child — ребёнок
leaf — лист
height — высота
subtree — поддерево

10. Бинарное дерево
У каждого узла максимум два ребёнка: left и right.

11. Бинарное дерево поиска (BST)
Для узла обычно:
всё слева < значение узла
всё справа > значение узла

Если дерево сбалансировано, поиск/вставка/удаление около O(log n).
Если превратилось в цепочку — O(n).

12. Обходы дерева
DFS:
preorder: root-left-right
inorder: left-root-right
postorder: left-right-root

Для BST inorder даёт значения в отсортированном порядке.

BFS — обход по уровням, обычно через очередь.

13. Куча (Heap)
Дерево для быстрого получения минимума или максимума.
Min-heap: родитель <= детей.
Получить минимум O(1), вставить O(log n), удалить минимум O(log n).

Python:
import heapq
heapq.heappush(h, x)
heapq.heappop(h)

Применение: очередь с приоритетом, алгоритм Дейкстры, поиск k лучших элементов.

14. Граф
Граф = вершины (vertices) + рёбра (edges).
Бывает:
ориентированный / неориентированный
взвешенный / невзвешенный
с циклами / без циклов

Представление:
список смежности:
graph = {"A":["B","C"], "B":["A"]}

Матрица смежности удобна для плотных графов, но требует O(V²) памяти.

15. DFS и BFS в графе
DFS идёт в глубину: стек или рекурсия.
BFS идёт слоями: очередь.

В невзвешенном графе BFS находит кратчайший путь по количеству рёбер.

16. Приоритетная очередь
Элемент извлекается не по времени добавления, а по приоритету. Обычно реализуется кучей.

17. Trie (префиксное дерево)
Хранит строки по символам. Полезно для автодополнения и поиска по префиксу.

18. Union-Find / DSU
Хранит непересекающиеся множества и быстро отвечает, находятся ли два элемента в одной компоненте.
Операции: find и union.
Используется, например, в алгоритме Краскала.

19. Как выбирать структуру
Нужен быстрый доступ по индексу -> list/array.
Нужна уникальность и быстрый in -> set.
Нужна связь ключ -> значение -> dict.
Нужен LIFO -> stack.
Нужен FIFO -> deque/queue.
Нужен постоянный минимум/максимум -> heap.
Нужна иерархия -> tree.
Нужны связи между объектами -> graph.

20. Главное правило
Не существует "лучшей" структуры данных вообще. Выбор зависит от операций, которые будут выполняться чаще всего.

Мини-шпаргалка Python:
list: индекс O(1), поиск O(n), append O(1) amortized
set: поиск в среднем O(1)
dict: ключ в среднем O(1)
deque: оба конца O(1)
heapq: push/pop O(log n)`
      },
      {
        id:'builtin-vectors-v1',
        title:'Векторы — с нуля: формулы и примеры',
        subject:'algebra',date:'2026-10-03',tags:['векторы','алгебра','формулы'],updated:Date.now(),
        content:`ВЕКТОРЫ — КОНСПЕКТ С НУЛЯ

1. Что такое вектор
Вектор можно представлять как стрелку. У него есть направление и длина.

В 2D:
a = (x, y)
В 3D:
a = (x, y, z)

Например a=(3,4): 3 по оси x и 4 по оси y.

2. Длина вектора
Для a=(x,y):
|a| = sqrt(x² + y²)

Для a=(x,y,z):
|a| = sqrt(x² + y² + z²)

Пример:
a=(3,4)
|a|=sqrt(9+16)=5

3. Нулевой вектор
0=(0,0) или (0,0,0). Его длина равна 0, а направление не определено.

4. Равные векторы
Векторы равны, если их соответствующие координаты равны.
(2,3)=(2,3)

5. Сложение
(x1,y1)+(x2,y2)=(x1+x2, y1+y2)

Пример:
(2,1)+(3,4)=(5,5)

Геометрически: поставь начало второго вектора в конец первого.

6. Вычитание
(x1,y1)-(x2,y2)=(x1-x2, y1-y2)

Пример:
(5,4)-(2,1)=(3,3)

7. Умножение на число
k(x,y)=(kx,ky)

2(3,4)=(6,8)
-1(3,4)=(-3,-4)

Положительное число меняет длину, отрицательное ещё и разворачивает направление.

8. Вектор между двумя точками
Если A=(x1,y1), B=(x2,y2), то
AB=(x2-x1, y2-y1)

Пример:
A=(1,2), B=(5,5)
AB=(4,3)

9. Единичный вектор
Единичный вектор имеет длину 1.
Чтобы нормировать a, делим на длину:
a_hat = a / |a|

Для (3,4):
(3/5,4/5)

Нулевой вектор нормировать нельзя.

10. Скалярное произведение
Для a=(x1,y1), b=(x2,y2):
a·b = x1*x2 + y1*y2

В 3D добавляется z1*z2.

Пример:
(2,3)·(4,1)=8+3=11

11. Угол между векторами
a·b = |a||b| cos(theta)

Отсюда:
cos(theta) = (a·b)/(|a||b|)

theta = arccos(...)

12. Перпендикулярность
Если ненулевые векторы перпендикулярны, то:
a·b=0

Пример:
(1,2)·(2,-1)=2-2=0
Значит угол 90°.

13. Параллельность
Векторы параллельны, если один является числом, умноженным на другой:
b = k*a

Например (2,4) и (1,2) параллельны, потому что (2,4)=2(1,2).

14. Линейная комбинация
v = c1*a + c2*b + ...
То есть новый вектор строится сложением векторов, умноженных на числа.

15. Линейная зависимость
Набор векторов линейно зависим, если один можно выразить через остальные (эквивалентно: существует нетривиальная комбинация, дающая нулевой вектор).

В 2D два ненулевых вектора зависимы, если они параллельны.

16. Базис
В 2D стандартный базис:
e1=(1,0)
e2=(0,1)

Любой (x,y):
(x,y)=x*e1+y*e2

В 3D добавляется e3=(0,0,1).

17. Координаты вектора
Координаты — коэффициенты разложения по выбранному базису. В стандартном базисе это привычные x,y,z.

18. Проекция
Скалярная проекция a на b:
comp_b(a) = (a·b)/|b|

Векторная проекция:
proj_b(a) = ((a·b)/|b|²) b

19. Векторное произведение (3D)
Для a и b результат a×b — вектор, перпендикулярный обоим.

Если
a=(a1,a2,a3), b=(b1,b2,b3), то
a×b=(a2b3-a3b2, a3b1-a1b3, a1b2-a2b1)

Длина:
|a×b|=|a||b|sin(theta)
Она равна площади параллелограмма на этих векторах.

20. Физический смысл
Скорость, сила, ускорение, перемещение — векторные величины, потому что для них важны и размер, и направление.

21. Что надо уметь на первом этапе
- читать вектор по координатам;
- находить длину;
- складывать и вычитать;
- умножать на число;
- строить AB по двум точкам;
- считать скалярное произведение;
- определять перпендикулярность;
- находить угол;
- нормировать вектор.

Мини-примеры:
1) |(6,8)| = 10.
2) (2,5)+(3,-1)=(5,4).
3) (1,2) и (2,-1) перпендикулярны, потому что их скалярное произведение равно 0.`
      }
    ];
    const ids = new Set(notes.map(n=>n.id));
    const missing = builtins.filter(n=>!ids.has(n.id));
    if(missing.length){ notes = [...missing, ...notes]; save(); }
    try { localStorage.setItem(BUILTIN_KEY,'1'); } catch(_) {}
  }

  function render(){
    const q=$('#search').value.trim().toLowerCase();
    const filtered=notes.filter(n => (filterSubject==='all'||n.subject===filterSubject) && (!q || [n.title,n.content,n.tags?.join(' '),subjectName(n.subject)].join(' ').toLowerCase().includes(q))).sort((a,b)=>(b.date||'').localeCompare(a.date||'') || (b.updated||0)-(a.updated||0));
    $('#noteCount').textContent=notes.length;
    $('#subjectCount').textContent=new Set(notes.map(n=>n.subject)).size;
    $('#recentCount').textContent=notes.filter(n=>Date.now()-(n.updated||0)<7*864e5).length;
    $('#notesLabel').textContent=filterSubject==='all'?'Последние конспекты':subjectName(filterSubject);

    $('#subjects').innerHTML=subjects.map(([id,icon,name])=>{
      const count=notes.filter(n=>n.subject===id).length;
      return `<article class="subject" data-subject="${id}"><div class="icon">${esc(icon)}</div><h3>${esc(name)}</h3><p>Лекции, упражнения и материалы</p><div class="count">${count} ${plural(count,'конспект','конспекта','конспектов')}</div></article>`
    }).join('');
    $$('#subjects .subject').forEach(el=>el.onclick=()=>{filterSubject=el.dataset.subject;render();$('#notesSection').scrollIntoView({behavior:'smooth'})});

    const box=$('#notes');
    if(!filtered.length){box.innerHTML='<div class="empty">Ничего не найдено. Создай первый конспект или измени поиск.</div>';return}
    box.innerHTML=filtered.map(n=>`<article class="note" data-id="${n.id}"><div class="note-date">${formatDate(n.date)}</div><div><h3>${esc(n.title)}</h3><p>${esc((n.content||'').replace(/\n+/g,' ').slice(0,150))}</p></div><div class="tags"><span class="tag">${esc(subjectIcon(n.subject))} ${esc(subjectName(n.subject))}</span>${(n.tags||[]).slice(0,2).map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</div></article>`).join('');
    $$('#notes .note').forEach(el=>el.onclick=()=>openEditor(el.dataset.id));
  }
  function plural(n,a,b,c){const m=n%100;if(m>=11&&m<=14)return c;switch(n%10){case 1:return a;case 2:case 3:case 4:return b;default:return c}}

  function openEditor(id=null){
    editingId=id; const n=id?notes.find(x=>x.id===id):null;
    $('#editorTitle').textContent=n?'Редактировать конспект':'Новый конспект';
    $('#noteTitle').value=n?.title||''; $('#noteSubject').value=n?.subject||'python'; $('#noteDate').value=n?.date||today();
    $('#noteTags').value=(n?.tags||[]).join(', '); $('#noteContent').value=n?.content||''; $('#deleteBtn').classList.toggle('hidden',!n);
    $('#modal').classList.add('open'); document.body.style.overflow='hidden'; setTimeout(()=>$('#noteTitle').focus(),50);
  }
  function closeEditor(){ $('#modal').classList.remove('open'); document.body.style.overflow=''; editingId=null }
  function persistEditor(){
    const title=$('#noteTitle').value.trim(); if(!title){toast('Добавь название');$('#noteTitle').focus();return}
    const obj={id:editingId||uid(),title,subject:$('#noteSubject').value,date:$('#noteDate').value||today(),tags:$('#noteTags').value.split(',').map(x=>x.trim().replace(/^#/,'')).filter(Boolean),content:$('#noteContent').value,updated:Date.now()};
    if(editingId) notes=notes.map(n=>n.id===editingId?obj:n); else notes.unshift(obj); save(); closeEditor(); render(); toast('Конспект сохранён');
  }
  function exportNotes(){const blob=new Blob([JSON.stringify({version:1,exported:new Date().toISOString(),notes},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`cloudpath-notes-${today()}.json`;a.click();URL.revokeObjectURL(a.href)}
  function importNotes(file){const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);const incoming=Array.isArray(data)?data:data.notes;if(!Array.isArray(incoming))throw 0;notes=incoming;save();render();toast('Конспекты импортированы')}catch{toast('Не удалось прочитать файл')}};r.readAsText(file)}

  document.addEventListener('DOMContentLoaded',()=>{
    seedIfEmpty(); installBuiltinNotes(); $('#today').textContent=new Date().toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'});
    $('#noteSubject').innerHTML=subjects.map(([id,icon,name])=>`<option value="${id}">${icon} ${name}</option>`).join('');
    $('#newNote').onclick=()=>openEditor(); $('#newNoteSide').onclick=()=>openEditor(); $('#closeEditor').onclick=closeEditor; $('#cancelBtn').onclick=closeEditor; $('#saveBtn').onclick=persistEditor;
    $('#deleteBtn').onclick=()=>{if(editingId&&confirm('Удалить этот конспект?')){notes=notes.filter(n=>n.id!==editingId);save();closeEditor();render();toast('Конспект удалён')}};
    $('#search').addEventListener('input',render); $('#allNotes').onclick=()=>{filterSubject='all';render();$('#notesSection').scrollIntoView({behavior:'smooth'})};
    $('#exportBtn').onclick=exportNotes; $('#importBtn').onclick=()=>$('#importFile').click(); $('#importFile').onchange=e=>e.target.files[0]&&importNotes(e.target.files[0]);
    $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeEditor()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#modal').classList.contains('open'))closeEditor();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'&&$('#modal').classList.contains('open')){e.preventDefault();persistEditor()}});
    render();
  });
})();
