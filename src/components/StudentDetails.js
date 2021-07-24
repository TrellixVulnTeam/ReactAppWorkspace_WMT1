import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import FacultyTable from "./Table";
import './dashboard.css';

class StudentDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [
        {
          Student_ID:'2020CFSE001',
          Student_Name:'Vishnu',
          Student_EmailID:'2020CFSE001@wilp.bits-pilani.ac.in'
        },
        {
          Student_ID:'2020CFSE002',
          Student_Name:'Karthikeyan S',
          Student_EmailID:'2020CFSE002@wilp.bits-pilani.ac.in'
        },
        {
          Student_ID:'2020CFSE008',
          Student_Name:'Karthikeyan Shankar',
          Student_EmailID:'2020CFSE008@wilp.bits-pilani.ac.in'
        }
      ],
    }
    this.handleLogout = this.handleLogout.bind(this);
    
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
    let bodycontent;
    if(user.role!=="faculty"){
      bodycontent = <label>No Course</label>
    } else {
      bodycontent = <FacultyTable data={this.state.tableData} />
    }
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name}</h3>
        </div>
        <div className="course">  
        <h2>Enrolled Students:</h2>                
          {bodycontent}
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

export default withRouter(StudentDetails);