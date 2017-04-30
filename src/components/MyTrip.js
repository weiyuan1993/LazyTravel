import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link,browserHistory } from 'react-router';
import { action_userData } from '../actions/user';
import { action_getPlanNote } from '../actions/index';

function mapStateToProps(state){
  return{
    placeData:state.placeReducer.placeData,
    userData:state.userReducer.userData,
    planNoteData:state.planReducer.planNoteData,
  }
}

class MyTrip extends Component {
  constructor(props){
    super(props);
    this.state={trips:'目前還沒有規劃行程哦!點擊右上角新增來安排假期吧'};
    if(this.props.userData==null){
       window.location="/";
    }
  }
  componentDidMount(){
    var self = this;
    fetch('/api/users/planNote/user/'+this.props.userData.userName, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(res){
      return res.json();
    }).then(function(data){
      console.log(data);
      self.setState({trips:data});
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  modifyPlan(tripName){
    var self = this;
    fetch('/api/users/planNote/user/'+this.props.userData.userName+'/trip/'+tripName, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(res){
      return res.json();
    }).then(function(data){
      console.log(data);
      self.props.action_getPlanNote(data);
      browserHistory.push("UserPage/NewTrip");
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  deletePlanNoteClick(tripName){
    fetch('/api/users/planNote/user/'+this.props.userData.userName+'/trip/'+tripName, {
      method: 'DELETE'
    })
    document.getElementById('trip._id').style.display = 'none';
  }
  render(){
    const {userData} = this.props;
    var self = this;
      if(typeof this.state.trips == "object"){
        var plans = this.state.trips.map(function(trip){
          return(
            <div key={trip._id} className="col-md-4">
              <div  style={{marginTop:'5px'}}>
                <div className="content-box" style={{backgroundColor:"white",textAlign:"center"}}>
                  <h3 className="content-box-header bg-primary" style={{padding:"5px"}}>
                    {trip.tripName}
                  </h3>
                  <div className="header-buttons">
                    <button onClick={()=>{self.modifyPlan(trip.tripName)}} className="btn btn-sm btn-default">修改</button>
                    <button onClick={()=>{self.deletePlanNoteClick(trip.tripName,trip._id)}} className="btn btn-sm btn-danger">刪除</button>
                  </div>
                  <div className="content-box-wrapper">
                    <b>地點:{trip.wherePlay}</b>
                    <pre style={{maxHeight:"200px",overflow:"auto"}}>行程內容:{trip.planNote}</pre>
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
          <div className="col-md-4" style={{marginTop:'5px'}}>
            <Link to="/UserPage/NewTrip" type="button" className="btn btn-info btn-lg btn-block">新增行程<div className="ripple-wrapper"></div></Link>
          </div>
        </div>

          <div>{plans}</div>

      </div>

    )
  }
}
export default connect(mapStateToProps,{action_userData,action_getPlanNote})(MyTrip);
