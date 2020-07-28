import asCustomElement from 'as-custom-element';
import utils from '@webreflection/elements-utils';

const config = [];
const query = [];
const defined = {};

const {
  get, upgrade, whenDefined,
  $: setupList
} = utils(
  query, config, defined,
  (element, {m, o}) => {
    if (!m.has(element))
      m.set(asCustomElement(element, o), 0);
  }
);

export const define = (selector, options) => {
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  query.push(selector);
  config.push({o: options, m: new WeakMap});
  setupList(document.querySelectorAll(selector), new Set, true);
  whenDefined(selector);
  defined[selector]._();
};

export {get, upgrade, whenDefined};
