import React, { useState } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import Shoe from '../images/trail-running-shoe.svg';
const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");



const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB6LQ-qWuAuN2nV5wfxBW3jkVgBRppGKMY&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            //console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            //console.log(clickedMarkers)
        },
        //  onMarkerClick: () => (marker) => {
        //alert(marker)
        //let history = useHistory()
        //history.push(`/${marker}`)

        // }
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: 13.7563309, lng: 100.5017651 }}
        defaultOptions={{
            mapTypeControl: false,
            streetViewControl: false
        }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.filter(marker => {
                if (marker.latitude == null || marker.longtitude == null) {
                    return false
                }
                return true
            }
            ).map(marker => (
                <Marker
                    key={marker.eventId}
                    position={{ lat: marker.latitude, lng: marker.longtitude }}
                    onClick={e => props.onMarkerClick(marker.eventId)}
                // icon={{
                //     url: Shoe,
                //     scaledSize: new window.google.maps.Size(30, 30)
                // }}
                />
            ))}

        </MarkerClusterer>
    </GoogleMap>
);

// class GoogleMapCluster extends React.PureComponent {
//     // componentWillMount() {
//     //     this.setState({ markers: [] })
//     // }
//     state = {
//         markers: this.props.events
//     }

//     onCLickCluster = () => {

//     }

//     componentDidUpdate() {
//         this.setState({ markers: this.props.events })
//     }

//     componentDidMount() {


//         // const url = [
//         //     // Length issue
//         //     `https://gist.githubusercontent.com`,
//         //     `/farrrr/dfda7dd7fccfec5474d3`,
//         //     `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
//         // ].join("")
//         // console.log(url)

//         // fetch(url)
//         //     .then(res => res.json())
//         //     .then(data => {
//         //         this.setState({ markers: data.photos });
//         //     });
//     }

//     render() {
//         console.log("event", this.props.event)
//         return (
//             <MapWithAMarkerClusterer markers={this.state.markers} onClickCluster={this.onClickCluster} />
//             // <MapWithAMarkerClusterer markers={this.props.events} onClickCluster={this.onClickCluster} />
//         )
//     }
// }




const GoogleMapCluster = (props) => {
    const [events, setEvents] = useState(props.events)

    let history = useHistory()
    let location = useLocation()
    const onMarkerClick = (marker) => {

        history.push({ pathname: `/event/${marker}`, state: { background: location } })

    }

    return (
        <MapWithAMarkerClusterer markers={events} onMarkerClick={onMarkerClick} />
    )


}



export default GoogleMapCluster

