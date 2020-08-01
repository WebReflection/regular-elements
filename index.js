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
    var callback = function callback(records) {
      var query = options.query;

      if (query.length) {
        for (var i = 0, length = records.length; i < length; i++) {
          loop(filter.call(records[i].addedNodes, elements), true, query);
          loop(filter.call(records[i].removedNodes, elements), false, query);
        }
      }
    };

    var flush = function flush() {
      callback(observer.takeRecords());
    };

    var loop = function loop(elements, connected, query) {
      var set = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Set();

      for (var element, i = 0, length = elements.length; i < length; i++) {
        if (!set.has(element = elements[i])) {
          set.add(element);

          for (var m = matches(element), _i = 0, _length = query.length; _i < _length; _i++) {
            if (m.call(element, query[_i])) options.handle(element, connected, _i);
          }

          loop(element.querySelectorAll(query), connected, query, set);
        }
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
      flush: flush,
      observer: observer,
      parse: parse
    };
  });

  var attributes = new WeakMap();
  var query = [];
  var config = [];
  var defined = {};

  var attributeChanged = function attributeChanged(records, mo) {
    for (var i = 0, length = records.length; i < length; i++) {
      var _records$i = records[i],
          target = _records$i.target,
          attributeName = _records$i.attributeName,
          oldValue = _records$i.oldValue;
      var newValue = target.getAttribute(attributeName);
      attributes.get(mo).call(target, attributeName, oldValue, newValue);
    }
  };

  var noop = function noop() {};

  var _QSAO = QSAO({
    query: query,
    handle: function handle(element, connected, i) {
      var _config$i = config[i],
          m = _config$i.m,
          o = _config$i.o;

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

      (o[(connected ? '' : 'dis') + 'connectedCallback'] || noop).call(element);
    }
  }),
      flush = _QSAO.flush,
      parse = _QSAO.parse;

  var get = function get(selector) {
    var i = query.indexOf(selector);
    return i < 0 ? void 0 : config[i].o;
  };
  var define = function define(selector, options) {
    flush();
    if (get(selector)) throw new Error('duplicated: ' + selector);
    query.push(selector);
    config.push({
      o: options,
      m: new WeakMap()
    });
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
