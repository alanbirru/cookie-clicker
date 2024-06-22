import { useState, useEffect } from 'react';
import Building from './components/Building';
import Cookie from './components/Cookie';

// Main App Component
function App() {
  // Building Array
  const initialBuildings = [
    {
      title: 'Cursor',
      price: 15,
      second: 0.1,
      owned: 0,
      icon: '☝️',
      totalProduced: 0,
    },
    {
      title: 'Abuela',
      price: 100,
      second: 1,
      owned: 0,
      icon: '👵',
      totalProduced: 0,
    },
    {
      title: 'Granja',
      price: 1000,
      second: 8,
      owned: 0,
      icon: '🌱',
      totalProduced: 0,
    },
    {
      title: 'Fabrica',
      price: 5000,
      second: 25,
      owned: 0,
      icon: '⚙️',
      totalProduced: 0,
    },
  ];
  // Principal usestates
  const [buildings, setBuildings] = useState(initialBuildings);
  const [cookies, setCookies] = useState(0);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);

  // Update the click of the cookie
  const handleCookieClick = () => {
    setCookies(cookies + 1);
  };

  const updateBuilding = (title) => {
    setBuildings(
      buildings.map((building) => {
        if (building.title === title) {
          const newPrice = Math.floor(building.price * 1.15);
          return {
            ...building,
            owned: building.owned + 1,
            price: newPrice,
          };
        }
        return building;
      })
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((prevCookies) => {
        const newCookies = prevCookies + cookiesPerSecond;
        setBuildings((prevBuildings) =>
          prevBuildings.map((building) => ({
            ...building,
            totalProduced:
              building.totalProduced + building.owned * building.second,
          }))
        );
        return newCookies;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cookiesPerSecond]);

  useEffect(() => {
    const newCPS = buildings.reduce(
      (total, building) => total + building.owned * building.second,
      0
    );
    setCookiesPerSecond(newCPS);
  }, [buildings]);

  return (
    <div>
      <div>
        <Cookie handleCookieClick={handleCookieClick} />
        <div>Cookies: {Math.floor(cookies)}</div>
        <div>Cookies per second: {cookiesPerSecond.toFixed(1)}</div>
      </div>

      <div className='flex flex-col justify-center items-center'>
        {buildings.map((building) => (
          <Building
            key={building.title}
            building={building}
            cookies={cookies}
            setCookies={setCookies}
            updateBuilding={updateBuilding}
            cookiesPerSecond={cookiesPerSecond}
            setCookiesPerSecond={setCookiesPerSecond}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
