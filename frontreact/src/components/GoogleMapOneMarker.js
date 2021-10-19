import React from 'react';
import { withRouter } from 'react-router'
import Shoe from '../images/trail-running-shoe.svg';
import fetch from 'isomorphic-fetch';
import { compose, withProps, withHandlers } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';




class GoogleMapOneMarker extends React.PureComponent {
    componentWillMount() {
    }

    componentDidMount() {
    }



    render() {
        console.log(this.props.lat);

        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
            >

                <Marker
                    key={`${this.props.lat}${this.props.lng}`}
                    position={{ lat: this.props.lat, lng: this.props.lng }}
                    icon={{
                        url: Shoe,
                        scaledSize: new window.google.maps.Size(30, 30)
                    }}
                />


            </GoogleMap>
        )
    }
}

export default compose(withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB6LQ-qWuAuN2nV5wfxBW3jkVgBRppGKMY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
}),
    withScriptjs,
    withGoogleMap,
    withRouter
)(GoogleMapOneMarker);