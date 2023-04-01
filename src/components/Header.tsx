import React,{useState,useContext,useEffect} from "react"
import { ItemContext } from "../App";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom"
import {BsBriefcase} from 'react-icons/bs';
import {MdClear} from 'react-icons/md';
import {AiOutlineCloseCircle} from 'react-icons/ai';
function Header() {
  const {portfolioOfCurrencies,popularСurrencies,setPortfolioOfCurrencies}=useContext(ItemContext);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [currencyPortfolio, setCurrencyPortfolio] = useState<[]>([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=>{
    portfolioСompilation();
    portfolioValueCalculation();
    // localStorage.setItem('portfolio', portfolioOfCurrencies);
  },[portfolioOfCurrencies])

  function portfolioСompilation(){
    setCurrencyPortfolio(portfolioOfCurrencies.map((item,index)=>{
      return(
      <li key={index} className="header__list"><div>{item.name}</div><div>{item.AmountOfCurrency}</div><div>${item.price.slice(0,item.price.indexOf('.')+3)}</div><div><MdClear className="header__icon" onClick={()=>onDeleteCurrency(index)}/></div></li>
    )}))
  }

  function portfolioValueCalculation(){
    console.log(portfolioOfCurrencies);
    setPortfolioValue(0);
    let summa=0;
    portfolioOfCurrencies.forEach(item=> {
      summa+=item.price*item.AmountOfCurrency;
      setPortfolioValue(summa);
    });
  }

  function onDeleteCurrency(index){  
    setPortfolioOfCurrencies([...portfolioOfCurrencies.slice(0,index),...portfolioOfCurrencies.slice(index+1,portfolioOfCurrencies.lenght)]);
  }
  

  let threePopularCurrencies=popularСurrencies.map((item)=>{
    return(
    <div className="header__popular_cryptocurrencies">
      <div className="header__name_cryptocurrency">{item.name}</div>
      <div className="header__price_cryptocurrency">${item.priceUsd.slice(0,item.priceUsd.indexOf('.')+3)}</div>
    </div>
  )})


    return (<div className="header">
      <div className="container">
      <Modal show={show} onHide={handleClose} className="header__modal">
        <div className="header__modal-header">
          
            <Modal.Title className="header__title">Cryptocurrency Portfolio</Modal.Title>
          
             <AiOutlineCloseCircle className="header__icon" onClick={handleClose}/>
        </div>
        <div className="header__headlines"><div>currency</div><div>quantity</div><div>purchase price</div><div>price now</div><div>purchase costs</div><div>cost now</div><div></div></div>
          <ul >
             {currencyPortfolio}
          </ul>
      </Modal>
        <Link to='/'>
        <div className="header__logo">
          <img className="header__logo__img" width="60" src="./img/wallet.png" alt="Pizza logo" />
          <div>
            <h1 className="header__logo__h1">Cryptocurrencies</h1>
          </div>
          {threePopularCurrencies}
        </div>
        </Link>
        <div className="header__cart">
          <button className="button button--cart" variant="primary" onClick={handleShow}>
            <span> ${String(portfolioValue).slice(0,String(portfolioValue).indexOf('.')+3)}</span>
            <div className="button__delimiter"></div>
            <BsBriefcase className="button__icon"/>
          </button>
        </div>
      </div> 
     
    </div>)
  }
  export default Header