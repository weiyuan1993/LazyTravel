import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

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
      </div>
    )
  }
}
export default WhereToGo;
