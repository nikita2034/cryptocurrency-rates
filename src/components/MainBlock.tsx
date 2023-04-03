import React from "react";
import Pagination from "../components/Pagination/index";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
function MainBlock({items}:{items:[]}){
    return (
        <Container className="block">
        <Row className="block__container">
          <Col className="block__col-name">Name</Col>
          <Col className="block__col-price">Price</Col>
          <Col className="block__col-marketcap">Market Cap</Col>
          <Col className="block__col-supply">Supply</Col>
          <Col className="block__col-volume">Volume(24Hr)</Col>
          <Col>Change(24Hr)</Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <ul>{items}</ul>
      </Container>
        )
}
export default MainBlock