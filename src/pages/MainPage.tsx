import React,{useState,useEffect, useContext} from "react";
import CryptoCurrency from "../components/CryptoCurrency";
import Pagination from "../components/Pagination/index";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from 'axios'
function MainPage() {

  const [data,setData]=useState([]);
  const [items,setItems]=useState<any[]>([]);
  const [currentPage,setCurrentPage]=useState<number>(0);

  const onChangePage = (number:number) => {
    setCurrentPage(number);
    console.log(number);
  };


  useEffect(()=>{
    axios
        .get(`https://api.coincap.io/v2/assets?offset=${currentPage}&limit=10`)
        .then((res) => {
          setData(res.data.data);
        });
  },[currentPage])

  useEffect(() => {//symbol,supply,marketCapUsd,volumeUsd24Hr,priceUsd,changePercent24Hr,vwap24Hr
    if(data.length!==0){
      setItems(
     data.map((item:{name:string,
      symbol:string,
      supply:string,
      marketCapUsd:string,
      volumeUsd24Hr:string,
      priceUsd:string,
      changePercent24Hr:string,
      vwap24Hr:string})=>{ 
      return(
        <CryptoCurrency  item={item} name={item.name} symbol={item.symbol} supply={item.supply} marketCapUsd={item.marketCapUsd} volumeUsd24Hr={item.volumeUsd24Hr} priceUsd={item.priceUsd} changePercent24Hr={item.changePercent24Hr} vwap24Hr={item.vwap24Hr}/>
    )
     })
   );
    }
   
  }, [data]);
  
  return (
    <>
  <Container className='block'> 
  <Row className='block__container'>
    <Col>Name</Col>
    <Col>Price</Col>
    <Col >Market Cap</Col>
    <Col >VWAP(24Hr)</Col>
    <Col >Supply</Col>
    <Col >Volume(24Hr)</Col>
    <Col >Change(24Hr)</Col>
  </Row> 
   <ul>{items}</ul>
   
</Container>
<div className="block__pagination"><Pagination currentPage={currentPage} onChangePage={onChangePage} /></div>
</>
  );
}
export default MainPage;
