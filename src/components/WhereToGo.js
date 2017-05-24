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
      planNote:'',
      startDate:'',
      endDate:''
    };
    if(this.props.userData==null){
       window.location="/";
    }
  }
  componentDidMount(){
    //loading autocomplete serach box
    console.log("收藏景點:  "+this.props.planData)
    var input = document.getElementById('where-to-go');
    var searchBox = new google.maps.places.SearchBox(input);
    if(this.props.planNoteData !== null){
      this.setState(
        {
          tripNameInput:this.props.planNoteData.tripName||'我的行程',
          whereInput:this.props.planNoteData.wherePlay||'',
          planNote:this.props.planNoteData.planNote,
          // startDate:this.props.planNoteData.startDate,
          // endDate:this.props.planNoteData.endDate
      });
      if(this.props.planNoteData.startDate){
        this.setState({startDate:this.props.planNoteData.startDate});
      }
      if(this.props.planNoteData.endDate){
        this.setState({endDate:this.props.planNoteData.endDate});
      }
    }
    document.querySelector(".dropdown-menu").onclick = function(e){
      e.stopPropagation();
    }
    // console.log(this.state.startDate);
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
        planNote:this.state.planNote,
        startDate:this.state.startDate,
        endDate:this.state.endDate
      })
    })
    browserHistory.push("/UserPage");
  }
  updatePlanNoteClick(tripId){
    fetch('/api/users/planNote/user/'+this.props.userData.userName+'/trip/'+tripId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user:this.props.userData.userName,
        tripName:this.state.tripNameInput,
        wherePlay:this.state.whereInput,
        planNote:this.state.planNote,
        startDate:this.state.startDate,
        endDate:this.state.endDate
      })
    })
    browserHistory.push("/UserPage");
  }
  deletePlanNoteClick(tripId){
    fetch('/api/users/planNote/user/'+this.props.userData.userName+'/trip/'+tripId, {
      method: 'DELETE'
    })
    browserHistory.push("/UserPage");
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
  onChangeStartDate(startDate){
    console.log(startDate);
    this.setState({startDate:startDate});
  }
  onChangeEndDate(endDate){
    console.log(endDate);
    this.setState({endDate:endDate});
  }

  render(){
    const { placeData ,planData,planNoteData } = this.props;
    var self = this;

    //推薦景點、美食顯示
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
                  <h3 style={{margin:"0"}}>{place.name}</h3>
                  <p>評價:{place.rating}</p>
                  <a href="#" className="btn btn-primary float-right tooltip-button"
                    onClick={()=>self.onAddPlace(place)}>
                    <i className="fa fa-plus"></i>
                  </a>
                  <a className="btn btn-alt btn-hover btn-default float-right" href={`http://www.google.com/#hl=zh-TW&source=hp&q=${place.name}`} target="_blank">
                    <span>搜尋</span>
                    <i className="fa fa-search"></i>
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
        <div className="content-box" style={{backgroundColor:"white",borderRadius:"5px"}}>
          <div>
            <p className="bg-primary" style={{fontSize:"24px",textAlign:"center",borderRadius:"5px"}}>
                {this.state.tripNameInput}
                <Link to="/UserPage" style={{float:"left",color:"white"}}>
                <i className="fa fa-arrow-left" style={{paddingLeft:"10px"}}></i></Link>
            </p>
         </div>
          <div className="content-box-wrapper" style={{padding: "0px 10px 10px 10px"}}>
            <div className="col-md-4" style={{padding:"0"}}>
              <p style={{fontSize:"20px"}}>
                <i className="fa fa-thumb-tack"></i>
                旅程名稱</p>
              <div className="input-group">
                <input className="form-control" placeholder="想個旅程名稱吧!" value={this.state.tripNameInput}
                  onChange={(e)=>{this.onTripNameChange(e.target.value)}}
                />
              </div>
            </div>
            <div className="col-md-4" style={{padding:"0"}}>
              <p style={{fontSize:"20px"}}>
                <i className="fa fa-map-marker"></i>
                去哪玩?</p>
              <div className="input-group">
                <input className="form-control" id="where-to-go" placeholder="想去哪玩?" value={this.state.whereInput}
                  onChange={(e)=>{this.onWhereInputChange(e.target.value)}} ref="whereInputRef"/>

              </div>
           </div>
           <div className="col-md-4" style={{padding:"0"}}>
             <p style={{fontSize:"20px"}}>
               <i className="fa fa-calendar"></i>
               日期</p>

                 <div className="dropdown" style={{display: "inline",marginRight:"15px"}} >
                   <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.state.startDate||<b>出發日期</b>}
                     <span className="caret" /></button>
                   <ul className="dropdown-menu">
                    <li>
                      <label>出發日期:</label>
                      <input onChange={(e)=>{this.onChangeStartDate(e.target.value)}} value={this.state.startDate} id="startDate" type="date" />
                    </li>
                   </ul>
                 </div>
                 <div className="dropdown" style={{display: "inline"}}>
                   <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{this.state.endDate||<b>回程日期</b>}
                     <span className="caret" /></button>
                   <ul className="dropdown-menu">
                    <li>
                      <label>回程日期:</label>
                      <input onChange={(e)=>{this.onChangeEndDate(e.target.value)}} value={this.state.endDate} id="endDate" type="date" />
                    </li>
                   </ul>
                 </div>


           </div>
           <div className="col-md-12" style={{padding:"0"}}>
             <p style={{fontSize:"20px",marginBottom:"5px",marginTop:"10px"}}>
               <i className="fa fa-sticky-note"></i>
               旅行摘要</p>
           </div>

                {planNoteData!==null?
                  <textarea value={this.state.planNote}
                    onChange={(e)=>{this.onPlanNoteChange(e.target.value)}}
                    style={{fontSize:"18px",height:"300px",overflow:"auto",width:"100%",resize:"none"}}>
                  </textarea>
                : <span></span>
                }
                <div className="btn-group" role="group">
                  <button onClick={()=>{this.savePlanNoteClick()}} className=" btn btn-primary">儲存</button>
                  <button onClick={()=>{this.updatePlanNoteClick(planNoteData._id)}} className=" btn btn-info">更新</button>
                  <button className=" btn btn-danger"
                    onClick={()=>{this.deletePlanNoteClick(planNoteData._id)}} >刪除行程</button>
                </div>
              <div style={{marginTop:"10px"}}>
                <SearchBox />
                <a onClick={()=>{this.suggestPlace()}} className= "btn btn-danger" style={{marginBottom: "10px",marginTop: "10px"}}>推薦景點</a>
                <a onClick={()=>{this.suggestFood()}} className="btn btn-success" style={{marginBottom: "10px",marginTop: "10px"}}>推薦美食</a>
                <div className="dropdown" style={{display: "inline"}} >
                  <button className="btn btn-info dropdown-toggle" type="button" data-toggle="dropdown">訂飯店
                    <span className="caret" /></button>
                  <ul className="dropdown-menu dropdown-menu-right">
                   <li>
                     <a target="_blank" className= "btn btn-primary" style={{backgroundColor:"#003580",height:"34px"}} href="https://www.booking.com/">
                       <img style={{ width: "150px",height: "25px"}} src="/img/booking.png" />
                     </a>
                   </li>
                   <li>
                     <a target="_blank" href="https://www.agoda.com/" className="btn btn-default" style={{marginBottom: "10px",marginTop: "10px",height:"34px"}}>
                      <img style={{ width: "89px",height: "25px"}} src="/img/agoda-logo.svg" />
                     </a>
                   </li>
                  </ul>
                </div>
              </div>




             <div id="suggestDiv" style={{maxHeight:"500px",overflow:"scroll",overflowX:"hidden"}}>
               {placeNames}
             </div>
             <input value={this.state.placeInput}
               onChange={(e)=>{this.onPlaceInputChange(e.target.value);}}
               id="pac-input" className="controls"
               type="text" placeholder="地圖搜尋"/>


          </div>


        </div>




      </div>
    )
  }
}
export default connect(mapStateToProps,{action_addPlan,action_addLocalPlan,action_deleteLocalPlan})(WhereToGo);
