import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action_addPlan } from '../actions/index';

function mapStateToProps(state){
  return{
    searchingData:state.searchingDataReducer.searchingData,
    nextPage:state.searchingDataReducer.nextPage,
    pagination:state.searchingDataReducer.pagination,
    planData:state.planReducer.planData
  }
}

class SearchResult extends Component{
  moreResult(){
    this.props.pagination.nextPage();
    this.refs.resultDiv.scrollTop = 0;
  }
  onAddPlace(place){
    this.props.action_addPlan(place);

  }
  render(){
    const { searchingData ,nextPage,pagination} = this.props;
    if(searchingData.length!==0){
      var self = this;
      var displayResult = searchingData.map(function(result){
        return(
          <li key={result.id} className="list-group-item">
            <div className="video-list media">
              <div className="media-left">
                <a href="#" className="prettyphoto" rel="prettyPhoto[pp_gal]" title={result.name}>
                  {result.photos?
                    <img style={{width:"100px"}} className="searchPhotos" src={result.photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })}/>
                    :
                    <div style={{width:"100px"}}>無圖片</div>
                  }
                </a>
              </div>
              <div className="media-body">
                <a className="media-heading" href="#">
                  <h3>{result.name}</h3>
                </a>
                <h4>評分:{result.rating}</h4>
                <a href="#" className="btn btn-primary float-right tooltip-button"
                  onClick={()=>{self.onAddPlace(result)}}>
                  <i className="fa fa-plus"></i>
                </a>
                <a className="btn btn-alt btn-hover btn-default float-right" href={`http://www.google.com/#hl=zh-TW&source=hp&q=${result.name}`} target="_blank">
                  <span>搜尋</span>
                  <i className="glyph-icon icon-search"></i>
                </a>
              </div>
            </div>
          </li>
        );
      })
      return(
        <div ref="resultDiv" className="content-box" style={{height:"500px",overflow:"scroll"}}>
            {displayResult}
            {nextPage?
              <button id="moreResult" type="button" className="btn btn-primary btn-lg btn-block"
                onClick={()=>{this.moreResult();}}
                >
                更多結果<div className="ripple-wrapper"></div></button>
              :
              <div></div>
            }
        </div>
      );
    }else{
      return(
        <div></div>
      );
    }

  }
}
export default connect(mapStateToProps,{action_addPlan})(SearchResult);
