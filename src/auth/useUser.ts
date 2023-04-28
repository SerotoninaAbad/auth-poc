import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  User,
  getAuth,
  signOut,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from 'firebase/functions';

import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from './userCookie';
import app from '../firebaseAppConfig';
import { UserApp } from 'src/types';

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

const functions = getFunctions(app);
connectFunctionsEmulator(functions, 'localhost', 5001);

//a quí necesitamos nombre también
export const mapUserData = async (user: User) => {
  const { uid, email, displayName } = user;
  const token = await user.getIdToken(true);
  return {
    id: uid,
    email,
    token,
    displayName,
  };
};

const useUser = () => {
  const [user, setUser] = useState<UserApp | null>(null);
  const router = useRouter();

  const signup = async (email: string, password: string, name: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log('usuario creado');
        const { user } = userCredential;
        await updateProfile(user, { displayName: name });
        console.log('usuario actualizado');
        console.log('llamando función de login');
        const signUp = httpsCallable(functions, 'afterUserCreate');
        await signUp();
        console.log('función de login finalizado');

        router.push('/');
      })
      .catch((errorCreation) => {
        // que pasa si se crea el usuario enfirebase pero existe error en el afterUserCreate? BORRAR USUARIO?
        if (errorCreation.code === 'auth/email-already-in-use') {
          alert('Error ya esxite cuenta');
        }
      });
  };

  const logout = async () => {
    // apolloClient.clearStore()
    return signOut(auth)
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    const cancelAuthListener = auth.onIdTokenChanged(async (userToken) => {
      console.log(userToken);
      if (userToken) {
        const userData: UserApp = await mapUserData(userToken);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser(null);
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      return () => {};
    }
    setUser(userFromCookie);
    return () => cancelAuthListener;
  }, []);

  return { signup, user, logout };
};

export { useUser };
