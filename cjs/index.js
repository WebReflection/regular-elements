'use strict';
const asCustomElement = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('as-custom-element'));
const sdo = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('shared-document-observer'));

const config = [];
const query = [];
const defined = {};

const upgradeNodes = ({addedNodes}) => {
  setupList(addedNodes);
};

const setupList = nodes => {
  query.forEach.call(nodes, upgrade);
};

sdo.add(records => {
  records.forEach(upgradeNodes);
});

const define = (selector, options) => {
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  query.push(selector);
  config.push({o: options, m: new WeakMap});
  setupList(document.querySelectorAll(selector));
  whenDefined(selector);
  defined[selector]._();
};
exports.define = define;

const get = selector => {
  const i = query.indexOf(selector);
  return i < 0 ? void 0 : config[i].o;
};
exports.get = get;

const upgrade = node => {
  query.forEach(setup, node);
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

const Lie = typeof Promise === 'function' ? Promise : function (fn) {
  let queue = [], resolved = false;
  fn(() => {
    resolved = true;
    queue.splice(0).forEach(then);
  });
  return {then, catch() { return this; }};
  function then(fn) {
    return (resolved ? setTimeout(fn) : queue.push(fn)), this;
  }
};
exports.Lie = Lie;

function setup(selector, i) {
  const {querySelectorAll} = this;
  if (querySelectorAll) {
    if ((
      this.matches ||
      this.webkitMatchesSelector ||
      this.msMatchesSelector
    ).call(this, selector)) {
      const {m, o} = config[i];
      if (!m.has(this))
        m.set(asCustomElement(this, o), 0);
    }
    setupList(querySelectorAll.call(this, query));
  }
}
