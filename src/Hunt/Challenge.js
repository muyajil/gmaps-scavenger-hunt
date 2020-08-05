import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Challenge extends React.Component {
  constructor(props) {
    super(props);
    this.checkPasswords = this.checkPasswords.bind(this);
    this.state = {};
  }

  static getInitialPasswordValues(numPasswords) {
    var passwords = new Array(numPasswords);
    for (let idx = 0; idx < numPasswords; idx++) {
      passwords[idx] = "";
    }
    return passwords;
  }

  static getInitialValidationValues(numPasswords) {
    var validations = new Array(numPasswords);
    for (let idx = 0; idx < numPasswords; idx++) {
      validations[idx] = false;
    }
    return validations;
  }

  getChallengeHeader() {
    return <h3>{this.props.stageData.header}</h3>;
  }

  getChallengeParagraphs() {
    var paragraphs = new Array(this.props.stageData.paragraphs.length);
    for (let idx = 0; idx < paragraphs.length; idx++) {
      paragraphs[idx] = <p key={idx}>{this.props.stageData.paragraphs[idx]}</p>;
    }
    return paragraphs;
  }

  static getDerivedStateFromProps(props, state) {
    if (!state || props.stageData.stage !== state.stage) {
      const passwords = Challenge.getInitialPasswordValues(
        props.stageData.passwords.length
      );
      const passwordValidations = Challenge.getInitialValidationValues(
        props.stageData.passwords.length
      );
      return {
        passwords: passwords,
        passwordValidations: passwordValidations,
        passwordsValidated: false,
        stage: props.stageData.stage,
      };
    }
    return null;
  }

  getChallengePasswordFields() {
    var passwordFields = new Array(this.props.stageData.passwords.length);
    for (let idx = 0; idx < passwordFields.length; idx++) {
      passwordFields[idx] = (
        <input
          className="mb-2"
          key={idx}
          style={{ display: "block" }}
          type="text"
          value={this.state.passwords[idx]}
          onChange={this.checkPasswords}
          id={"password-" + idx}
        ></input>
      );
    }
    return passwordFields;
  }

  checkPasswords(event) {
    const target = event.target;
    const idx = parseInt(target.id.split("-")[1], 10);
    const passwordValidations = this.state.passwordValidations;
    const passwords = this.state.passwords;
    passwords[idx] = target.value;
    passwordValidations[idx] =
      this.state.passwords[idx].toLowerCase() === this.props.stageData.passwords[idx].toLowerCase();
    this.setState({
      passwordValidations: passwordValidations,
      passwordsValidated: passwordValidations.every(Boolean),
      passwords: passwords,
    });
  }

  getNextStageButton() {
    if (this.state.passwordsValidated) {
      return <Button onClick={this.props.nextStage}>Next Stage!</Button>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <Container className="text-light mt-5 mb-5" fluid>
        <Row>
          <Col xs={12}>{this.getChallengeHeader()}</Col>
        </Row>
        <Row>
          <Col xs={12}>{this.getChallengeParagraphs()}</Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h4>Passwords:</h4>
            {this.getChallengePasswordFields()}
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="text-center">
            {this.getNextStageButton()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Challenge;
