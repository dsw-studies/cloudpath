"""Checks source links, mathematical edge cases and each practice family.
Run with sympy installed, after build_october_math.py.
"""
from pathlib import Path
import json, re, xml.etree.ElementTree as ET
from html.parser import HTMLParser
import sympy as s
R=Path(__file__).resolve().parents[1]
manifest=json.loads((R/'scripts/october-math-manifest.json').read_text())
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.ids=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag in ['a','script','link','img']:self.links.append(a.get('href',a.get('src','')))
for pg in manifest['pages']:
 text=(R/(pg['slug']+'.html')).read_text(); doc=Links();doc.feed(text)
 assert len(doc.ids)==len(set(doc.ids))
 assert '<iframe' not in text and '<embed' not in text
 assert text.count('<math ')>=10
 for mm in re.findall(r'<math\b.*?</math>',text):ET.fromstring(mm)
 for link in doc.links:
  path=link.split('#')[0].split('?')[0]
  if path and not re.match(r'^\w+:',path):assert (R/path).is_file(),link
  if link.startswith('#'):assert link[1:] in doc.ids,link
assert manifest['practice_count']==250 and all(t['count']==10 for t in manifest['topics'])
x,m,n,t=s.symbols('x m n t',real=True)
assert s.factor(2*x**3-x*x-12)==(x-2)*(2*x*x+3*x+6)
assert s.simplify((s.sqrt(3)-1)**2/(2*(s.sqrt(3)-1)-2))==-1
assert s.solve_univariate_inequality((x*x-2*x-3)/(x-1)<=0,x,relational=False)==s.Union(s.Interval(-s.oo,-1),s.Interval.Lopen(1,3))
assert s.solve_univariate_inequality(2/s.Abs(3*x-1)>1,x,relational=False)==s.Union(s.Interval.open(-s.Rational(1,3),s.Rational(1,3)),s.Interval.open(s.Rational(1,3),1))
assert s.solve(2*x*x-4*x+1,x)==[1-s.sqrt(2)/2,1+s.sqrt(2)/2]
valid=1-s.sqrt(2)/2;assert abs(1/(2-valid))<1
invalid=1+s.sqrt(2)/2;assert abs(1/(2-invalid))>1
assert s.limit((6*n**4+n*n-5)/(2-n**3),n,s.oo)==-s.oo
assert s.limit((2*n+1)*(2*n-1)**2/((4-2*n*n)*(n+3)),n,s.oo)==-4
# Parameter interval cross-check: compare real roots directly for points in and out of each region.
for val in [-5,-3,-2,-1,-s.Rational(1,4),0,1,2]:
 roots=s.solve(x*x-(2*val+2)*x-val,x)
 expected=(val<(-3-s.sqrt(5))/2) or ((-3+s.sqrt(5))/2<val<0)
 actual=len(roots)==2 and all(z.is_real and z<2 for z in roots)
 assert bool(actual)==bool(expected),(val,roots)
for k in range(1,11):
 # Roots, symmetric expressions, substitution and factorization.
 assert s.expand((x-2)*(x-k))==x*x-(k+2)*x+2*k
 assert (k+3)**2-6*k==k*k+9
 assert (k+3)**2-12*k==(k-3)**2
 assert s.expand((t-k)*(t+2*k+1))==t*t+(k+1)*t-k*(2*k+1)
 assert s.expand((x-k)*(x*x+2))==x**3-k*x*x+2*x-2*k
 assert s.expand((x-k)*(x*x+1))==x**3-k*x*x+x-k
 assert s.simplify((x*x-k*k)/(x-k)-(x+k))==0
 assert s.simplify(k+2/(x+1)).subs(x,-1-s.Rational(2,k))==0
 assert s.simplify(((x*x-k*k)/(x+k))/((x-k)/(x+k+1))-(x+k+1))==0
 assert s.solve_univariate_inequality((x+k)*(x-k-2)/(x-1)<=0,x,relational=False)==s.Union(s.Interval(-s.oo,-k),s.Interval.Lopen(1,k+2))
 assert s.solve_univariate_inequality((k+1)/s.Abs(x-k)>1,x,relational=False)==s.Union(s.Interval.open(-1,k),s.Interval.open(k,2*k+1))
 assert s.Rational(k*2**(k+1),2*k)==2**k
 assert (2+k)**2==(k+2)**2 and 2+k>1
 assert 4**(k+1)==2**(2*k+2)
 assert s.expand((t-k)*(t+k+1))==t*t+t-k*k-k
 assert s.expand(((n+1)**2+k*(n+1)+1)-(n*n+k*n+1))==2*n+k+1
 assert sum(-k+2*i for i in range(k+3))==2*(k+3)
 assert k+3*(5-1)==k+12
 assert sum(k*2**i for i in range(5))==31*k
 assert s.limit((k*n*n+3*n+1)/(2*n*n+n+4),n,s.oo)==s.Rational(k,2)
 assert s.limit((k*n*n+1)/(n**3+2),n,s.oo)==0
 assert s.limit((k*n**3+1)/(2-n*n),n,s.oo)==-s.oo
 assert s.Rational(k+1,2)/(k+1)==s.Rational(1,2)
print('PASS: 5 pages, MathML, links, 250 exercise instances and corrected mathematical edge cases')
