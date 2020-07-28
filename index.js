self.regularElements = (function (exports) {
  'use strict';

  var set = new Set();
  var observer = new MutationObserver(function (records) {
    set.forEach(invoke, records);
  });
  observer.observe(document, {
    subtree: true,
    childList: true
  });
  set.observer = observer;

  function invoke(callback) {
    callback(this, observer);
  }

  var wm = new WeakMap();
  var observer$1 = set.observer;

  var attributeChanged = function attributeChanged(records) {
    var _loop = function _loop(i, length) {
      var _records$i = records[i],
          target = _records$i.target,
          attributeName = _records$i.attributeName,
          oldValue = _records$i.oldValue;
      var newValue = target.getAttribute(attributeName);
      wm.get(target).a[attributeName].forEach(function (attributeChangedCallback) {
        attributeChangedCallback.call(target, attributeName, oldValue, newValue);
      });
    };

    for (var i = 0, length = records.length; i < length; i++) {
      _loop(i);
    }
  };

  var invoke$1 = function invoke(nodes, key, parsed, noCheck) {
    for (var i = 0, length = nodes.length; i < length; i++) {
      var target = nodes[i];

      if (!parsed.has(target) && (noCheck || 'querySelectorAll' in target)) {
        parsed.add(target);
        if (wm.has(target)) wm.get(target)[key].forEach(call, target);
        invoke(target.querySelectorAll('*'), key, parsed, true);
      }
    }
  };

  var mainLoop = function mainLoop(records) {
    for (var c = new Set(), d = new Set(), i = 0, length = records.length; i < length; i++) {
      var _records$i2 = records[i],
          addedNodes = _records$i2.addedNodes,
          removedNodes = _records$i2.removedNodes;
      invoke$1(addedNodes, 'c', c, false);
      attributeChanged(sao.takeRecords());
      invoke$1(removedNodes, 'd', d, false);
    }
  };

  var sao = new MutationObserver(attributeChanged);

  var set$1 = function set(target) {
    var sets = {
      a: {},
      c: new Set(),
      d: new Set()
    };
    wm.set(target, sets);
    return sets;
  };

  set.add(mainLoop);
  var asCustomElement = (function (target, _ref) {
    var connectedCallback = _ref.connectedCallback,
        disconnectedCallback = _ref.disconnectedCallback,
        observedAttributes = _ref.observedAttributes,
        attributeChangedCallback = _ref.attributeChangedCallback;
    mainLoop(observer$1.takeRecords());

    var _ref2 = wm.get(target) || set$1(target),
        a = _ref2.a,
        c = _ref2.c,
        d = _ref2.d;

    if (observedAttributes) {
      sao.observe(target, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: observedAttributes
      });
      observedAttributes.forEach(function (attributeName) {
        (a[attributeName] || (a[attributeName] = new Set())).add(attributeChangedCallback);
        if (target.hasAttribute(attributeName)) attributeChangedCallback.call(target, attributeName, null, target.getAttribute(attributeName));
      });
    }

    if (disconnectedCallback) d.add(disconnectedCallback);

    if (connectedCallback) {
      c.add(connectedCallback); // if (target.isConnected) // No IE11/Edge support

      if (!(target.ownerDocument.compareDocumentPosition(target) & target.DOCUMENT_POSITION_DISCONNECTED)) connectedCallback.call(target);
    }

    return target;
  });

  function call(back) {
    back.call(this);
  }

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
  var utils = (function (query, config, defined, setup) {
    // exports
    var get = function get(selector) {
      var i = query.indexOf(selector);
      return i < 0 ? void 0 : config[i].o;
    };

    var upgrade = function upgrade(node) {
      upgradeNode(node, new Set());
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
    }; // util


    var setupList = function setupList(nodes, parsed) {
      var i = 0,
          length = nodes.length,
          node;

      while (i < length) {
        node = nodes[i++];

        if (!parsed.has(node) && 'querySelectorAll' in node) {
          parsed.add(node);
          upgradeNode(node, parsed);
        }
      }
    };

    var upgradeNode = function upgradeNode(node, parsed) {
      var i = 0,
          length = query.length;

      while (i < length) {
        if ((node.matches || node.webkitMatchesSelector || node.msMatchesSelector).call(node, query[i])) setup(node, config[i]);
        i++;
      }

      if (length) setupList(node.querySelectorAll(query), parsed);
    };

    set.add(function (records) {
      for (var parsed = new Set(), i = 0, length = records.length; i < length; i++) {
        setupList(records[i].addedNodes, parsed);
      }
    });
    return {
      get: get,
      upgrade: upgrade,
      whenDefined: whenDefined,
      $: setupList
    };
  });

  var config = [];
  var query = [];
  var defined = {};

  var _utils = utils(query, config, defined, function (element, _ref) {
    var m = _ref.m,
        o = _ref.o;
    if (!m.has(element)) m.set(asCustomElement(element, o), 0);
  }),
      get = _utils.get,
      upgrade = _utils.upgrade,
      whenDefined = _utils.whenDefined,
      setupList = _utils.$;

  var define = function define(selector, options) {
    if (get(selector)) throw new Error('duplicated: ' + selector);
    query.push(selector);
    config.push({
      o: options,
      m: new WeakMap()
    });
    setupList(document.querySelectorAll(selector), new Set(), true);
    whenDefined(selector);

    defined[selector]._();
  };

  exports.define = define;
  exports.get = get;
  exports.upgrade = upgrade;
  exports.whenDefined = whenDefined;

  return exports;

}({}));
