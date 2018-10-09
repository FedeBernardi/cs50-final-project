export function mergeObjects(baseObj, obj) {
    return Object.assign({}, baseObj, obj);
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
