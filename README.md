# regularElements

- - -

**V1 Breaking Changes**

  * the definition now follows standard naming convention
  * callbacks are callbacks, not even driven anymore
  * if present, `observedAttributes` must contain at least one attribute name
  * browsers older than IE 11 might not work as expected
  * the minified gzipped size is now *~0.9K*

- - -

Everything I love about Custom Elements made available for any node, and through CSS selectors.

No Custom Elements, no Shadow DOM, and no polyfills are needed.

```js
// if loaded as <script>, it's exposed as global regularElements
import {define} from 'regular-elements';

define('button.alive', {
  // lifecycle callbacks
  connectedCallback() {
    this.disabled = false;
    this.classList.add('fade-in');
  },
  disconnectedCallback() {
    console.log('goodbye');
  },

  // attributes notifications
  observedAttributes: ['only', 'these', 'attrs'],
  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log(attributeName, oldValue, newValue);
  }
});


define('#any > sel-ector[you=like]', {
  // ...
});
```

The module exports the same _API_ found in [CustomElementRegistry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry): `define(selector, definition)`, `get(selector)`, `upgrade(node)`, and `whenDefined(selector)`.



## Best Practices

Since, like it is for Custom Elements, you can define one selector per time,
it is suggested to not use too generic selectors such `a` or `button` in case you'd like to compose behaviors.

A single node can indeed behave in various way, as long as it matches one or more defined selector.

```js
regularElements.define('.clicker', {
  connectedCallback() {
    this.addEventListener('click', theClicker);
  }
});
regularElements.define('.hi-five', {
  connectedCallback() {
    this.textContent += ' 🖐 ';
  }
});
```

Whenever an element with either the class `clicker`, or `hi-five`, or both is created or found live on the DOM, it will be setup once per behavior, as [demoed here](https://webreflection.github.io/regular-elements/test/multi.html).
