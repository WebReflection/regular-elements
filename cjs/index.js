'use strict';
const asCustomElement = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('as-custom-element'));
const utils = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/elements-utils'));

const config = [];
const query = [];
const defined = {};

const add = (element, {m, o}) => {
  if (!m.has(element))
    m.set(asCustomElement(element, o), 0);
};

const {
  get, upgrade, whenDefined,
  $: setupList
} = utils(
  query, config, defined,
  (element, i, nested) => {
    if (nested) {
      if ((
        element.matches ||
        element.webkitMatchesSelector ||
        element.msMatchesSelector
      ).call(element, query[i]))
        add(element, config[i]);
      setupList(element.querySelectorAll(query), !nested);
    }
    else
      add(element, config[i]);
  }
);

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
