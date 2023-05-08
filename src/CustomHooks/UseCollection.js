import { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore"
import { firestore } from "../config/Firebase"

/**
 * Custom Hook used to perform single data retrieval from a firestore collection, loading state of the data 
 * and any system errors generated
 * @param {String} collectionName Firestore Collection
 * @param {state variable} dependency Input to dependency array
 * @returns collectionData, isCollectionLoading, collectionError
 */
export default function useCollection(collectionName, dependency) {
  
  const [collectionData, setCollectionData] = useState([]);
  const [isCollectionLoading, setIsCollectionLoading] = useState(true);
  const [collectionError, setCollectionError] = useState("");

  //Use Effect used to synchronize component or function with external system
  //dependency array contains hook input parameter to trigger call back function
  useEffect(() => {
    if (collectionName !== undefined) {
      fetchCollectionData(collectionName)
    } else {
      //
      setCollectionError("Collection name not defined")
    }
  }, [dependency])

  //asynchronus function used to fetch collection data from firestore
  async function fetchCollectionData(collectionName) {
    //define empty array to store document objects
    let collectionArray = []
    //define firestore collection from the custom hook parameters
    const q = collection(firestore, `${collectionName}`);
    //error handling through try catch loop to set retrieved data state or 
    //error message
    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        let data = Object.assign({ id: doc.id }, doc.data())
        collectionArray.push(data)
      })
      setCollectionData(collectionArray)
      setIsCollectionLoading(false)
    } catch (e) {
      setCollectionError(e.message)
    }
  }

  //data returned from custom hook
  return {
    collectionData,
    isCollectionLoading,
    collectionError
  }
}


