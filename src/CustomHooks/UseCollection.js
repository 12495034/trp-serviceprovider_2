import { useState, useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore"
import { firestore } from "../config/Firebase"

export default function useCollection(collectionName, dependency) {
  //Hook state
  const [collectionData, setCollectionData] = useState([]);
  const [isCollectionLoading, setIsCollectionLoading] = useState(true);
  const [collectionError, setCollectionError] = useState("");

  useEffect(() => {
    if (collectionName != undefined) {
      fetchCollectionData(collectionName)
    } else {
      setCollectionError("Collection name not defined")
    }
  }, [dependency])

  async function fetchCollectionData(collectionName) {
    const q = collection(firestore, `${collectionName}`);
    try {
      const querySnapshot = await getDocs(q)
      let collectionArray = []
      querySnapshot.forEach((doc) => {
        let data = Object.assign({ id: doc.id }, doc.data())
        collectionArray.push(data)
      })
      setCollectionData(collectionArray)
    } catch (e) {
      setCollectionError(e.message)
    }
  }

  return {
    collectionData,
    isCollectionLoading,
    collectionError
  }
}


