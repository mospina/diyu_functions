import * as firebase from 'firebase-admin';

firebase.initializeApp();
const firestore = firebase.firestore();
const auth = firebase.auth()

export default firebase;
export { firestore, auth };
