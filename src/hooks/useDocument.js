import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

// firebase imports
import { onSnapshot, doc } from "firebase/firestore";

export const useDocument = (c, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const docRef = doc(db, c, id)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.data()) {
        setDocument({...snapshot.data(), id: snapshot.id})
        // console.log(snapshot.data().createdAt.toDate())
        setError(null)
      } else {
        setError('no such document exists')
      }
    },(error) => {
      console.log(error)
      setError('failed to get document')
    })

    return () => unsubscribe()

  }, [c, id])

  return { document, error }
}