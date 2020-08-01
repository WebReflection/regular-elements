'use strict';
const Lie = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/lie'));
const QSAO = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('qsa-observer'));

const attributes = new WeakMap;
const query = [];
const config = [];
const defined = {};

const attributeChanged = (records, mo) => {
  for (let i = 0, {length} = records; i < length; i++) {
    const {target, attributeName, oldValue} = records[i];
    const newValue = target.getAttribute(attributeName);
    attributes.get(mo).call(target, attributeName, oldValue, newValue);
  }
};

const noop = () => {};

const {flush, parse} = QSAO({
  query,
  handle(element, connected, i) {
    const {m, o} = config[i];
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
    (o[(connected ? '' : 'dis') + 'connectedCallback'] || noop).call(element);
  }
});

const get = selector => {
  const i = query.indexOf(selector);
  return i < 0 ? void 0 : config[i].o;
};
exports.get = get;

const define = (selector, options) => {
  flush();
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  query.push(selector);
  config.push({o: options, m: new WeakMap});
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
