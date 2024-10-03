export function obsKeysToString(o: any, k: string[], sep: string) {
  // iterate over key array
  return k
    .map(function (key) {
      // get object property value
      return o[key];
      // filter out non-empty and defined property
    })
    .filter(function (v) {
      return v;
      // join the property value array with the separator
    })
    .join(sep);
}
