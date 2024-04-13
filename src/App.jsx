import { useEffect, useState } from 'react';
import './App.css';
import Store from './components/Store.jsx';
import ItemView from './components/ItemView.jsx';
import Nav from './components/Nav.jsx';

import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

function App() {
  const [storeItems, setStoreItems] = useState({});
  const [activeItem, setActiveItem] = useState(false);

  // get items from firebase store in a useState
  useEffect(() => {
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
    const getDocsFromFirebase = async () => {
      const itemsCollectionRef = await collection(firestore, 'items');
      const querySnapshot = await getDocs(itemsCollectionRef);
      const collectionObj = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        collectionObj[data.title] = { image: data.image, description: data.description, price: data.price };
      });
      setStoreItems(collectionObj);
    };
    getDocsFromFirebase();
  }, []);

  return (
    <>
      <Nav />
      <div className="mt-2">
        <h1 className="text-xl mb-4">{!activeItem && 'Store'}</h1>
        <div className="max-w-4xl flex flex-col items-center mx-auto">
          <div className="w-full p-6 bg-gray-700 flex items-center justify-center">
            {!activeItem && <Store setActiveItem={setActiveItem} storeItems={storeItems} />}
            {activeItem && <ItemView activeItem={activeItem} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
