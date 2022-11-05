import "../App.css";
import Axios from "axios";
import { Coin } from "../components/Coin";
import { useEffect, useState } from "react";
import Refresh from "../Images/refresh.png";

export const Main = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshPage();
  }, []);

  const filteredCoins = cryptoList.filter(
    (coin) => coin.name.toLowerCase().includes(searchWord.toLowerCase()) // se ponen ambos en minuscula para que no sea sensible a mayusculas al filtrar
  );

  const refreshPage = () => {
    setIsLoading(true);
    Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    ).then((response) => {
      setIsLoading(false);
      setCryptoList(response.data);
    });
  };

  return (
    <div className="App">
      <div className="headerContainer">
        <h1>Crypto Checker</h1>
        <div className="buttonContainer">
          <input
            type="text"
            placeholder="SEARCH FOR A COIN"
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <img onClick={refreshPage} src={Refresh} alt="Refresh"></img>
        </div>
      </div>

      <div className="coinContainer">
        {isLoading && <h1 className="loadingMssg">Loading...</h1>}
        {filteredCoins.map((coins) => {
          return (
            <Coin
              id={coins.id}
              icon={coins.image}
              coinName={coins.name}
              coinSymbol={coins.symbol}
              price={coins.current_price}
              marketCap={coins.market_cap}
              priceChange={coins.price_change_percentage_24h}
            />
          );
        })}
      </div>
    </div>
  );
};
