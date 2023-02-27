import { useState, useEffect } from 'react'
import { collection, query, onSnapshot} from "firebase/firestore"
import { firestore } from "../Firebase"

export default function useCollectionSnapshot(collectionName, dependency) {
    //Hook state
    const [collectionData, setCollectionData] = useState([]);
    const [isCollectionLoading, setIsCollectionLoading] = useState(true);
    const [collectionError, setCollectionError] = useState('');

    useEffect(() =>
        onSnapshot(query(collection(firestore, `${collectionName}`)), (querySnapshot) => {
            let collectionArray = []
            querySnapshot.forEach((doc) => {
                const id = { id: doc.id }
                const data = doc.data()
                const combine = Object.assign({}, id, data)
                collectionArray.push(combine)
            })
            setCollectionData(collectionArray)
        })
        , [dependency])

    return {
        collectionData,
        isCollectionLoading,
        collectionError
    }

}

