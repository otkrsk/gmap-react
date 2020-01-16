import React, { Component } from 'react';

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

import Autocomplete from "react-google-autocomplete";

import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";

class Map extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      address: '',
			city: '',
			area: '',
			state: '',
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng
      }
    }
  }

  onMarkerDragEnd = ( event ) => {
    // console.log('event',event);
    console.log('lat',event.latLng.lat());
    console.log('lng',event.latLng.lng());
  }

  /**
  * When the user types an address in the search box
  * @param place
  */
  onPlaceSelected = ( place ) => {
    if(place.name !== undefined) {
      return;
    }

    console.log('place',place);
    console.log('place.name',place.name);
    // console.log('place.geometry',place.geometry.location);
    console.log('place.geometry.lat',place.geometry.location.lat());
    console.log('place.geometry.lng',place.geometry.location.lng());

    const latValue=place.geometry.location.lat(),
      lngValue=place.geometry.location.lng();

    // // Set these values in the state.
    this.setState({
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
  };

  render() {

    const gcp_key=process.env.REACT_APP_GCP_KEY;
    let map;

    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
            options={{
              streetViewControl: false,
              fullscreenControl: false,
              mapTypeControl: false
            }}
          >
						<Marker google={this.props.google}
              draggable={true}
              onDragEnd={ this.onMarkerDragEnd }
              position={{
                lat: this.state.markerPosition.lat,
                lng: this.state.markerPosition.lng
              }}
            />

            <Autocomplete
              style={{
                width: '100%',
                height: '40px',
                paddingLeft: '16px',
                marginTop: '2px',
                marginBottom: '500px'
              }}
              onPlaceSelected={ this.onPlaceSelected }
              types={[]}
              componentRestrictions={{country: "my"}}
            />

          </GoogleMap>
        )
      )
    );

    map = <div>

      <AsyncMap
        googleMapURL={gcp_key}

        loadingElement={
          <div style={{ height: `100%` }} />
        }
        containerElement={
          <div style={{ height: this.props.height }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />

    </div>


    return(map);

  }
}

export default Map;