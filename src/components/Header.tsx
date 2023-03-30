import React,{useState,useContext} from "react"
import { ItemContext } from "../App";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom"
import {BsBriefcase} from 'react-icons/bs';
import {AiOutlineCloseCircle} from 'react-icons/ai';
function Header() {
  const {portfolioOfCurrencies}=useContext(ItemContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let currencyPortfolio=portfolioOfCurrencies.map((item)=>{
    console.log(item);
    return(
    <li className="header__list"><div>{item.name}</div><div>{item.price}</div><div>{item.AmountOfCurrency}</div></li>
  )})
    return (<div className="header">
      <div className="container">
      <Modal show={show} onHide={handleClose} className="header__modal">
          <Modal.Title className="header__title">Cryptocurrency Portfolio</Modal.Title>
          <ul >
             {currencyPortfolio}
          </ul>
     
            <AiOutlineCloseCircle className="header__button" onClick={handleClose}/>

      </Modal>
        <Link to='/'>
        <div className="header__logo">
          <img width="58" src="./img/icon.png" alt="Pizza logo" />
          <div>
            <h1>Cryptocurrencies</h1>
          </div>
          <div className="header__popular_cryptocurrencies">
          <div className="header__name_cryptocurrency">Bitcoin</div>
          <div className="header__price_cryptocurrency">234234$</div>
          </div>
        </div>
        </Link>
        <div className="header__cart">
          <Button className="button button--cart" variant="primary" onClick={handleShow}>
            <span> 1213123₽ +23%</span>
            <div className="button__delimiter"></div>
            <BsBriefcase className="button__icon"/>

          </Button>
        </div>
      </div> 
     
    </div>)
  }
  export default Header