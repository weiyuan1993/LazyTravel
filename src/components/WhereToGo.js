import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link,browserHistory } from 'react-router';
import SearchBox from './SearchBox';
import { action_addPlan,action_addLocalPlan,action_deleteLocalPlan } from '../actions/index';
function mapStateToProps(state){
  return{
    placeData:state.placeReducer.placeData,
    planData:state.planReducer.planData,
    localData:state.planReducer.localData,
    userData:state.userReducer.userData,
    planNoteData:state.planReducer.planNoteData
  }
}

class WhereToGo extends Component {
  constructor(props){
    super(props);
    this.state = {
      whereInput:'',
      tripNameInput:'我的行程',
      placeInput:'',
      planInput:'',
      planNote:''
    };
    if(this.props.userData==null){
       window.location="/";
    }
  }
  componentDidMount(){
    //loading autocomplete serach box
    var input = document.getElementById('where-to-go');
    var searchBox = new google.maps.places.SearchBox(input);
    if(this.props.planNoteData !== null){
      this.setState(
        {
          tripNameInput:this.props.planNoteData.tripName,
          whereInput:this.props.planNoteData.wherePlay
      });
    }

  }
  onTripNameChange(tripNameInput){
    this.setState({tripNameInput:tripNameInput});

  }
  onWhereInputChange(whereInput){
    this.setState({whereInput:whereInput});
  }
  onPlanNoteChange(planNoteInput){
    this.setState({planNote:planNoteInput});
  }
  onPlaceInputChange(placeInput){
    this.setState({placeInput:placeInput});
  }
  onPlanInputChange(planInput){
    this.setState({planInput:planInput});
  }
  placeSearchClick(){
      var placeInput = document.getElementById('pac-input');
      google.maps.event.trigger(placeInput, 'focus')
      google.maps.event.trigger(placeInput, 'keydown', { keyCode: 13 });
  }
  // savePlanClick(){
  //     localStorage.planInput = this.state.planInput;
  //     this.props.action_addPlan(this.state.planInput);
  // }
  savePlanNoteClick(){
    fetch('/api/users/planNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user:this.props.userData.userName,
        tripName:this.state.tripNameInput,
        wherePlay:this.state.whereInput,
        planNote:this.state.planNote
      })
    })
    browserHistory.push("UserPage");
  }
  updatePlanNoteClick(){
    fetch('/api/users/planNote/user/'+this.props.userData.userName+'/trip/'+this.state.tripNameInput, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user:this.props.userData.userName,
        tripName:this.state.tripNameInput,
        wherePlay:this.state.whereInput,
        planNote:this.state.planNote
      })
    })
  }
  deletePlanNoteClick(){
    fetch('/api/users/planNote/user/'+this.props.userData.userName+'/trip/'+this.state.tripNameInput, {
      method: 'DELETE'
    })
    browserHistory.push("UserPage");
  }
  suggestPlace(){

      var placeInput = document.getElementById('pac-input');
      if(!this.state.whereInput){
        placeInput.value="景點";
      }else{
        placeInput.value=this.state.whereInput+" 景點";
      }
      google.maps.event.trigger(placeInput, 'focus')
      google.maps.event.trigger(placeInput, 'keydown', { keyCode: 13 });
      document.getElementById('suggestDiv').style.display ="initial";
  }
  suggestFood(){
      var placeInput = document.getElementById('pac-input');
      if(!this.state.whereInput){
        placeInput.value="美食";
      }else{
        placeInput.value=this.state.whereInput+" 美食";
      }
      google.maps.event.trigger(placeInput, 'focus')
      google.maps.event.trigger(placeInput, 'keydown', { keyCode: 13 });
      document.getElementById('suggestDiv').style.display ="initial";
  }
  onAddPlace(place){
    this.props.action_addPlan(place);

    fetch('/api/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user:this.props.userData.userName,
        name:place.name,
        location:place.formatted_address,
        rating:place.rating,
        place_id:place.place_id
      })
    })

  }
  onRemoveClick(id){
    document.getElementById(id).style.display = 'none';

  }
  onRemovePlanClick(){
    this.props.action_deleteLocalPlan();
    fetch('/deleteAllPlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        users:[]
      })
    })
  }

  render(){
    const { placeData ,planData,planNoteData } = this.props;
    var self = this;
    if(placeData.length!==0){

      var placeNames = placeData.map(function(place){
        // document.getElementById('suggestDiv').style.display = "initial";
        return(
          <li key={place.id} className="list-group-item">
             <div className="video-list media">
              <div className="media-left">
                {place.photos?
                  <img style={{width:"100px"}} className="searchPhotos" src={place.photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })}/>
                  :
                  <div style={{width:"100px"}}>無圖片</div>
                }

              </div>
              <div className="media-body">
                <div className="media-heading">
                  {place.name}
                  <p>評價:{place.rating}</p>
                  <a href="#" className="btn btn-primary float-right tooltip-button"
                    onClick={()=>self.onAddPlace(place)}>
                    <i className="fa fa-plus"></i>
                  </a>
                  <a className="btn btn-alt btn-hover btn-default float-right" href={`http://www.google.com/#hl=zh-TW&source=hp&q=${place.name}`} target="_blank">
                    <span>搜尋</span>
                    <i className="glyph-icon icon-search"></i>
                  </a>
                 </div>
              </div>
            </div>

          </li>
        );
      });
    }
    return(
      <div>
        <div className="content-box" style={{backgroundColor:"white"}}>
          <h3 className="content-box-header bg-primary">
              <i className="glyph-icon icon-thumb-tack"></i>
              {this.state.tripNameInput}
          </h3>

          <div className="content-box-wrapper">
            <div className="col-md-6" style={{padding:"0"}}>
              <h3>旅程名稱</h3>
              <div className="input-group">
                <input className="form-control" placeholder="想個旅程名稱吧!" value={this.state.tripNameInput}
                  onChange={(e)=>{this.onTripNameChange(e.target.value)}}
                />
                {/* <span className="input-group-btn" >
                  <button className="btn btn-primary" type="button">確定<div className="ripple-wrapper"></div></button>
                </span> */}
              </div>
            </div>
            <div className="col-md-6" style={{padding:"0"}}>
              <h3>去哪玩?</h3>
              <div className="input-group">
                <input className="form-control" id="where-to-go" placeholder="想去哪玩?" value={this.state.whereInput}
                  onChange={(e)=>{this.onWhereInputChange(e.target.value)}} ref="whereInputRef"/>

              </div>
           </div>

              <h3>旅行摘要</h3>

                {planNoteData!==null?
                  <pre>{planNoteData.planNote}</pre>
                : <span></span>
                }

              <div className="input-group">
                  <textarea onChange={(e)=>{this.onPlanNoteChange(e.target.value)}}
                    value={this.state.planNote} className="form-control custom-control" rows="5" style={{resize:"none"}}></textarea>
                  <span onClick={()=>{this.savePlanNoteClick()}} className="input-group-addon btn btn-primary">儲存</span>
                  <span onClick={()=>{this.updatePlanNoteClick()}} className="input-group-addon btn btn-info">更新</span>
                  <a className="input-group-addon btn btn-sm btn-danger"
                    onClick={()=>{this.deletePlanNoteClick()}} >刪除行程</a>
              </div>
              <a onClick={()=>{this.suggestPlace()}} className= "btn btn-primary">推薦景點</a>
              <a onClick={()=>{this.suggestFood()}} className="btn btn-success">推薦美食</a>
              {/* <div className="scrollable-content scrollable-nice scrollable-medium" style={{height:"auto"}}>
                <ul className="todo-box todo-sort">
                  {plans}
                  {sPlans}
                </ul>
              </div> */}



            {/* <div className="input-group">
               <input className="form-control"
                 onChange={(e)=>{this.onPlanInputChange(e.target.value)}}
                 value={this.state.planInput}
                 placeholder="開始動手規劃!"/>
               <span className="input-group-btn" >
                 <button className="btn btn-primary" type="button" onClick={()=>{this.savePlanClick();}}>新增<div className="ripple-wrapper"></div></button>
               </span>
            </div> */}

             <SearchBox />

             <div id="suggestDiv" style={{maxHeight:"500px",overflow:"scroll",overflowX:"hidden"}}>
               {placeNames}
             </div>
             <input value={this.state.placeInput}
               onChange={(e)=>{this.onPlaceInputChange(e.target.value);}}
               id="pac-input" className="controls"
               type="text" placeholder="地圖搜尋"/>
              {/* <div className="input-group">
                <input id="place-input" className="form-control" value={this.state.placeInput}
                  onChange={(e)=>{this.onPlaceInputChange(e.target.value);}}
                  type="text" placeholder="搜尋景點、美食"/>
                    <span className="input-group-btn" >
                      <button className="btn btn-primary" type="button" onClick={()=>{this.placeSearchClick();}}>確定<div className="ripple-wrapper"></div></button>
                    </span>
              </div> */}



          </div>


        </div>




      </div>
    )
  }
}
export default connect(mapStateToProps,{action_addPlan,action_addLocalPlan,action_deleteLocalPlan})(WhereToGo);
