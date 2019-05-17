# regularElements

[![Build Status](https://travis-ci.com/WebReflection/regular-elements.svg?branch=master)](https://travis-ci.com/WebReflection/regular-elements) [![Greenkeeper badge](https://badges.greenkeeper.io/WebReflection/regular-elements.svg)](https://greenkeeper.io/) ![WebReflection status](https://offline.report/status/webreflection.svg)


Everything I love about Custom Elements made available for any node, and through CSS selectors.

No Custom Elements, no Shadow DOM, forget about polyfills and classes, use just the good old HTML, exponentially glorified for every browser and in [less than 2Kb library](https://unpkg.com/regular-elements).

```js
regularElements.define('button.alive', {
  // triggered once live
  // if defined later on and already live
  // it will trigger once (setup here)
  onconnected() {
    this.disabled = false;
    this.classList.add('fade-in');
  },
  // triggered once lost/removed
  ondisconnected() {
    console.log('goodbye');
  },
  // triggered when any attribute changes
  onattributechanged(event) {
    const {attributeName, oldValue, newValue} = event;
    console.log(attributeName, oldValue, newValue);
  },
  // optionally you can specify attributes to observe
  // by default, or with an empty list, all attributes are notified
  attributeFilter: ['only', 'these', 'attrs']
});

regularElements.define(
  '#complex > selector [data-available]',
  {...}
);

// direct one-off element enhancement via
regularElements.define(
  document.querySelector('#element'),
  {...}
);
```

The _API_ is similar to the `customElements` one, included `.get(selector)` and `.whenDefined(selector)`.

## What About Components ?

This module brings literally only those 3 primitives to the table, but fear not, [wickedElements](https://github.com/WebReflection/wicked-elements) are a super thin wrapper that will bring 100% prototypal based components on top of these hooks, providing a private context per each component / node pair.

Trust me, the name wasn't chosen by accident, components made this way are absolutely wicked!

### Compatibility

[Even IE 9](https://webreflection.github.io/regular-elements/test/), but in order to also use `whenDefined` method, a `Promise` polyfill needs to be available on the global scope.

Following an example of how you could bring a `Promise` and `WeakMap` polyfill only in legacy browsers (IE9 and IE10), through a single script on top of any page that needs it.
```html
<script>this.Promise||document.write('<script src="https://unpkg.com/es6-promise@4.2.5/dist/es6-promise.auto.min.js"><\x2fscript>')</script>
<script>this.WeakMap||document.write('<script src="https://unpkg.com/@ungap/weakmap@0.1.4/min.js"><\x2fscript>')</script>
```

## Best Practices

Since, like it is for Custom Elements, you can define one selector per time,
it is suggested to not use too generic selectors such `a` or `button` in case you'd like to compose behaviors.

A single node can indeed behave in various way, as long as it matches one or more defined selector.

```js
regularElements.define('.clicker', {
  onconnected() {
    this.addEventListener('click', theClicker);
  }
});
regularElements.define('.hi-five', {
  onconnected() {
    this.textContent += ' 🖐 ';
  }
});
```

Whenever an element with either the class `clicker`, or `hi-five`, or both is created or found live on the DOM, it will be setup once per behavior, as [demoed here](https://webreflection.github.io/regular-elements/test/multi.html).
