import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from './config';

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const FirebaseTimestamp = firebase.firestore.Timestamp;

export {
    userConverterProducts,
    userConverterCategories,
    userConverterUsers,
    userConverterCart,
    userConverterOrders,
} from './userConverter';

export { fetchDbProduct, fetchDbCategories, fetchProductsId } from './fetchDb';
