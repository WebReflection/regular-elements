self.regularElements=function(e){"use strict";var t=new Set,n=new MutationObserver((function(e){t.forEach(r,e)}));function r(e){e(this,n)}n.observe(document,{subtree:!0,childList:!0}),t.observer=n;var a=new WeakMap,o=t.observer,i=function(e){for(var t=function(t,n){var r=e[t],o=r.target,i=r.attributeName,c=r.oldValue,u=o.getAttribute(i);a.get(o).a[i].forEach((function(e){e.call(o,i,c,u)}))},n=0,r=e.length;n<r;n++)t(n)},c=function e(t,n){for(var r=0,o=t.length;r<o;r++){var i=t[r];a.has(i)&&a.get(i)[n].forEach(d,i),e(i.children||[],n)}},u=function(e){for(var t=0,n=e.length;t<n;t++){var r=e[t],a=r.addedNodes,o=r.removedNodes;c(a,"c"),i(s.takeRecords()),c(o,"d")}},s=new MutationObserver(i);t.add(u);var f=function(e,t){var n=t.connectedCallback,r=t.disconnectedCallback,i=t.observedAttributes,c=t.attributeChangedCallback;u(o.takeRecords());var f=a.get(e)||function(e){var t={a:{},c:new Set,d:new Set};return a.set(e,t),t}(e),d=f.a,l=f.c,h=f.d;return i&&(s.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:i}),i.forEach((function(t){(d[t]||(d[t]=new Set)).add(c),e.hasAttribute(t)&&c.call(e,t,null,e.getAttribute(t))}))),r&&h.add(r),n&&(l.add(n),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||n.call(e)),e};function d(e){e.call(this)}var l="function"==typeof Promise?Promise:function(e){var t=[],n=!1;return e((function(){n=!0,t.splice(0).forEach(r)})),{then:r,catch:function(){return this}};function r(e){return n?setTimeout(e):t.push(e),this}},h=[],v=[],b={},g=function(e,t,n,r,a){var o=function(e){t.forEach.call(e,c)},i=function(e){var t=e.addedNodes;o(t)},c=function(e){t.forEach(a,e)};return e.add((function(e){e.forEach(i)})),{get:function(e){var r=t.indexOf(e);return r<0?void 0:n[r].o},upgrade:c,whenDefined:function(e){if(!(e in r)){var t,n=new l((function(e){t=e}));r[e]={_:t,$:n}}return r[e].$},$:o}}(t,v,h,b,(function(e,t){var n=this.querySelectorAll;if(n){if((this.matches||this.webkitMatchesSelector||this.msMatchesSelector).call(this,e)){var r=h[t],a=r.m,o=r.o;a.has(this)||a.set(f(this,o),0)}p(n.call(this,v))}})),w=g.get,m=g.upgrade,E=g.whenDefined,p=g.$;return e.define=function(e,t){if(w(e))throw new Error("duplicated: "+e);v.push(e),h.push({o:t,m:new WeakMap}),p(document.querySelectorAll(e)),E(e),b[e]._()},e.get=w,e.upgrade=m,e.whenDefined=E,e}({});