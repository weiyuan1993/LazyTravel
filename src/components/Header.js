import React, { Component } from 'react';
import { Link ,browserHistory } from 'react-router';

export default class Header extends Component {
  logOut(){
    localStorage.clear('userName');
    localStorage.clear('password');
    browserHistory.push("/");
  }
  render() {
    return (
      <div>
        <div id="page-header" style={{textAlign:"center"}}>
          <Link onClick={()=>this.logOut()}>
            <i className="fa fa-bicycle"></i>
          </Link>
         <h1 style={{lineHeight:'60px',display:'inline' }}>LazyTravel</h1>
        </div>
      </div>
    );
  }
}
