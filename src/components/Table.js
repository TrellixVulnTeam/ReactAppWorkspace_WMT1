import React from 'react';
import "./enrollment.css";
export default class CourseTable extends React.Component {

  constructor(props) {

    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.state = {
      
     
    };
  }

  getKeys = function () {

    return Object.keys(this.props.data[0]);

  }

  getHeader = function () {
    var keys = this.getKeys();
    return keys.map((key, index) => {
      return <th key={key}>{key.toUpperCase()}</th> 
    })
  }

  getRowsData = function () {
    var items = this.props.data;
    console.log(items);
    var keys = this.getKeys();
    return items.map((row, index) => {
      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
    })
  }

  render() {
    var tableDatas = this.props.data;
    var keys = this.getKeys();
     
    var records = tableDatas.map((row, index) => {

      return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>

    })
    return (
      <div className="courselist">
          <div className="courselist">
          {/* <input type="text" placeholder="Filter on JobStatus" onChange={(e) => this.searchSpace(e)} />
          <input type="text" placeholder="Filter on PaymentSatus" onChange={(e) => this.searchSpace1(e)} /> */}
          <table>
            <thead>
              <tr>{this.getHeader()}</tr>             
            </thead>
            <tbody>
             {records}
                            
            </tbody>
          </table>
        </div>
        
      </div>


    );
  }
}

const RenderRow = (props) => {
  let addModuleURL="./CreateModule";
  let studentDetailsURL="./StudentDetails";
  return props.keys.map((key, index) => {
 if (key==="Add_Module") {
      return <td key={props.data[key]}><a href={addModuleURL}>{props.data[key]}</a></td>

    }else if(key==="Students_Enrolled")
    {
        return <td key={props.data[key]}><a href={studentDetailsURL}>{props.data[key]}</a></td>
    }
    else
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}


