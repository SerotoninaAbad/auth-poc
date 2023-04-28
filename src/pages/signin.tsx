import Head from 'next/head';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  connectAuthEmulator,
} from 'firebase/auth';
import app from 'src/firebaseAppConfig';
import { useUser } from 'src/auth/useUser';
import { useState } from 'react';

const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

const LoginNew = () => {
  const { signup } = useUser();
  const [loading, setLoading] = useState<Boolean>(false);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <div>
        <Head>
          <title>Login for new user</title>
        </Head>
        <div className="flex container mx-auto justify-center h-screen w-full md:w-1/2 max-w-lg">
          <div className="flex flex-col w-full max-w-3xl items-center my-16">
            <div className="text-center px-5">
              <div className="font-bold text-xl lg:text-2xl my-10 ">
                Before we become pals we need to know your name
              </div>
            </div>
            <div className="w-full px-10 py-4">
              {loading && <div>LOADING</div>}
              <button
                onClick={async () => {
                  setLoading(true);
                  await signup('belen+6@airpals.co', 'Vintage3', 'Belencita3');
                  setLoading(false);
                }}
              >
                Iniciar sesión
              </button>
              <div className="relative flex py-3 items-center">
                <div className="flex-grow border-t border-gray-light"> </div>
                <span className="flex-shrink mx-4 text-blue-dark">or</span>
                <div className="flex-grow border-t border-gray-light"> </div>
              </div>
              <button
                onClick={async () => {
                  console.log('otro botton');
                  await signInWithPopup(auth, provider).catch((error) => {
                    alert('Error al ingresar');
                  });
                }}
                className="justify-center mx-auto w-full bg-red-google hover:bg-red-googlehover"
              >
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginNew;
