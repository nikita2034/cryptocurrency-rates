import React,{useState,useContext} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {VscDiffAdded} from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { ItemContext } from '../App';
function CryptoCurrency({item,name,symbol,supply,marketCapUsd,volumeUsd24Hr,priceUsd,changePercent24Hr,vwap24Hr}) {
  const {setItem,portfolioOfCurrencies}=useContext(ItemContext);
  const [show, setShow] = useState(false);
  const [AmountOfCurrency,setAmountOfCurrency]=useState<number>(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let price:string=priceUsd.slice(0,priceUsd.indexOf('.')+3);
  let marketCap:string=marketCapUsd.slice(0,marketCapUsd.indexOf('.')+3);
  // let vwap:string=vwap24Hr.slice(0,vwap24Hr.indexOf('.')+3);
  let suppl:string=supply.slice(0,supply.indexOf('.')+3)


  function onClickButton(){
    if(AmountOfCurrency!==0){
       setAmountOfCurrency(portfolioOfCurrencies.push({name,price,AmountOfCurrency}))
    }
    handleClose();
  }

  return (
    <Container className='block_currency'>
     
    <Row className='block_currency__container'>
     <Link to='/cryptocurrency' onClick={()=>setItem(item)}><Col className='block_currency__col'>{name}</Col></Link> 
      <Col className='block_currency__col'>{price}</Col>
      <Col className='block_currency__col'>{marketCap}</Col>
      {/* <Col className='block_currency__col'>{vwap}</Col> */}
      <Col className='block_currency__col'>{suppl}</Col>
      {/* <Col className='block_currency__col'> {volumeUsd24Hr}</Col> */}
      {/* <Col className='block_currency__col'> {changePercent24Hr}</Col> */}
    <Col className='block_currency__col'> <VscDiffAdded onClick={handleShow} className="block_currency__button"/></Col>
      
    </Row>
    <Modal show={show} onHide={handleClose} className="block_currency__modal">
        <div className='block_currency__modal-body' >
          <div className="block_currency__modal-header">
              <div className="block_currency__modal-title">{name}</div>  <AiOutlineCloseCircle className="block_currency__modal-icon" onClick={handleClose}/>
          </div>
        
          <input  className='block_currency__modal-input' placeholder='amount of currency' onChange={(event)=>setAmountOfCurrency(Number(event.target.value))}/>
          <label className='block_currency__modal-label'>{Number(price)*AmountOfCurrency}$</label>
          <button className='block_currency__modal-button' onClick={()=>onClickButton()}>add to portfolio</button>
            </div>        
      </Modal>
  </Container>
  );
}

export default CryptoCurrency;
