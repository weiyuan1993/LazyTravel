import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { connect } from 'react-redux';

function mapStateToProps(state){
  return{
    placeData:state.placeData.placeData
  }
}

class WhereToGo extends Component {
  constructor(props){
    super(props);
    this.state = {whereInput:'',destination:''};
  }
  componentDidMount(){
    //loading autocomplete serach box
    var input = document.getElementById('where-to-go');
    var searchBox = new google.maps.places.SearchBox(input);
  }
  searchClick(){
  // var input = document.getElementById('where-to-go');
  // var searchBox = new google.maps.places.SearchBox(input);
  // var places = searchBox.getPlaces();
  // console.log(places);
  this.setState({destination:this.refs.inputRef.value});
  }
  onSearchInputChange(searchInput){
    this.setState({whereInput:searchInput});
  }
  render(){
    const { placeData } = this.props;
    if(placeData.length!==0){
      var placeNames = placeData.map(function(place){
        return(
          <li key={place.id}>{place.name}</li>
        );
      });
    }
    return(
      <div>
        <input id="where-to-go" placeholder="想去哪玩?" value={this.state.whereInput}
          onChange={(e)=>{this.onSearchInputChange(e.target.value)}} ref="inputRef"/>
        <button onClick={()=>{this.searchClick();}}>確定</button>

        <h3>我的行程</h3>
        <h4>目的地:{this.state.destination}</h4>
        <h4>日期:</h4>
        <input type="date"/>~
        <input type="date"/>
        <h5>推薦景點</h5>
        {placeNames}
      </div>
    )
  }
}
export default connect(mapStateToProps)(WhereToGo);
