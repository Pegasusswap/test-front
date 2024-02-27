import React, { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExchangeCalculator from './ExchangeCalculator';

function App() {
  const [count, setCount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(null);
  const [exchangeRateAll, setExchangeRateAll] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get('http://localhost:4444/getExchangeRate');
            setExchangeRate(response.data);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    fetchExchangeRate();
  }, []);


  useEffect(() => {
    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get('http://localhost:4444/getExchangeRateAll');
            setExchangeRateAll(response.data);
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
    };

    fetchExchangeRate();
  }, []);

  if (!exchangeRate) {
      return <div>Loading...</div>;
  }

const usdtToBtcRate = 1 / exchangeRate.last_price;

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
            <h2>Exchange Rate</h2>
            <p>Bitcoin to Tether: {exchangeRate.last_price}</p>
            <p>Tether to Bitcoin: {usdtToBtcRate.toFixed(8)}</p> 
            <p>Change: {exchangeRate.change}%</p>
      </div>
      <ExchangeCalculator/>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
