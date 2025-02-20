import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	addDoc,
	connectFirestoreEmulator,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
connectFirestoreEmulator(db, '127.0.0.1', 8080);

/**
 * @param {Array<Number>} dragList
 */
export async function addUser(dragList) {
	try {
		const docRef = await addDoc(collection(db, 'drag-list'), dragList);

		return { id: docRef.id, collection: docRef.parent.id };
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

// import { initializeApp } from 'firebase-admin/app';
// import { onDocumentCreated } from 'firebase-functions/v2/firestore';
// import admin from 'firebase-admin';
// import path from 'path';

// const keyPath = path.normalize();

// initializeApp({ credential: admin.credential.cert(keyPath) });

// onDocumentCreated('orders/{id}', (event) => {
// 	const snapshot = event.data;

// 	if (!snapshot) {
// 		return null;
// 	}

// 	const data = snapshot.data();

// 	const orderName = data.name;

// 	if (orderName) {
// 		return snapshot.ref.update({ name: orderName + 'RAND' });
// 	} else {
// 		return null;
// 	}
// });
