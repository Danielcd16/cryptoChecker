import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../Routes/Styles/CoinInfo.css";
import Background from "../Images/background.jpg";

export const CoinInfo = () => {
  let { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    console.log(id);
    Axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then(
      (response) => {
        setCoin(response.data);
      }
    );
  }, []);

  if (coin) {
    return (
      <div
        className="coinInfo-Container"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="coinInfo-Info">
          <h1>{coin.name}</h1>
          <img
            src={coin.image.large}
            alt="Coin Icon"
            className="coinInfo-Icon"
          />
          <div className="coinInfo-Data">
            <div className="coinInfo-Row">
              <h3 className="coinInfo-RowHeader">Symbol:</h3>
              <h3 className="coinInfo-RowData">{coin.symbol}</h3>
            </div>

            <div className="coinInfo-Row">
              <h3 className="coinInfo-RowHeader">Current Price:</h3>
              <h3 className="coinInfo-RowData">
                $ {coin.market_data.current_price.usd.toLocaleString()}
              </h3>
            </div>

            <div className="coinInfo-Row">
              <h3 className="coinInfo-RowHeader">Market Cap:</h3>
              <h3 className="coinInfo-RowData">
                $ {coin.market_data.market_cap.usd.toLocaleString()}
              </h3>
            </div>

            <div className="coinInfo-Row">
              <h3 className="coinInfo-RowHeader">Total Volume:</h3>
              <h3 className="coinInfo-RowData">
                $ {coin.market_data.total_volume.usd.toLocaleString()}
              </h3>
            </div>

            <div className="coinInfo-Row">
              <h3 className="coinInfo-RowHeader">24hr High:</h3>
              <h3 className="coinInfo-RowData green">
                $ {coin.market_data.high_24h.usd.toLocaleString()}
              </h3>
            </div>

            <div className="coinInfo-Row">
              <h3 className="coinInfo-RowHeader">24hr Low:</h3>
              <h3 className="coinInfo-RowData red">
                $ {coin.market_data.low_24h.usd.toLocaleString()}
              </h3>
            </div>
          </div>
          <Link to="/">
            <div className="coinInfo-RouteButton">Go back</div>
          </Link>
        </div>
      </div>
    );
  } else {
    return null; 
  }
};
