import React from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './components/Login.js';
import Registration from "./components/Registration";
import Facultydashboard from './components/Facultydashboard.js';
import StudentDetails from './components/StudentDetails.js';
import CreateModule from './components/CreateModule.js';
import Facultydashboardcopy from './components/Facultydashboard copy.js';
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
              <Route path="/registration" component={Registration} />   
              <Route path="/dashboardF" exact component={() => <Facultydashboard />} />
              <Route path="/CreateModule" exact component={() => <CreateModule/>} />
              <Route path="/StudentDetails" exact component={() => <StudentDetails/>} />
              <Route path="/Facultydashboardcopy" exact component={() => <Facultydashboardcopy />} /> 

          </BrowserRouter>
        </div>
        </div>
    );
  }
}


export default App;
