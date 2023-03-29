import {auth} from '@/firebase/index.js'
import {createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const register = data=>{
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(
            auth, data.email, data.password
            ).then((userCredential) =>{
                updateProfile(userCredential.user, {
                    displayName: data.firstName + " " + data.lastName
                })
               resolve(userCredential.user) 
    }).catch((err) => {
        reject(err.message)
    })
    
        })
}