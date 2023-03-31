import React, {useState, useContext } from 'react';
import { ItemContext } from '../App';
import { Link } from 'react-router-dom';
import LineChart from '../components/Chart';

function CryptocurrencyPage() {
 const {item,portfolioOfCurrencies}=useContext(ItemContext);
 const [AmountOfCurrency,setAmountOfCurrency]=useState<number>(0);

  let date=new Date();
  let day=date.getDate();
  let month=date.getMonth();
  let year=date.getFullYear();
  let nameMonth=['January','February','March','April ','May','June','July','Augus','September','October','November','December'];
    
  function onClickButton(){
    if(AmountOfCurrency!==0){
      setAmountOfCurrency(portfolioOfCurrencies.push({name:item.name,price:item.priceUsd,AmountOfCurrency}))
    }
    setAmountOfCurrency(0);
    // item.price='0';
  }

  return (
    <div className="crupto-currency">
       <div className="crupto-currency__block_left"><h2 className="content__title">
             {item.name}
            </h2>
            <span className='crupto-currency__date'>
             {day} {nameMonth[month]} {year}
            </span>
                <img src="./img/grafic.png"/>
                {/* <LineChart/> */}
            <Link to="/">
                  <button className="crupto-currency__button">Вернуться назад</button>
                </Link> </div> 
                <div  className="crupto-currency__block_right">
                  <div className="crupto-currency__addition_menu">
                    <label className='crupto-currency__header'>Add currency to portfolio</label>
                     <input className="crupto-currency__input" placeholder='amount of cryptocurrency' value={AmountOfCurrency} onChange={(event)=>setAmountOfCurrency(Number(event.target.value))}/>
                     <label className='block_currency__modal-label'>{item.priceUsd.slice(0,item.priceUsd.indexOf('.')+3)*AmountOfCurrency}$</label>
                     <button className="crupto-currency__button" onClick={()=>onClickButton()}>add to portfolio</button>  
                  </div>
            </div>
            </div>
  );
}

export default CryptocurrencyPage;