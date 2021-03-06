import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlaceData,saveMapData,savePosData } from "../actions/index";

function mapStateToProps(state){
  return{
    placeData:state.placeReducer.placeData
  }
}

class Map extends Component {
  constructor(props){
  super(props);
  this.initAutocomplete=this.initAutocomplete.bind(this);
}
  componentDidMount(){
    this.initAutocomplete();
    console.log("%c Google Map loading success!",'color: green');
  }
  processResults(results, status, pagination) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      return;
    } else {
        console.log(results,pagination);
      }
  }
  initAutocomplete() {
    var self = this;
    // 定位座標
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        self.props.savePosData(pos);
        map.setCenter(pos);
      })
    }
    var map = new google.maps.Map(this.refs.map, {
      center: {lat: 23.990906, lng: 121.603088},
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //儲存地圖資料到Reducer
    this.props.saveMapData(map);
    /////////////////////////////////////////// 測試文字搜尋
    // var hualien = new google.maps.LatLng(23.990906,121.603088);
    // var request = {
    //   location: hualien,
    //   radius: '500',
    //   query: 'restaurant'
    // };
    // function callback(results, status,pagination) {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     console.log(results,pagination);
    //   }
    // }
    // var service = new google.maps.places.PlacesService(map);
    // service.textSearch(request,callback);
  //////////////////////////////////////////////
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      self.props.getPlaceData(places);

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          // icon: place.photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35}),
          icon:icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    // [END region_getplaces]
 }

  render(){
    return(
      <div>
        <div id="map" ref="map"></div>
      </div>
    )
  }
}
export default connect(mapStateToProps,{getPlaceData,saveMapData,savePosData})(Map);
