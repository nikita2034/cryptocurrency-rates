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
function CryptoCurrency({item,name,symbol,supply,marketCapUsd,volumeUsd24Hr,priceUsd,changePercent24Hr}) {
  const {setItem,portfolioOfCurrencies,setPortfolioOfCurrencies}=useContext(ItemContext);
  const [show, setShow] = useState(false);
  const [AmountOfCurrency,setAmountOfCurrency]=useState<number>(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let price:string=priceUsd.slice(0,priceUsd.indexOf('.')+3);
  let marketCap:string=marketCapUsd.slice(0,marketCapUsd.indexOf('.')+3);
  let suppl:string=supply.slice(0,supply.indexOf('.')+3);
  let volumeUsd:string=volumeUsd24Hr.slice(0,volumeUsd24Hr.indexOf('.')+3);
  let changePercent:string=changePercent24Hr.slice(0,changePercent24Hr.indexOf('.')+3);

  function lineAdjustment(str:string){
    let str1:string;
    let str2:string;
    if(Number(str.length)>12){
      str1=str.slice(0,str.indexOf('.')-9)+'.';
      str2=str.slice(str1.indexOf('.'),str1.indexOf('.')+2);
      return str1+str2+'b'

     }
     if(Number(str.length)==12){
      str1=str.slice(0,str.indexOf('.')-9)+'b';
      str2=str.slice(str1.indexOf('b'),str1.indexOf('b')+2);
      return str1+str2;
     }
    if(Number(str.length)>9){
      str1=str.slice(0,str.indexOf('.')-6)+'.';
      str2=str.slice(str1.indexOf('.'),str1.indexOf('.')+2);
      return str1+str2+'m';
     }
     if(Number(str.length)==9){
      str1=str.slice(0,str.indexOf('.')-6)+'m';
      str2=str.slice(str1.indexOf('m'),str1.indexOf('m')+2);
      return str1+str2;
     }
 
  }

  lineAdjustment(marketCap);

  function onClickButton(){
    if(AmountOfCurrency!==0){
      setPortfolioOfCurrencies([...portfolioOfCurrencies,{name,price,AmountOfCurrency}]);
    }
    setAmountOfCurrency(0);
    price='0';
    handleClose();
  }

  return (
    <Container className='block_currency'>
     
    <Row className='block_currency__container'>
     <Link to='/cryptocurrency' onClick={()=>setItem(item)}><Col className='block_currency__col'><div className='block_currency__col__first-value'>{name}</div></Col></Link> 
      <Col className='block_currency__col'><div className='block_currency__col__value'>${price}</div></Col>
      <Col className='block_currency__col'><div className='block_currency__col__value'>${lineAdjustment(marketCap)}</div></Col>
      <Col className='block_currency__col'><div className='block_currency__col__value'>${lineAdjustment(suppl)}</div></Col>
      <Col className='block_currency__col'><div className='block_currency__col__value'>${ lineAdjustment(volumeUsd)}</div></Col>
      <Col className='block_currency__col'><div className='block_currency__col__value'>{changePercent}</div></Col>
    <Col className='block_currency__col'> <VscDiffAdded onClick={handleShow} className="block_currency__button"/></Col>
      
    </Row>
    <Modal show={show} onHide={handleClose} className="block_currency__modal">
        <div className='block_currency__modal-body' >
          <div className="block_currency__modal-header">
              <div className="block_currency__modal-title">{name}</div>  <AiOutlineCloseCircle className="block_currency__modal-icon" onClick={()=>onClickButton()}/>
          </div>
        
          <input  className='block_currency__modal-input' placeholder='amount of currency' onChange={(event)=>setAmountOfCurrency(Number(event.target.value))}/>
          <label className='block_currency__modal-label'>{String(Number(price)*AmountOfCurrency).slice(0,price.indexOf('.')+3)}$</label>
          <button className='block_currency__modal-button' onClick={()=>onClickButton()}>add to portfolio</button>
            </div>        
      </Modal>
  </Container>
  );
}

export default CryptoCurrency;
