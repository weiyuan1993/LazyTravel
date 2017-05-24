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
          <Link>
            <i className="fa fa-bicycle"></i>
          </Link>
        <Link to="/UserPage"> <h1 style={{lineHeight:'50px',display:'inline' }}>LazyTravel</h1></Link>
        <div className="dropdown" style={{float:"right"}} >
          <a className="btn btn-default btn-lg dropdown-toggle" type="button" data-toggle="dropdown" style={{color:"white",backgroundColor:"transparent",border:"0"}}>
            <i className="fa fa-bars" style={{fontSize:"35px"}}></i></a>
          <ul className="dropdown-menu dropdown-menu-right" style={{textAlign:"center"}}>
           <li>
             <li><a href="#" onClick={()=>this.logOut()}><h3>登出</h3></a></li>
             <li role="separator" className="divider"></li>
             <li><a href="https://github.com/weiyuan1993/LazyTravel"><h3>關於</h3></a></li>
           </li>
          </ul>
        </div>
        </div>
      </div>
    );
  }
}
