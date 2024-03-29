'use strict';
const Lie = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('@webreflection/lie'));
const QSAO = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('qsa-observer'));

const attributes = new WeakMap;
const query = [];
const config = {};
const defined = {};

const attributeChanged = (records, o) => {
  for (let h = attributes.get(o), i = 0, {length} = records; i < length; i++) {
    const {target, attributeName, oldValue} = records[i];
    const newValue = target.getAttribute(attributeName);
    h.call(target, attributeName, oldValue, newValue);
  }
};

const {flush, parse} = QSAO({
  query,
  handle(element, connected, selector) {
    const {m, o} = config[selector];
    if (!m.has(element)) {
      m.set(element, o);
      const {
        observedAttributes,
        attributeChangedCallback
      } = o;
      if (observedAttributes) {
        const mo = new MutationObserver(attributeChanged);
        mo.observe(element, {
          attributes: true,
          attributeOldValue: true,
          attributeFilter: observedAttributes.map(attributeName => {
            if (element.hasAttribute(attributeName))
              attributeChangedCallback.call(
                element,
                attributeName,
                null,
                element.getAttribute(attributeName)
              );
            return attributeName;
          })
        });
        attributes.set(mo, attributeChangedCallback);
      }
    }
    const method = o[(connected ? '' : 'dis') + 'connectedCallback'];
    if (method)
      method.call(element);
  }
});

const get = selector => (config[selector] || attributes).o;
exports.get = get;

const define = (selector, options) => {
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  flush();
  query.push(selector);
  config[selector] = {o: options, m: new WeakMap};
  parse(document.querySelectorAll(selector));
  whenDefined(selector);
  defined[selector]._();
};
exports.define = define;

const upgrade = element => {
  if (query.length) {
    flush();
    parse([element]);
  }
};
exports.upgrade = upgrade;

const whenDefined = selector => {
  if (!(selector in defined)) {
    let _, $ = new Lie($ => { _ = $; });
    defined[selector] = {_, $};
  }
  return defined[selector].$;
};
exports.whenDefined = whenDefined;
