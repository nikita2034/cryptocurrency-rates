import React, { useState, useEffect, useContext } from "react";
import CryptoCurrency from "../components/CryptoCurrency";
import MainBlock from "../components/MainBlock";
import { ItemContext } from "../App";
import Pagination from "../components/Pagination/index";
import axios from "axios";
import process from 'process'
function MainPage() {
  const { setPopularСurrencies,API_URl } = useContext(ItemContext);
  const [data, setData] = useState([]);
  const [items, setItems] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onChangePage = (number: number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    axios
      .get( 
        `${API_URl}?offset=${currentPage - 1}&limit=10`
      )
      .then((res) => {
        setData(res.data.data);
        if (res.data.data[0].rank == 1) {
          setPopularСurrencies(res.data.data.slice(0, 3));
        }

        setItems(
          res.data.data.map(
            (item: {
              name: string;
              symbol: string;
              supply: string;
              marketCapUsd: string;
              volumeUsd24Hr: string;
              priceUsd: string;
              changePercent24Hr: string;
              vwap24Hr: string;
            }) => {
              return (
                <CryptoCurrency
                  item={item}
                  name={item.name}
                  symbol={item.symbol}
                  supply={item.supply}
                  marketCapUsd={item.marketCapUsd}
                  volumeUsd24Hr={item.volumeUsd24Hr}
                  priceUsd={item.priceUsd}
                  changePercent24Hr={item.changePercent24Hr}
                />
              );
            }
          )
        );
      });
  }, [currentPage]);

  return (
    <>
  <MainBlock items={items}/>
      <div className="block__pagination">
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div> 
    </>
  );
}
export default MainPage;
