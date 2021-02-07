import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import FacultyTable from "./Table";
import './dashboard.css';

class FacultydashboardCopy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [
        {
          Course_ID: "WEB01",
          Course_Name: "Web Development",
          End_Date: "2021-04-30",
          Add_Module:'Add',
          Students_Enrolled:"View Details"

        },
        {
          Course_ID: "PYT01",
          Course_Name: "Python",
          End_Date: "2021-06-30",
          Add_Module:'Add',
          Students_Enrolled:"View Details"

        },
        {
          Course_ID: "RCT01",
          Course_Name: "React JS",
          End_Date: "2021-02-30",
          Add_Module:'Add',
          Students_Enrolled:"View Details"

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
        <h2>List of assigned Courses:</h2>                
          {bodycontent}
        </div>

        <div className='user-menu'>
        <input type="submit" onClick={this.handleLogout} value="Signout"/>
        </div>
      </div>
    );
     
  }
}

export default withRouter(FacultydashboardCopy);