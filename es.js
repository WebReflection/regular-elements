self.regularElements=function(e){"use strict";const t=new Set,r=new MutationObserver(e=>{t.forEach(n,e)});function n(e){e(this,r)}r.observe(document,{subtree:!0,childList:!0}),t.observer=r;const o=new WeakMap,{observer:a}=t,l=e=>{for(let t=0,{length:r}=e;t<r;t++){const{target:r,attributeName:n,oldValue:a}=e[t],l=r.getAttribute(n);o.get(r).a[n].forEach(e=>{e.call(r,n,a,l)})}},c=(e,t,r)=>{for(let n=0,{length:a}=e;n<a;n++){const a=e[n];!r.has(a)&&"querySelectorAll"in a&&(r.add(a),o.has(a)&&o.get(a)[t].forEach(i,a),c(a.querySelectorAll("*"),t,r))}},s=e=>{for(let t=new Set,r=new Set,n=0,{length:o}=e;n<o;n++){const{addedNodes:o,removedNodes:a}=e[n];c(o,"c",t),l(d.takeRecords()),c(a,"d",r)}},d=new MutationObserver(l);t.add(s);var u=(e,{connectedCallback:t,disconnectedCallback:r,observedAttributes:n,attributeChangedCallback:l})=>{s(a.takeRecords());const{a:c,c:u,d:i}=o.get(e)||(e=>{const t={a:{},c:new Set,d:new Set};return o.set(e,t),t})(e);return n&&(d.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:n}),n.forEach(t=>{(c[t]||(c[t]=new Set)).add(l),e.hasAttribute(t)&&l.call(e,t,null,e.getAttribute(t))})),r&&i.add(r),t&&(u.add(t),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||t.call(e)),e};function i(e){e.call(this)}const h="function"==typeof Promise?Promise:function(e){let t=[],r=0;return e(()=>{r=1,t.splice(0).forEach(n)}),{then:n};function n(e){return r?setTimeout(e):t.push(e),this}};const f=[],b=[],w={},{get:g,upgrade:S,whenDefined:m,$:p}=((e,r,n,o)=>{const a=(e,t)=>{let r,n=0,{length:o}=e;for(;n<o;)r=e[n++],!t.has(r)&&"querySelectorAll"in r&&(t.add(r),l(r,t))},l=(t,n)=>{let l=0,{length:c}=e;for(;l<c;)(t.matches||t.webkitMatchesSelector||t.msMatchesSelector).call(t,e[l])&&o(t,r[l]),l++;c&&a(t.querySelectorAll(e),n)};return t.add(e=>{for(let t=new Set,r=0,{length:n}=e;r<n;r++)a(e[r].addedNodes,t)}),{get:t=>{const n=e.indexOf(t);return n<0?void 0:r[n].o},upgrade:e=>{l(e,new Set)},whenDefined:e=>{if(!(e in n)){let t,r=new h(e=>{t=e});n[e]={_:t,$:r}}return n[e].$},$:a}})(b,f,w,(e,{m:t,o:r})=>{t.has(e)||t.set(u(e,r),0)});return e.define=(e,t)=>{if(g(e))throw new Error("duplicated: "+e);b.push(e),f.push({o:t,m:new WeakMap}),p(document.querySelectorAll(e),new Set),m(e),w[e]._()},e.get=g,e.upgrade=S,e.whenDefined=m,e}({});
