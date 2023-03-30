import { db } from '@/firebase/index.js'
import { collection, addDoc, where, query, getDocs } from "firebase/firestore"

export const addPatient = async data => {
  const docRef = await addDoc(collection(db, "patients"), data)

  console.log("Create patient with ID: ", docRef.id)

  return docRef.id
}

export const getPatientByUserId = async id => {
  const q = query(collection(db, "patients"), where("user_uid", "==", id))

  const querySnapshot = await getDocs(q)

  let patient = null
  querySnapshot.forEach(doc => {
    patient = { uid: doc.id, ...doc.data() }
  })

  return patient
}