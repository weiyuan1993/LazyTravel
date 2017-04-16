import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { Link ,browserHistory} from 'react-router';
import { action_userData } from '../actions/user';

function mapStateToProps(state){
  return{
    userData:state.userReducer.userData
  }
}

class LoginPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName:'',
      password:''
    }
  }
  onUserInputChange(userName){
    this.setState({userName:userName});
  }
  onPasswordInputChange(password){
    this.setState({password:password});
  }
  login(){
    var self = this;
    fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName:this.state.userName,
        password:this.state.password
      })
    }).then(function(res){
      res.json().then(function(data){
        if(data.passwordWrong){
          alert("密碼錯誤!");
        }else if(data.notRegisterd){
          alert("此帳號尚未註冊!");
        }else{
          console.log(data);
          self.props.action_userData(data);
          browserHistory.push("/UserPage");
        }
      })
    })
  }
  register(){
    fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName:this.state.userName,
        password:this.state.password

      })
    }).then(function(res){
        res.json().then(function(data){
          if(data.isAlreadyRegistered){
            alert("已經有人註冊過囉!");
          }else{
            alert("使用者:"+data.userName+"註冊成功!");
          }
        })

    })
  }

  render(){
    return(
      <div>
      <Header/>
      <div className="center-vertical">
        <div className="center-content" style={{height:"100vh"}}>
          <div action id="login-validation" className="col-md-4 col-sm-5 col-xs-11 col-lg-3 center-margin">
            <div id="login-form" className="content-box bg-default">
              <div className="content-box-wrapper pad20A">
                <img className="mrg25B center-margin radius-all-100 display-block" src="../../assets/image-resources/gravatar.jpg" alt />
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon addon-inside bg-gray">
                      <i className="glyph-icon icon-envelope-o" />
                    </span>
                    <input type="email" value={this.state.userName} onChange={(e)=>this.onUserInputChange(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon addon-inside bg-gray">
                      <i className="glyph-icon icon-unlock-alt" />
                    </span>
                    <input type="password" value={this.state.password} onChange={(e)=>this.onPasswordInputChange(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                </div>
                <div className="form-group">
                  <button  onClick={()=>this.login()} className="btn btn-block btn-primary">Login</button>
                </div>
                <div className="form-group">
                  <button  onClick={()=>this.register()} className="btn btn-block btn-info">Register</button>
                </div>
                <div className="row">
                  <div className="checkbox-primary col-md-6" style={{height: 20}}>
                    <label>
                      <input type="checkbox" id="loginCheckbox1" className="custom-checkbox" />
                      Remember me
                    </label>
                  </div>
                  <div className="text-right col-md-6">
                    <a href="#" className="switch-button"  title="Recover password">Forgot your password?</a>
                  </div>
                </div>
              </div>
            </div>
            <div id="login-forgot" className="content-box bg-default hide">
              <div className="content-box-wrapper pad20A">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail2">Email address:</label>
                  <div className="input-group">
                    <span className="input-group-addon addon-inside bg-gray">
                      <i className="glyph-icon icon-envelope-o" />
                    </span>
                    <input type="email" className="form-control" id="exampleInputEmail2" placeholder="Enter email" />
                  </div>
                </div>
              </div>
              <div className="button-pane text-center">
                <button type="submit" className="btn btn-md btn-primary">Recover Password</button>
                <a href="#" className="btn btn-md btn-link switch-button" title="Cancel">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(mapStateToProps,{action_userData})(LoginPage);
