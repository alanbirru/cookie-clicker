import { useState, useEffect } from 'react';
import Building from './components/Building';
import Cookie from './components/Cookie';
import BuilidingDisplay from './components/BuilidingDisplay';

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

  const [buildings, setBuildings] = useState(initialBuildings);
  const [cookies, setCookies] = useState(10000);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);

  // Function to handle cookie click
  const handleCookieClick = () => {
    setCookies(cookies + 1);
  };

  // Function to update building when purchased
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

  // useEffect to handle the cookie production per second with more frequent updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCookies((prevCookies) => {
        const increment = cookiesPerSecond / 20; // Calculate increment for smoother updates
        const newCookies = prevCookies + increment;
        setBuildings((prevBuildings) =>
          prevBuildings.map((building) => ({
            ...building,
            totalProduced:
              building.totalProduced + (building.owned * building.second) / 20,
          }))
        );
        return newCookies;
      });
    }, 50); // Run this effect every 50 milliseconds (0.05 second)

    // Cleanup function to clear the interval when the component unmounts or when dependencies change
    return () => clearInterval(interval);
  }, [cookiesPerSecond]); // This effect depends on cookiesPerSecond

  // useEffect to recalculate cookies per second whenever buildings change
  useEffect(() => {
    const newCPS = buildings.reduce(
      (total, building) => total + building.owned * building.second,
      0
    );
    setCookiesPerSecond(newCPS);
  }, [buildings]); // This effect depends on buildings

  return (
    <div>
      <div>
        <Cookie handleCookieClick={handleCookieClick} />

        <div className='flex gap-3 text-3xl'>
          <h2 className='font-bold'>Cookies:</h2>
          <span> {Math.floor(cookies)}</span>
        </div>

        <div className='flex gap-3 text-3xl'>
          <h2 className='font-bold'>Cookies per second:</h2>
          <span> {cookiesPerSecond.toFixed(1)}</span>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center gap-5  '>
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
      <div className='flex flex-col gap-3'>
        {buildings.map((building) => (
          <BuilidingDisplay building={building} />
        ))}
      </div>
    </div>
  );
}

export default App;
