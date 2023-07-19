// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBXplMRsoatEL95eMEUMRIKH5eJSGARuws',
  authDomain: 'goit-homework.firebaseapp.com',
  databaseURL:
    'https://goit-homework-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'goit-homework',
  storageBucket: 'goit-homework.appspot.com',
  messagingSenderId: '204187143261',
  appId: '1:204187143261:android:19b7837c85bba5c1aed1b4',
  measurementId: '5832344598',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
