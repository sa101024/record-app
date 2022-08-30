import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase import
import { auth, db } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password)

      // update online status
      const docRef = doc(db, 'users', res.user.uid)
      updateDoc(docRef, {
        online: true
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })
      setIsPending(false)
      setError(null)
    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { login, isPending, error }
}