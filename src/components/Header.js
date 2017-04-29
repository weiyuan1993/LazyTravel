import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div id="page-header" style={{textAlign:"center"}}>
          <Link to="/">
            <i className="fa fa-bicycle"></i>
          </Link>
         <h1 style={{lineHeight:'60px',display:'inline' }}>LazyTravel</h1>
        </div>
      </div>
    );
  }
}
