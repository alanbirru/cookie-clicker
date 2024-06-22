const Building = ({
  building,
  cookies,
  setCookies,
  updateBuilding,
  cookiesPerSecond,
  setCookiesPerSecond,
}) => {
  const handleBuy = () => {
    if (cookies >= building.price) {
      setCookies(cookies - building.price);
      updateBuilding(building.title);
      setCookiesPerSecond(cookiesPerSecond + building.second);
    }
  };

  return (
    <button
      onClick={handleBuy}
      disabled={cookies < building.price}
      className={`mt-2 text-white p-3 rounded-md shadow-lg w-[500px] ${
        cookies < building.price ? 'bg-red-600' : 'bg-blue-600'
      }`}
    >
      <h2 className='font-bold text-lg'>
        {building.icon} {building.title}
      </h2>
      <div>🍪 {building.price}</div>
      <div>
        {building.title}s owned: {building.owned}
      </div>
      <div>cada cursor produce {building.second} galletas por segundo</div>
      <div>Total cookies produced: {Math.floor(building.totalProduced)}</div>
    </button>
  );
};

export default Building;
