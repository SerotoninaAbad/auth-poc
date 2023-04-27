/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import router from 'next/router';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import app from '../firebaseAppConfig';
import { NextPage } from 'next';

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

const withAuth = (Component: NextPage) => (props: any) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push('/signin');
      }
    });
  }, []);

  return (
    <div>
      <Component {...props} />
    </div>
  );
};

export default withAuth;
