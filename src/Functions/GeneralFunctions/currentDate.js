/**
 * Function to return current date in YYYY-MM-DD format
 * @param {String} offset Optional - Offset current date by a number of days
 * @returns today String in YYYY-MM-DD format
 */

export function currentDate(offset) {
    var d = new Date();
    var n
    //guard against null value input
    if (offset == null) {
        n = 0
    } else {
        n = Number(offset)
    }

    //offset date by a defined number of days through offset parameter
    d.setDate(d.getDate() + n)

    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const today = `${ye}-${mo}-${da}`;
    return today
}