(() => {
  const schedule = [
    {date:'2026-10-01',items:[
      ['12:30–14:00','Algorytmy i struktury danych','Wykład · WykS','S55 111','dr Ewa Gurbiel','Egzamin'],
      ['14:15–15:45','Algorytmy i struktury danych','Wykład · WykS','S55 111','dr Ewa Gurbiel','Egzamin'],
      ['16:00–17:30','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S55 108','dr Ewa Gurbiel','Zaliczenie ocena']
    ]},
    {date:'2026-10-02',items:[
      ['10:45–12:15','Programowanie w języku Python 1','Wykład · WykS','S55 111','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Wykład · WykS','S55 111','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Fizyka 1','Wykład · WykS','S55 111','mgr Artur Rokosa','Egzamin']
    ]},
    {date:'2026-10-03',free:true,items:[]},
    {date:'2026-10-04',free:true,items:[]},
    {date:'2026-10-05',items:[
      ['10:45–12:15','Podstawy informatyki','Wykład · WykS','S55 111','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['12:30–14:00','Algebra liniowa z geometrią analityczną','Wykład · WykS','S55 111','mgr Janusz Grabski','Egzamin'],
      ['14:15–15:45','Analiza matematyczna 1','Wykład · WykS','S55 111','mgr Janusz Grabski','Zaliczenie ocena'],
      ['16:00–17:30','Zajęcia z tutorem','Ćwiczenia · Ćw1S','S55 112','mgr inż. Karol Kaluga','Nie dotyczy']
    ]},
    {date:'2026-10-06',items:[
      ['12:30–14:00','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena']
    ]},
    {date:'2026-10-07',items:[
      ['10:45–12:15','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 216','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 216','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-10-08',free:true,items:[]},
    {date:'2026-10-09',remote:true,items:[
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin'],
      ['17:45–19:15','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin']
    ]},
    {date:'2026-10-10',free:true,items:[]},
    {date:'2026-10-11',free:true,items:[]},
    {date:'2026-10-12',remote:true,items:[
      ['09:00–10:30','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['10:45–12:15','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['12:30–14:00','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena'],
      ['14:15–15:45','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena']
    ]},
    {date:'2026-10-13',items:[
      ['12:30–14:00','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-10-14',items:[
      ['09:00–10:30','Fizyka 1','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','mgr Artur Rokosa','Zaliczenie ocena'],
      ['10:45–12:15','Fizyka 1','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','mgr Artur Rokosa','Zaliczenie ocena'],
      ['12:30–14:00','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','dr Ewa Gurbiel','Zaliczenie ocena'],
      ['14:15–15:45','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','dr Ewa Gurbiel','Zaliczenie ocena']
    ]},
    {date:'2026-10-15',items:[
      ['09:00–10:30','Kompetencje przyszłości 1','Ćwiczenia · Ćw1S','S47 119','mgr Magdalena Kowańdy','Zaliczenie'],
      ['10:45–12:15','Kompetencje przyszłości 1','Ćwiczenia · Ćw1S','S47 119','mgr Magdalena Kowańdy','Zaliczenie']
    ]},
    {date:'2026-10-16',remote:true,items:[
      ['12:30–14:00','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['14:15–15:45','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin'],
      ['16:00–17:30','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['17:45–19:15','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin']
    ]},
    {date:'2026-10-17',free:true,items:[]},
    {date:'2026-10-18',free:true,items:[]},
    {date:'2026-10-19',free:true,items:[]},
    {date:'2026-10-20',items:[
      ['12:30–14:00','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['16:00–17:30','Analiza matematyczna 1','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-10-21',free:true,items:[]},
    {date:'2026-10-22',free:true,items:[]},
    {date:'2026-10-23',remote:true,items:[
      ['10:45–12:15','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin']
    ]},
    {date:'2026-10-24',free:true,items:[]},
    {date:'2026-10-25',free:true,items:[]},
    {date:'2026-10-26',remote:true,items:[
      ['10:45–12:15','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['12:30–14:00','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['14:15–15:45','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena'],
      ['16:00–17:30','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena']
    ]},
    {date:'2026-10-27',items:[
      ['09:00–10:30','Podstawy informatyki','Wykład · WykS','S55 111','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['10:45–12:15','Podstawy informatyki','Wykład · WykS','S55 111','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['12:30–14:00','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 212 · prac. matematyczna/ratownicza','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-10-28',items:[
      ['09:00–10:30','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['10:45–12:15','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 216','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 216','mgr inż. Mateusz Hyk','Zaliczenie ocena']
    ]}

    {date:'2026-10-29',free:true,items:[]},
    {date:'2026-10-30',remote:true,items:[
      ['10:45–12:15','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin'],
      ['16:00–17:30','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin']
    ]},
    {date:'2026-11-04',items:[
      ['11:30–13:00','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','dr Ewa Gurbiel','Zaliczenie ocena'],
      ['13:15–14:45','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','dr Ewa Gurbiel','Zaliczenie ocena'],
      ['15:10–18:15','Analiza matematyczna 1','Ćwiczenia · Ćw1S','matematyczna/r','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-11-05',free:true,items:[]},
    {date:'2026-11-06',remote:true,items:[
      ['10:45–12:15','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-11-09',remote:true,items:[
      ['10:45–12:15','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['12:30–14:00','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['9:00–10:30','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena']
    ]},
    {date:'2026-11-10',free:true,items:[]},
    {date:'2026-11-12',items:[
      ['12:30–14:00','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-11-13',remote:true,items:[
      ['10:45–12:15','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['12:30–14:00','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['14:15–15:45','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin'],
      ['16:00–17:30','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['17:45–19:15','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin']
    ]},
    {date:'2026-11-16',remote:true,items:[
      ['9:00–10:30','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena']
    ]},
    {date:'2026-11-17',items:[
      ['12:30–14:00','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','matematyczna/r','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-11-18',items:[
      ['9:45–11:15','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['11:30–13:15','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','dr Ewa Gurbiel','Zaliczenie ocena'],
      ['13:15–15:00','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','dr Ewa Gurbiel','Zaliczenie ocena'],
      ['15:05–18:15','Analiza matematyczna 1','Ćwiczenia · Ćw1S','matematyczna/r','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-11-19',free:true,items:[]},
    {date:'2026-11-20',remote:true,items:[
      ['10:45–12:15','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin'],
      ['16:00–17:30','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin'],
      ['17:45–19:15','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin']
    ]},
    {date:'2026-11-23',free:true,items:[]},
    {date:'2026-11-24',items:[
      ['12:30–14:00','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena']
    ]},
    {date:'2026-11-25',items:[
      ['9:00–10:30','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['10:45–12:15','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 208','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 208','mgr inż. Mateusz Hyk','Zaliczenie ocena']
    ]},
    {date:'2026-11-26',items:[
      ['9:00–10:30','Kompetencje przyszłości 1','Ćwiczenia · Ćw1S','matematyczna/r','mgr Magdalena Kowańdy','Zaliczenie'],
      ['10:45–12:15','Kompetencje przyszłości 1','Ćwiczenia · Ćw1S','matematyczna/r','mgr Magdalena Kowańdy','Zaliczenie']
    ]},
    {date:'2026-11-27',items:[
      ['10:45–12:15','Programowanie w języku Python 1','Wykład · WykS','S47 8','mgr inż. Mateusz Hyk','Zaliczenie ocena']
    ]},
    {date:'2026-11-30',remote:true,items:[
      ['9:00–10:30','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['10:45–12:15','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['12:30–14:00','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['14:15–15:45','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena'],
      ['16:00–17:30','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena']
    ]},
    {date:'2026-12-01',items:[
      ['10:45–12:15','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 217','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','matematyczna/r','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','matematyczna/r','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-12-02',free:true,items:[]},
    {date:'2026-12-03',free:true,items:[]},
    {date:'2026-12-04',remote:true,items:[
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin'],
      ['17:45–19:15','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin']
    ]},
    {date:'2026-12-07',free:true,items:[]},
    {date:'2026-12-08',items:[
      ['12:30–14:00','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['16:00–17:30','Analiza matematyczna 1','Ćwiczenia · Ćw1S','matematyczna/r','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-12-09',items:[
      ['9:00–10:30','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['10:45–12:15','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['12:30–14:00','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 208','mgr inż. Mateusz Hyk','Zaliczenie ocena']
    ]},
    {date:'2026-12-10',free:true,items:[]},
    {date:'2026-12-11',remote:true,items:[
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin'],
      ['16:00–17:30','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin'],
      ['17:45–19:15','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin']
    ]},
    {date:'2026-12-14',remote:true,items:[
      ['9:00–10:30','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['10:45–12:15','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena']
    ]},
    {date:'2026-12-15',items:[
      ['12:30–14:00','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['14:15–15:45','Podstawy informatyki','Ćwiczenia · Ćw1S','S47 210','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','matematyczna/r','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2026-12-16',items:[
      ['10:45–12:15','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','dr Ewa Gurbiel','Zaliczenie ocena'],
      ['12:30–14:00','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','dr Ewa Gurbiel','Zaliczenie ocena'],
      ['14:15–15:45','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 208','mgr inż. Mateusz Hyk','Zaliczenie ocena']
    ]},
    {date:'2026-12-18',remote:true,items:[
      ['10:45–12:15','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin']
    ]},
    {date:'2027-01-04',remote:true,items:[
      ['9:00–10:30','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['10:45–12:15','Podstawy informatyki','Wykład · WykS','Distance learning','mgr inż. Wiktor Ziętara','Zaliczenie ocena'],
      ['12:30–14:00','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena'],
      ['14:15–15:45','Etyka inżyniera i prawo autorskie','Wykład · WykS','Distance learning','dr inż. Joanna Nowicka','Zaliczenie ocena']
    ]},
    {date:'2027-01-05',free:true,items:[]},
    {date:'2027-01-07',items:[
      ['9:00–10:30','Kompetencje przyszłości 1','Ćwiczenia · Ćw1S','matematyczna/r','mgr Magdalena Kowańdy','Zaliczenie'],
      ['10:45–12:15','Kompetencje przyszłości 1','Ćwiczenia · Ćw1S','matematyczna/r','mgr Magdalena Kowańdy','Zaliczenie']
    ]},
    {date:'2027-01-08',remote:true,items:[
      ['9:00–10:30','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['10:45–12:15','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin']
    ]},
    {date:'2027-01-11',free:true,items:[]},
    {date:'2027-01-12',items:[
      ['12:30–14:00','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 217','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['16:00–17:30','Analiza matematyczna 1','Ćwiczenia · Ćw1S','matematyczna/r','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2027-01-13',items:[
      ['9:00–10:30','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['10:45–12:15','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena'],
      ['12:30–14:00','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 119','dr Ewa Gurbiel','Zaliczenie ocena'],
      ['14:15–15:45','Algorytmy i struktury danych','Ćwiczenia · Ćw1S','S47 119','dr Ewa Gurbiel','Zaliczenie ocena']
    ]},
    {date:'2027-01-14',free:true,items:[]},
    {date:'2027-01-15',remote:true,items:[
      ['10:45–12:15','Algorytmy i struktury danych','Wykład · WykS','Distance learning','dr Ewa Gurbiel','Egzamin'],
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['16:00–17:30','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin'],
      ['17:45–19:15','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin']
    ]},
    {date:'2027-01-19',items:[
      ['10:45–12:15','Programowanie w języku Python 1','Ćwiczenia · Ćw1S','S47 217','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Ćwiczenia · Ćw1S','S47 312 - prac. matematyczna','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2027-01-20',items:[
      ['9:00–10:30','Fizyka 1','Ćwiczenia · Ćw1S','S47 119','mgr Artur Rokosa','Zaliczenie ocena']
    ]},
    {date:'2027-01-22',remote:true,items:[
      ['10:45–12:15','Programowanie w języku Python 1','Wykład · WykS','Distance learning','mgr inż. Mateusz Hyk','Zaliczenie ocena'],
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','Distance learning','mgr Janusz Grabski','Zaliczenie ocena'],
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Wykład · WykS','Distance learning','mgr Janusz Grabski','Egzamin'],
      ['16:00–17:30','Fizyka 1','Wykład · WykS','Distance learning','mgr Artur Rokosa','Egzamin']
    ]},
    {date:'2027-01-25',free:true,items:[]},
    {date:'2027-01-26',free:true,items:[]},
    {date:'2027-01-27',items:[
      ['12:30–14:00','Analiza matematyczna 1','Wykład · WykS','S55 111','mgr Janusz Grabski','Zaliczenie ocena']
    ]},
    {date:'2027-01-28',items:[
      ['10:45–12:15','Algorytmy i struktury danych','Wykład · WykS','S55 111','dr Ewa Gurbiel','Egzamin'],
      ['12:30–14:00','Algorytmy i struktury danych','Wykład · WykS','S55 111','dr Ewa Gurbiel','Egzamin'],
      ['14:15–15:45','Programowanie w języku Python 1','Wykład · WykS','S47 311','mgr inż. Mateusz Hyk','Zaliczenie ocena']
    ]},
    {date:'2027-01-29',items:[
      ['14:15–15:45','Algebra liniowa z geometrią analityczną','Wykład · WykS','S55 111','mgr Janusz Grabski','Egzamin'],
      ['16:00–17:30','Fizyka 1','Wykład · WykS','S55 111','mgr Artur Rokosa','Egzamin']
    ]}
  ];

  const copy = {
    ru: {
      locale:'ru-RU',
      remote:'онлайн',
      today:'сегодня',
      free:'Свободный день',
      noClasses:'Для группы Ćw1S занятий по этому плану нет.',
      campus:'DSW Wrocław',
      remotePlace:'Онлайн',
      lecture:'Лекция',
      exercises:'Практика',
      assessment:{'Egzamin':'Экзамен','Zaliczenie ocena':'Зачёт с оценкой','Zaliczenie':'Зачёт','Nie dotyczy':'Не применяется'}
    },
    pl: {
      locale:'pl-PL',
      remote:'online',
      today:'dzisiaj',
      free:'Dzień wolny',
      noClasses:'Dla grupy Ćw1S nie ma zajęć w tym planie.',
      campus:'DSW Wrocław',
      remotePlace:'Zajęcia zdalne',
      lecture:'Wykład',
      exercises:'Ćwiczenia',
      assessment:{'Egzamin':'Egzamin','Zaliczenie ocena':'Zaliczenie ocena','Zaliczenie':'Zaliczenie','Nie dotyczy':'Nie dotyczy'}
    },
    en: {
      locale:'en-GB',
      remote:'online',
      today:'today',
      free:'Free day',
      noClasses:'There are no classes for group Ćw1S in this timetable.',
      campus:'DSW Wrocław',
      remotePlace:'Online',
      lecture:'Lecture',
      exercises:'Exercises',
      assessment:{'Egzamin':'Exam','Zaliczenie ocena':'Graded credit','Zaliczenie':'Credit','Nie dotyczy':'N/A'}
    }
  };

  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[c]));

  const host = document.querySelector('#scheduleList');
  if (!host) return;

  function readLanguage() {
    try {
      const saved = localStorage.getItem('cloudpath-language');
      if (saved && copy[saved]) return saved;
    } catch (_) {}
    const htmlLang = document.documentElement.lang;
    return copy[htmlLang] ? htmlLang : 'ru';
  }

  function localToday() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function capitalize(value) {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  }

  function dayLabel(day, lang) {
    const t = copy[lang];
    const d = new Date(`${day.date}T12:00:00`);
    const base = capitalize(new Intl.DateTimeFormat(t.locale, {
      weekday:'long',
      day:'numeric',
      month:'long'
    }).format(d));
    return day.remote ? `${base} · ${t.remote}` : base;
  }

  function typeLabel(value, lang) {
    if (lang === 'pl') return value;
    return value
      .replace('Wykład', copy[lang].lecture)
      .replace('Ćwiczenia', copy[lang].exercises);
  }

  function roomLabel(value, lang) {
    return value === 'Distance learning' ? copy[lang].remotePlace : value;
  }

  function assessmentLabel(value, lang) {
    return copy[lang].assessment[value] || value;
  }

  function render(lang = readLanguage()) {
    if (!copy[lang]) lang = 'ru';
    const t = copy[lang];
    const today = localToday();

    host.innerHTML = schedule.map(day => {
      const isToday = day.date === today;
      const header = `${esc(dayLabel(day, lang))}${isToday ? ` · ${esc(t.today)}` : ''}`;
      const status = day.free ? t.free : day.remote ? 'Microsoft Teams / Moodle' : t.campus;
      const body = day.free
        ? `<div class="empty">${esc(t.noClasses)}</div>`
        : day.items.map(item => `
            <div class="lesson ${day.remote ? 'remote' : ''}">
              <div class="time">${esc(item[0])}</div>
              <div class="subject">${esc(item[1])}<small>${esc(assessmentLabel(item[5], lang))}</small></div>
              <div class="type">${esc(typeLabel(item[2], lang))}</div>
              <div class="room">${esc(roomLabel(item[3], lang))}</div>
              <div class="teacher">${esc(item[4])}</div>
            </div>
          `).join('');

      return `
        <article class="day-card ${day.free ? 'free-day' : ''}" ${isToday ? 'style="outline:2px solid currentColor;outline-offset:3px"' : ''}>
          <header class="day-head"><h3>${header}</h3><span>${esc(status)}</span></header>
          ${body}
        </article>
      `;
    }).join('');
  }

  render();
  window.addEventListener('cloudpath:language', event => render(event.detail?.lang || readLanguage()));
})();
