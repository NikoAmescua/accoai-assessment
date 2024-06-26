import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import Store from './components/Store.jsx';
import ItemView from './components/ItemView.jsx';
import Nav from './components/Nav.jsx';
import CartModal from './components/CartModal.jsx';

import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

// setup cart context
export const CartContext = createContext();

function App() {
  const [storeItems, setStoreItems] = useState({});
  const [activeItem, setActiveItem] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cart, setCart] = useState({});

  const firestoreRef = useRef(null);

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
    firestoreRef.value = getFirestore();
    const getDocsFromFirebase = async () => {
      const itemsCollectionRef = await collection(firestoreRef.value, 'items');
      const querySnapshot = await getDocs(itemsCollectionRef);
      const collectionObj = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        collectionObj[data.title] = {
          image: data.image,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          id: doc.id,
        };
      });
      setStoreItems(collectionObj);
    };
    getDocsFromFirebase();
  }, []);

  return (
    <>
      <CartContext.Provider value={[cart, setCart]}>
        <Nav setModalOpen={setModalOpen} />
        {modalOpen && (
          <CartModal
            setStoreItems={setStoreItems}
            firestoreRef={firestoreRef}
            storeItems={storeItems}
            setModalOpen={setModalOpen}
          />
        )}
        <div className='mt-2'>
          <h1 className='text-2xl font-semibold mb-4 mt-4'>{activeItem ? 'check this out' : 'Store'}</h1>
          <div className='max-w-4xl flex flex-col items-center mx-auto'>
            <div className='w-full relative rounded-md p-6 bg-gray-700 flex items-center justify-center'>
              {!activeItem && <Store setActiveItem={setActiveItem} storeItems={storeItems} />}
              {activeItem && <ItemView activeItem={activeItem} setActiveItem={setActiveItem} />}
            </div>
          </div>
        </div>
      </CartContext.Provider>
    </>
  );
}

export default App;
