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
          Student_ID:'202001',
          Student_Name:'Karthik',
          Student_EmailID:'Karhtik@gmail.com',
          Student_PhoneNo:'9762567373'

        },
        {
          Student_ID:'202002',
          Student_Name:'Shankar',
          Student_EmailID:'Shankar@gmail.com',
          Student_PhoneNo:'8939737733'
        },
        {
          Student_ID:'202003',
          Student_Name:'Bharat',
          Student_EmailID:'Bharat@gmail.com',
          Student_PhoneNo:'9891872773'
        },
        {
          Student_ID:'202004',
          Student_Name:'Raj',
          Student_EmailID:'Raj@gmail.com',
          Student_PhoneNo:'9787873287'
        }
      ],
    }
    this.handleLogout = this.handleLogout.bind(this);
    
  }

 

  handleGoBack = (e) => {
    this.props.history.push('/dashboardF');
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
        <input type="submit" onClick={this.handleGoBack} value="GoBack"/>
        </div>
        <div className='user-menu'>
        <input type="submit" onClick={this.handleLogout} value="Signout"/>
        </div>
      </div>
    );
     
  }
}

export default withRouter(StudentDetails);