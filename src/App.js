import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './components/Login.js';
import Registration from "./components/Registration";
import Facultydashboard from './components/Facultydashboard.js';
import StudentDetails from './components/StudentDetails.js';
import CreateModule from './components/CreateModule.js';
import StudentRegistered from './components/StudentRegistered.js';
import AddEvaluation from './components/AddEvaluation.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     
    }
  }
 
  render() {
    return (
      <div className="container" >
        <div className="App-title"> 
        <h1>Taxila's Learning Management System</h1>
        </div>
        <div className='App-body'>            
          <BrowserRouter>                 
              <Route path="/" exact component={() => <Login />} />      
              <Route path="/LMS/registration" component={Registration} />   
              <Route path="/LMS/dashboardF" exact component={() => <Facultydashboard />} />
              <Route path="/LMS/dashboardF/CreateModule" exact component={() => <CreateModule/>} />
              <Route path="/LMS/dashboardF/StudentEnrolled" exact component={() => <StudentDetails/>} />
              <Route path="/LMS/dashboardF/StudentRegistered" exact component={() => <StudentRegistered/>} />
              <Route path="/LMS/dashboardF/AddEvaluation" exact component={() => <AddEvaluation/>} />

          </BrowserRouter>
        </div>
        </div>
    );
  }
}


export default App;
