import React, { Component } from 'react';
import Map from './Map';
import SearchBox from './SearchBox';
import WhereToGo from './WhereToGo';
import SearchResult from './SearchResult';
class MainView extends Component {
  render(){
    return(
      <div style={{padding:"10px"}}>
        <div className="col-md-7" style={{marginBottom:"10px"}}>
          <div className="row">
            <WhereToGo />
          </div>
          <div className="row">
            <SearchResult />
          </div>
        </div>
        <div className="col-md-5">
          <Map />
        </div>
      </div>
    )
  }
}
export default MainView;
