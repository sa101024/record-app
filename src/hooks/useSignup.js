import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase imports
import { auth, storage, db } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      const res =  await createUserWithEmailAndPassword(auth, email, password)
      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      let imgURL = null;
      if (thumbnail != null) {
        const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
        const storageRef = ref(storage, uploadPath)
        await uploadBytes(storageRef, thumbnail)
        imgURL = await getDownloadURL(storageRef)
      }

      // add display name to user
      await updateProfile(res.user, { displayName, photoURL: imgURL })

      // create a user document
      const docRef = doc(db, 'users', res.user.uid)
      await setDoc(docRef, {
        online: true,
        displayName,
        photoURL: imgURL
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      // update state
      setIsPending(false)
      setError(null)
    } catch (err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }
  
  return { signup, error, isPending }
}