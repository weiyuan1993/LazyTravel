import React, { Component } from 'react';
import Map from './Map';
import SearchBox from './SearchBox';
import WhereToGo from './WhereToGo';
import SearchResult from './SearchResult';
class MainView extends Component {
  render(){
    return(
      <div style={{marginTop:"70px"}}>
        <div className="col-md-6">
          <div className="row">
            <WhereToGo />
          </div>
          <div className="row">
            <SearchResult />
          </div>
        </div>
        <div className="col-md-6">
          <Map />
        </div>
      </div>
    )
  }
}
export default MainView;
