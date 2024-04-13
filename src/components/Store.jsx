import ItemCard from './ItemCard';

// eslint-disable-next-line react/prop-types
function Store({ storeItems, setActiveItem }) {
  const keys = Object.keys(storeItems);
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 gap-10">
        {keys.map((key) => {
          // eslint-disable-next-line react/prop-types
          const { image, description, price } = storeItems[key];
          // eslint-disable-next-line react/jsx-key
          return (
            <ItemCard
              setActiveItem={setActiveItem}
              key={key + image}
              price={price}
              title={key}
              imageURL={image}
              description={description}
            />
          );
        })}
      </div>
    </>
  );
}

export default Store;
