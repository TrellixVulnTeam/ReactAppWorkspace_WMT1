import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import './dashboard.css';
import axios from 'axios';


class CreateModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Courses: [
        {
          Course_ID: "WEB01",
          Course_Name: "Web Development",
          End_Date: "2021-04-30",
          

        },
        {
          Course_ID: "PYT01",
          Course_Name: "Python",
          

        },
        {
          Course_ID: "RCT01",
          Course_Name: "React JS",
          

        }
      ],
      description:'',
      module:'',
      courseSelected:'',
      topics:[],
      StudentsEnrolled: ['2020CFSE001@wilp.bits-pilani.ac.in','2020CFSE002@wilp.bits-pilani.ac.in','2020CFSE008@wilp.bits-pilani.ac.in']

    }
    this.handleLogout = this.handleLogout.bind(this);
    
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    this.setState({courseSelected: value});
  }

  handleSubmit = (e) => {
    var apiBaseUrl = "http://localhost:8000/api/modules/";
    var self = this;
    var payload = {
      "modulename": this.state.module,
      "description": this.state.description,
      "topics": this.state.topics

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
          var details="Modules added to the enrolled course! Course Module:"+self.state.module+" Description: "+self.state.description+" Topics: "+self.state.topics;
          var bcc = self.state.StudentsEnrolled;
          bcc.push(sessionStorage.getItem('email'));
          console.log(details);
          self.sendMail(self, details, bcc);
          alert("Module created successfully!");
        } 
      }).catch(function (error) {
        console.log("Something went wrong.! Please try again!");
        alert("Something went wrong.! Please try again!");
      });
       e.preventDefault();  
    
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
          console.log("Module addition mail sent!");
          self.persistEmailNotificationDetails(details, bcc, 'Success');

        })
        .catch(function (error) {
          console.log("Something went wrong.! Add Module notification failed!");
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
        <legend>Create Module</legend>
        <form
            name="ModuleDetails"
            onSubmit={this.handleSubmit}
          >
            <div>
            <div>
            <select
            className = "coursedropdown"
              onChange={this.handleUserInput}
              required
            >
              <option value="value" selected>Select Course</option>

              {this.state.Courses.map((course) => <option key={course.Course_ID} value={({key:course.Course_ID, value:course.Course_Name})}>{course.Course_Name}</option>)}
            </select>
            </div>
            <div>
            <input
                  type="text"
                  placeholder="Enter module name*"
                  name="module"
                  value={this.state.module}
                  onChange={this.handleUserInput}
                  required
                />
                 </div>
                 <div>
                <textarea
                  placeholder="Enter description*"
                  name="description"
                  value={this.state.description}
                  onChange= {this.handleUserInput}
                  required
                />
                 </div>
                 <div>
                 <textarea
                  placeholder="Enter Topics*"
                  name="topics"
                  value={this.state.topics}
                  onChange= {this.handleUserInput}
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

export default withRouter(CreateModule);