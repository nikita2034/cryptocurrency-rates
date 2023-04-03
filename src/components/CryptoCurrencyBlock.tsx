import React,{useContext} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { ItemContext } from "../App";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VscDiffAdded } from "react-icons/vsc";
import { Link } from "react-router-dom";

type Props = {item:object,name:string,price:string,marketCap:string,suppl:string,volumeUsd:string,changePercent:string,show:boolean,AmountOfCurrency:number,handleShow:()=>void,handleClose:()=>void,onClickButton:()=>void,setAmountOfCurrency:(number)=>void}

function CryptoCurrencyBlock({item,name,price,marketCap,suppl,volumeUsd,changePercent,show,handleShow,handleClose,onClickButton,setAmountOfCurrency,AmountOfCurrency}:Props){
    const {
        setItem,
        lineAdjustment,
      } = useContext(ItemContext);
      console.log(typeof(item));
    return (
        <Container className="block_currency">
      <Row className="block_currency__container">
        <Link to="/cryptocurrency" onClick={() => setItem(item)}>
          <Col className="block_currency__col">
            <div className="block_currency__col__first-value">{name}</div>
          </Col>
        </Link>
        <Col className="block_currency__col">
          <div className="block_currency__col__value">${price}</div>
        </Col>
        <Col className="block_currency__col">
          <div className="block_currency__col__value">
            ${lineAdjustment(marketCap)}
          </div>
        </Col>
        <Col className="block_currency__col">
          <div className="block_currency__col__value">
            ${lineAdjustment(suppl)}
          </div>
        </Col>
        <Col className="block_currency__col">
          <div className="block_currency__col__value">
            ${lineAdjustment(volumeUsd)}
          </div>
        </Col>
        <Col className="block_currency__col">
          <div className="block_currency__col__value">{changePercent}</div>
        </Col>
        <Col className="block_currency__col">
          {" "}
          <VscDiffAdded
            onClick={handleShow}
            className="block_currency__button"
          />
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} className="block_currency__modal">
        <div className="block_currency__modal-body">
          <div className="block_currency__modal-header">
            <div className="block_currency__modal-title">{name}</div>{" "}
            <AiOutlineCloseCircle
              className="block_currency__modal-icon"
              onClick={() => onClickButton()}
            />
          </div>

          <input
            className="block_currency__modal-input"
            placeholder="amount of currency"
            onChange={(event) =>
              setAmountOfCurrency(Number(event.target.value))
            }
          />
          <label className="block_currency__modal-label">
            {String(Number(price) * AmountOfCurrency).slice(
              0,
              price.indexOf(".") + 3
            )}
            $
          </label>
          <button
            className="block_currency__modal-button"
            onClick={() => onClickButton()}
          >
            add to portfolio
          </button>
        </div>
      </Modal>
    </Container>
    )
}
export default CryptoCurrencyBlock