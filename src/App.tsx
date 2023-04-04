import React, { useState,useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import CryptocurrencyPage from "./pages/CryptocurrencyPage";
import "./scss/app.scss";
import { createContext } from "react";

 interface Idata {
  item: object;
  setItem: ({}) => {};
  portfolioOfCurrencies: object[];
  popularСurrencies: object[];
  setPopularСurrencies: (popularСurrencies:[])=>void;
  setPortfolioOfCurrencies: (portfolioOfCurrencies:[]) =>void;
  lineAdjustment:(str: string) => string | undefined;
  API_URl:string;
}
export const ItemContext = createContext({ 
  item:{},
  setItem:({})=>{},
  portfolioOfCurrencies:[{}],
  setPortfolioOfCurrencies:([])=>[],
  popularСurrencies:[{}],
  setPopularСurrencies:([])=>[],
  lineAdjustment:(str)=>str,
  API_URl:'',
});

function App() {
  const [item, setItem] = useState<object>({});
  const [portfolioOfCurrencies, setPortfolioOfCurrencies] = useState<[]>([]);
  const [popularСurrencies, setPopularСurrencies] = useState<[]>([]);
  const API_URl:string = "https://api.coincap.io/v2/assets";

  function lineAdjustment(str: string){
    let str1: string;
    let str2: string;
    if (Number(str.length) > 12) {
      str1 = str.slice(0, str.indexOf(".") - 9) + ".";
      str2 = str.slice(str1.indexOf("."), str1.indexOf(".") + 2);
      return str1 + str2 + "b";
    }
    if (Number(str.length) == 12) {
      str1 = str.slice(0, str.indexOf(".") - 9) + "b";
      str2 = str.slice(str1.indexOf("b"), str1.indexOf("b") + 2);
      return str1 + str2;
    }
    if (Number(str.length) > 9) {
      str1 = str.slice(0, str.indexOf(".") - 6) + ".";
      str2 = str.slice(str1.indexOf("."), str1.indexOf(".") + 2);
      return str1 + str2 + "m";
    }
    if (Number(str.length) == 9) {
      str1 = str.slice(0, str.indexOf(".") - 6) + "m";
      str2 = str.slice(str1.indexOf("m"), str1.indexOf("m") + 2);
      return str1 + str2;
    }
  }

  return (
    <div className="wrapper">
      <ItemContext.Provider
        value={{
          item,
          setItem,
          portfolioOfCurrencies,
          setPortfolioOfCurrencies,
          popularСurrencies,
          setPopularСurrencies,
          lineAdjustment,
          API_URl,
        }}
      >
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cryptocurrency" element={<CryptocurrencyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ItemContext.Provider>
    </div>
  );
}

export default App;
