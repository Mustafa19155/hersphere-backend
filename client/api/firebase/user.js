import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from '../../firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firebase from 'react-native-firebase';

export const createAccount = async ({auth, email, username, password}) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'Users', res.user.uid), {
      username,
      email,
    });
    return res.user;
  } catch (err) {
    throw err;
  }
};

export const login = async ({email, password}) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err) {
    throw err;
  }
};

export const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    await GoogleSignin.addScopes({
      scopes: ['profile', 'email'],
    });

    const userInfo = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );

    await setDoc(doc(db, 'Users', userInfo.user.id), {
      username: userInfo.user.name,
      email: userInfo.user.email,
    });

    return firebase.auth().signInWithCredential(credential);
  } catch (error) {
    throw error;
  }
};
