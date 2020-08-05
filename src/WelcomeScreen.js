import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

class WelcomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    fetch("data/backgroundParagraphs.json")
      .then((res) => res.json())
      .then((data) => this.setState({ paragraphs: data }));
  }

  getContent() {
    if (this.state.paragraphs) {
      var paragraphs = new Array(this.state.paragraphs.length);
      for (let idx = 0; idx < this.state.paragraphs.length; idx++) {
        paragraphs[idx] = <p key={idx}>{this.state.paragraphs[idx]}</p>;
      }
      return paragraphs;
    } else {
      return null;
    }
  }

  render() {
    return (
      <Container className="mb-5 mt-5" fluid>
        <Row>
          <Col>
            <Image src={"data/banner.png"} fluid />
          </Col>
        </Row>
        <Row className="text-light mt-5">
          <Col xs={12}>{this.getContent()}</Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button
              onClick={() =>
                (window.location.href = window.location.href + "hunt")
              }
            >
              Start your Mission!
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WelcomeScreen;
