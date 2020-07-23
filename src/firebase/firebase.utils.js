import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyAdcjuuQbBvCtuOSy84dGfZqR0uR_37LAQ",
    authDomain: "crwn-db-77c68.firebaseapp.com",
    databaseURL: "https://crwn-db-77c68.firebaseio.com",
    projectId: "crwn-db-77c68",
    storageBucket: "crwn-db-77c68.appspot.com",
    messagingSenderId: "845059726668",
    appId: "1:845059726668:web:a1ec9e22e0c059c72703e9",
    measurementId: "G-0PBTJ5E5J8"
  };


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user ', error.message )
        }
    }
    return userRef;
} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const sigInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;


