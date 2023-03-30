import { auth } from '@/firebase/index.js'
import { signInWithEmailAndPassword } from "firebase/auth"

const loginUsingFirebase = data => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then( userCredential => {
        resolve(userCredential.user)
      })
      .catch( err => {
        reject(err.message)
      })
  })
}

export default loginUsingFirebase