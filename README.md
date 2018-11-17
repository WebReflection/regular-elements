# regularElements

Everything I love about Custom Elements made available for any node, and through CSS selectors.

```js
regularElements.define('button', {
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
  }
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

The _API_ is similar to `customElements` one, included `.get(selector)` and `.whenDefined(selector)`.

In order to use latter, be sure there is a `Promie` polyfill available on the global scope.
