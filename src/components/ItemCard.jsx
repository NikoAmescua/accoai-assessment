// eslint-disable-next-line react/prop-types
function ItemCard({ description, title, imageURL, price, setActiveItem }) {
  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div
      onClick={() => setActiveItem({ description, title, imageURL, price })}
      className='border-2 border-gray-400 rounded-lg w-56 h-56 flex flex-col items-center cursor-pointer transition-transform hover:scale-105'
    >
      <div className='mx-auto my-auto'>
        <h1 className='text-xl font-bold mb-2'>{title}</h1>
        <div className='w-36 h-36'>
          <img className='w-full h-full object-cover' src={imageURL} />
        </div>
        <h1 className='mt-1'>{USDollar.format(price)}</h1>
      </div>
    </div>
  );
}

export default ItemCard;
