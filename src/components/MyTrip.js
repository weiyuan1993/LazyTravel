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
    this.fetchUserTrips();
  }
  fetchUserTrips(){
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
  modifyPlan(tripId){
    var self = this;
    fetch('/api/users/planNote/user/'+this.props.userData.userName+'/trip/'+tripId, {
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
  deletePlanNoteClick(tripId){
    fetch('/api/users/planNote/user/'+this.props.userData.userName+'/trip/'+tripId, {
      method: 'DELETE'
    })
    // document.getElementById('trip._id').style.display = 'none';
    this.fetchUserTrips();
  }
  render(){
    const {userData} = this.props;
    var self = this;
      if(typeof this.state.trips == "object"){
        var plans = this.state.trips.map(function(trip){
          return(
            <div key={trip._id} className="col-md-4">
              <div>
                <div className="content-box" style={{backgroundColor:"white",textAlign:"center",borderRadius: "5px"}}>
                  <h3 className="content-box-header bg-default" style={{padding:"10px 10px 0px 10px",borderRadius: "5px",marginTop:"5px"}}>
                    {trip.tripName}
                    <div style={{float:"right"}}>
                      <button onClick={()=>{self.modifyPlan(trip._id)}} className="btn btn-md btn-link">
                        <i style={{fontSize:"20px"}} className="fa fa-pencil"></i>
                        </button>
                    </div>
                    <div style={{float:"left"}}>
                      <button onClick={()=>{self.deletePlanNoteClick(trip._id)}} className="btn btn-md btn-link">
                        <i style={{fontSize:"20px",color:"red"}} className="fa fa-trash-o"></i>
                        </button>
                    </div>
                  </h3>
                  <div className="content-box-wrapper">
                    <b>地點:{trip.wherePlay}</b>
                    <pre style={{maxHeight:"200px",overflow:"auto",fontSize:"18px"}}>{trip.planNote}</pre>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      }
    return(
      <div style={{paddingBottom:"10px"}}>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4" style={{marginTop:'5px',paddingLeft:"15px",paddingEight:"15px",textAlign:"center"}}>
            <Link to="/UserPage/NewTrip" type="button"
             className="btn btn-info" style={{width:"90%",fontSize:"18px"}}><i className="fa fa-sticky-note-o" style={{marginRight:"5px"}}></i>新增行程</Link>
          </div>
        </div>

          <div>{plans}</div>

      </div>

    )
  }
}
export default connect(mapStateToProps,{action_userData,action_getPlanNote})(MyTrip);
