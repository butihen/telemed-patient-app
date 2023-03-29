import { db } from '@/firebase/index'
import { addDoc, collection } from 'firebase/firestore'

export const addPatient = async data =>{
    const docRef = await addDoc (
        collection (db, "patients"),
        data
    )
    return docRef.id
}