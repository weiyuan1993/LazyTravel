import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { connect } from 'react-redux';
import SearchBox from './SearchBox';
import { action_addPlan,action_addLocalPlan,action_deleteLocalPlan } from '../actions/index';
function mapStateToProps(state){
  return{
    placeData:state.placeReducer.placeData,
    planData:state.planReducer.planData,
    localData:state.planReducer.localData
  }
}

class WhereToGo extends Component {
  constructor(props){
    super(props);
    this.state = {
      whereInput:localStorage.whereInput,
      tripNameInput:localStorage.tripName,
      placeInput:'',
      planInput:'',
      storagePlans:''
    };
    //若本機有資料
    // if(typeof localStorage.plansArray !=='undefined'){
    //   this.props.action_addPlan(JSON.parse(localStorage.plansArray));
    // }

  }
  componentDidMount(){
    var self = this;
    fetch('/user.json')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json);
      self.setState({storagePlans:json.plans});
      self.props.action_addLocalPlan(json.plans);
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
    //loading autocomplete serach box
    var input = document.getElementById('where-to-go');
    // var placeInput = document.getElementById('place-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // var placeSearchBox = new google.maps.places.SearchBox(placeInput);

  }
  searchClick(){
    this.setState({
      whereInput:this.refs.whereInputRef.value
    });
    localStorage.whereInput = this.refs.whereInputRef.value;
  }
  onTripNameChange(tripNameInput){
    this.setState({tripNameInput:tripNameInput});
    localStorage.tripName = this.state.tripNameInput;
  }
  onWhereInputChange(searchInput){
    this.setState({whereInput:searchInput});
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
  savePlanClick(){
      localStorage.planInput = this.state.planInput;
      this.props.action_addPlan(this.state.planInput);
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

    fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan:place
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
    const { placeData ,planData } = this.props;
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
                    <i className="glyph-icon icon-plus"></i>
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
    var plans = planData.map(function(plan){

      if(typeof plan ==="object"){
        return(
          <li id={plan.id} key={plan.id} className="border-red">
            <div className="glyph-icon sort-handle icon-ellipsis-v" />
            <label htmlFor="sec-todo-1">{plan.name}</label>
            <span className="bs-label bg-red" title>必去</span>
            <a href="#" className="btn btn-xs btn-danger float-right" onClick={()=>{self.onRemoveClick(plan.id)}}>
              <i className="glyph-icon icon-remove" />
            </a>
          </li>
        )
      }else{
        return(
          <li key={plan} className="border-green">
            <div className="glyph-icon sort-handle icon-ellipsis-v" />
            <label htmlFor="sec-todo-1">{plan}</label>
            <span className="bs-label bg-green" title>想去</span>
            <a href="#" className="btn btn-xs btn-danger float-right" title>
              <i className="glyph-icon icon-remove" />
            </a>
          </li>
        )
      }
    })

      var sPlans = this.props.localData.map(function(splan){

          return(
            <li key={splan.id} className="border-red">
              <div className="glyph-icon sort-handle icon-ellipsis-v" />
              <label htmlFor="sec-todo-1">{splan.name}</label>
              <span className="bs-label bg-red" title>必去</span>
              <a href="#" className="btn btn-xs btn-danger float-right">
                <i className="glyph-icon icon-remove" />
              </a>
            </li>
          );
      });


    return(
      <div>
        <div className="content-box">
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
                <span className="input-group-btn" >
                  <button className="btn btn-primary" type="button" onClick={()=>{this.searchClick();}}>確定<div className="ripple-wrapper"></div></button>
                </span>
              </div>
           </div>

              <h3>旅行摘要</h3>
              <a className="btn btn-sm btn-yellow no-border" title="">新增天數<div className="ripple-wrapper"></div></a>
              <a className="btn btn-sm btn-danger no-border"
                onClick={()=>{this.onRemovePlanClick()}} >清空行程<div className="ripple-wrapper"></div></a>
              <h4>第一天</h4>
              <div className="scrollable-content scrollable-nice scrollable-medium" style={{height:"auto"}}>
                <ul className="todo-box todo-sort">
                  {plans}
                  {sPlans}
                </ul>
              </div>



            <div className="input-group">
               <input className="form-control"
                 onChange={(e)=>{this.onPlanInputChange(e.target.value)}}
                 value={this.state.planInput}
                 placeholder="開始動手規劃!"/>
               <span className="input-group-btn" >
                 <button className="btn btn-primary" type="button" onClick={()=>{this.savePlanClick();}}>新增<div className="ripple-wrapper"></div></button>
               </span>
            </div>
            <button onClick={()=>{this.suggestPlace()}} className="btn btn-sm btn-primary">推薦景點</button>
            <button onClick={()=>{this.suggestFood()}} className="btn btn-sm btn-success">推薦美食</button>
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
