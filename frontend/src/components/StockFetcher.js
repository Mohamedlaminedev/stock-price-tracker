import React, { useState } from 'react';

function StockFetcher() {
  const [symbol, setSymbol] = useState("");
  const [stocks, setStocks] = useState([]); // Array to track multiple stocks
  const [error, setError] = useState("");

  const fetchPrice = async () => {
    if (!symbol) return; // Don't fetch empty input
    setError("");

    try {
      const res = await fetch(`http://127.0.0.1:5050/stock-sync/${symbol}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } 
      
      else {
        // Add the new stock to the list
        setStocks(prev => [...prev, { symbol: data.symbol, price: data.price }]);
      }
      setSymbol(""); // clear input
    } catch (e) {
      setError("Failed to fetch stock");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Stock Price Tracker</h2>
      <input
        value={symbol}
        onChange={e => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., AAPL)"
        style={{ padding: "5px", width: "70%" }}
      />
      <button onClick={fetchPrice} style={{ padding: "5px 10px", marginLeft: "5px" }}>Add</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {stocks.map((stock, index) => (
          <li key={index}>
            {stock.symbol}: ${stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockFetcher;
