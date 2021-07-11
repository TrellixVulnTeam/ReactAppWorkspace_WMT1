import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import FacultyTable from "./Table";
import './dashboard.css';
import axios from 'axios';

class Facultydashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [
        {
          Course_ID: "WEB01",
          Course_Name: "Web Development",
          End_Date: "2021-04-30",
          Add_Module:"+",
          Students_Enrolled:"View Enroll",
          Students_Registered:"View Register",
          Add_Evaluation:"+",

        },
        {
          Course_ID: "PYT01",
          Course_Name: "Python",
          End_Date: "2021-06-30",
          Add_Module:"+",
          Students_Enrolled:"View Enroll",
          Students_Registered:"View Register",
          Add_Evaluation:"+"
        },
        {
          Course_ID: "RCT01",
          Course_Name: "React JS",
          End_Date: "2021-02-30",
          Add_Module:"+",
          Students_Enrolled:"View Enroll",
          Students_Registered:"View Register",
          Add_Evaluation:"+"
        }
      ]
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  
  handleLogout = (e) => {
    removeUserSession();
    this.props.history.push('/');
    e.preventDefault();
  }

  fetchCourseAssignedDetails (email) {
    var apiBaseUrl = "http://localhost:8000/coursesEnrolled";
    var self = this;
    var payload = {
      "userID": this.state.email,
    }
    axios.get(apiBaseUrl, payload)
      .then(function (response) {
       
        if (response.status === 200) {
            console.log("Faculty Details fetched:"+response.data.AssignedCourseDetails);
            self.setState({tableData:response.data.AssignedCourseDetails});
        }
      }).catch(function (error) {
        console.log("Something went wrong!");
        alert("Something went wrong!");
      }); 
  }
  render() {
    let user;
    user = getUser();
     
    let bodycontent;
    if(user.name!=="karthikeyansuku"){
      bodycontent = <label>No Course</label>
    } else {
      bodycontent = <FacultyTable data={this.state.tableData} />
    }
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name}</h3>
        </div>
        <div className="ViewTitle">
          <h1>FACULTY USER DASHBOARD</h1>
        </div>
        <div className="course">  
        <h2>List of assigned Courses:</h2>                
          {bodycontent}
        </div>

        <div className='user-menu'>
        <input type="submit" onClick={this.handleLogout} value="Sign out"/>
        </div>
      </div>
    );
    
  }
}
export default withRouter(Facultydashboard);