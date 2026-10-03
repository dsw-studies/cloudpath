(() => {
  const KEY='cloudpath-notes-v2';
  const BUILTIN_KEY='cloudpath-builtins-v2';
  const subjects=[
    ['analysis','∑','Analiza matematyczna I'],['algebra','A','Algebra liniowa z geometrią analityczną'],['python','</>','Programowanie w języku Python 1'],['algorithms','{}','Algorytmy i struktury danych'],['physics','φ','Fizyka 1'],['intro','01','Podstawy informatyki'],['ethics','§','Etyka inżyniera i prawo autorskie'],['future','↗','Kompetencje przyszłości I'],['other','·','Inne']
  ];
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  let notes=load(); let editingId=null;

  function load(){
    for(const k of [KEY,'cloudpath-notes-v1']){
      try{const x=JSON.parse(localStorage.getItem(k));if(Array.isArray(x)&&x.length)return x}catch{}
    }
    return [];
  }
  function save(){localStorage.setItem(KEY,JSON.stringify(notes))}
  function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
  function today(){return new Date().toISOString().slice(0,10)}
  function formatDate(s){if(!s)return'';return new Date(s+'T12:00:00').toLocaleDateString('ru-RU',{day:'2-digit',month:'short',year:'numeric'})}
  function subjectName(id){return subjects.find(s=>s[0]===id)?.[2]||'Inne'}
  function subjectIcon(id){return subjects.find(s=>s[0]===id)?.[1]||'·'}
  function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500)}

  const builtins=[
    {
      id:'builtin-python-full-v2',title:'Python — полный конспект с нуля',subject:'python',date:'2026-10-03',tags:['python','база','шпаргалка'],updated:Date.now(),
      content:`PYTHON — ПОЛНЫЙ КОНСПЕКТ С НУЛЯ

1. База
Python выполняет код сверху вниз. Отступы — часть синтаксиса.

Переменные и типы:
x = 10          # int
y = 3.14        # float
name = "Herman" # str
ok = True       # bool
value = None

Проверка типа: type(x)
Преобразование: int(), float(), str(), bool()

2. Ввод и вывод
print("Привет")
name = input("Имя: ")
age = int(input("Возраст: "))
print(f"Привет, {name}. Тебе {age}")

3. Операторы
+ - * / // % **
== != > < >= <=
and or not

4. Условия
if age >= 18:
    print("18+")
elif age >= 16:
    print("16+")
else:
    print("младше")

5. Строки
s = "Python"
s[0], s[-1], s[1:4]
len(s)
s.lower(), s.upper(), s.strip(), s.replace("Py","My"), s.split()
"-".join(["a","b"])

6. Списки list
nums = [10,20,30]
nums.append(40)
nums.insert(1,15)
nums.remove(20)
nums.pop()
nums.sort()
nums.reverse()
nums[1:3]

7. Кортеж tuple
point=(3,4)
Похож на список, но неизменяемый.

8. Множество set
s={1,2,3}
s.add(4)
Уникальные элементы. Проверка x in s обычно быстрая.
Операции: a|b, a&b, a-b.

9. Словарь dict
user={"name":"Herman","age":19}
user["name"]
user.get("city","нет")
user["city"]="Wrocław"
for k,v in user.items():
    print(k,v)

10. for
for i in range(5):
    print(i)
for i,item in enumerate(nums):
    print(i,item)

11. while
x=0
while x<5:
    print(x)
    x+=1
break — выйти; continue — следующая итерация.

12. Функции
def add(a,b):
    return a+b

def hello(name="мир"):
    print(f"Привет, {name}")

13. Comprehensions
squares=[x*x for x in range(10)]
evens=[x for x in range(20) if x%2==0]
d={x:x*x for x in range(5)}

14. Полезные функции
len, sum, min, max, sorted, range, enumerate, zip, any, all, round, abs.

15. Ошибки
try:
    x=int(input())
except ValueError:
    print("Не число")
finally:
    print("готово")

16. Файлы
with open("data.txt","r",encoding="utf-8") as f:
    text=f.read()
with open("data.txt","w",encoding="utf-8") as f:
    f.write("Hello")

17. Модули
import math
print(math.sqrt(25))
from math import pi

18. JSON
import json
text=json.dumps({"a":1},ensure_ascii=False)
data=json.loads(text)

19. Классы
class Student:
    def __init__(self,name):
        self.name=name
    def hello(self):
        return f"Привет, {self.name}"

s=Student("Herman")

20. Сортировка по ключу
students.sort(key=lambda x:x["score"],reverse=True)

21. Распаковка
a,b=10,20
a,b=b,a
first,*middle,last=[1,2,3,4]

22. *args и **kwargs
def f(*args,**kwargs):
    print(args,kwargs)

23. Генераторы
def count(n):
    for i in range(n):
        yield i

24. Главный блок
if __name__ == "__main__":
    main()

25. Частые ошибки
= — присваивание, == — сравнение.
input() возвращает str.
Индексы начинаются с 0.
Не забывать двоеточие и отступы.
Не называть переменные list, str, sum.

Для первого семестра главное: переменные, if, for/while, функции, строки, list/dict/set, файлы и исключения.`
    },
    {
      id:'builtin-data-structures-v2',title:'Структуры данных — полный базовый конспект',subject:'algorithms',date:'2026-10-03',tags:['структуры данных','алгоритмы','Big O'],updated:Date.now(),
      content:`СТРУКТУРЫ ДАННЫХ — БАЗА

Структура данных — способ организовать данные так, чтобы нужные операции были удобными и быстрыми.

1. Big O
O(1) — постоянное время.
O(log n) — логарифмическое.
O(n) — линейное.
O(n log n) — хорошие сортировки.
O(n²) — часто два вложенных цикла.

2. Массив / Python list
Доступ по индексу O(1).
append — амортизированно O(1).
Поиск значения O(n).
Вставка/удаление в середине O(n).

3. Связный список
Узлы хранят значение и ссылку next; в двусвязном ещё prev.
Вставка после известного узла O(1), доступ к i-му элементу O(n).

4. Стек
LIFO: последний вошёл — первый вышел.
Python:
stack=[]
stack.append(x)
x=stack.pop()

5. Очередь
FIFO: первый вошёл — первый вышел.
from collections import deque
q=deque()
q.append(x)
x=q.popleft()

6. Deque
Быстро добавляет/удаляет с обоих концов: append, appendleft, pop, popleft.

7. Set
Хранит уникальные элементы. Проверка x in set в среднем O(1).

8. Dict / хеш-таблица
Ключ -> значение. Получение, добавление, удаление в среднем O(1).
Коллизия — разные ключи попали в одну область хеша.

9. Дерево
root — корень, parent — родитель, child — ребёнок, leaf — лист, subtree — поддерево.

10. Бинарное дерево
У узла максимум два ребёнка.

11. BST
Слева значения меньше, справа больше.
В сбалансированном дереве поиск около O(log n), в вырожденном O(n).

12. Обходы
DFS: preorder, inorder, postorder.
BFS: по уровням, обычно через очередь.

13. Heap
Min-heap быстро даёт минимум.
Минимум O(1), push/pop O(log n).
Python: heapq.heappush, heapq.heappop.

14. Граф
Вершины + рёбра. Бывает ориентированный/неориентированный, взвешенный/невзвешенный.
Список смежности:
graph={"A":["B","C"],"B":["A"]}

15. DFS и BFS
DFS — в глубину, стек/рекурсия.
BFS — слоями, очередь. В невзвешенном графе BFS находит кратчайший путь по числу рёбер.

16. Приоритетная очередь
Извлекается элемент с лучшим приоритетом. Обычно реализуется heap.

17. Trie
Префиксное дерево для строк, поиска по префиксу и автодополнения.

18. DSU / Union-Find
Операции find и union. Проверяет, находятся ли элементы в одной компоненте.

Как выбирать:
индекс -> list
уникальность / быстрый in -> set
ключ-значение -> dict
LIFO -> stack
FIFO -> deque
минимум/максимум -> heap
иерархия -> tree
связи -> graph

Главная мысль: лучшей структуры вообще нет — структура выбирается под операции.`
    },
    {
      id:'builtin-vectors-v2',title:'Векторы — с нуля: формулы и примеры',subject:'algebra',date:'2026-10-03',tags:['векторы','алгебра','формулы'],updated:Date.now(),
      content:`ВЕКТОРЫ — С НУЛЯ

Вектор — стрелка: у него есть длина, направление (kierunek) и ориентированность/сторона направления (zwrot).

1. Координаты
a=(x,y), в 3D a=(x,y,z).
Например (3,4): 3 вправо по x и 4 вверх по y.

2. Длина
|a|=sqrt(x²+y²)
В 3D: sqrt(x²+y²+z²).
Пример: |(3,4)|=5.

3. Нулевой вектор
(0,0). Длина 0.

4. Сложение
(x1,y1)+(x2,y2)=(x1+x2,y1+y2)
(2,1)+(3,4)=(5,5)

5. Вычитание
(5,4)-(2,1)=(3,3)

6. Умножение на число
k(x,y)=(kx,ky)
2(3,4)=(6,8)
-(3,4)=(-3,-4)

7. Вектор между точками
A=(x1,y1), B=(x2,y2)
AB=(x2-x1,y2-y1)

8. Единичный вектор
Имеет длину 1.
a_hat=a/|a|
Для (3,4): (3/5,4/5).

9. Скалярное произведение
a·b=x1*x2+y1*y2
В 3D +z1*z2.

10. Угол
a·b=|a||b|cos(theta)
cos(theta)=(a·b)/(|a||b|)

11. Перпендикулярность
Если a·b=0, ненулевые векторы перпендикулярны.
(1,2)·(2,-1)=2-2=0.

12. Параллельность
b=k*a.
Например (2,4)=2(1,2).

13. Линейная комбинация
v=c1*a+c2*b+...

14. Линейная зависимость
Один вектор можно выразить через другие. В 2D два ненулевых вектора зависимы, если параллельны.

15. Базис
Стандартный базис 2D:
e1=(1,0), e2=(0,1)
(x,y)=x*e1+y*e2.

16. Проекция
proj_b(a)=((a·b)/|b|²)b

17. Векторное произведение в 3D
a×b перпендикулярно обоим векторам.
|a×b|=|a||b|sin(theta).

Что надо уметь сейчас:
читать координаты; находить длину; складывать/вычитать; умножать на число; строить AB; считать скалярное произведение; проверять перпендикулярность; находить угол; нормировать.

Мини-примеры:
|(6,8)|=10
(2,5)+(3,-1)=(5,4)
(1,2) и (2,-1) перпендикулярны.`
    }
  ];

  function ensureBuiltins(){
    const ids=new Set(notes.map(n=>n.id));
    const missing=builtins.filter(n=>!ids.has(n.id));
    if(missing.length){notes=[...missing,...notes];save()}
    try{localStorage.setItem(BUILTIN_KEY,'1')}catch{}
  }

  function renderNotes(){
    const q=$('#search').value.trim().toLowerCase(), f=$('#subjectFilter').value;
    const filtered=notes.filter(n=>(f==='all'||n.subject===f)&&(!q||[n.title,n.content,(n.tags||[]).join(' '),subjectName(n.subject)].join(' ').toLowerCase().includes(q))).sort((a,b)=>(b.date||'').localeCompare(a.date||'')||(b.updated||0)-(a.updated||0));
    $('#noteCount').textContent=notes.length;
    $('#subjectCount').textContent=new Set(notes.map(n=>n.subject)).size;
    $('#recentCount').textContent=notes.filter(n=>Date.now()-(n.updated||0)<7*864e5).length;
    $('#notesList').innerHTML=filtered.length?filtered.map(n=>`<article class="note-card" data-id="${esc(n.id)}"><div class="note-date">${formatDate(n.date)}</div><div><h3>${esc(n.title)}</h3><p>${esc((n.content||'').replace(/\n+/g,' ').slice(0,180))}</p></div><div class="tags"><span class="tag">${esc(subjectIcon(n.subject))} ${esc(subjectName(n.subject))}</span>${(n.tags||[]).slice(0,2).map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</div></article>`).join(''):'<div class="empty">Пока нет конспектов.</div>';
    $$('.note-card').forEach(el=>el.onclick=()=>openEditor(el.dataset.id));
  }

  function openEditor(id=null){
    editingId=id;const n=id?notes.find(x=>x.id===id):null;
    $('#editorTitle').textContent=n?'Редактировать конспект':'Новый конспект';
    $('#noteTitle').value=n?.title||'';$('#noteDate').value=n?.date||today();$('#noteSubject').value=n?.subject||'algorithms';$('#noteTags').value=(n?.tags||[]).join(', ');$('#noteContent').value=n?.content||'';$('#deleteBtn').hidden=!n;
    $('#modal').classList.add('open');$('#modal').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>$('#noteTitle').focus(),30)
  }
  function closeEditor(){$('#modal').classList.remove('open');$('#modal').setAttribute('aria-hidden','true');document.body.style.overflow='';editingId=null}
  function persist(){
    const title=$('#noteTitle').value.trim();if(!title){toast('Добавь название');return}
    const obj={id:editingId||uid(),title,date:$('#noteDate').value||today(),subject:$('#noteSubject').value,tags:$('#noteTags').value.split(',').map(x=>x.trim().replace(/^#/,'')).filter(Boolean),content:$('#noteContent').value,updated:Date.now()};
    notes=editingId?notes.map(n=>n.id===editingId?obj:n):[obj,...notes];save();closeEditor();renderNotes();toast('Конспект сохранён')
  }
  function exportNotes(){const blob=new Blob([JSON.stringify({version:2,exported:new Date().toISOString(),notes},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`cloudpath-notes-${today()}.json`;a.click();URL.revokeObjectURL(a.href)}
  function importNotes(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);const x=Array.isArray(d)?d:d.notes;if(!Array.isArray(x))throw 0;notes=x;ensureBuiltins();save();renderNotes();toast('Конспекты импортированы')}catch{toast('Не удалось прочитать файл')}};r.readAsText(file)}

  document.addEventListener('DOMContentLoaded',()=>{
    ensureBuiltins();
    $('#subjectFilter').innerHTML='<option value="all">Все предметы</option>'+subjects.map(([id,,name])=>`<option value="${id}">${esc(name)}</option>`).join('');
    $('#noteSubject').innerHTML=subjects.map(([id,icon,name])=>`<option value="${id}">${esc(icon)} ${esc(name)}</option>`).join('');
    $('#newNote').onclick=()=>openEditor();$('#closeEditor').onclick=closeEditor;$('#cancelBtn').onclick=closeEditor;$('#saveBtn').onclick=persist;
    $('#deleteBtn').onclick=()=>{if(editingId&&confirm('Удалить этот конспект?')){notes=notes.filter(n=>n.id!==editingId);save();closeEditor();renderNotes();toast('Конспект удалён')}};
    $('#search').addEventListener('input',renderNotes);$('#subjectFilter').addEventListener('change',renderNotes);
    $('#exportBtn').onclick=exportNotes;$('#importBtn').onclick=()=>$('#importFile').click();$('#importFile').onchange=e=>e.target.files[0]&&importNotes(e.target.files[0]);
    $('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeEditor()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#modal').classList.contains('open'))closeEditor();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'&&$('#modal').classList.contains('open')){e.preventDefault();persist()}});
    renderNotes();
  });
})();
