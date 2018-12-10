export function mergeObjects(baseObj, obj) {
    return Object.assign({}, baseObj, obj);
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * It receives a string, converts it to a Date object and
 * returns the formatted date.
 *
 * @param {String} date
 */
export function getDateString(date) {
    const dateObj = new Date(date);

    return dateObj.toLocaleDateString('en-US');
}
