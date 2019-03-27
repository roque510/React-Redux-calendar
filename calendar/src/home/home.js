import React, { Component } from 'react';
import './home.css';

import moment from 'moment';
import Swal from 'sweetalert2';

import {connect} from 'react-redux';
import time from '../timeObject'



class home extends Component {

  constructor(props){
    super(props);
    this.state = {
      color:'',
      title:'',
      time:'',
      month: moment().format("MM") - 1,
      year: moment().year(),
      calendar: this.getCalendar()
    };    

  }

  Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000
  });

  previousMonth(){
    let currmonth = this.state.month;
    currmonth --;
    if(currmonth < 0){
      this.setState(
        {
          year:this.state.year - 1,
          month:11,
          calendar:this.getCalendar(this.state.year - 1,11)
        }
      )
      currmonth = 11;
      
    }
    else
      this.setState({calendar: this.getCalendar(this.state.year,currmonth),month:currmonth});
  }

  nextMonth(){
    let currmonth = this.state.month;
    currmonth ++;
    if(currmonth > 11){
      this.setState(
        {
          year:this.state.year + 1,
          month:0,
          calendar:this.getCalendar(this.state.year + 1,0)
        }
      )
      currmonth = 0;
      
    }
    else
      this.setState(
        {
          calendar: this.getCalendar(this.state.year,currmonth),
          month:currmonth
        });
  }

  changeColor(Ncolor){
    this.setState({
      color:Ncolor
    })
  }
  
  openDialog(day){
    const ordered = {};
    Object.keys(time).sort().forEach(function(key) {
      ordered[key] = time[key];
    });

    console.log(ordered)

    Swal.fire({
      title: "Reminder",
      text: `Would you like to make a reminder on ${moment(day).format('MMMM')} ${day.date()} `,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sure!'
    }).then((result) => {
      let color = 'blue';
      if (result.value) {
        ///
        Swal.mixin({
          input: 'text',
          confirmButtonText: 'Next &rarr;',
          showCancelButton: true,          
          progressSteps: ['1', '2', '3']
        }).queue([
          {
            title: 'Time',
            text: 'At what time would you like to be reminded?',
            input: 'select',
            inputOptions: ordered
          },
          { 
            title: 'Choose a color',
            input:"radio",            
            inputOptions: {
              'red': 'Red',
              'blue': 'Blue',
              'teal': 'Teal',
              'pink': 'Pink'
            },
            inputValidator: (value) => {
              this.setState({color:value})
            }
          },
          {
            title:'Title',
            inputAttributes: {
              maxlength: 30
            }

          }
        ]).then((result) => {
          if (result.value) {
            this.Toast.fire({
              type: 'success',
              title: 'Saved in successfully'
            });

            this.props.addReminder({date:moment(day).format("DD/MM/YYYY"),title:result.value[2],time:time[result.value[0]],color:result.value[1],sort: parseInt(result.value[0])});
            this.forceUpdate();
          }
        })
        ////////////
      }
    })
  }

  reminderInfo(mapDay,item,index){
    
    let keys = Object.keys(time);    
    Swal.fire({
      title: `<strong>Reminder Details</strong>`,      
      html:
        `
        <div className="form-group col-md-12">
          <label for="inputTitle">Title</label>
          <input id="inputTitle" maxlength="30" type="text" value="${item.title}"></input>
        </div>
        <div className="form-group col-md-12">
          <label for="inputDate">Date</label>
          <input id="inputDate" type="date" value="${moment(mapDay, "DD/MM/YYYY").format("YYYY-MM-DD")}"></input>
        </div>
        <div className="form-group col-md-12">
          <label for="inputState">Time</label>
          <select id="inputState" className="form-control">
            
            ${
              keys.map(e => `<option ${item.time === time[e]?"selected":null} value='${e}'>${time[e]}</option>`)              
            }
          </select>
        </div>
        <div className="form-group col-md-12">
          <label for="colorState">Color</label>
          <select id="colorState" className="form-control" >
          <option  ${item.color === 'red'?"selected":null}  >red</option>
          <option  ${item.color === 'blue'?"selected":null} >blue</option>
          <option  ${item.color === 'teal'?"selected":null} >teal</option>
          <option  ${item.color === 'pink'?"selected":null} >pink</option>
            
          </select>
        </div>
        `,
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonColor: 'red',
      focusConfirm: false,
      confirmButtonText:
        '<div>Save </div>',      
      cancelButtonText:
        '<div>Delete </div>',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
      const color = document.getElementById('colorState').value;
      const title = document.getElementById('inputTitle').value;
      const ntime = time[document.getElementById('inputState').value];
      const sortValue = document.getElementById('inputState').value;
      const date = document.getElementById('inputDate').value;      
      
      if (result.value) {
        this.props.editReminder({mapDay,index,color,title,ntime,sortValue,date});
        this.Toast.fire({
          type: 'success',
          title: 'Saved in successfully'
        });
        this.forceUpdate();
      }
      if(result.dismiss === "cancel")
      {
        this.props.deleteReminder({mapDay,index});
        this.Toast.fire({
          type: 'info',
          title: 'Reminder deleted'
        });
        this.forceUpdate();
      }
    })
  }

  getCalendar(year = moment().format("YYYY") ,month = moment().format('MM') - 1){    

    const startWeek = moment([year,month]).startOf('month').week();
    let endWeek = moment([year,month]).endOf('month').week();
    
    if(endWeek < 2)
      endWeek = 52;    

    let calendar = []
    for(var week = startWeek; week<endWeek + 1 ;week++){
      calendar.push({
        week:week,
        days:Array(7).fill(0).map((n, i) => moment([year,month]).week(week).startOf('week').clone().add(n + i, 'day'))
      })
      
    }

    if(endWeek === 52)
    {
      calendar.push({
        week:1,
        days:Array(7).fill(0).map((n, i) => moment([year + 1 ,0]).week(1).startOf('week').clone().add(n + i, 'day'))
      })
    }
    return calendar;
  }

  getCurrentMonth(){
    return moment([this.state.year,this.state.month]).format("MMMM - YYYY");
  }

  componentWillMount(){
    

  }

  componentDidMount(){    
    
  }
  // componentWillUnmount(){}

  componentWillReceiveProps(){
    
  }
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    
    return (
      <div className="wrapper">        
      <h1>{this.getCurrentMonth()}</h1>
      <div className="d-flex">
        <i className="material-icons pointer hoverSquare" onClick={()=> this.previousMonth()}>arrow_left</i>
        <i className="material-icons pointer hoverSquare" onClick={()=> this.nextMonth()}>arrow_right</i>
      </div>
        <div className="d-flex">
          <div className="box text-center">
            SUN
          </div>
          <div className="box text-center">
            MON
          </div>
          <div className="box text-center">
            TUE
          </div>
          <div className="box text-center">
            WED
          </div>
          <div className="box text-center">
            THU
          </div>
          <div className="box text-center">
            FRI
          </div>
          <div className="box text-center">
            SAT
          </div>
        </div> 
        {
          this.state.calendar.map( (e,index) => {
            //amount of weeks
            return (              
              <div className="d-flex" key={index}>
                {
                  e.days.map( (day,index) => {
                    //days in week
                    return (
                    <div className={`dateBox ${moment([this.state.year,this.state.month]).isSame(day, 'month')?'':'text-grey'}`} key={index} >
                      <div className="d-flex justify-content-between">
                        <div>
                          {                        
                            day.date()                        
                          }
                        </div>                        
                        <div className="pointer" onClick={() => this.openDialog(day)}>
                        <i className="material-icons">
                        add_box
                        </i>
                        </div>
                      </div>
                      

                      {
                        
                        Object.keys(this.props.reminders).map(mapDay => {
                          
                          return (moment(day).format("DD/MM/YYYY") === mapDay)?
                          this.props.reminders[mapDay].map((items,index) => 
                          (
                            <div onClick={() => this.reminderInfo(mapDay,items,index)} className={`ribbons pointer d-flex text-truncate ${this.props.reminders[mapDay][index].color}` }>
                              <p>
                                <span className="time">{this.props.reminders[mapDay][index].time}</span>
                                |
                                <span className="titleReminder ">{this.props.reminders[mapDay][index].title}</span>
                              </p>
                            </div>
                          )
                          )
                          // (
                            
                          // )
                          :
                          null
                          
                        })
                      }
                      <br></br>
                      
                    </div>
                    );

                  }) 
                }
              </div>
            );

          }
          )

        }
        
      </div>
    );
  }
}

const mapDispachToProps = (dispach) => {
  return {
    addReminder: (e) => dispach({type:'ADD_REMINDER',payload:e}),
    editReminder: (e) => dispach({type:'EDIT_REMINDER',payload:e}),
    deleteReminder: (e) => dispach({type:'DELETE_REMINDER',payload:e})
  }
}

const mapStateToProps = (state) => {
  return {
    reminders: state.reminders
  }
}



export default connect(mapStateToProps,mapDispachToProps)(home);