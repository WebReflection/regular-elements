self.regularElements=function(e){"use strict";var t=new Set,n=new MutationObserver((function(e){t.forEach(r,e)}));function r(e){e(this,n)}n.observe(document,{subtree:!0,childList:!0}),t.observer=n;var a=new WeakMap,o=t.observer,c=function(e){for(var t=function(t,n){var r=e[t],o=r.target,c=r.attributeName,u=r.oldValue,i=o.getAttribute(c);a.get(o).a[c].forEach((function(e){e.call(o,c,u,i)}))},n=0,r=e.length;n<r;n++)t(n)},u=function e(t,n,r){for(var o=0,c=t.length;o<c;o++){var u=t[o];r?"querySelectorAll"in u&&(a.has(u)&&a.get(u)[n].forEach(f,u),e(u.querySelectorAll("*"),n,!r)):a.has(u)&&a.get(u)[n].forEach(f,u)}},i=function(e){for(var t=0,n=e.length;t<n;t++){var r=e[t],a=r.addedNodes,o=r.removedNodes;u(a,"c",!0),c(l.takeRecords()),u(o,"d",!0)}},l=new MutationObserver(c);t.add(i);var d=function(e,t){var n=t.connectedCallback,r=t.disconnectedCallback,c=t.observedAttributes,u=t.attributeChangedCallback;i(o.takeRecords());var d=a.get(e)||function(e){var t={a:{},c:new Set,d:new Set};return a.set(e,t),t}(e),f=d.a,s=d.c,h=d.d;return c&&(l.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:c}),c.forEach((function(t){(f[t]||(f[t]=new Set)).add(u),e.hasAttribute(t)&&u.call(e,t,null,e.getAttribute(t))}))),r&&h.add(r),n&&(s.add(n),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||n.call(e)),e};function f(e){e.call(this)}var s="function"==typeof Promise?Promise:function(e){var t=[],n=0;return e((function(){n=1,t.splice(0).forEach(r)})),{then:r};function r(e){return n?setTimeout(e):t.push(e),this}},h=[],v=[],b={},g=function(e,n,r,a){var o=function(e){u(e,new Set)},c=function(e,t){for(var n,r=0,a=e.length;r<a;)n=e[r++],!t.has(n)&&"querySelectorAll"in n&&(t.add(n),o(n))},u=function(t,r){for(var o=0,u=e.length;o<u;)(t.matches||t.webkitMatchesSelector||t.msMatchesSelector).call(t,e[o])&&a(t,n[o]),o++;u&&c(t.querySelectorAll(e),r)};return t.add((function(e){for(var t=new Set,n=0,r=e.length;n<r;n++)c(e[n].addedNodes,t)})),{get:function(t){var r=e.indexOf(t);return r<0?void 0:n[r].o},upgrade:o,whenDefined:function(e){if(!(e in r)){var t,n=new s((function(e){t=e}));r[e]={_:t,$:n}}return r[e].$},$:c}}(v,h,b,(function(e,t){var n=t.m,r=t.o;n.has(e)||n.set(d(e,r),0)})),w=g.get,S=g.upgrade,m=g.whenDefined,p=g.$;return e.define=function(e,t){if(w(e))throw new Error("duplicated: "+e);v.push(e),h.push({o:t,m:new WeakMap}),p(document.querySelectorAll(e),new Set),m(e),b[e]._()},e.get=w,e.upgrade=S,e.whenDefined=m,e}({});