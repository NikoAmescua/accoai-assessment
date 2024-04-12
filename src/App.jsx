import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { getFirestore, doc, getDoc, getDocs, collection } from 'firebase/firestore';

function App() {
  const [count, setCount] = useState(0);

  const firebaseConfig = {
    apiKey: 'AIzaSyB-WV3ji6WaU2izSSTYbNZnD9rCVEa16GE',
    authDomain: 'accoai-assessment.firebaseapp.com',
    projectId: 'accoai-assessment',
    storageBucket: 'accoai-assessment.appspot.com',
    messagingSenderId: '560233199029',
    appId: '1:560233199029:web:0404afcfe7cc50a6be15fc',
    measurementId: 'G-3HDDLYC52R',
  };

  initializeApp(firebaseConfig);
  const firestore = getFirestore();

  const getDocsFromFireBase = async () => {
    const itemsCollectionRef = await collection(firestore, 'items');
    const querySnapshot = await getDocs(itemsCollectionRef);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data);
    });
  };
  getDocsFromFireBase();

  return <></>;
}

export default App;
