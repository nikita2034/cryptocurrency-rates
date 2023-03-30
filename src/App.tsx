import React,{useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import CryptocurrencyPage from './pages/CryptocurrencyPage';
import './scss/app.scss';
import { createContext } from 'react';

  export const ItemContext=createContext({});

function App() {
  const [item,setItem]=useState<object>({});
  const [portfolioOfCurrencies,setPortfolioOfCurrencies]=useState<[]>([]);

  return (
    <div className="wrapper">
      <ItemContext.Provider value={{item,setItem,portfolioOfCurrencies,setPortfolioOfCurrencies}}>
        <Header/>
        <div >
          <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/cryptocurrency' element={<CryptocurrencyPage/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
        </ItemContext.Provider>
    </div>
  );
}

export default App;
