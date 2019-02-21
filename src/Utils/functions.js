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

export function getDiffBetweenDates(from, to) {
    const date1 = new Date(from),
          date2 = new Date(to);

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    const timeDiff = Math.abs(date2.getTime() - date1.getTime()),
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
}
