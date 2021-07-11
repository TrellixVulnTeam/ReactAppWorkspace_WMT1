import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import './dashboard.css';
import axios from 'axios';


class AddEvaluation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      EvaluationType:["Quiz", "Assignment", "OnlineExam"],
      evaluation:'',
      mark:'',
      totalQuestions:'',
      date:'',
      time:'',
      email:''

    }
    this.handleLogout = this.handleLogout.bind(this);
    
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  sendMail(details) {
    var msgApiURI = "http://localhost:8080/emailNotify";
      var data = {
        "to": sessionStorage.getItem('email'),
        "subject": "LMS Notification!",
        "body": "Evalution added for the enrolled course! "+details
      }
      axios.post(msgApiURI, data,
        {}).then(function (response) {
          console.log("Login confirmation mail sent!");

        })
        .catch(function (error) {
          console.log("Something went wrong.! Login Mail notification failed!");
        });
  }

  handleSubmit = (e) => {
    var details="Evaluation:"+this.state.evaluation+" Marks:"+this.state.mark+" Date/Time: "+this.state.date+"/"+this.state.time;
    console.log(details);
    this.sendMail(details);
    alert("Evaluation created successfully!");
  }
 

  handleGoBack = (e) => {
    this.props.history.push('/LMS/dashboardF');
    e.preventDefault();
  }

  
  handleLogout = (e) => {
    removeUserSession();
    this.props.history.push('/');
    e.preventDefault();
  }

  render() {
    const user = getUser();
    if(user.name.length===0){
      alert("Session Lost. Redirecting to login page!");
      this.handleLogout();
    }
    
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name}</h3>
        </div>
        <div className="createmodule">  
        <fieldset>
        <legend>Add Course Evaluation</legend>
        <form
            name="ModuleDetails"
            onSubmit={this.handleSubmit}
          >
            <div>
            <div>
            <select
            className = "coursedropdown"
            name="evaluation"
            value={this.state.evaluation}
              onChange={this.handleUserInput}
              required
            >
              <option value="Default" selected>Select Evalution Type*</option>
              {this.state.EvaluationType.map((type) => <option key={type}>{type}</option>)}
            </select>
            </div>
            <div>
            <input
                  type="number"
                  placeholder="Enter Total Marks*"
                  name="mark"
                  value={this.state.mark}
                  onChange={this.handleUserInput}
                  required
                />
                 </div>
                 <div>
                 <input
                  type="number"
                  placeholder="Enter Total Questions*"
                  name="totalQuestions"
                  value={this.state.totalQuestions}
                  onChange={this.handleUserInput}
                  required
                />
                 </div>
                 <div>
                 <input
                  type="Date"
                  placeholder="Enter Date*"
                  name="date"
                  value={this.state.date}
                  onChange={this.handleUserInput}
                  required
                />
                </div>
                 <div>
                 <input
                  type="time"
                  placeholder="Enter Timing in AM/PM*"
                  name="time"
                  value={this.state.time}
                  onChange={this.handleUserInput}
                  required
                />
                </div>
            <div className="submit">
            <input type='submit' value='Submit'/>
            </div>
            </div>
          </form>
          </fieldset>
        </div>
        <div className="back">
        <input type="submit" onClick={this.handleGoBack} value="Go Back"/>
        </div>
        <div className='user-menu'>
        <input type="submit" onClick={this.handleLogout} value="Sign out"/>
        </div>
      </div>
    );
   }  
}

export default withRouter(AddEvaluation);