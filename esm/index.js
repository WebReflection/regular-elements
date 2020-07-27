import asCustomElement from 'as-custom-element';
import utils from '@webreflection/elements-utils';

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
