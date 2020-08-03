self.regularElements = (function (exports) {
  'use strict';

  var Lie = typeof Promise === 'function' ? Promise : function (fn) {
    var queue = [],
        resolved = 0;
    fn(function () {
      resolved = 1;
      queue.splice(0).forEach(then);
    });
    return {
      then: then
    };

    function then(fn) {
      return resolved ? setTimeout(fn) : queue.push(fn), this;
    }
  };

  var elements = function elements(element) {
    return 'querySelectorAll' in element;
  };

  var filter = [].filter;
  var QSAO = (function (options) {
    var live = new WeakMap();

    var callback = function callback(records) {
      var query = options.query;

      if (query.length) {
        for (var i = 0, length = records.length; i < length; i++) {
          loop(filter.call(records[i].addedNodes, elements), true, query);
          loop(filter.call(records[i].removedNodes, elements), false, query);
        }
      }
    };

    var drop = function drop(elements) {
      for (var i = 0, length = elements.length; i < length; i++) {
        live["delete"](elements[i]);
      }
    };

    var flush = function flush() {
      callback(observer.takeRecords());
    };

    var loop = function loop(elements, connected, query) {
      var set = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Set();

      var _loop = function _loop(_selectors, _element, i, length) {
        // guard against repeated elements within nested querySelectorAll results
        if (!set.has(_element = elements[i])) {
          set.add(_element);

          if (connected) {
            for (var q, m = matches(_element), _i = 0, _length = query.length; _i < _length; _i++) {
              if (m.call(_element, q = query[_i])) {
                if (!live.has(_element)) live.set(_element, new Set());
                _selectors = live.get(_element); // guard against selectors that were handled already

                if (!_selectors.has(q)) {
                  _selectors.add(q);

                  options.handle(_element, connected, q);
                }
              }
            }
          } // guard against elements that never became live
          else if (live.has(_element)) {
              _selectors = live.get(_element);
              live["delete"](_element);

              _selectors.forEach(function (q) {
                options.handle(_element, connected, q);
              });
            }

          loop(_element.querySelectorAll(query), connected, query, set);
        }

        selectors = _selectors;
        element = _element;
      };

      for (var selectors, element, i = 0, length = elements.length; i < length; i++) {
        _loop(selectors, element, i);
      }
    };

    var matches = function matches(element) {
      return element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    };

    var parse = function parse(elements) {
      var connected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      loop(elements, connected, options.query);
    };

    var observer = new MutationObserver(callback);
    var root = options.root || document;
    var query = options.query;
    observer.observe(root, {
      childList: true,
      subtree: true
    });
    if (query.length) parse(root.querySelectorAll(query));
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

  return exports;

}({}));
