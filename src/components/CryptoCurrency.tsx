import React, { useState, useContext } from "react";
import CryptoCurrencyBlock from "./CryptoCurrencyBlock";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { ItemContext } from "../App";
function CryptoCurrency({
  item,
  name,
  symbol,
  supply,
  marketCapUsd,
  volumeUsd24Hr,
  priceUsd,
  changePercent24Hr,
}: {
  item: object;
  name: string;
  symbol: string;
  supply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
}) {
  const {
    // setItem,
    portfolioOfCurrencies,
    setPortfolioOfCurrencies,
    lineAdjustment,
  } = useContext(ItemContext);

  const [AmountOfCurrency, setAmountOfCurrency] = useState<number>(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  let price: string = priceUsd.slice(0, priceUsd.indexOf(".") + 3);
  let marketCap: string = marketCapUsd.slice(0, marketCapUsd.indexOf(".") + 3);
  let suppl: string = supply.slice(0, supply.indexOf(".") + 3);
  let volumeUsd: string = volumeUsd24Hr.slice(
    0,
    volumeUsd24Hr.indexOf(".") + 3
  );
  let changePercent: string = changePercent24Hr.slice(
    0,
    changePercent24Hr.indexOf(".") + 3
  );
  if (!localStorage.getItem("portfolio")) {
    localStorage.setItem("portfolio", JSON.stringify([]));
  }

  lineAdjustment(marketCap);

  function onClickButton() {
    if (AmountOfCurrency !== 0) {
      setPortfolioOfCurrencies([
        ...portfolioOfCurrencies,
        { name, price, AmountOfCurrency },
      ]);
      let data = JSON.parse(localStorage.getItem("portfolio"));
      console.log(data);
      let array = [];
      array = [...data, { name, price, AmountOfCurrency }];
      localStorage.setItem("portfolio", JSON.stringify(array));
    }
    setAmountOfCurrency(0);
    price = "0";
    handleClose();
  }

  return (
    // <></>
    <CryptoCurrencyBlock item={item} name={name} price={price} marketCap={marketCap} suppl={suppl} volumeUsd={volumeUsd} changePercent={changePercent} show={show} handleClose={handleClose} onClickButton={onClickButton} setAmountOfCurrency={ setAmountOfCurrency} AmountOfCurrency={AmountOfCurrency} handleShow={handleShow}/>
    // <Container className="block_currency">
    //   <Row className="block_currency__container">
    //     <Link to="/cryptocurrency" onClick={() => setItem(item)}>
    //       <Col className="block_currency__col">
    //         <div className="block_currency__col__first-value">{name}</div>
    //       </Col>
    //     </Link>
    //     <Col className="block_currency__col">
    //       <div className="block_currency__col__value">${price}</div>
    //     </Col>
    //     <Col className="block_currency__col">
    //       <div className="block_currency__col__value">
    //         ${lineAdjustment(marketCap)}
    //       </div>
    //     </Col>
    //     <Col className="block_currency__col">
    //       <div className="block_currency__col__value">
    //         ${lineAdjustment(suppl)}
    //       </div>
    //     </Col>
    //     <Col className="block_currency__col">
    //       <div className="block_currency__col__value">
    //         ${lineAdjustment(volumeUsd)}
    //       </div>
    //     </Col>
    //     <Col className="block_currency__col">
    //       <div className="block_currency__col__value">{changePercent}</div>
    //     </Col>
    //     <Col className="block_currency__col">
    //       {" "}
    //       <VscDiffAdded
    //         onClick={handleShow}
    //         className="block_currency__button"
    //       />
    //     </Col>
    //   </Row>
    //   <Modal show={show} onHide={handleClose} className="block_currency__modal">
    //     <div className="block_currency__modal-body">
    //       <div className="block_currency__modal-header">
    //         <div className="block_currency__modal-title">{name}</div>{" "}
    //         <AiOutlineCloseCircle
    //           className="block_currency__modal-icon"
    //           onClick={() => onClickButton()}
    //         />
    //       </div>

    //       <input
    //         className="block_currency__modal-input"
    //         placeholder="amount of currency"
    //         onChange={(event) =>
    //           setAmountOfCurrency(Number(event.target.value))
    //         }
    //       />
    //       <label className="block_currency__modal-label">
    //         {String(Number(price) * AmountOfCurrency).slice(
    //           0,
    //           price.indexOf(".") + 3
    //         )}
    //         $
    //       </label>
    //       <button
    //         className="block_currency__modal-button"
    //         onClick={() => onClickButton()}
    //       >
    //         add to portfolio
    //       </button>
    //     </div>
    //   </Modal>
    // </Container>
  );
}

export default CryptoCurrency;
