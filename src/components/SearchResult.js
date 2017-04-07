import React, { Component } from 'react';
import { connect } from 'react-redux';


function mapStateToProps(state){
  return{
    searchingData:state.searchingDataReducer.searchingData,
    nextPage:state.searchingDataReducer.nextPage,
    pagination:state.searchingDataReducer.pagination
  }
}

class SearchResult extends Component{
  moreResult(){
    this.props.pagination.nextPage();
  }
  render(){
    const { searchingData ,nextPage,pagination} = this.props;
    if(searchingData.length!==0){
      var displayResult = searchingData.map(function(result){
        return(
          <li key={result.id} className="list-group-item">
            <div className="video-list media">
              <div className="media-left">
                <a href="#" className="prettyphoto" rel="prettyPhoto[pp_gal]" title={result.name}>
                  {result.photos?
                    <img style={{width:"100px",height:"100px"}} className="searchPhotos" src={result.photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })}/>
                    :
                    <div>無圖片</div>
                  }
                </a>
              </div>
              <div className="media-body">
                <a className="media-heading" href="#">
                  <h3>{result.name}</h3>
                </a>
                <h4>評分:{result.rating}</h4>
              </div>
            </div>
          </li>
        );
      })
      return(
        <div className="content-box">
          <h2 className="content-box-header bg-default">
            <span style={{fontSize:"20px"}}>搜尋結果</span>
          </h2>
            {displayResult}
            {nextPage?
              <button type="button" className="btn btn-primary btn-lg btn-block"
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
export default connect(mapStateToProps)(SearchResult);
