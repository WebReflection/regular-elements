self.regularElements=function(e){"use strict";var t=function(e,t,r){var a=new WeakMap,u=new WeakMap,o=[].filter,c=function(e,t){for(var n=0,r=e.length;n<r;n++){var a=e[n],o=a.target,c=a.attributeName,i=a.oldValue,l=o.getAttribute(c);u.get(t).call(o,c,i,l)}},i=function(e){return"querySelectorAll"in e},l=function(e){if(r.length)for(var t=0,n=e.length;t<n;t++){var a=e[t],u=a.addedNodes,c=a.removedNodes;f(o.call(u,i),"c",new Set),f(o.call(c,i),"d",new Set)}},f=function e(u,o,c){for(var i=0,l=u.length;i<l;i++){var f=u[i];c.has(f)||(c.add(f),a.has(f)?a.get(f)[o].forEach(n,f):"c"===o&&t(f),e(f.querySelectorAll(r),o,c))}},d=new MutationObserver(l);return d.observe(e,{childList:!0,subtree:!0}),function(e,t){var n=t.connectedCallback,r=t.disconnectedCallback,o=t.observedAttributes,i=t.attributeChangedCallback;l(d.takeRecords());var f=a.get(e)||function(e){var t={c:new Set,d:new Set};return a.set(e,t),t}(e),s=f.c,h=f.d;if(o){var v=new MutationObserver(c);v.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:o.map((function(t){return e.hasAttribute(t)&&i.call(e,t,null,e.getAttribute(t)),t}))}),u.set(v,i)}return r&&h.add(r),n&&(s.add(n),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||n.call(e)),e}};function n(e){e.call(this)}var r="function"==typeof Promise?Promise:function(e){var t=[],n=0;return e((function(){n=1,t.splice(0).forEach(r)})),{then:r};function r(e){return n?setTimeout(e):t.push(e),this}},a=[],u=[],o={},c=function(e,n,a,u,o){var c=function(e,t){for(var n=0,r=e.length;n<r;n++)t.has(e[n])||(t.add(e[n]),i(e[n],t))},i=function(e,t){for(var r=0,u=n.length;r<u;r++)(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,n[r])&&o(e,a[r]);t&&function(e,t){n.length&&c(e.querySelectorAll(n),t)}(e,t)};return{get:function(e){var t=n.indexOf(e);return t<0?void 0:a[t].o},upgrade:function(e){i(e,new Set)},whenDefined:function(e){if(!(e in u)){var t,n=new r((function(e){t=e}));u[e]={_:t,$:n}}return u[e].$},$:c,_:t(e,i,n)}}(document,u,a,o,(function(e,t){var n=t.m,r=t.o;n.has(e)||n.set(s(e,r),0)})),i=c.get,l=c.upgrade,f=c.whenDefined,d=c.$,s=c._;return e.define=function(e,t){if(i(e))throw new Error("duplicated: "+e);u.push(e),a.push({o:t,m:new WeakMap}),d(document.querySelectorAll(e),new Set),f(e),o[e]._()},e.get=i,e.upgrade=l,e.whenDefined=f,e}({});