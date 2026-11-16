(() => {
  const KEY = 'cloudpath-notes-v1';
  const BUILTIN_KEY = 'cloudpath-builtin-notes-v3-installed';
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
        id:'builtin-physics-vectors-formulas-v1',
        title:'Физика — векторы: все основные формулы',
        subject:'physics',date:'2026-10-07',tags:['векторы','силы','скорость','ускорение','формулы'],updated:Date.now(),
        content:`ФИЗИКА — ВЕКТОРЫ: ОСНОВНЫЕ ФОРМУЛЫ

1. Вектор по координатам
A = (A_x, A_y)
В 3D:
A = (A_x, A_y, A_z)

2. Модуль вектора
|A| = sqrt(A_x² + A_y²)
В 3D:
|A| = sqrt(A_x² + A_y² + A_z²)

3. Разложение по осям
Если угол alpha измеряется от оси x:
A_x = A cos(alpha)
A_y = A sin(alpha)

Для силы:
F_x = F cos(alpha)
F_y = F sin(alpha)

Для скорости:
v_x = v cos(alpha)
v_y = v sin(alpha)

4. Угол по компонентам
tan(alpha) = A_y / A_x
alpha = arctan(A_y / A_x)

5. Сложение векторов
R = A + B
R_x = A_x + B_x
R_y = A_y + B_y

6. Вычитание векторов
R = A - B
R_x = A_x - B_x
R_y = A_y - B_y

7. Умножение вектора на число
B = kA
B_x = kA_x
B_y = kA_y

Если k<0, направление меняется на противоположное.

8. Скалярное произведение
A·B = A_x B_x + A_y B_y
Также:
A·B = |A||B|cos(alpha)

Отсюда:
cos(alpha) = (A·B)/(|A||B|)

Если A·B=0, векторы перпендикулярны.

9. Второй закон Ньютона
F = ma

По осям:
F_x = ma_x
F_y = ma_y

Отсюда:
a_x = F_x/m
a_y = F_y/m

Если дана результирующая сила:
a = F_result/m

10. Скорость
v = Delta r / Delta t

По координатам:
v_x = Delta x / Delta t
v_y = Delta y / Delta t

Модуль:
|v| = sqrt(v_x² + v_y²)

11. Изменение скорости
Delta v = v_2 - v_1

По координатам:
Delta v_x = v_2x - v_1x
Delta v_y = v_2y - v_1y

12. Ускорение
a = Delta v / Delta t

По координатам:
a_x = Delta v_x / Delta t
a_y = Delta v_y / Delta t

Модуль:
|a| = sqrt(a_x² + a_y²)

13. Равномерное движение
s = vt
По осям:
x = x_0 + v_x t
y = y_0 + v_y t

14. Равноускоренное движение
v = v_0 + at
s = v_0 t + (a t²)/2
v² = v_0² + 2as

По осям:
v_x = v_0x + a_x t
v_y = v_0y + a_y t

15. Бросок под углом (без сопротивления воздуха)
v_0x = v_0 cos(alpha)
v_0y = v_0 sin(alpha)

По горизонтали:
x = v_0x t

По вертикали:
y = v_0y t - g t²/2

Вертикальная скорость:
v_y = v_0y - gt

Дальность:
R = v_0² sin(2alpha) / g

16. Полезные значения
sin30° = 1/2
cos30° = sqrt(3)/2 ≈ 0.866

sin45° = sqrt(2)/2 ≈ 0.707
cos45° = sqrt(2)/2 ≈ 0.707

sin60° = sqrt(3)/2 ≈ 0.866
cos60° = 1/2

17. Быстрый алгоритм задачи
1) Нарисуй оси x и y.
2) Нарисуй вектор.
3) Если дан модуль и угол — разложи через cos/sin.
4) Все силы/скорости складывай отдельно по x и y.
5) Найди итоговый вектор.
6) Модуль — через sqrt(x²+y²).
7) Угол — через arctan(y/x).

Мини-шпаргалка:
A_x = A cos(alpha)
A_y = A sin(alpha)
|A| = sqrt(A_x² + A_y²)
alpha = arctan(A_y/A_x)
R_x = A_x + B_x
R_y = A_y + B_y
F = ma
a = Delta v / Delta t
Delta v = v_2 - v_1`
      },
      {
        id:'builtin-algebra-matrices-gauss-v1',
        title:'Алгебра — матрицы, Гаусс, определители и обратная матрица',
        subject:'algebra',date:'2026-10-05',tags:['матрицы','Гаусс','определитель','обратная'],updated:Date.now(),
        content:`АЛГЕБРА — МАТРИЦЫ И МЕТОД ГАУССА

1. Размер матрицы
Матрица m×n имеет m строк и n столбцов.

2. Умножение матриц
Главное правило: строка первой матрицы × столбец второй.
Умножение A(m×n)·B(n×p) возможно только если внутренние размеры совпадают.
Результат имеет размер m×p.

Элемент результата:
c_ij = сумма a_ik*b_kj.

Пример:
(3×2)(2×3) -> (3×3).

3. Метод Гаусса
Систему уравнений записываем расширенной матрицей.
Разрешены операции:
- поменять строки местами;
- умножить строку на ненулевое число;
- прибавить к строке другую строку, умноженную на число.

Цель: получить треугольный вид
* * *
0 * *
0 0 *
и затем найти переменные снизу вверх.

4. Типы решений системы
Если после Гаусса появляется строка
0 0 0 | c, где c != 0,
то решений нет.

Если появляется
0 0 0 | 0
и переменных больше, чем независимых уравнений,
есть свободная переменная и обычно бесконечно много решений.

5. Определитель 2×2
Для
[a b
 c d]
det(A)=ad-bc.

6. Треугольная матрица
Если все элементы ниже главной диагонали равны 0 (или все выше неё равны 0), определитель равен произведению диагональных элементов.

Пример:
[2 5 1
 0 3 4
 0 0 7]
det=2*3*7=42.

7. Обратная матрица
Обратная A^(-1) существует только для квадратной матрицы с det(A) != 0.

Для 2×2:
A=[a b; c d]

A^(-1)=1/(ad-bc) * [d -b; -c a].

8. Гаусс–Жордан для обратной матрицы
Записываем:
(A | I)
и преобразованиями строк приводим левую часть к I:
(A | I) -> (I | A^(-1)).

Если на диагонали не единицы, делим соответствующую строку на диагональный элемент.

9. Типы матриц
Квадратная — одинаковое число строк и столбцов.
Прямоугольная — размеры разные.
Нулевая — все элементы 0.
Единичная — на главной диагонали 1, остальные 0.
Диагональная — вне главной диагонали нули.
Верхне-/нижнетреугольная — нули ниже/выше диагонали.
Симметричная — A^T=A.
Вырожденная — det(A)=0.
Обратимая — det(A) != 0.

10. Линейная зависимость
Если один вектор является числом, умноженным на другой, они линейно зависимы.
Например:
(2,4,6)=2(1,2,3).`
      },
      {
        id:'builtin-analysis-derivatives-series-v1',
        title:'Матан — производные и числовые ряды',
        subject:'analysis',date:'2026-10-05',tags:['производные','ряды','Даламбер','Лейбниц'],updated:Date.now(),
        content:`МАТАН — ПРОИЗВОДНЫЕ И РЯДЫ

1. Базовая производная
(x^n)' = n*x^(n-1)
(c)' = 0
(x)' = 1
(e^x)' = e^x
(ln x)' = 1/x
(sin x)' = cos x
(cos x)' = -sin x

2. Правило произведения
(uv)' = u'v + uv'.

Пример:
f(x)=(x²+1)(3x-2)
f'(x)=2x(3x-2)+3(x²+1)
=9x²-4x+3.

3. Правило дроби
(u/v)' = (u'v-uv')/v².

Пример:
f(x)=(x²+1)/(x-1)
f'(x)=(x²-2x-1)/(x-1)².

4. Ряд
Ряд — бесконечная сумма:
sum a_n.

Главный вопрос: сходится ли сумма к конечному числу.

5. Геометрический ряд
a + aq + aq² + ...
сходится, если |q|<1.
Сумма:
S=a/(1-q).

6. p-ряд
sum 1/n^p
сходится при p>1;
расходится при p<=1.

7. Необходимое условие сходимости
Если a_n не стремится к 0, ряд точно расходится.
Но a_n -> 0 само по себе ещё не гарантирует сходимость.
Пример: гармонический ряд sum 1/n расходится.

8. Признак Даламбера
L = lim |a_(n+1)/a_n|.

Если L<1 — ряд сходится абсолютно.
Если L>1 — расходится.
Если L=1 — признак ничего не решает.

Особенно удобен при n!, a^n, n^k/a^n.

Пример:
a_n=2^n/n!
a_(n+1)/a_n = 2/(n+1) -> 0,
значит ряд сходится.

9. Признак сравнения
Если 0<=a_n<=b_n и sum b_n сходится, то sum a_n тоже сходится.

Пример:
1/(n²+1) < 1/n²,
а sum 1/n² сходится.

10. Признак Лейбница
Для знакочередующегося ряда
sum (-1)^n a_n
достаточно:
- a_n -> 0;
- a_n начиная с некоторого места убывает.

Тогда ряд сходится.

11. Абсолютная и условная сходимость
Если sum |a_n| сходится — абсолютная сходимость (СА).
Если исходный ряд сходится, но sum |a_n| расходится — условная (СУ).

Пример:
sum (-1)^(n+1)/n — СУ.
sum (-1)^n/n² — СА.

12. Быстрая схема
Сначала проверь a_n -> 0.
Потом:
- геометрический вид -> q;
- 1/n^p -> p-ряд;
- factorial/степени -> Даламбер;
- похож на известный ряд -> сравнение;
- (-1)^n -> Лейбниц, затем отдельно проверка модулей на СА/СУ.`
      },
      {
        id:'builtin-intro-number-systems-v1',
        title:'Podstawy informatyki — системы счисления, арифметика, U1/U2 и машина Тьюринга',
        subject:'intro',date:'2026-10-06',tags:['2 8 10 16','U1','U2','двоичная','Turing'],updated:Date.now(),
        content:`PODSTAWY INFORMATYKI — СИСТЕМЫ СЧИСЛЕНИЯ

1. Основные системы
2 — двоичная: 0,1
8 — восьмеричная: 0..7
10 — десятичная: 0..9
16 — шестнадцатеричная: 0..9,A,B,C,D,E,F

В hex:
A=10, B=11, C=12, D=13, E=14, F=15.

2. Из любой системы в десятичную
Каждую цифру умножаем на соответствующую степень основания.

Пример:
157_8 = 1*8² + 5*8 + 7 = 111_10.

15A_16 = 1*16² + 5*16 + 10 = 346_10.

01111001_2 = 64+32+16+8+1 = 121_10.

3. Из 10 в другую систему
Целое число многократно делим на основание и записываем остатки.
Ответ читаем снизу вверх.

Для 10->2 делим на 2.
Для 10->8 делим на 8.
Для 10->16 делим на 16.

Пример:
333_10 = 101001101_2.

4. Быстрый перевод 2 <-> 8
1 восьмеричная цифра = 3 бита.
Группируем двоичное число справа налево по 3 бита.

5. Быстрый перевод 2 <-> 16
1 hex-цифра = 4 бита.
Группируем справа налево по 4 бита.

Полезные соответствия:
0000=0
0001=1
0010=2
0011=3
0100=4
0101=5
0110=6
0111=7
1000=8
1001=9
1010=A
1011=B
1100=C
1101=D
1110=E
1111=F

6. 8 <-> 16
Быстрее всего через двоичную:
8 -> 2 -> 16
или
16 -> 2 -> 8.

7. Дробные числа: система -> 10
После точки идут отрицательные степени основания.

Пример:
101.101_2 =
1*2² + 1*2^0 + 1*2^(-1) + 1*2^(-3)
=5.625_10.

17.4_8 = 15.5_10.
A.C_16 = 10.75_10.

8. Десятичная дробь -> другая система
Дробную часть многократно умножаем на основание и каждый раз берём целую часть результата.

Пример:
0.625*2=1.25 -> 1
0.25*2=0.5 -> 0
0.5*2=1.0 -> 1
значит 0.625_10=0.101_2.

9. Арифметика
Принцип такой же, как в десятичной, но перенос зависит от основания.

Двоичная:
1+1=10_2.
При вычитании заём 10_2 равен 2_10.
Умножение на 2 — сдвиг влево/добавление 0 справа.
Деление на 2 для целого — сдвиг вправо.

Восьмеричная:
7+1=10_8.
При заёме 10_8=8_10.

Hex:
F+1=10_16.
При заёме 10_16=16_10.

10. ZM, U1, U2 для отрицательных чисел
Всегда сначала фиксируем количество битов.

Пример для -13 в 8 битах:
+13 = 00001101.

ZM (znak-moduł):
первый бит — знак, остальные — модуль.
-13 = 10001101.

U1 (uzupełnienie do jedynki):
инвертируем все биты положительного числа:
00001101 -> 11110010.

U2 (uzupełnienie do dwóch):
берём U1 и прибавляем 1:
11110010 + 1 = 11110011.

11. Машина Тьюринга
Абстрактная модель вычислений:
- бесконечная лента из ячеек;
- головка читает одну ячейку;
- может записать символ;
- двигается влево/вправо;
- имеет состояние q0, q1, ...;
- правила определяют следующий шаг.

Пример правила:
(q0,1) -> (q1,0,R).

Машина Тьюринга нужна для формального понимания того, что такое алгоритм и какие задачи вообще вычислимы.`
      },
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
