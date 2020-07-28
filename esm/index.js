import asCustomElement from 'as-custom-element';
import utils from '@webreflection/elements-utils';

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

export const define = (selector, options) => {
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  query.push(selector);
  config.push({o: options, m: new WeakMap});
  setupList(document.querySelectorAll(selector));
  whenDefined(selector);
  defined[selector]._();
};

export {get, upgrade, whenDefined};
