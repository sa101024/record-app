import { useState } from "react"

// firebase imports
import { auth, db } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { signOut } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // sign the user out
      await signOut(auth)

      // update online status
      const { uid } = user
      const docRef = doc(db, 'users', uid)
      updateDoc(docRef, {
        online: false
      })

      // disatch logout action
      dispatch({ type: 'LOGOUT' })
    
      // update state
      setIsPending(false)
      setError(null)
    } catch(err) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  return { logout, error, isPending }
}