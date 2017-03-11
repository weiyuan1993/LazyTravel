import React, { Component } from 'react';
import Map from './Map';
import SearchBox from './SearchBox';
import WhereToGo from './WhereToGo';
class MainView extends Component {

  render(){
    return(
      <div>
        <Map />
        <WhereToGo />
      </div>
    )
  }
}
export default MainView;
