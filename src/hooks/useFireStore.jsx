import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

const useFireStore = (collection, condition) => {

    /*
     * condition = {
     *      fieldName
     *      operator
     *      compareValue
     * }
     */

    const [documents, setDocument] = useState([])

    useEffect(() => {
        // khi có sự thay đổi ở trong collection users thì onSnapshot sẽ thực thi => real time
        // db.collection('users').onSnapshot(snapshot => {
        //     const data = snapshot.docs.map(doc => ({
        //         ...doc.data(),  // data là hàm của firestore giúp convert data từ db sang {}
        //         id: doc.id
        //     }))
        //     console.log('data', data)
        //     // console.log('snapshot', snapshot.docs[0].data())
        // })

        let collectionRef = db.collection(collection).orderBy('createdAt')

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) return;

            const { fieldName, operator, compareValue } = condition
            collectionRef = collectionRef.where(fieldName, operator, compareValue)
        }

        const unsubscribe = collectionRef.onSnapshot(snapshot => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setDocument(documents)
        })

        return unsubscribe

    }, [collection, condition])

    return documents
}

export default useFireStore;