import React, { useState, useContext } from "react";
import { ItemContext } from "../App";
import { GiRank1 } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  {
    name: "A",
    c1: 3000,
  },
  {
    name: "B",
    c1: 2000,
  },
  {
    name: "C",
    c1: 1400,
  },
  {
    name: "D",
    c1: 3120,
  },
];

function CryptocurrencyPage() {
  const { item, portfolioOfCurrencies, setPortfolioOfCurrencies ,lineAdjustment} =
    useContext(ItemContext);
  const [AmountOfCurrency, setAmountOfCurrency] = useState<number>(0);

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let nameMonth = [
    "January",
    "February",
    "March",
    "April ",
    "May",
    "June",
    "July",
    "Augus",
    "September",
    "October",
    "November",
    "December",
  ];

  function onClickButton() {
    if (AmountOfCurrency !== 0) {
      setPortfolioOfCurrencies([
        ...portfolioOfCurrencies,
        { name: item.name, price: item.priceUsd, AmountOfCurrency },
      ]);
      let data = JSON.parse(localStorage.getItem("portfolio"));
      console.log(data);
      let array = [];
      array = [...data, { name: item.name, price: item.priceUsd, AmountOfCurrency }];
      localStorage.setItem("portfolio", JSON.stringify(array));
    }
    setAmountOfCurrency(0);
  }

  return (
    <div className="crupto-currency">
      <div className="crupto-currency__block_left">
        <div className="crupto-currency__headlines">
          <div>
            <GiRank1 className="crupto-currency__icon" />
            <div className="crupto-currency__icon__rank">{item.rank}</div>
            <div className="crupto-currency__icon__title">rank</div>
          </div>
          <div className="crupto-currency__title">
            <div> {item.name}</div>{" "}
            <div> {item.priceUsd.slice(0, item.priceUsd.indexOf(".") + 3)}</div>
          </div>
          <div className="crupto-currency__banner">
            <div>Market Cap</div>
            <div>
              {lineAdjustment(
                item.marketCapUsd.slice(0, item.marketCapUsd.indexOf(".") + 3)
              )}
            </div>
          </div>
          <div className="crupto-currency__banner">
            <div>Volume (24Hr)</div>{" "}
            <div>
              {lineAdjustment(
                item.volumeUsd24Hr.slice(0, item.volumeUsd24Hr.indexOf(".") + 3)
              )}
            </div>
          </div>
          <div className="crupto-currency__banner">
            <div>Supply</div>{" "}
            <div>
              {lineAdjustment(
                item.supply.slice(0, item.supply.indexOf(".") + 3)
              )}
            </div>
          </div>
        </div>
        <div className="crupto-currency__date">
          {day} {nameMonth[month]} {year}
        </div>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="c1"
            stroke="green"
            activeDot={{ r: 12 }}
          />
        </LineChart>
        <Link to="/">
          <button className="crupto-currency__button">Вернуться назад</button>
        </Link>{" "}
      </div>
      <div className="crupto-currency__block_right">
        <div className="crupto-currency__addition_menu">
          <label className="crupto-currency__header">
            Add currency to portfolio
          </label>
          <input
            className="crupto-currency__input"
            placeholder="amount of cryptocurrency"
            value={AmountOfCurrency}
            onChange={(event) =>
              setAmountOfCurrency(Number(event.target.value))
            }
          />
          <label className="block_currency__modal-label">
            {item.priceUsd.slice(0, item.priceUsd.indexOf(".") + 3) *
              AmountOfCurrency}
            $
          </label>
          <button
            className="crupto-currency__addition_menu__button"
            onClick={() => onClickButton()}
          >
            add to portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

export default CryptocurrencyPage;
