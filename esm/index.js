import asCustomElement from 'as-custom-element';
import utils from '@webreflection/elements-utils';

const config = [];
const query = [];
const defined = {};

const {
  get, upgrade, whenDefined,
  _: matches, $: setupList
} = utils(
  query, config, defined,
  (element, i, parsed) => {
    if (matches(element, query[i])) {
      const {m, o} = config[i];
      if (!m.has(element))
        m.set(asCustomElement(element, o), 0);
    }
    setupList(element.querySelectorAll(query), parsed);
  }
);

export const define = (selector, options) => {
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  query.push(selector);
  config.push({o: options, m: new WeakMap});
  setupList(document.querySelectorAll(selector), new Set);
  whenDefined(selector);
  defined[selector]._();
};

export {get, upgrade, whenDefined};
