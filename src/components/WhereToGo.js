import React, { Component } from 'react';


class WhereToGo extends Component {
  componentDidMount(){
    var input = document.getElementById('where-to-go');
    var searchBox = new google.maps.places.SearchBox(input);
  }
  render(){
    return(
      <div>
        <input id="where-to-go" placeholder="想去哪玩?"/>
      </div>
    )
  }
}
export default WhereToGo;
