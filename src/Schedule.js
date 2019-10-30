import React from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button'
import Modal from './Modal.js'
import Table from 'react-bootstrap/Table'
import Customform from './Form.js'




class Schedule extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
       schedule:[],
       modal: false,
      currentMeeting:{}
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

  handleSubmit = (event,data) => {
    event.preventDefault()
    console.log('submitted form',data)
    axios.put('/api/edit', data)
    .then(res => {
      console.log('new data', res)
    let updatedSchedule = this.state.schedule.slice()
    for (let i =0; i<updatedSchedule.length; i++){
      if(updatedSchedule[i].meetingId===data.meetingId){
        console.log('if statement is running')
        updatedSchedule[i]=data
      }
    }
    console.log('updatedSchedule', updatedSchedule)
    this.setState({ 
      modal: false, 
      schedule:updatedSchedule
    })
    })
  }



  render() {
    console.log(this.state)
    let meetings 
    if (this.state.schedule.length) {
      meetings = this.state.schedule.map(meetingobject => (
        <tr key={meetingobject.meetingId} onClick={() => this.setState({ modal: true, currentMeeting:meetingobject })}>
          <td>{meetingobject.meetingTitle}</td>
          <td>{meetingobject.startDate}</td>
          <td>{meetingobject.status}</td>
        </tr>
      ))
    }
//  notes change to links that will bring utr a pre populated form; creating a form component with all the inputs: any additional fields?
    return (
      <div>
        <h2>Schedule</h2>
        {/* <Button onClick={() => this.setState({ modal: true })}>Modal Button</Button> */}
        <Modal 
          show={this.state.modal}
          onHide={() => this.setState({ modal: false })}
          modalbody={(
            <Customform
              meetingId={this.state.currentMeeting.meetingId}
              meetingTitle={this.state.currentMeeting.meetingTitle}
              startDate={this.state.currentMeeting.startDate}
              startTime={this.state.currentMeeting.startTime}
              attendees={this.state.currentMeeting.attendees}
              topicsDiscussed={this.state.currentMeeting.topicsDiscussed}
              status={this.state.currentMeeting.status}
              onSubmit={this.handleSubmit}
            />
            
          )} 
          
        />
        {/* {this.state.schedule.length && meetings} */}
        {this.state.schedule.length && (
          <Table responsive="md">
             <thead>
              <tr >
                <th>Meeting Description</th>
                <th>Meeting Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                {meetings}
            </tbody>

          </Table>
        )}

    
        
      </div>
    );
  }
 
}


export default Schedule;
