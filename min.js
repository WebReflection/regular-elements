self.regularElements=function(e){"use strict";var t=function(e,t){var r=new WeakMap,a=new WeakMap,o=function(e,t){for(var n=0,r=e.length;n<r;n++){var o=e[n],u=o.target,c=o.attributeName,i=o.oldValue,l=u.getAttribute(c);a.get(t).call(u,c,i,l)}},u=function e(a,o,u,c){for(var i=0,l=a.length;i<l;i++){var f=a[i];u.has(f)||!c&&!("querySelectorAll"in f)||(u.add(f),r.has(f)?r.get(f)[o].forEach(n,f):"c"===o&&t(f),e(f.querySelectorAll("*"),o,u,!0))}},c=function(e){for(var t=0,n=e.length;t<n;t++){var r=e[t],a=r.addedNodes,o=r.removedNodes;u(a,"c",new Set,!1),u(o,"d",new Set,!1)}},i=new MutationObserver(c);return i.observe(e,{childList:!0,subtree:!0}),function(e,t){var n=t.connectedCallback,u=t.disconnectedCallback,l=t.observedAttributes,f=t.attributeChangedCallback;c(i.takeRecords());var d=r.get(e)||function(e){var t={c:new Set,d:new Set};return r.set(e,t),t}(e),s=d.c,h=d.d;if(l){var v=new MutationObserver(o);v.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:l.map((function(t){return e.hasAttribute(t)&&f.call(e,t,null,e.getAttribute(t)),t}))}),a.set(v,f)}return u&&h.add(u),n&&(s.add(n),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||n.call(e)),e}};function n(e){e.call(this)}var r="function"==typeof Promise?Promise:function(e){var t=[],n=0;return e((function(){n=1,t.splice(0).forEach(r)})),{then:r};function r(e){return n?setTimeout(e):t.push(e),this}},a=[],o=[],u={},c=function(e,n,a,o,u){var c=function(e,t){for(var n=0,r=e.length;n<r;n++)t.has(e[n])||(t.add(e[n]),i(e[n],t))},i=function(e,t){for(var r=0,o=n.length;r<o;r++)(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,n[r])&&u(e,a[r]);t&&function(e,t){n.length&&c(e.querySelectorAll(n),t)}(e,t)};return{get:function(e){var t=n.indexOf(e);return t<0?void 0:a[t].o},upgrade:function(e){i(e,new Set)},whenDefined:function(e){if(!(e in o)){var t,n=new r((function(e){t=e}));o[e]={_:t,$:n}}return o[e].$},$:c,_:t(e,i)}}(document,o,a,u,(function(e,t){var n=t.m,r=t.o;n.has(e)||n.set(s(e,r),0)})),i=c.get,l=c.upgrade,f=c.whenDefined,d=c.$,s=c._;return e.define=function(e,t){if(i(e))throw new Error("duplicated: "+e);o.push(e),a.push({o:t,m:new WeakMap}),d(document.querySelectorAll(e),new Set),f(e),u[e]._()},e.get=i,e.upgrade=l,e.whenDefined=f,e}({});