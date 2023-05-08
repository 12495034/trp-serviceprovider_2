/**
 * convert firestore timestamp to date and time string for display purposes
 * @param {Timestamp} timeStamp firestore timestamp
 * @returns Long string format of date and time
 */

export function convertFirestoreTimeStamp(timeStamp){
    if(timeStamp){
      const fireBaseTime = new Date(
        timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000,
      );
      const date = fireBaseTime.toDateString();
      const atTime = fireBaseTime.toLocaleTimeString();
      return `${date}, ${atTime}`
    }
    return "Unknown Time"
    }