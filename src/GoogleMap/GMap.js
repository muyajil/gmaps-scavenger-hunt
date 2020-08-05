/*jshint esversion: 6 */
/**
 * replace api key and call me like this
 * <GMap location={{lat: 46.9480, lng: 7.4474}} destination={{lat: 46.8914, lng: 7.4990}} letter='H' />
 */
import React from 'react';
import GoogleMapReact from 'google-map-react';

const GMap = (props) => {
  const { location, destination, letter } = props;

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "<MAPS_API_KEY>" }}
        center={location}
        defaultZoom={16}
      >
        <div style={destMarkerStyle} lat={destination.lat} lng={destination.lng}>{letter}</div>
        <img src={'data/avatar.png'} alt='Player avatar' style={locMarkerStyle} lat={location.lat} lng={location.lng} />
      </GoogleMapReact>
    </div>
  );
};

const locMarkerStyle = {
  width: '50px',
  height: '50px',
};

const destMarkerStyle = {
  fontFamily: 'pricedow',
  fontSize: '30px'
};

export default GMap;
