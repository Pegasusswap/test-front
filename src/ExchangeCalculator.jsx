import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExchangeCalculator() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [inputCurrency, setInputCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  // Функція для завантаження курсу обміну
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get('http://localhost:4444/getExchangeRate');
        setExchangeRate(response.data.last_price);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

  // Обробник для розрахунку результату обміну
  const calculateExchange = () => {
    if (!exchangeRate || !amount) return;

    if (inputCurrency === 'BTC') {
      setResult((amount * exchangeRate).toFixed(2) + ' USDT');
    } else if (inputCurrency === 'USDT') {
      setResult((amount / exchangeRate).toFixed(6) + ' BTC');
    }
  };

  // Викликати calculateExchange кожен раз, коли змінюються amount або inputCurrency
  useEffect(() => {
    calculateExchange();
  }, [amount, inputCurrency]);

  return (
    <div>
      <h2>Exchange Calculator</h2>
      <label>
        Input Currency:
        <select value={inputCurrency} onChange={e => setInputCurrency(e.target.value)}>
          <option value="">Select Currency</option>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="USDT">Tether (USDT)</option>
        </select>
      </label>
      <br />
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </label>
      <div>
        <strong>Result:</strong> {result}
      </div>
    </div>
  );
}

export default ExchangeCalculator;
