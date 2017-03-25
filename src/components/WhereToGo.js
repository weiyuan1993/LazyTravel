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
    this.state = {
      whereInput:'',
      destination:'',
      tripNameInput:'為此趟旅行命名吧!',
      placeInput:''};
  }
  componentDidMount(){
    //loading autocomplete serach box
    var input = document.getElementById('where-to-go');
    var placeInput = document.getElementById('place-input');
    var searchBox = new google.maps.places.SearchBox(input);
    var placeSearchBox = new google.maps.places.SearchBox(placeInput);
  }
  searchClick(){
  this.setState({
    destination:this.refs.inputRef.value
  });
  localStorage.destination = this.refs.inputRef.value;
  }
  onTripNameChange(tripNameInput){
    this.setState({tripNameInput:tripNameInput});
    localStorage.tripName = this.state.tripNameInput;
  }
  onSearchInputChange(searchInput){
    this.setState({whereInput:searchInput});
  }
  onPlaceInputChange(placeInput){
    this.setState({placeInput:placeInput});
  }
  placeSearchClick(){
      var placeInput = document.getElementById('pac-input');
      google.maps.event.trigger(placeInput, 'focus')
      google.maps.event.trigger(placeInput, 'keydown', { keyCode: 13 });
  }
  suggestPlace(){
      var placeInput = document.getElementById('pac-input');
      placeInput.value=this.state.whereInput+" 景點";
      google.maps.event.trigger(placeInput, 'focus')
      google.maps.event.trigger(placeInput, 'keydown', { keyCode: 13 });
  }
  suggestFood(){
      var placeInput = document.getElementById('pac-input');
      placeInput.value=this.state.whereInput+" 美食";
      google.maps.event.trigger(placeInput, 'focus')
      google.maps.event.trigger(placeInput, 'keydown', { keyCode: 13 });
  }
  render(){
    const { placeData } = this.props;
    if(placeData.length!==0){
      var placeNames = placeData.map(function(place){
        return(
          <li key={place.id} className="list-group-item">
             <div className="video-list media">
              <div className="media-left">
                {place.photos?
                  <img src={place.photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })}/>
                  :
                  <div>無圖片</div>
                }

              </div>
              <div className="media-body">
                <div className="media-heading">
                  {place.name}
                  <p>評價:{place.rating}</p>
                  <a className="btn btn-alt btn-hover btn-info" href={`http://www.google.com/#hl=zh-TW&source=hp&q=${place.name}`} target="_blank">
                    <span>Google搜尋</span>
                    <i className="glyph-icon icon-arrow-right"></i>
                  </a>
                  <a className="btn btn-round btn-xs btn-primary" style={{float: "right"}}><i className="glyph-icon icon-plus"></i></a>
                 </div>
              </div>
            </div>

          </li>
        );
      });
    }
    var destination = localStorage.destination;

    return(
      <div>
        <div className="content-box">
          <h3 className="content-box-header bg-primary">
              <i className="glyph-icon icon-thumb-tack"></i>
              {this.state.tripNameInput}
          </h3>

          <div className="content-box-wrapper">
            <div className="col-md-6">
              <h4>旅程名稱</h4>
              <div className="input-group">
                <input className="form-control" placeholder="請輸入行程名稱" value={this.state.tripNameInput}
                  onChange={(e)=>{this.onTripNameChange(e.target.value)}}
                />
                {/* <span className="input-group-btn" >
                  <button className="btn btn-primary" type="button">確定<div className="ripple-wrapper"></div></button>
                </span> */}
              </div>
            </div>
            <div className="col-md-6">
              <h4>去哪玩?</h4>
              <div className="input-group">
                <input className="form-control" id="where-to-go" placeholder="想去哪玩?" value={this.state.whereInput}
                  onChange={(e)=>{this.onSearchInputChange(e.target.value)}} ref="inputRef"/>
                <span className="input-group-btn" >
                  <button className="btn btn-primary" type="button" onClick={()=>{this.searchClick();}}>確定<div className="ripple-wrapper"></div></button>
                </span>
              </div>
           </div>

            <h4>目的地:{this.state.destination}</h4>
            <h4>日期:</h4>
            <input type="date"/>~
            <input type="date"/>
            <h3>旅行摘要</h3>
            <h4>第一天</h4>
              <a className="btn btn-sm btn-default no-border" title="">新增天數<div className="ripple-wrapper"></div></a>
              <div className="input-group">
                <input id="place-input" className="form-control" value={this.state.placeInput}
                  onChange={(e)=>{this.onPlaceInputChange(e.target.value);}}
                  type="text" placeholder="搜尋景點、美食"/>
                    <span className="input-group-btn" >
                      <button className="btn btn-primary" type="button" onClick={()=>{this.placeSearchClick();}}>確定<div className="ripple-wrapper"></div></button>
                    </span>
              </div>
              <button onClick={()=>{this.suggestPlace()}} className="btn btn-sm btn-primary">推薦景點</button>
              <button onClick={()=>{this.suggestFood()}} className="btn btn-sm btn-success">推薦美食</button>
              {placeNames}
          </div>
          <input value={this.state.placeInput}
            onChange={(e)=>{this.onPlaceInputChange(e.target.value);}}
            id="pac-input" className="controls"
            type="text" placeholder="Search Box"/>
        </div>




      </div>
    )
  }
}
export default connect(mapStateToProps)(WhereToGo);
