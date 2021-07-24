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
      email:'',
      StudentsEnrolled: ['2020CFSE001@wilp.bits-pilani.ac.in','2020CFSE002@wilp.bits-pilani.ac.in','2020CFSE008@wilp.bits-pilani.ac.in']

    }
    this.handleLogout = this.handleLogout.bind(this);
    
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  sendMail(self, details, bcc) {
    var msgApiURI = "http://localhost:8080/emailNotifyAll";
      var data = {
        "bcc": bcc,
        "subject": "LMS Notification!",
        "body": details
      }
      axios.post(msgApiURI, data,
        {}).then(function (response) {
          console.log("Evalution update mail sent!");
          self.persistEmailNotificationDetails(details, bcc, 'Success');
        })
        .catch(function (error) {
          console.log("Something went wrong.! Evaluation notification failed!");
          self.persistEmailNotificationDetails(details, bcc, 'Failed');

        });
  }

  persistEmailNotificationDetails(details, notifiedList, notificationStatus){
    var msgApiURI = "http://localhost:8000/api/emailNotification/";
    var bcc='';
    notifiedList.map(id=> bcc=bcc+id+";");
      var data = {
        "notifiedList": bcc,
        "changes": details,
        "changedBy": sessionStorage.getItem('email'),
        "status": notificationStatus
      }
      axios.post(msgApiURI, data,
        {auth: {
          username: 'admin',
          password: '123'
        }}).then(function (response) {
          console.log("Notification details persisted successfully!");
        })
        .catch(function (error) {
          console.log("Something went wrong.! Notification details persistent failed!");
        });
  }

  handleSubmit = (e) => {
    
    var apiBaseUrl = "http://localhost:8000/api/courseEvaluation/";
    var self = this;
    var payload = { 
	  "evaluationtype": this.state.evaluation,
    "totalmarks": this.state.mark,
    "totalquestions": this.state.totalQuestions,
    "date": this.state.date,
    "time": this.state.time

    };
    axios
    .post(apiBaseUrl, payload,
      {auth: {
        username: 'admin',
        password: '123'
      }})
      .then(function (response) {
       console.log(JSON.stringify(response))
       console.log((JSON.stringify(response)).length === 0)
        if (response.status === 201) {
        var details="Evalution added for the enrolled course! Evaluation:"+self.state.evaluation+" Marks:"+self.state.mark+" Date/Time: "+self.state.date+"/"+self.state.time;
        var bcc = self.state.StudentsEnrolled;
          bcc.push(sessionStorage.getItem('email'));
          console.log(details);
          self.sendMail(self, details, bcc);
        alert("Evaluation created successfully!");
            } 
          }).catch(function (error) {
            console.log("Something went wrong.! Please try again!");
            alert("Something went wrong.! Please try again!");
          });
          e.preventDefault();  
    
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