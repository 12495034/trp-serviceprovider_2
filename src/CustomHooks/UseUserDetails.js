import { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore"
import { firestore } from "../Firebase"

/**
 * Custom Hook used to perform one time data retrievel from firestore collection, loading state of the data 
 * and any system errors generated
 * @param {String} collectionName 
 * @param {state variable} dependency Input to dependency array
 * @returns docData, isDocLoading, docError
 */

//potential refactoring as this custom hook is similar to useCollection custom hook
export default function useUserDetails(collectionName, dependency) {
  const [collectionData, setCollectionData] = useState([]);
  const [isCollectionLoading, setIsCollectionLoading] = useState(true);
  const [collectionError, setCollectionError] = useState('');

  useEffect(() => {
    if (collectionName != undefined) {
      fetchCollectionData(collectionName)
    } else {
      setCollectionError("Collection name not defined")
    }
  }, [dependency])

  async function fetchCollectionData(collectionName) {
    const q = collection(firestore, `${collectionName}`);
    const querySnapshot = await getDocs(q)
    let collectionArray = []
    querySnapshot.forEach((doc) => {
      let data = Object.assign({ id: doc.id }, doc.data())
      collectionArray.push(data)
    })
    setCollectionData(collectionArray)
  }

  return {
    collectionData,
    isCollectionLoading,
    collectionError
  }

}

