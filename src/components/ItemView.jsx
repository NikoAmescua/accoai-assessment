// eslint-disable-next-line react/prop-types
function ItemView({ activeItem }) {
  // eslint-disable-next-line react/prop-types
  const { price, title, imageURL, description } = activeItem;
  return (
    <>
      <div className="w-1/2 text-left pr-10">
        <p className="text-lg font-bold">{title}</p>
        <p>{description}</p>
      </div>
      <div className="w-80 h-80">
        <img className="w-full h-full object-cover" src={imageURL} />
      </div>
    </>
  );
}

export default ItemView;
