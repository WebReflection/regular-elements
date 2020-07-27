'use strict';
const asCustomElement = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('as-custom-element'));
const utils = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/elements-utils'));

const config = [];
const query = [];
const defined = {};

const {
  get, upgrade, whenDefined,
  $: setupList
} = utils(query, config, defined, function (selector, i) {
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

exports.get = get;
exports.upgrade = upgrade;
exports.whenDefined = whenDefined;
