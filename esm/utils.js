const Lie = typeof Promise === 'function' ? Promise : function (fn) {
  let queue = [], resolved = false;
  fn(() => {
    resolved = true;
    queue.splice(0).forEach(then);
  });
  return {then, catch() { return this; }};
  function then(fn) {
    return (resolved ? setTimeout(fn) : queue.push(fn)), this;
  }
};

export default (sdo, query, config, defined, setup) => {
  const setupList = nodes => {
    query.forEach.call(nodes, upgrade);
  };

  const upgradeNodes = ({addedNodes}) => {
    setupList(addedNodes);
  };

  const get = selector => {
    const i = query.indexOf(selector);
    return i < 0 ? void 0 : config[i].o;
  };

  const upgrade = node => {
    query.forEach(setup, node);
  };

  const whenDefined = selector => {
    if (!(selector in defined)) {
      let _, $ = new Lie($ => { _ = $; });
      defined[selector] = {_, $};
    }
    return defined[selector].$;
  };

  sdo.add(records => {
    records.forEach(upgradeNodes);
  });

  return {get, upgrade, whenDefined, $: setupList};
};
