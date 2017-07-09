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
  componentDidMount(){
    if(typeof localStorage.userName === "undefined"){
      console.log("未存有localStorage");
    }else{
      $('#login-validation').hide();
      var self = this;
      fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName:localStorage.userName,
          password:localStorage.password
        })
      }).then(function(res){
        res.json().then(function(data){
          if(data.passwordWrong){
            alert("密碼錯誤!");
          }else if(data.notRegisterd){
            alert("此帳號尚未註冊!");
          }else{
            console.log(data.userName+"已登入");
            self.props.action_userData(data);
            $('#login-validation').prepend("<h3>登入中...</h3>");
            setTimeout(function(){$('#login-validation').show();browserHistory.push("/UserPage")}, 1000);


          }
        })
      })
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
          console.log(data.userName+"已登入");
          localStorage.setItem("userName", self.state.userName);
          localStorage.setItem("password", self.state.password);
          self.props.action_userData(data);
          $('#login-validation').prepend("<h3>登入中...</h3>");
          setTimeout(function(){browserHistory.push("/UserPage")}, 1000);

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
      <Header />
          <div className="col-md-4 col-xs-4"></div>
          <div id="login-validation" className="col-md-4 col-xs-12" style={{marginTop:"60px"}}>
            <div id="login-form" className="content-box bg-default">
              <div className="content-box-wrapper pad20A">
                {/* <img className="mrg25B center-margin radius-all-100 display-block" src="../../assets/image-resources/gravatar.jpg" alt /> */}
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon addon-inside bg-gray">
                      <i className="fa fa-envelope-o"/>
                    </span>
                    <input type="email" value={this.state.userName} onChange={(e)=>this.onUserInputChange(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon addon-inside bg-gray">
                      <i className="fa fa-unlock-alt" />
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
          </div>

      </div>

    );
  }
}

export default connect(mapStateToProps,{action_userData})(LoginPage);
