import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import FacultyTable from "./Table";
import './dashboard.css';

class StudentRegistered extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [
        {
          Register_ID:'LMS10202',
          Student_Name:'Praveen',
          Student_EmailID:'Praveen@gmail.com',
          Student_PhoneNo:'7890922877'

        },
        {
          Register_ID:'LMS10205',
          Student_Name:'Naveen',
          Student_EmailID:'Naveen@gmail.com',
          Student_PhoneNo:'9655526272'
        },
        
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
        <h2>Registered Students:</h2>                
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

export default withRouter(StudentRegistered);