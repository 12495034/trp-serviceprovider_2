//used in new clinic form to limit date picker to future dates only
export function currentDate(offset) {
    var d = new Date();
    //guard against null value input
    if (offset == null) {
        var n = 0
    } else {
        var n = Number(offset)
    }

    //offset date by a defined number of days through offset parameter
    d.setDate(d.getDate() + n)

    var ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    var da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const today = `${ye}-${mo}-${da}`;
    return today
}