self.regularElements=function(e){"use strict";var t=new Set,n=new MutationObserver((function(e){t.forEach(r,e)}));function r(e){e(this,n)}n.observe(document,{subtree:!0,childList:!0}),t.observer=n;var a=new WeakMap,o=t.observer,u=function(e){for(var t=function(t,n){var r=e[t],o=r.target,u=r.attributeName,c=r.oldValue,i=o.getAttribute(u);a.get(o).a[u].forEach((function(e){e.call(o,u,c,i)}))},n=0,r=e.length;n<r;n++)t(n)},c=function e(t,n,r,o){for(var u=0,c=t.length;u<c;u++){var i=t[u];r.has(i)||!o&&!("querySelectorAll"in i)||(r.add(i),a.has(i)&&a.get(i)[n].forEach(f,i),e(i.querySelectorAll("*"),n,r,!0))}},i=function(e){for(var t=new Set,n=new Set,r=0,a=e.length;r<a;r++){var o=e[r],i=o.addedNodes,d=o.removedNodes;c(i,"c",t,!1),u(l.takeRecords()),c(d,"d",n,!1)}},l=new MutationObserver(u);t.add(i);var d=function(e,t){var n=t.connectedCallback,r=t.disconnectedCallback,u=t.observedAttributes,c=t.attributeChangedCallback;i(o.takeRecords());var d=a.get(e)||function(e){var t={a:{},c:new Set,d:new Set};return a.set(e,t),t}(e),f=d.a,s=d.c,h=d.d;return u&&(l.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:u}),u.forEach((function(t){(f[t]||(f[t]=new Set)).add(c),e.hasAttribute(t)&&c.call(e,t,null,e.getAttribute(t))}))),r&&h.add(r),n&&(s.add(n),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||n.call(e)),e};function f(e){e.call(this)}var s="function"==typeof Promise?Promise:function(e){var t=[],n=0;return e((function(){n=1,t.splice(0).forEach(r)})),{then:r};function r(e){return n?setTimeout(e):t.push(e),this}},h=[],v=[],b={},w=function(e,n,r,a){var o=function(e,t){for(var n,r=0,a=e.length;r<a;)n=e[r++],!t.has(n)&&"querySelectorAll"in n&&(t.add(n),u(n,t))},u=function(t,r){for(var u=0,c=e.length;u<c;)(t.matches||t.webkitMatchesSelector||t.msMatchesSelector).call(t,e[u])&&a(t,n[u]),u++;c&&o(t.querySelectorAll(e),r)};return t.add((function(e){for(var t=new Set,n=0,r=e.length;n<r;n++)o(e[n].addedNodes,t)})),{get:function(t){var r=e.indexOf(t);return r<0?void 0:n[r].o},upgrade:function(e){u(e,new Set)},whenDefined:function(e){if(!(e in r)){var t,n=new s((function(e){t=e}));r[e]={_:t,$:n}}return r[e].$},$:o}}(v,h,b,(function(e,t){var n=t.m,r=t.o;n.has(e)||n.set(d(e,r),0)})),g=w.get,S=w.upgrade,m=w.whenDefined,p=w.$;return e.define=function(e,t){if(g(e))throw new Error("duplicated: "+e);v.push(e),h.push({o:t,m:new WeakMap}),p(document.querySelectorAll(e),new Set,!0),m(e),b[e]._()},e.get=g,e.upgrade=S,e.whenDefined=m,e}({});