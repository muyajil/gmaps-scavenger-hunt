import React from "react";
import Challenge from "./Challenge";
import Map from "./Map";

class Hunt extends React.Component {
  constructor(props) {
    super(props);

    // TODO: if stage is specified in url query use this state as initial state

    this.state = {
      currentStage: 0,
      targetFound: false
    }

    this.nextStage = this.nextStage.bind(this);
    this.targetFound = this.targetFound.bind(this);

    fetch('data/challenges.json')
    .then((res) => res.json())
    .then((data) => this.setState({challenges: data}))
  }

  nextStage(){
    this.setState({
      currentStage: this.state.currentStage + 1,
      targetFound: false,
    })
  }

  getStageData(stage){
    if (this.state.challenges){
      return {
        paragraphs: this.state.challenges[stage].challengeParagraphs,
        header: this.state.challenges[stage].challengeHeader,
        passwords: this.state.challenges[stage].challengePasswords,
        destination: {
          lat: this.state.challenges[stage].lat,
          lng: this.state.challenges[stage].long,
        },
        challenger: this.state.challenges[stage].challenger,
        stage: stage
      };
    } else {
      return null;
    }
  }

  targetFound(){
    this.setState({
      targetFound: true
    })
  }

  getContent() {
    const stageData = this.getStageData(this.state.currentStage);
    if (stageData){
      if (this.state.targetFound) {
        return (
          <Challenge stageData={stageData} nextStage={this.nextStage} />
        );
      } else {
        return (
          <Map stageData={stageData} targetFound={this.targetFound} />
        );
      }
    } else {
      return null;
    }
  }

  render() {
    if (this.state.challenges && this.state.currentStage === this.state.challenges.length) {
      if (typeof window !== "undefined") {
        window.location.href = "<SUCCESS_REDIRECT_URL>";
      }
    } else {
      return this.getContent();
    }
  }
}

export default Hunt;
