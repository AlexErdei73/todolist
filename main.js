!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=new WeakMap,i=new WeakMap,o=new WeakMap,s=new WeakMap,u=new WeakMap;const a=new WeakMap;class l{constructor(e=[]){a.set(this,e)}add(e,t=-1){const n=a.get(this),r=n.length;if(-1==t)n.push(e);else{if(t<0||t>r)throw new Error("index is out of range");n.splice(t,0,e)}a.set(this,n)}delete(e=-1){let t=a.get(this);if(-1!=e){if(e<0||e>=t.length)throw new Error("index out of range");t.splice(e,1)}else t.pop();a.set(this,t)}del(e){const t=a.get(this);if(e){const n=t.indexOf(e);if(-1==n)throw new Error("item is not in the list");this.delete(n)}}get list(){return a.get(this)}get count(){return a.get(this).length}}const c=new WeakMap,d=new WeakMap;const h=new WeakMap;const p=document.querySelector("#title"),f=document.querySelector("#description"),g=document.querySelector("#duedate"),y=document.querySelector("#priority"),w=document.querySelector("#notes");function v(e){p.value=e.title,f.value=e.description,g.value=e.dueDate.toISOString().slice(0,10),y.value=e.priority,w.value=e.notes.join("\n")}const m=new class{constructor(){h.set(this,new l)}get projectList(){return h.get(this)}add(e){h.get(this).add(e)}remove(e){h.get(this).del(e)}},b=new class{constructor(e){c.set(this,e),d.set(this,new l)}get title(){return c.get(this)}get list(){return d.get(this)}add(e){const t=d.get(this);t.add(e),d.set(this,t)}delete(e){const t=d.get(this);t.del(e),d.set(this,t)}}("daily routine");m.add(b);const M=new class{constructor(e=""){r.set(this,e)}set title(e){r.set(this,e)}get title(){return r.get(this)}set description(e){i.set(this,e)}get description(){return i.get(this)}set dueDate(e){o.set(this,e)}get dueDate(){return o.get(this)}set priority(e){s.set(this,e)}get priority(){return s.get(this)}set notes(e){u.set(this,e)}get notes(){return u.get(this)}}("Brush Your Teeth");M.description="After you woke up, it is very important to brush your teeth.Do it imediately after getting out of bed.",M.dueDate=new Date("2020-08-12"),M.priority="low",M.notes=["You must do it for at least 3 minutes.","You should do it after eating sweets too."],v(M);document.querySelector("#new");newBtn.addEventListener("click",(function(){var e;(e=M).title=p.value,e.description=f.value,e.dueDate=new Date(g.value),e.priority=y.value,e.notes=w.value.split("\n"),v(M)}))}]);