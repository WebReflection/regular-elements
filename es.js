self.regularElements=function(e){"use strict";const t=new Set,r=new MutationObserver(e=>{t.forEach(n,e)});function n(e){e(this,r)}r.observe(document,{subtree:!0,childList:!0}),t.observer=r;const o=new WeakMap,{observer:a}=t,c=e=>{for(let t=0,{length:r}=e;t<r;t++){const{target:r,attributeName:n,oldValue:a}=e[t],c=r.getAttribute(n);o.get(r).a[n].forEach(e=>{e.call(r,n,a,c)})}},l=(e,t,r)=>{for(let n=0,{length:a}=e;n<a;n++){const a=e[n];r?"querySelectorAll"in a&&(o.has(a)&&o.get(a)[t].forEach(i,a),l(a.querySelectorAll("*"),t,!r)):o.has(a)&&o.get(a)[t].forEach(i,a)}},s=e=>{for(let t=0,{length:r}=e;t<r;t++){const{addedNodes:r,removedNodes:n}=e[t];l(r,"c",!0),c(u.takeRecords()),l(n,"d",!0)}},u=new MutationObserver(c);t.add(s);var d=(e,{connectedCallback:t,disconnectedCallback:r,observedAttributes:n,attributeChangedCallback:c})=>{s(a.takeRecords());const{a:l,c:d,d:i}=o.get(e)||(e=>{const t={a:{},c:new Set,d:new Set};return o.set(e,t),t})(e);return n&&(u.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:n}),n.forEach(t=>{(l[t]||(l[t]=new Set)).add(c),e.hasAttribute(t)&&c.call(e,t,null,e.getAttribute(t))})),r&&i.add(r),t&&(d.add(t),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||t.call(e)),e};function i(e){e.call(this)}const h="function"==typeof Promise?Promise:function(e){let t=[],r=0;return e(()=>{r=1,t.splice(0).forEach(n)}),{then:n};function n(e){return r?setTimeout(e):t.push(e),this}};const f=[],b=[],g={},{get:w,upgrade:m,whenDefined:S,_:p,$:v}=((e,r,n,o)=>{const a=(e,t)=>{for(let r=0,{length:n}=e;r<n;r++)!t.has(e[r])&&"querySelectorAll"in e[r]&&c(e[r],t)},c=(t,r)=>{for(let n=0,{length:a}=e;n<a;n++)o(t,n,r)};return t.add(e=>{for(let t=new Set,r=0,{length:n}=e;r<n;r++)a(e[r].addedNodes,t)}),{get:t=>{const n=e.indexOf(t);return n<0?void 0:r[n].o},upgrade:e=>{c(e,!0)},whenDefined:e=>{if(!(e in n)){let t,r=new h(e=>{t=e});n[e]={_:t,$:r}}return n[e].$},_:(e,t)=>(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,t),$:a}})(b,f,g,(e,t,r)=>{if(p(e,b[t])){const{m:r,o:n}=f[t];r.has(e)||r.set(d(e,n),0)}v(e.querySelectorAll(b),r)});return e.define=(e,t)=>{if(w(e))throw new Error("duplicated: "+e);b.push(e),f.push({o:t,m:new WeakMap}),v(document.querySelectorAll(e),new Set),S(e),g[e]._()},e.get=w,e.upgrade=m,e.whenDefined=S,e}({});
