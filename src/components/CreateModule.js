import React from 'react';
import { getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import './dashboard.css';

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
      topics:[],

    }
    this.handleLogout = this.handleLogout.bind(this);
    
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
      alert("Module created successfully!");
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
        <input type="submit" onClick={this.handleGoBack} value="GoBack"/>
        </div>
        <div className='user-menu'>
        <input type="submit" onClick={this.handleLogout} value="Signout"/>
        </div>
      </div>
    );
   }  
}

export default withRouter(CreateModule);