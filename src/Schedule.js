import React from 'react';
import axios from "axios";



class Schedule extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       schedule:[]
     }
  }

  componentDidMount(){
    console.log("component has mounted")
    axios.get('/api/schedule')
    .then(res => {
      console.log(res.data)
      this.setState({
        schedule:res.data
      })
    })
  }

  render() {
    console.log(this.state)
    let meetings 
    if (this.state.schedule.length) {
      meetings = this.state.schedule.map(meetingobject => (
        <div key={meetingobject.meeting_id}>
          <h4>{meetingobject.meeting_title}</h4>
          <p>{meetingobject['DATE_FORMAT(start_date, "%M %D, %Y")']}</p>
          <p>{meetingobject.status}</p>
        </div>
      ))
    }
//  notes change to links that will bring up a pre populated form; creating a form component with all the inputs: any additional fields?
    return (
      <div>
        <h2>Schedule</h2>
        {this.state.schedule.length && meetings}
    
        
      </div>
    );
  }
 
}


export default Schedule;
