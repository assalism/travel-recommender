import React, {Component} from "react";
import GoogleMapReact from "google-map-react";
import Donut from "./Donut";
import googleMapStyle from "./style";

const DonutComponent = ({ scores }) => <Donut isMapChart={true} scores={scores} changeSize={true}/>;

let defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
  style: googleMapStyle
};
export default class Map extends Component {
  componentDidMount() {
    //placing the map based on user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        defaultProps.center.lat= position.coords.latitude;
        defaultProps.center.lng= position.coords.longitude;
      });
    } 
  }
  
  render() {
    return(
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyB_jF6J5Lty3lrOUcccds24qQTI6_7nB6o" }}
        defaultCenter={defaultProps.center}
        defaultZoom={5}
        options={{ zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true}}      >
        {this.props.countries.map((country,index) => <DonutComponent key={index} lat={country.latlng[0]} lng={country.latlng[1]} scores={country.scores}/>)}
      </GoogleMapReact>
    </div>
    );
  }
}