import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link,browserHistory } from 'react-router';
import { action_userData } from '../actions/user';

function mapStateToProps(state){
  return{
    placeData:state.placeReducer.placeData,
    userData:state.userReducer.userData
  }
}

class MyTrip extends Component {
  constructor(props){
    super(props);
    this.state={trips:'目前還沒有規劃行程哦!點擊右上角新增來安排假期吧'};
    if(this.props.userData==null){
      console.log("123");
       window.location="/";
    }
  }
  render(){
    const {userData} = this.props;
    if(userData!==null&&userData.plans.length!==0){
      var plans = userData.plans.map(function(plan){
        return(
          <div key={plan.planName} className="col-md-4">
            <div  style={{marginTop:'60px'}}>
              <div className="content-box" style={{backgroundColor:"white",textAlign:"center"}}>
                <h3 className="content-box-header bg-primary" style={{padding:"5px"}}>
                  {plan.planName}
                </h3>
                <div className="header-buttons">
                  <Link to="/UserPage/NewTrip" className="btn btn-sm btn-default no-border" title="">修改<div className="ripple-wrapper"></div></Link>
                </div>
                <div className="content-box-wrapper">
                  <b>地點:{plan.destination}</b>
                </div>
              </div>
            </div>
          </div>
        );
      })
    }






    return(
      <div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4" style={{marginTop:'60px'}}>
            <Link to="/UserPage/NewTrip" type="button" className="btn btn-info btn-lg btn-block">新增行程<div className="ripple-wrapper"></div></Link>
          </div>
        </div>
        {userData==null && userData.plans.length==0?
          <div>
            <div className="col-md-4"></div>
            <div className="col-md-4 col-xs-12" style={{marginTop:'60px'}}>
              <div className="content-box">
                <h3 className="content-box-header bg-primary">
                  我的行程
                </h3>
                <div className="header-buttons">
                  <Link to="/UserPage/NewTrip" className="btn btn-sm btn-default no-border" title="">新增<div className="ripple-wrapper"></div></Link>
                </div>
                <div className="content-box-wrapper">
                  <b>{this.state.trips}</b>
                </div>
              </div>
            </div>
          </div>
        :
          <div>{plans}</div>
        }
      </div>

    )
  }
}
export default connect(mapStateToProps,{action_userData})(MyTrip);
