//convert firestore timestamp to date and time string for display purposes
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