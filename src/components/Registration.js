import React from 'react';
import './Registration.css'
import { FormErrors } from './FormErrors';
import axios from 'axios';
class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      FullName: '',
      Email: '',
      Password: '',
      dob:'',
      role: '',
      skills: [],
      emailErrorMsg:{ email: ''},
      dobErrorMsg:{ dob: ''},
      usernameErrorMsg:{ name: ''},
      passwordCriteria:{ password: ''},
      passwordErrorMsg:'',
      emailValid: false,
      passwordValid: false,
      dobValid: false,
      roleValid: false,
      usernameValid:false,
      RegistrationEnable: false,
    }
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  
  pwdCriteriaOnClick = (e)=>{
    if (this.state.Password.length===0){
    let pwdCriteria = this.state.passwordCriteria;
    pwdCriteria.password=' criteria: should contain 6 to 10 character lenght!';
    this.setState({passwordCriteria:pwdCriteria});
  }
  }
  
  validateField(fieldName, value) {
    let emailValidationErrorMsg = this.state.emailErrorMsg;
    let dobValidationErrorMsg = this.state.dobErrorMsg;
    let usernameValidationErrorMsg = this.state.usernameErrorMsg;
    let emailValid = this.state.emailValid;
    let roleValid = this.state.roleValid;
    let dobValid = this.state.dobValid;
    let usernameValid = this.state.usernameValid;
    let pwdValid = this.state.passwordValid;
    let pwdError = this.state.passwordErrorMsg;
    let pwdCriteria = this.state.passwordCriteria;

    switch (fieldName) {
      case 'Email':
        if (value.length===0) {
          emailValid = false;
          emailValidationErrorMsg.email = '';
        } else if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i)) {
          emailValid = true;
          emailValidationErrorMsg.email = '';
        } else {
          emailValid = false;
          emailValidationErrorMsg.email = ' is invalid!';
        }
        break;
      case 'dob':
        if(value.match(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/)){
          dobValid = true;
          dobValidationErrorMsg.dob = '';
        } else if (value.length===0) {
          dobValid=false;
          dobValidationErrorMsg.dob = '';
        } else {
          dobValid=false;
          dobValidationErrorMsg.dob = ' invalid date format!';
        }
        break;
        case 'FullName':
          if (value.length===0) {
            usernameValid=false;
            usernameValidationErrorMsg.name = '';
          } else {
            usernameValid=true;
            usernameValidationErrorMsg.name = '';
          }
          break; 
        case 'Password':
            //Password error message creation
            pwdCriteria.password=' criteria: should contain 6 to 10 character lenght!';
          if (value.length > 0 && value.length < 6) {
            pwdValid=false;
            pwdError = 'Password length is less than 6!';
           } else if (value.length > 10) {
            pwdValid=false;
            pwdError = 'Password length is more than 10!';
          } else if (value.length===0) {
            pwdValid=false;
            pwdError ='';
            pwdCriteria.password='';
          } else {
            pwdValid=true;
            pwdError ='';
          }
          break; 
      default:
        // radio button selection for user selection
        roleValid = true;
        break;
    }
    this.setState({
      emailErrorMsg: emailValidationErrorMsg,
      emailValid: emailValid,
      dobValid: dobValid,
      dobErrorMsg: dobValidationErrorMsg,
      roleValid: roleValid,
      usernameValid: usernameValid,
      usernameErrorMsg: usernameValidationErrorMsg,
      passwordErrorMsg: pwdError, 
      passwordValid: pwdValid,
      passwordCriteria: pwdCriteria

    }, this.validateRegistration);
  }

  validateRegistration() {
    this.setState({ RegistrationEnable: this.state.emailValid && this.state.dobValid && this.state.usernameValid && this.state.roleValid });
  }

  
  sendMail() {
    var msgApiURI = "http://localhost:8080/emailNotify";
      var data = {
        "to": this.state.Email,
        "subject": "LMS Notification!",
        "body": "You are succesfully registered to LMS portal!"
      }
      axios.post(msgApiURI, data,
        {}).then(function (response) {
          console.log("Registration Mail notification sent!");
        })
        .catch(function (error) {
          console.log("Something went wrong.! Registration Mail notification failed!");
        });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }


  handleSubmit = (e) => {
    
    if (this.state.passwordValid) {
      var apiBaseUrl = "http://localhost:8000/api/appUsers/";
      var self = this;
      var payload = {
        "email": this.state.Email,
        "password": this.state.Password,
        "usertype": this.state.role,
        "fullname": this.state.FullName,
        "DOB":this.state.dob
      } 
      axios.post(apiBaseUrl, payload,
        {auth: {
          username: 'admin',
          password: '123'
        }})
        .then(function (response) {
         
          if (response.status === 201) {  
              alert("Registration successfull. Redirecting to login page!");
              self.sendMail();
              self.props.history.push('/');         
          }
        })
        .catch(function (error) {
          console.log("Something went wrong.! Please try again!");
          alert("User already Registered with this Email-id!");
        });
         e.preventDefault();
    } else {
      alert(this.state.passwordErrorMsg);
      e.preventDefault();
    }

  }

  render() {
      return (
        <div className="registrationContainer">
          <form className="RegisterForm" onSubmit={this.handleSubmit}  >
            <fieldset>
              <legend>Registration Form</legend>
              <div className="UserRole">

                <input type="radio" value="student" name ="role"
                  checked={this.state.role === "student"}
                  onChange={this.handleUserInput} />
                <label htmlFor="Student">Student</label>

                <input type="radio" value="faculty" name ="role"
                checked={this.state.role === "faculty"}
                  onChange={this.handleUserInput} />
                <label htmlFor="Faculty">Faculty</label>
              </div>

              <div className="UserDetails">
             
                <input
                  type="text"
                  placeholder="Enter your email id [username]*"
                  name="Email"
                  value={this.state.Email}
                  onChange={this.handleUserInput}
                  required
                />
                 <div className='error-message' >
             <FormErrors formErrors={this.state.emailErrorMsg} />
             </div>

                <input
                  type="password"
                  placeholder="Create Password *"
                  name="Password"
                  value={this.state.Password}
                  onClick={this.pwdCriteriaOnClick}
                  onChange= {this.handleUserInput}
                  required
                />
                 <div className='password-criteria' >
              <FormErrors formErrors={this.state.passwordCriteria} />
              </div>
               <input
                  type="text"
                  placeholder="Enter your full name *"
                  name="FullName"
                  value={this.state.FullName}
                  onChange={this.handleUserInput}
                  required
                />
                        
              <input
                type="text"
                placeholder="Enter Date-Of-Birth (dd/mm/yyyy) *"
                name="dob"
                value={this.state.dob}
                onChange={this.handleUserInput}
                required
              />
              <div className='error-message' >
              <FormErrors formErrors={this.state.dobErrorMsg} />
              </div>
              <div className="signIn-menu">
              <a href='/'>Go Back To Sign-In!</a>
              </div>
              <input type='submit' value='Register' disabled={!this.state.RegistrationEnable} />
              </div>
                            
            </fieldset>
          </form>
        </div>
      );
    
  }
}


export default Registration;
