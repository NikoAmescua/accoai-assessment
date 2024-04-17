import { useContext } from 'react';
import { CartContext } from '../App';
// eslint-disable-next-line react/prop-types
function ItemView({ activeItem, setActiveItem }) {
  // eslint-disable-next-line react/prop-types
  const { price, title, imageURL, description } = activeItem;

  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    setCart((prev) => {
      return { ...prev, [title]: prev[title] ? prev[title] + 1 : 1 };
    });
  };

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <>
      <div onClick={() => setActiveItem(false)} className='absolute top-4 left-4 cursor-pointer w-8 h-8 invert'>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/768px-Back_Arrow.svg.png' />
      </div>
      <div className='w-1/2 relative text-left pr-10'>
        <p className='text-lg font-bold'>{title}</p>
        <p className='font-medium'>{USDollar.format(price)}</p>
        <p>{description}</p>
        <button onClick={addToCart} className='bg-slate-200 mt-4 text-gray-800 hover:bg-slate-400 px-2 py-1 rounded-md'>
          Add to cart
        </button>
      </div>
      <div className='w-80 h-80 relative flex justify-center'>
        <img className='w-full h-full object-cover' src={imageURL} />
      </div>
    </>
  );
}

export default ItemView;
