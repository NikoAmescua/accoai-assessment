// eslint-disable-next-line react/prop-types
function Nav({ setModalOpen }) {
  return (
    <>
      <div className='px-8'>
        <div className='h-14 w-full rounded-3xl mt-4 bg-gray-300 flex items-center'>
          <div
            onClick={() => setModalOpen(true)}
            className='w-12 h-12 p-1 flex justify-center items-center ml-auto mr-3 cursor-pointer rounded-full hover:bg-slate-500'
          >
            <img src='https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png' />
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
