!function(t){var e={};function s(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(i,r,function(e){return t[e]}.bind(null,r));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);const i=new WeakMap;class r{constructor(t=[]){i.set(this,t)}add(t,e=-1){const s=i.get(this),r=s.length;if(-1==e)s.push(t);else{if(e<0||e>r)throw new Error("index is out of range");s.splice(e,0,t)}i.set(this,s)}delete(t=-1){let e=i.get(this);if(-1!=t){if(t<0||t>=e.length)throw new Error("index out of range");e.splice(t,1)}else e.pop();i.set(this,e)}del(t){const e=i.get(this);if(t){const s=e.indexOf(t);if(-1==s)throw new Error("item is not in the list");this.delete(s)}}get arr(){return i.get(this)}get count(){return i.get(this).length}}const n=document.querySelector(".todo"),o=n.querySelector("#title"),u=n.querySelector("#description"),a=n.querySelector("#duedate"),c=n.querySelector("#priority"),h=n.querySelector("#notes");const l=document.querySelector(".todos"),p=document.querySelector(".projects"),d=new WeakMap,g=new WeakMap,w=new WeakMap,v=new WeakMap,f=new WeakMap;class y{constructor(t=""){d.set(this,t),w.set(this,new Date(0)),f.set(this,[])}set title(t){d.set(this,t)}get title(){return d.get(this)}set description(t){g.set(this,t)}get description(){return g.get(this)}set dueDate(t){w.set(this,t)}get dueDate(){return w.get(this)}set priority(t){v.set(this,t)}get priority(){return v.get(this)}set notes(t){f.set(this,t)}get notes(){return f.get(this)}input(){var t;(t=this)&&(t.title=o.value,t.description=u.value,a.value?t.dueDate=new Date(a.value):t.dueDate=new Date(0),t.priority=c.value,t.notes=h.value.split("\n"))}output(){var t;(t=this)&&(o.value=t.title,u.value=t.description,a.value=t.dueDate.toISOString().slice(0,10),c.value=t.priority,h.value=t.notes.join("\n"))}}const m=new WeakMap,M=new WeakMap,k=new WeakMap,W=new WeakMap,S=new WeakMap,b=new WeakMap,j=new WeakMap,q=new WeakMap,x=new WeakMap;class O{constructor(t,e){this.div=t,this.items=e,m.set(this,t.querySelector("#title")),M.set(this,t.querySelector("ul")),k.set(this,t.querySelector("#new")),W.set(this,t.querySelector("#delete")),x.set(this,t=>{const e=t.target;this.items.active=Number(e.id)}),S.set(this,(t,e,s)=>{const i=document.createElement("li");i.textContent=t.title,i.id=e,i.addEventListener("click",x.get(this)),s==e?i.classList.add("active"):i.classList.remove("active");M.get(this).appendChild(i)}),b.set(this,()=>{this.items.remove()}),W.get(this).addEventListener("click",b.get(this)),j.set(this,()=>{this.items.new()}),k.get(this).addEventListener("click",j.get(this)),q.set(this,()=>{const t=M.get(this);t.innerHTML="",M.set(this,t)})}output(){q.get(this)(),m.get(this)&&(m.get(this).value=this.items.title);const t=this.items.active;this.items.list.arr.forEach((e,s)=>{S.get(this)(e,s,t)})}input(){this.items.title=m.get(this).value}}const D=new WeakMap,E=new WeakMap,L=new WeakMap,P=new WeakMap,_=new WeakMap;class N{constructor(t,e){this.display=new O(e,this),D.set(this,t),E.set(this,new r),L.set(this,-1),P.set(this,(t,e,s)=>{e>=0&&e<t.count&&t.arr[e].input(),s>=0&&t.arr[s].output()}),_.set(this,()=>{const t=E.get(this).arr,e=L.get(this);e>=0&&t[e].output()})}set title(t){D.set(this,t)}get title(){return D.get(this)}get list(){return E.get(this)}get active(){return L.get(this)}set active(t){const e=E.get(this),s=L.get(this);return L.set(this,t),P.get(this)(e,s,t),this.output(),L.get(this)}addNew(t){const e=E.get(this);t.input(),e.add(t),L.set(this,e.count-1),E.set(this,e),this.output()}remove(){const t=E.get(this);t.count>0&&(t.delete(this.active),t.count<=this.active&&L.set(this,t.count-1)),E.set(this,t),this.output()}input(){this.display.input()}output(){this.display.output(),_.get(this)()}}const T=new WeakMap;class C extends N{constructor(t,e){super(t,l),this.projects=e,T.set(this,()=>{const t=this.projects.active;return this.projects.list.arr[t]===this})}new(){if(!T.get(this)())return;const t=new y;this.addNew(t)}remove(){T.get(this)()&&super.remove()}output(){T.get(this)()&&super.output()}}new class extends N{constructor(t){super(t,p)}new(){const t=new C("",this);super.addNew(t)}}("allProjects")}]);