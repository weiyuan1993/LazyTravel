import React, { Component } from 'react';
import Map from './Map';
import SearchBox from './SearchBox';
import WhereToGo from './WhereToGo';
class MainView extends Component {

  render(){
    return(
      <div style={{marginTop:"70px"}}>
        <div className="col-md-6">
          <Map />
        </div>
        <div className="col-md-6">
          <WhereToGo />
        </div>


      </div>
    )
  }
}
export default MainView;
