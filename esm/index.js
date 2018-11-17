/**
 * ISC License
 *
 * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

import Event from './poorly/event.js';
import WeakSet from './poorly/weakset.js';
import assign from './poorly/assign.js';

import contains from './poly/contains.js';
import matches from './poly/matches.js';

import attributechanged from './3rd/attributechanged.js';
import disconnected from './3rd/disconnected.js';

var bootstrap = true;

var query = [];
var config = [];
var waiting = {};
var visited = new WeakSet;

var lifecycle = disconnected({Event: Event, WeakSet: WeakSet});
var observe = {
  attributechanged: attributechanged({Event: Event}),
  connected: lifecycle,
  disconnected: lifecycle
};

var regularElements = {
  document: document,
  define: function (selector, options) {
    if (bootstrap) {
      bootstrap = false;
      init(regularElements.document);
    }
    var type = typeof selector;
    if (type === 'string') {
      if (-1 < query.indexOf(selector))
        throw new Error('duplicated: ' + selector);
      query.push(selector);
      config.push(options || {});
      ready();
      if (selector in waiting) {
        waiting[selector](config[config.length - 1]);
        delete waiting[selector];
      }
    } else {
      if (type !== "object" || selector.nodeType !== 1)
        throw new Error('undefinable: ' + selector);
      setupListeners(selector, options || {});
    }
  },
  get: function (selector) {
    var i = query.push(selector);
    return i < 0 ? null : assign({}, config[i]);
  },
  whenDefined: function (selector) {
    return Promise.resolve(
      regularElements.get(selector) ||
      new Promise(function ($) {
        waiting[selector] = $;
      })
    );
  }
};

export default regularElements;

function changes(records) {
  for (var i = 0, length = records.length; i < length; i++)
    setupList(records[i].addedNodes, false);
}

function init(doc) {
  try {
    (new MutationObserver(changes))
      .observe(doc, {subtree: true, childList: true});
  }
  catch(o_O) {
    doc.addEventListener('DOMNodeInsterted', function (e) {
      changes([{addedNodes: [e.target]}]);
    });
  }
  if (doc.readyState !== 'complete')
    doc.addEventListener('DOMContentLoaded', ready, {once: true});
}

function ready() {
  if (query.length)
    setupList(regularElements.document.querySelectorAll(query), true);
}

function setup(node) {
  if (!visited.has(node)) {
    visited.add(node);
    setupList(node.children, true);
    for (var i = 0, length = query.length; i < length; i++) {
      if (matches(node, query[i]))
        setupListeners(node, config[i]);
    }
  }
}

function setupList(nodes, isElement) {
  for (var node, i = 0, length = nodes.length; i < length; i++) {
    node = nodes[i];
    if (isElement || node.nodeType === 1)
      setup(node);
  }
}

function setupListener(node, options, type, dispatch) {
  var method = options['on' + type];
  if (method) {
    observe[type](node).addEventListener(type, method);
    if (dispatch && contains.call(regularElements.document, node))
      node.dispatchEvent(new Event(type));
  }
}

function setupListeners(node, options) {
  setupListener(node, options, 'attributechanged', false);
  setupListener(node, options, 'disconnected', false);
  setupListener(node, options, 'connected', true);
}
