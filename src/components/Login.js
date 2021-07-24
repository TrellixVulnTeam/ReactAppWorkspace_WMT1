import React from 'react';
import { withRouter } from 'react-router-dom';
import { setUserSession } from './Common';
import './Login.css';
import { FormErrors } from './FormErrors';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email: '',
      password: '',
      UserType: '',
      emailErrorMsg:{ email: ''},
      passwordErrorMsg:{ password: ''},
      emailValid: false,
      passwordValid: false,
      userTypeValid:false,
      loginButtonEnable: false,
    }
    
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

   validateField(fieldName, value) {
    // let fieldValidationErrors = this.state.formErrors;
    let emailValidationErrorMsg = this.state.emailErrorMsg;
    let passwordValidationErrorMsg = this.state.passwordErrorMsg;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let userTypeValid = this.state.userTypeValid;
    //let userTypeValue = this.state.UserType;


    switch (fieldName) {
      case 'email':
        if (value.length===0) {
          emailValid = false;
          emailValidationErrorMsg.email = '';
        } else if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i)) {
          emailValid = true;
          emailValidationErrorMsg.email = '';
        } else {
          emailValid = false;
          emailValidationErrorMsg.email = ' is invalid';
        }
        break;
      case 'password':
        if (value.length > 0 && value.length < 6) {
          passwordValid=false;
          passwordValidationErrorMsg.password = ' length is less than 6';
        } else if (value.length > 10) {
          passwordValid=false;
          passwordValidationErrorMsg.password = ' accepts max 10';
        } else if (value.length===0) {
          passwordValid=false;
          passwordValidationErrorMsg.password ='';
        } else {
          passwordValid=true;
          passwordValidationErrorMsg.password ='';
        }
        break;
      default:
        // radio button selection for user selection
        userTypeValid = true;
        //userTypeValue = value;
        break;
    }
    this.setState({
      emailErrorMsg: emailValidationErrorMsg,
      passwordErrorMsg: passwordValidationErrorMsg,
      emailValid: emailValid,
      passwordValid: passwordValid,
      userTypeValid: userTypeValid
    }, this.loginForm);
  }

  sendMail(self, to, details) {
    var msgApiURI = "http://localhost:8080/emailNotify";
      var data = {
        "to": to,
        "subject": "LMS Notification!",
        "body": details
      }
      axios.post(msgApiURI, data,
        {}).then(function (response) {
          console.log("Login confirmation mail sent!");
          self.persistEmailNotificationDetails(details, to, 'Success');

        })
        .catch(function (error) {
          console.log("Something went wrong.! Login Mail notification failed!");
          self.persistEmailNotificationDetails(details, to, 'Failed');

        });
  }

  persistEmailNotificationDetails(details, notifiedList, notificationStatus){
    var msgApiURI = "http://localhost:8000/api/emailNotification/";
      var data = {
        "notifiedList": notifiedList,
        "changes": details,
        "changedBy": sessionStorage.getItem('email'),
        "status": notificationStatus
      };
      axios.post(msgApiURI, data,
        {auth: {
          username: 'admin',
          password: '123'
        }}).then(function (response) {
          if (response.status === 201) {
          console.log("Notification details persisted successfully!");
          } else {
            console.log(response);

          }
        })
        .catch(function (error) {
          console.log("Something went wrong.! Notification details persistent failed!");
        });
  }

  loginForm() {
    this.setState({ loginButtonEnable: this.state.emailValid && this.state.passwordValid && this.state.userTypeValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  
  handleSubmit = (e) => {
    var username = this.state.email.substring(0,this.state.email.indexOf('@'));
    if (this.state.UserType ==='faculty') {
    var apiBaseUrl = "http://localhost:8000/api/checkUserValid/";
    var self = this;
    var payload = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password,
      "usertype": this.state.UserType
    });
    axios
    .post(apiBaseUrl, payload,
      {auth: {
        username: 'admin',
        password: '123'
      }})
      .then(function (response) {
       console.log(JSON.stringify(response))
       console.log((JSON.stringify(response)).length === 0)
        if (response.status === 200 &&  response.data.length === 1) {
          self.setState({user:username}, () => {
            setUserSession(self.state.email, username, self.state.UserType);
            alert("Login Successful!");
            self.sendMail(self, self.state.email, "Your credential is used to login into LMS portal! If its not you, report immediately to LMS support!");
            self.props.history.push('/LMS/dashboardF');
      });

        } else {
        console.log("Invalid Username and Password!");
        alert("Invalid Username and Password!");
        }
      }).catch(function (error) {
        console.log("Something went wrong while login!");
        alert("Something went wrong while login!");
      });
       e.preventDefault();    
      } else {
        alert("Student Dashboard not available!");
      }
  }

  render() {
    return (
      <div className="loginContainer">
        <div className="login-menu">
         <h1>Sign In</h1> 
          <form className="demoForm" onSubmit={this.handleSubmit}>
         
            <div >
              <input type="email" required name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput} />
            </div>
            <div className='error-message' >
              <FormErrors formErrors={this.state.emailErrorMsg} />
            </div>
            <div >
              <input type="password" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput} />
            </div>
            <div className='error-message' >
              <FormErrors formErrors={this.state.passwordErrorMsg} />
            </div>
            <div >
              <input type="radio" value="student" name="UserType"
                checked={this.state.UserType === "student"}
                onChange={this.handleUserInput} />
              <label htmlFor="Student">Student</label>
              <input type="radio" value="faculty" name="UserType" checked={this.state.UserType === "faculty"}
                onChange={this.handleUserInput} />
              <label htmlFor="Faculty">Faculty</label>
            </div>
            <div className="register-menu">
            
              <a href='/LMS/registration'>New User? Click Here To Register!</a>
          
          </div>
            <input type='submit' value='Login' disabled={!this.state.loginButtonEnable} />
          </form>
          </div>  
      </div>
    )
  }

}
export default withRouter(Login);
