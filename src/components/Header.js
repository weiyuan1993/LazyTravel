import React, { Component } from 'react';
import { Link ,browserHistory } from 'react-router';

export default class Header extends Component {
  logOut(){
    localStorage.clear('userName');
    localStorage.clear('password');
    window.location="/"
    ;
  }
  render() {
    return (
      <div>
        <div id="page-header" style={{textAlign:"center"}}>
          <Link>
            <i className="fa fa-bicycle"></i>
          </Link>
        <Link style={{textDecoration:"none"}} to="/UserPage"> <h1 style={{lineHeight:'50px',display:'inline' }}>LazyTravel</h1></Link>
        <div className="dropdown" style={{float:"right"}} >
          <a className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown" style={{color:"white",backgroundColor:"transparent",border:"0"}}>
            {/* <i className="fa fa-bars" style={{fontSize:"35px"}}></i> */}
          <span className="glyphicon glyphicon-menu-hamburger"  style={{fontSize:"35px"}}></span></a>
          <ul className="dropdown-menu dropdown-menu-right" style={{textAlign:"center"}}>
            {!localStorage.userName?
              <li><h6 className="dropdown-header">帳戶:尚未登入</h6></li>
              :
              <span>

                <li><h6 className="dropdown-header">帳戶:{localStorage.userName}</h6></li>
                <li><a href="javascript: void(0)" onClick={()=>this.logOut()}><h3>登出</h3></a></li>
              </span>
            }

             <li role="separator" className="divider"></li>
             <li><a href="https://github.com/weiyuan1993/LazyTravel"><h3>GitHub</h3></a></li>
          </ul>
        </div>
        </div>
      </div>
    );
  }
}
