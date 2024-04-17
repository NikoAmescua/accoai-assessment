import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../App';
import { doc, updateDoc } from 'firebase/firestore';
// eslint-disable-next-line react/prop-types
function CartModal({ setModalOpen, storeItems, firestoreRef, setStoreItems }) {
  const [cart, setCart] = useContext(CartContext);
  const [message, setMessage] = useState(false);

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const checkout = () => {
    let soldOut = false;
    Object.keys(cart).forEach((key) => {
      // eslint-disable-next-line react/prop-types
      if (storeItems[key].quantity < cart[key]) soldOut = key;
    });
    if (soldOut) {
      setMessage(`Order not placed, ${soldOut} is sold out`);
      setCart({});
      return;
    }

    Object.keys(cart).forEach((key) => {
      // eslint-disable-next-line react/prop-types
      const docToUpdate = doc(firestoreRef.value, 'items', storeItems[key].id);
      // eslint-disable-next-line react/prop-types
      updateDoc(docToUpdate, { quantity: storeItems[key].quantity - cart[key] });
      setStoreItems((prev) => ({
        ...prev,
        [key]: { ...prev[key], quantity: prev[key].quantity - cart[key] },
      }));
    });
    setMessage('Order Placed');
    setCart({});
  };

  // handle closing the window
  const handleClickOutside = (e) => e.target.id == 'outer-modal' && setModalOpen(false);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  let sum = 0;
  return (
    <div
      id='outer-modal'
      className='fixed text-black w-screen h-screen bg-red left-0 top-0 z-10 flex items-center justify-center backdrop-blur-lg px-10 py-20'
    >
      <div className='bg-gray-300 w-full h-full max-w-[800px] rounded-2xl p-4 flex flex-col items-center'>
        {!message && (
          <>
            <h1 className='text-3xl font-semibold mb-6'>My Cart</h1>
            {Object.keys(cart).map((key) => {
              // eslint-disable-next-line react/prop-types
              sum += cart[key] * storeItems[key]?.price;
              return (
                <div key={key} className='flex flex-row space-x-10'>
                  <p>{key}</p>
                  <p>{cart[key]}x</p>
                  {/* eslint-disable-next-line react/prop-types */}
                  <p>{USDollar.format(storeItems[key]?.price)}</p>
                  {/* eslint-disable-next-line react/prop-types */}
                  <p>total: {USDollar.format(cart[key] * storeItems[key]?.price)}</p>
                </div>
              );
            })}
            <p className='mt-8 font-semibold'>Grand Total: {USDollar.format(sum)}</p>
            <button
              onClick={checkout}
              className='bg-slate-200 mt-4 text-gray-800 hover:bg-slate-400 px-2 py-1 rounded-md'
            >
              Checkout
            </button>
          </>
        )}
        {message && <h1 className='text-3xl font-semibold my-auto'>{message}</h1>}
      </div>
    </div>
  );
}

export default CartModal;
