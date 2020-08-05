import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GMap from "../GoogleMap/GMap";
import Toast from "react-bootstrap/Toast";
import Spinner from "react-bootstrap/Spinner";
import distance from "gps-distance";
import throttle from "lodash.throttle";

class Map extends React.Component {
  constructor(props) {
    super(props);
    let geoAvailable = false;
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        this.handleGeoLocationChange,
        null,
        { enableHighAccuracy: true }
      );
      navigator.geolocation.watchPosition(this.handleGeoLocationChange, null, {
        enableHighAccuracy: true,
      });
      geoAvailable = true;
    }
    this.positionSettable = false;
    this.state = {
      geoAvailable: geoAvailable,
    };
  }

  componentDidMount() {
    this.positionSettable = true;
  }

  componentWillUnmount() {
    this.positionSettable = false;
  }

  handleGeoLocationChange = throttle((position) => {
    if (this.positionSettable) {
      const distanceKM = distance(
        position.coords.latitude,
        position.coords.longitude,
        this.props.stageData.destination.lat,
        this.props.stageData.destination.lng
      );
      if (distanceKM < 0.02) {
        this.props.targetFound();
      } else {
        this.setState({
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      }
    }
  }, 500);

  getGeoErrorToast() {
    return (
      <Toast>
        <Toast.Header>
          <strong className="mr-auto">GPS must be enabled.</strong>
        </Toast.Header>
      </Toast>
    );
  }

  getMap() {
    if (!this.state.currentLocation) {
      return <Spinner className="mx-auto" animation="border" variant="light" />;
    }
    return (
      <GMap
        letter={this.props.stageData.challenger}
        location={this.state.currentLocation}
        destination={this.props.stageData.destination}
      />
    );
  }

  getContent() {
    if (this.state.geoAvailable) {
      return this.getMap();
    } else {
      return this.getGeoErrorToast();
    }
  }

  render() {
    return (
      <Container className="mt-5" fluid>
        <Row>
          <Col xs={12}>{this.getContent()}</Col>
        </Row>
      </Container>
    );
  }
}

export default Map;
