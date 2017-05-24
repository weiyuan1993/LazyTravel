import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action_searchingData,action_nextPage,action_pagination } from '../actions/index';
function mapStateToProps(state){
  return{
    map:state.mapReducer.mapData,
    pos:state.posReducer.posData,
    searchingData:state.searchingDataReducer.searchingData,
    nextPage:state.searchingDataReducer.nextPage,
    pagination:state.searchingDataReducer.pagination
  }
}
class SearchBox extends Component {
  constructor(props){
    super(props);
    this.state = { searchInput:'',pagination:'' };
  }
  componentDidMount(){
    var searchBoxDOM = document.getElementById('search-input');
    var searchBoxAuto = new google.maps.places.SearchBox(searchBoxDOM);

  }
  onSearchInputChange(input){
    this.setState({searchInput:input});

  }
  searchButtonClick(){
    document.getElementById('resultDiv').scrollTop = 0;
    var self = this;
    var request = {
      location: this.props.pos||{lat: 23.973875, lng: 120.982024},
      radius: '500',
      query: this.state.searchInput
    };
    function callback(results, status,pagination) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        self.props.action_searchingData(results);
        if (pagination.hasNextPage) {
          // self.refs.moreButton.className = "btn btn-default";
          document.getElementById('resultDiv').scrollTop = 0;
          self.props.action_nextPage(pagination.hasNextPage);
          self.props.action_pagination(pagination);
          self.setState({pagination:pagination});
          document.getElementById('moreResult').style.display = "initial";
          console.log(results,pagination);
        }else{
          // self.refs.moreButton.className = "btn btn-default disabled";
          document.getElementById('resultDiv').scrollTop = 0;
           document.getElementById('moreResult').style.display = "none";
        }
      }
    }
    var service = new google.maps.places.PlacesService(this.props.map);
    if(this.state.searchInput!==''){
      service.textSearch(request,callback);
    }else{
        this.setState({searchInput:"請輸入想搜尋的內容"});
    }

  }
  moreResult(){
    this.state.pagination.nextPage();
  }

  render(){

    return(
      <div className="input-group">
        <input id="search-input" className="form-control" value={this.state.searchInput}
          onChange={(e)=>{this.onSearchInputChange(e.target.value);}}
          type="text" placeholder="搜尋景點、美食"/>
            <span className="input-group-btn" >
              <button   data-toggle="modal" data-target="#myModal2" className="btn btn-primary" type="button" onClick={()=>{this.searchButtonClick();}}>
                搜尋<div className="ripple-wrapper"></div>
              </button>
            </span>
            {/* <span className="input-group-btn" >
              <button ref="moreButton" className="btn btn-default disabled" type="button" onClick={()=>{this.moreResult();}}>
                更多結果<div className="ripple-wrapper"></div>
              </button>
            </span> */}
      </div>
    )
  }
}
export default connect(mapStateToProps,{action_searchingData,action_nextPage,action_pagination})(SearchBox);
