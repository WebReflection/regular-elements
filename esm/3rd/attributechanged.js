/*
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

function attributechanged(poly) {'use strict';
  var Event = poly.Event;
  return function observe(node) {
    try {
      (new MutationObserver(changes))
        .observe(node, {attributes: true, attributeOldValue: true});
    } catch(o_O) {
      node.addEventListener('DOMAttrModified', attrModified, true);
    }
    return node;
  };
  function attrModified(event) {
    dispatchEvent(event.target, event.attrName, event.prevValue);
  }
  function dispatchEvent(node, attributeName, oldValue) {
    var event = new Event('attributechanged');
    event.attributeName = attributeName;
    event.oldValue = oldValue;
    event.newValue = node.getAttribute(attributeName);
    node.dispatchEvent(event);
  }
  function changes(records) {
    for (var record, i = 0, length = records.length; i < length; i++) {
      record = records[i];
      dispatchEvent(record.target, record.attributeName, record.oldValue);
    }
  }
}
export default attributechanged;
