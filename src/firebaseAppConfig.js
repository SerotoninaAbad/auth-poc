import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCOBXc3eJu_m8_PMiLz7yYf5Fk8bIXIOlc',
  authDomain: 'airpals-test.firebaseapp.com',
  databaseURL: 'https://airpals-test-default-rtdb.firebaseio.com',
  projectId: 'airpals-test',
  storageBucket: 'airpals-test.appspot.com',
  messagingSenderId: '81742128256',
  appId: '1:81742128256:web:a71a4661a742607961f265',
  measurementId: 'G-GYRSCD1JYK',
};

const app = initializeApp(firebaseConfig);

export default app;
