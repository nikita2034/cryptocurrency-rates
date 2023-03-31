import React,{useState,useEffect, useContext} from "react";
import CryptoCurrency from "../components/CryptoCurrency";
import { ItemContext } from "../App";
import Pagination from "../components/Pagination/index";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from 'axios'
function MainPage() {
  const {setPopularСurrencies}=useContext(ItemContext);
  const [data,setData]=useState([]);
  const [items,setItems]=useState<any[]>([]);
  const [currentPage,setCurrentPage]=useState<number>(1);

  const onChangePage = (number:number) => {
    setCurrentPage(number);
    console.log(number);
  };


  useEffect(()=>{
    axios
        .get(`https://api.coincap.io/v2/assets?offset=${currentPage-1}&limit=10`)
        .then((res) => {
          setData(res.data.data);      
          if(res.data.data[0].rank==1){
            setPopularСurrencies(res.data.data.slice(0,3));
          }
        
          setItems(
            res.data.data.map((item:{name:string,
            symbol:string,
            supply:string,
            marketCapUsd:string,
            volumeUsd24Hr:string,
            priceUsd:string,
            changePercent24Hr:string,
            vwap24Hr:string})=>{ 
          return(
            <CryptoCurrency  item={item} name={item.name} symbol={item.symbol} supply={item.supply} marketCapUsd={item.marketCapUsd} volumeUsd24Hr={item.volumeUsd24Hr} priceUsd={item.priceUsd} changePercent24Hr={item.changePercent24Hr}/>
        )
         }
         )
       );
        })
       
  },[currentPage])

 
  return (
    <>
  <Container className='block'> 
  <Row className='block__container'>
    <Col className="block__col-name">Name</Col>
    <Col className="block__col-price">Price</Col>
    <Col className="block__col-marketcap">Market Cap</Col>
    <Col className="block__col-supply">Supply</Col>
    <Col className="block__col-volume">Volume(24Hr)</Col>
    <Col>Change(24Hr)</Col>
    <Col></Col>
    <Col ></Col>
    
  </Row> 
   <ul>{items}</ul>
   
</Container>
<div className="block__pagination"><Pagination currentPage={currentPage} onChangePage={onChangePage} /></div>
</>
  );
}
export default MainPage;
