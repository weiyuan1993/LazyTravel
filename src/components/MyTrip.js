import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function mapStateToProps(state){
  return{
    placeData:state.placeReducer.placeData
  }
}

class MyTrip extends Component {
  constructor(props){
    super(props);
    this.state={trips:'目前還沒有規劃行程哦!點擊右上角新增來安排假期吧',where:localStorage.whereInput}
  }
  render(){
    var trips = localStorage.tripName;
    return(
      <div>
      <div className="col-md-4"></div>
      <div className="col-md-4 col-xs-12" style={{marginTop:'70px'}}>
        <div className="content-box">
          <h3 className="content-box-header bg-primary">
            我的行程
          </h3>
          <div className="header-buttons">
            <Link to="/UserPage/NewTrip" className="btn btn-sm btn-default no-border" title="">新增<div className="ripple-wrapper"></div></Link>
          </div>
          <div className="content-box-wrapper">
            {trips?
              <div style={{display:"inline"}}>
                <p>行程:{trips}</p>
                <p>地點:{this.state.where}</p>
                <Link to="/UserPage/NewTrip" className="btn btn-sm btn-primary no-border" title="">
                修改<div className="ripple-wrapper"></div></Link></div>:
              <p>{this.state.trips}</p>

            }
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default connect(mapStateToProps)(MyTrip);
