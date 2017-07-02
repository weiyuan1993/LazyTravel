import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action_addPlan } from '../actions/index';

function mapStateToProps(state){
  return{
    searchingData:state.searchingDataReducer.searchingData,
    nextPage:state.searchingDataReducer.nextPage,
    pagination:state.searchingDataReducer.pagination,
    planData:state.planReducer.planData,
    nowDay:state.planReducer.nowDay
  }
}

class SearchResult extends Component{
  moreResult(){
    this.props.pagination.nextPage();
    this.refs.resultDiv.scrollTop = 0;
  }
  onAddPlace(place){
    this.props.action_addPlan({place:place});
    fetch('/api/users/myLovePlace', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user:this.props.userData.userName,
        place:place
      })
    })
  }
  render(){
    const { searchingData ,nextPage,pagination} = this.props;
    if(searchingData.length!==0){
      var self = this;
      var displayResult = searchingData.map(function(result){
        return(
          <div key={result.id} className="suggest col-md-4 col-xs-6">
          <li  className="list-group-item"  style={{padding:"5px"}}>
            <div className="video-list media" style={{textAlign:"center"}}>

                <a href="#" className="prettyphoto" rel="prettyPhoto[pp_gal]" title={result.name}>
                  {result.photos?
                    <img style={{height:"150px"}} className="searchPhotos" src={result.photos[0].getUrl({ 'maxWidth': 300, 'maxHeight': 300 })}/>
                    :
                    <div style={{height:"150px"}}>無圖片</div>
                  }
                </a>

              <div className="media-body">
                  <h4 style={{margin:"0"}}>{result.name}</h4>
                  <p style={{color:"lightcoral"}}>評價:{result.rating}</p>
                  <p style={{color:"gray"}}>地址:{result.formatted_address}</p>
                <a href="#" className="btn btn-primary plus"
                  onClick={()=>{self.onAddPlace(result)}}>
                  <i className="fa fa-plus"></i>
                </a>
                <a  className="btn btn-alt btn-hover btn-default float-right" href={`http://www.google.com/#hl=zh-TW&source=hp&q=${result.name}`} target="_blank">
                  <span>搜尋</span>
                  <i className="glyph-icon icon-search"></i>
                </a>
              </div>
            </div>
          </li>
        </div>
        );
      })
    }
      return(
        // <div ref="resultDiv" className="content-box" style={{height:"500px",overflow:"scroll"}}>
        //     {displayResult}
        //     {nextPage?
        //       <button id="moreResult" type="button" className="btn btn-primary btn-lg btn-block"
        //         onClick={()=>{this.moreResult();}}
        //         >
        //         更多結果<div className="ripple-wrapper"></div></button>
        //       :
        //       <div></div>
        //     }
        //
        // </div>
        <div className="modal fade" id="myModal2" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                <h4 className="modal-title" id="myModalLabel2">搜尋結果</h4>
              </div>
              <div className="modal-body" id="resultDiv" ref="resultDiv" style={{maxHeight:"650px",overflow:"scroll",overflowX:"hidden",backgroundColor:"white"}}>
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
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      );
    // }else{
    //   return(
    //     <div className="modal fade" id="myModal2" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
    //       <div className="modal-dialog modal-lg" role="document">
    //         <div className="modal-content">
    //           <div className="modal-header">
    //             <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
    //             <h4 className="modal-title" id="myModalLabel2">搜尋結果</h4>
    //           </div>
    //           <div className="modal-body" style={{maxHeight:"650px",overflow:"scroll",overflowX:"hidden",backgroundColor:"white"}}>
    //             {displayResult}
    //           </div>
    //           <div className="modal-footer">
    //             <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

  }
}
export default connect(mapStateToProps,{action_addPlan})(SearchResult);
