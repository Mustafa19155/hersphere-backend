import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import {auth, db} from '../../firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const createAccount = async ({auth, email, username, password}) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, 'Users', res.user.uid), {
      id: res.user.uid,
      username,
      email,
      profileCompleted: false,
    });
    return {
      id: res.user.uid,
      username,
      email,
      profileCompleted: false,
    };
  } catch (err) {
    throw err;
  }
};

export const login = async ({email, password}) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = await getDoc(doc(collection(db, 'Users'), res.user.uid));
    if (user.data()) {
      return user.data();
    } else {
      throw err;
    }
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

    const user = await getDoc(doc(collection(db, 'Users'), userInfo.user.id));

    if (user.exists()) {
      return user.data();
    } else {
      await setDoc(doc(db, 'Users', userInfo.user.id), {
        googleId: userInfo.user.id,
        id: userInfo.user.id,
        username: userInfo.user.name,
        email: userInfo.user.email,
        profileCompleted: false,
      });
      return {
        id: userInfo.user.id,
        username: userInfo.user.name,
        email: userInfo.user.email,
        profileCompleted: false,
      };
    }
  } catch (error) {
    throw error;
  }
};

export const udpateUser = async (userId, data) => {
  try {
    await updateDoc(doc(db, 'Users', userId), data);
    return;
  } catch (err) {
    throw err;
  }
};
