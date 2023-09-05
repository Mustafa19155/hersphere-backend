import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {collection, doc, getDoc, setDoc} from 'firebase/firestore';
import {auth, db} from '../../firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const createAccount = async ({auth, email, username, password}) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'Users', res.user.uid), {
      username,
      email,
      profileCompleted: false,
    });
    return res.user;
  } catch (err) {
    throw err;
  }
};

export const login = async ({email, password}) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = await getDoc(doc(collection(db, 'Users'), res.user.uid));
    return user.data();
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

    // const credential = firebase.auth.GoogleAuthProvider.credential(
    //   userInfo.idToken,
    // );

    const user = await getDoc(doc(collection(db, 'Users'), userInfo.user.id));

    if (user.exists()) {
      return user.data();
    } else {
      await setDoc(doc(db, 'Users', userInfo.user.id), {
        username: userInfo.user.name,
        email: userInfo.user.email,
      });
      return {
        username: userInfo.user.name,
        email: userInfo.user.email,
      };
    }

    // return firebase.auth().signInWithCredential(credential);
  } catch (error) {
    throw error;
  }
};
