'use strict';
const utils = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/elements-utils'));

const config = [];
const query = [];
const defined = {};

const {
  get, upgrade, whenDefined,
  $: setupList,
  _: asCustomElement
} = utils(
  document, query, config, defined,
  (element, {m, o}) => {
    if (!m.has(element))
      m.set(asCustomElement(element, o), 0);
  }
);

const define = (selector, options) => {
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  query.push(selector);
  config.push({o: options, m: new WeakMap});
  setupList(document.querySelectorAll(selector), new Set);
  whenDefined(selector);
  defined[selector]._();
};
exports.define = define;

exports.get = get;
exports.upgrade = upgrade;
exports.whenDefined = whenDefined;
