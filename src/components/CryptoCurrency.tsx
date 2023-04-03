import React, { useState, useContext } from "react";
import CryptoCurrencyBlock from "./CryptoCurrencyBlock";
import { ItemContext } from "../App";
function CryptoCurrency({
  item,
  name,
  symbol,
  supply,
  marketCapUsd,
  volumeUsd24Hr,
  priceUsd,
  changePercent24Hr,
}: {
  item: object;
  name: string;
  symbol: string;
  supply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
}) {
  const {
    portfolioOfCurrencies,
    setPortfolioOfCurrencies,
    lineAdjustment,
  }= useContext(ItemContext);

  const [AmountOfCurrency, setAmountOfCurrency] = useState<number>(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  let price: string = priceUsd.slice(0, priceUsd.indexOf(".") + 3);
  let marketCap: string = marketCapUsd.slice(0, marketCapUsd.indexOf(".") + 3);
  let suppl: string = supply.slice(0, supply.indexOf(".") + 3);
  let volumeUsd: string = volumeUsd24Hr.slice(
    0,
    volumeUsd24Hr.indexOf(".") + 3
  );
  let changePercent: string = changePercent24Hr.slice(
    0,
    changePercent24Hr.indexOf(".") + 3
  );
  if (!localStorage.getItem("portfolio")) {
    localStorage.setItem("portfolio", JSON.stringify([]));
  }

  lineAdjustment(marketCap);

  function onClickButton() {
    if (AmountOfCurrency !== 0) {
      setPortfolioOfCurrencies([
        ...portfolioOfCurrencies,
        { name, price, AmountOfCurrency },
      ]);
      let data:object[] = JSON.parse(localStorage.getItem("portfolio"));
      console.log(data);
      let array:[] = [];
      array = [...data, { name, price, AmountOfCurrency }];
      localStorage.setItem("portfolio", JSON.stringify(array));
    }
    setAmountOfCurrency(0);
    price = "0";
    handleClose();
  }

  return (
    <CryptoCurrencyBlock item={item} name={name} price={price} marketCap={marketCap} suppl={suppl} volumeUsd={volumeUsd} changePercent={changePercent} show={show} handleClose={handleClose} onClickButton={onClickButton} setAmountOfCurrency={ setAmountOfCurrency} AmountOfCurrency={AmountOfCurrency} handleShow={handleShow}/>
  );
}

export default CryptoCurrency;
