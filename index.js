self.regularElements = (function (exports) {
  'use strict';

  var Lie = typeof Promise === 'function' ? Promise : function (fn) {
    var queue = [],
        resolved = 0,
        value;
    fn(function ($) {
      value = $;
      resolved = 1;
      queue.splice(0).forEach(then);
    });
    return {
      then: then
    };

    function then(fn) {
      return resolved ? setTimeout(fn, 0, value) : queue.push(fn), this;
    }
  };

  var TRUE = true,
      FALSE = false;
  var QSA$1 = 'querySelectorAll';

  function add(node) {
    this.observe(node, {
      subtree: TRUE,
      childList: TRUE
    });
  }
  /**
   * Start observing a generic document or root element.
   * @param {Function} callback triggered per each dis/connected node
   * @param {Element?} root by default, the global document to observe
   * @param {Function?} MO by default, the global MutationObserver
   * @returns {MutationObserver}
   */


  var notify = function notify(callback, root, MO) {
    var loop = function loop(nodes, added, removed, connected, pass) {
      for (var i = 0, length = nodes.length; i < length; i++) {
        var node = nodes[i];

        if (pass || QSA$1 in node) {
          if (connected) {
            if (!added.has(node)) {
              added.add(node);
              removed["delete"](node);
              callback(node, connected);
            }
          } else if (!removed.has(node)) {
            removed.add(node);
            added["delete"](node);
            callback(node, connected);
          }

          if (!pass) loop(node[QSA$1]('*'), added, removed, connected, TRUE);
        }
      }
    };

    var observer = new (MO || MutationObserver)(function (records) {
      for (var added = new Set(), removed = new Set(), i = 0, length = records.length; i < length; i++) {
        var _records$i = records[i],
            addedNodes = _records$i.addedNodes,
            removedNodes = _records$i.removedNodes;
        loop(removedNodes, added, removed, FALSE, FALSE);
        loop(addedNodes, added, removed, TRUE, FALSE);
      }
    });
    observer.add = add;
    observer.add(root || document);
    return observer;
  };

  var QSA = 'querySelectorAll';
  var _self = self,
      document$1 = _self.document,
      Element = _self.Element,
      MutationObserver$1 = _self.MutationObserver,
      Set$1 = _self.Set,
      WeakMap$1 = _self.WeakMap;

  var elements = function elements(element) {
    return QSA in element;
  };

  var filter = [].filter;
  var QSAO = (function (options) {
    var live = new WeakMap$1();

    var drop = function drop(elements) {
      for (var i = 0, length = elements.length; i < length; i++) {
        live["delete"](elements[i]);
      }
    };

    var flush = function flush() {
      var records = observer.takeRecords();

      for (var i = 0, length = records.length; i < length; i++) {
        parse(filter.call(records[i].removedNodes, elements), false);
        parse(filter.call(records[i].addedNodes, elements), true);
      }
    };

    var matches = function matches(element) {
      return element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    };

    var notifier = function notifier(element, connected) {
      var selectors;

      if (connected) {
        for (var q, m = matches(element), i = 0, length = query.length; i < length; i++) {
          if (m.call(element, q = query[i])) {
            if (!live.has(element)) live.set(element, new Set$1());
            selectors = live.get(element);

            if (!selectors.has(q)) {
              selectors.add(q);
              options.handle(element, connected, q);
            }
          }
        }
      } else if (live.has(element)) {
        selectors = live.get(element);
        live["delete"](element);
        selectors.forEach(function (q) {
          options.handle(element, connected, q);
        });
      }
    };

    var parse = function parse(elements) {
      var connected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      for (var i = 0, length = elements.length; i < length; i++) {
        notifier(elements[i], connected);
      }
    };

    var query = options.query;
    var root = options.root || document$1;
    var observer = notify(notifier, root, MutationObserver$1);
    var attachShadow = Element.prototype.attachShadow;
    if (attachShadow) Element.prototype.attachShadow = function (init) {
      var shadowRoot = attachShadow.call(this, init);
      observer.add(shadowRoot);
      return shadowRoot;
    };
    if (query.length) parse(root[QSA](query));
    return {
      drop: drop,
      flush: flush,
      observer: observer,
      parse: parse
    };
  });

  var attributes = new WeakMap();
  var query = [];
  var config = {};
  var defined = {};

  var attributeChanged = function attributeChanged(records, o) {
    for (var h = attributes.get(o), i = 0, length = records.length; i < length; i++) {
      var _records$i = records[i],
          target = _records$i.target,
          attributeName = _records$i.attributeName,
          oldValue = _records$i.oldValue;
      var newValue = target.getAttribute(attributeName);
      h.call(target, attributeName, oldValue, newValue);
    }
  };

  var _QSAO = QSAO({
    query: query,
    handle: function handle(element, connected, selector) {
      var _config$selector = config[selector],
          m = _config$selector.m,
          o = _config$selector.o;

      if (!m.has(element)) {
        m.set(element, o);
        var observedAttributes = o.observedAttributes,
            attributeChangedCallback = o.attributeChangedCallback;

        if (observedAttributes) {
          var mo = new MutationObserver(attributeChanged);
          mo.observe(element, {
            attributes: true,
            attributeOldValue: true,
            attributeFilter: observedAttributes.map(function (attributeName) {
              if (element.hasAttribute(attributeName)) attributeChangedCallback.call(element, attributeName, null, element.getAttribute(attributeName));
              return attributeName;
            })
          });
          attributes.set(mo, attributeChangedCallback);
        }
      }

      var method = o[(connected ? '' : 'dis') + 'connectedCallback'];
      if (method) method.call(element);
    }
  }),
      flush = _QSAO.flush,
      parse = _QSAO.parse;

  var get = function get(selector) {
    return (config[selector] || attributes).o;
  };
  var define = function define(selector, options) {
    if (get(selector)) throw new Error('duplicated: ' + selector);
    flush();
    query.push(selector);
    config[selector] = {
      o: options,
      m: new WeakMap()
    };
    parse(document.querySelectorAll(selector));
    whenDefined(selector);

    defined[selector]._();
  };
  var upgrade = function upgrade(element) {
    if (query.length) {
      flush();
      parse([element]);
    }
  };
  var whenDefined = function whenDefined(selector) {
    if (!(selector in defined)) {
      var _,
          $ = new Lie(function ($) {
        _ = $;
      });

      defined[selector] = {
        _: _,
        $: $
      };
    }

    return defined[selector].$;
  };

  exports.define = define;
  exports.get = get;
  exports.upgrade = upgrade;
  exports.whenDefined = whenDefined;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
