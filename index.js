self.regularElements = (function (exports) {
  'use strict';

  var asCustomElement = (function (root, upgrade, query) {
    var wm = new WeakMap();
    var ao = new WeakMap();
    var filter = [].filter;

    var attributeChanged = function attributeChanged(records, mo) {
      for (var i = 0, length = records.length; i < length; i++) {
        var _records$i = records[i],
            target = _records$i.target,
            attributeName = _records$i.attributeName,
            oldValue = _records$i.oldValue;
        var newValue = target.getAttribute(attributeName);
        ao.get(mo).call(target, attributeName, oldValue, newValue);
      }
    };

    var elements = function elements(target) {
      return 'querySelectorAll' in target;
    };

    var mainLoop = function mainLoop(records) {
      if (query.length) {
        for (var i = 0, length = records.length; i < length; i++) {
          var _records$i2 = records[i],
              addedNodes = _records$i2.addedNodes,
              removedNodes = _records$i2.removedNodes;
          parse(filter.call(addedNodes, elements), 'c', new Set());
          parse(filter.call(removedNodes, elements), 'd', new Set());
        }
      }
    };

    var parse = function parse(nodes, key, parsed) {
      for (var i = 0, length = nodes.length; i < length; i++) {
        var target = nodes[i];

        if (!parsed.has(target)) {
          parsed.add(target);
          if (wm.has(target)) wm.get(target)[key].forEach(call, target);else if (key === 'c') upgrade(target);
          parse(target.querySelectorAll(query), key, parsed);
        }
      }
    };

    var set = function set(target) {
      var sets = {
        c: new Set(),
        d: new Set()
      };
      wm.set(target, sets);
      return sets;
    };

    var sdo = new MutationObserver(mainLoop);
    sdo.observe(root, {
      childList: true,
      subtree: true
    });
    return function (target, _ref) {
      var connectedCallback = _ref.connectedCallback,
          disconnectedCallback = _ref.disconnectedCallback,
          observedAttributes = _ref.observedAttributes,
          attributeChangedCallback = _ref.attributeChangedCallback;
      mainLoop(sdo.takeRecords());

      var _ref2 = wm.get(target) || set(target),
          c = _ref2.c,
          d = _ref2.d;

      if (observedAttributes) {
        var mo = new MutationObserver(attributeChanged);
        mo.observe(target, {
          attributes: true,
          attributeOldValue: true,
          attributeFilter: observedAttributes.map(function (attributeName) {
            if (target.hasAttribute(attributeName)) attributeChangedCallback.call(target, attributeName, null, target.getAttribute(attributeName));
            return attributeName;
          })
        });
        ao.set(mo, attributeChangedCallback);
      }

      if (disconnectedCallback) d.add(disconnectedCallback);

      if (connectedCallback) {
        c.add(connectedCallback);
        if (!(target.ownerDocument.compareDocumentPosition(target) & target.DOCUMENT_POSITION_DISCONNECTED)) connectedCallback.call(target);
      }

      return target;
    };
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
  var utils = (function (root, query, config, defined, setup) {
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
      for (var i = 0, length = nodes.length; i < length; i++) {
        if (!parsed.has(nodes[i])) {
          parsed.add(nodes[i]);
          upgradeNode(nodes[i], parsed);
        }
      }
    };

    var upgradeAll = function upgradeAll(node, parsed) {
      if (query.length) setupList(node.querySelectorAll(query), parsed);
    };

    var upgradeNode = function upgradeNode(node, parsed) {
      for (var i = 0, length = query.length; i < length; i++) {
        if ((node.matches || node.webkitMatchesSelector || node.msMatchesSelector).call(node, query[i])) setup(node, config[i]);
      }

      if (parsed) upgradeAll(node, parsed);
    };

    return {
      get: get,
      upgrade: upgrade,
      whenDefined: whenDefined,
      $: setupList,
      _: asCustomElement(root, upgradeNode, query)
    };
  });

  var config = [];
  var query = [];
  var defined = {};

  var _utils = utils(document, query, config, defined, function (element, _ref) {
    var m = _ref.m,
        o = _ref.o;
    if (!m.has(element)) m.set(asCustomElement$1(element, o), 0);
  }),
      get = _utils.get,
      upgrade = _utils.upgrade,
      whenDefined = _utils.whenDefined,
      setupList = _utils.$,
      asCustomElement$1 = _utils._;

  var define = function define(selector, options) {
    if (get(selector)) throw new Error('duplicated: ' + selector);
    query.push(selector);
    config.push({
      o: options,
      m: new WeakMap()
    });
    setupList(document.querySelectorAll(selector), new Set());
    whenDefined(selector);

    defined[selector]._();
  };

  exports.define = define;
  exports.get = get;
  exports.upgrade = upgrade;
  exports.whenDefined = whenDefined;

  return exports;

}({}));
