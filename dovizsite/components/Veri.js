'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

const getTopTenCoins = (veri, toggleFavorite, favorites) => {
  const topTen = veri
    .sort((a, b) => b.market_cap_usd - a.market_cap_usd)
    .slice(0, 10);

  return topTen.map((coin) => (
    <div
      key={coin.id}
      className="p-4 bg-gray-800 rounded-lg shadow-md text-white flex flex-col justify-between"
      style={{ marginBottom: "1rem" }}
    >
      <div className="text-lg font-semibold mb-2">
        {coin.name} ({coin.symbol})
      </div>
      <div className="text-sm mb-2">Price: ${coin.price_usd}</div>
      <div
        className="text-sm mb-2"
        style={{ color: coin.percent_change_1h > 0 ? "forestgreen" : "crimson" }}
      >
        1h Change: {coin.percent_change_1h}%
      </div>
      <div
        className="text-sm"
        style={{ color: coin.percent_change_24h > 0 ? "forestgreen" : "crimson" }}
      >
        24h Change: {coin.percent_change_24h}%
      </div>
      <input
        type="checkbox"
        checked={favorites.includes(coin.id)}
        onChange={() => toggleFavorite(coin.id)}
        className="form-checkbox h-5 w-5 text-blue-500 mt-2"
      />
    </div>
  ));
};

export default function Section() {
  const [veri, setVeri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.coinlore.net/api/tickers/");
        setVeri(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filterData = (veri) =>
    veri.filter((coin) => coin.symbol.toLowerCase().includes(searchText.toLowerCase()));

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 bg-gray-900 text-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 pr-2">
        <div className="text-2xl mb-4 font-bold text-center">Coinler</div>
        <div className="flex justify-center mb-4">
          <span className="mr-2">Coin Ara:</span>
          <input
            className="bg-gray-700 text-white rounded px-4 py-2"
            placeholder="ara"
            value={searchText}
            onChange={handleSearch}
          />
          <i className="fa-solid fa-magnifying-glass text-gray-400 ml-2"></i>
        </div>
        <div className="overflow-x-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-blue-600">
              <tr>
                <th className="py-2">Sembol</th>
                <th className="text-left pl-2">Fiyat</th>
                <th className="py-2">1h %</th>
                <th className="py-2">24h %</th>
                <th className="py-2">Favori</th>
              </tr>
            </thead>
            <tbody>
              {filterData(veri).map((coin) => (
                <tr key={coin.id} className="hover:bg-gray-700">
                  <td className="py-2 text-center">{coin.symbol}</td>
                  <td className="py-2 text-left">{coin.price_usd}</td>
                  <td
                    style={{
                      color: coin.percent_change_1h > 0 ? "forestgreen" : "crimson",
                    }}
                    className="py-2 text-center"
                  >
                    {coin.percent_change_1h}
                  </td>
                  <td
                    style={{
                      color: coin.percent_change_24h > 0 ? "forestgreen" : "crimson",
                    }}
                    className="py-2 text-center"
                  >
                    {coin.percent_change_24h}
                  </td>
                  <td className="py-2 text-center">
                    <input
                      type="checkbox"
                      checked={favorites.includes(coin.id)}
                      onChange={() => toggleFavorite(coin.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full md:w-1/2 pl-2">
        <h2 className="text-2xl mb-4 font-bold text-center">Top 10 Coins</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {getTopTenCoins(veri, toggleFavorite, favorites)}
        </div>
      </div>
    </div>
  );
}
