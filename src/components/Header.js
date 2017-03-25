import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div id="page-header">
          <Link to="/">
            <i className="glyph-icon icon-bicycle" style={{fontSize:'45px',paddingRight:'10px'}}></i>
          </Link>

         <h1 style={{lineHeight:'60px',display:'inline' }}>懶人旅行LazyTravel</h1>
        </div>
      </div>
    );
  }
}
