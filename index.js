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

  var invoke$1 = function invoke(nodes, key) {
    for (var i = 0, length = nodes.length; i < length; i++) {
      var target = nodes[i];
      if (wm.has(target)) wm.get(target)[key].forEach(call, target);
      invoke(target.children || [], key);
    }
  };

  var mainLoop = function mainLoop(records) {
    for (var i = 0, length = records.length; i < length; i++) {
      var _records$i2 = records[i],
          addedNodes = _records$i2.addedNodes,
          removedNodes = _records$i2.removedNodes;
      invoke$1(addedNodes, 'c');
      attributeChanged(sao.takeRecords());
      invoke$1(removedNodes, 'd');
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

  var config = [];
  var query = [];
  var defined = {};

  var upgradeNodes = function upgradeNodes(_ref) {
    var addedNodes = _ref.addedNodes;
    setupList(addedNodes);
  };

  var setupList = function setupList(nodes) {
    query.forEach.call(nodes, upgrade);
  };

  set.add(function (records) {
    records.forEach(upgradeNodes);
  });
  var define = function define(selector, options) {
    if (get(selector)) throw new Error('duplicated: ' + selector);
    query.push(selector);
    config.push({
      o: options,
      m: new WeakMap()
    });
    setupList(document.querySelectorAll(selector));
    whenDefined(selector);

    defined[selector]._();
  };
  var get = function get(selector) {
    var i = query.indexOf(selector);
    return i < 0 ? void 0 : config[i].o;
  };
  var upgrade = function upgrade(node) {
    query.forEach(setup, node);
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
  var Lie = typeof Promise === 'function' ? Promise : function (fn) {
    var queue = [],
        resolved = false;
    fn(function () {
      resolved = true;
      queue.splice(0).forEach(then);
    });
    return {
      then: then,
      "catch": function _catch() {
        return this;
      }
    };

    function then(fn) {
      return resolved ? setTimeout(fn) : queue.push(fn), this;
    }
  };

  function setup(selector, i) {
    var querySelectorAll = this.querySelectorAll;

    if (querySelectorAll) {
      if ((this.matches || this.webkitMatchesSelector || this.msMatchesSelector).call(this, selector)) {
        var _config$i = config[i],
            m = _config$i.m,
            o = _config$i.o;
        if (!m.has(this)) m.set(asCustomElement(this, o), 0);
      }

      setupList(querySelectorAll.call(this, query));
    }
  }

  exports.Lie = Lie;
  exports.define = define;
  exports.get = get;
  exports.upgrade = upgrade;
  exports.whenDefined = whenDefined;

  return exports;

}({}));
