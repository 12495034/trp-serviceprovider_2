/**
 * create a date string of format eg. Sat March 18 2023
 * @param {String} date 
 * @returns dateString A date in long String format
 */

export function createDateString(date) {
    const dateObject = new Date(`${date}T09:00:00`);
    const dateString = dateObject.toDateString();
    return dateString
}

