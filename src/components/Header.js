import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div id="page-header">
          <Link to="/UserPage">
            <i className="glyph-icon icon-bicycle" style={{paddingRight:'10px'}}></i>
          </Link>

         <h1 style={{lineHeight:'60px',display:'inline' }}>LazyTravel</h1>
        </div>
      </div>
    );
  }
}
