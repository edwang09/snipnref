import React, { Component } from "react";
import axios from 'axios'

class LunarCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret : "ed096b1309889871313a683da0558ae5",
      month:1,
      date:1,
      year:1991,
      displayDate:null,
      displayMonth:null,
      displayYear:null,
      result:{
      }
    };
  }

  componentDidMount(){
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    this.setState({
     year,month,date
    })
    this.requestResult(this.formatdate(year, month, date))
    .then(data=>{
      if (data.data.date){
        const [displayYear, displayMonth, displayDate] = data.data.date.split("-")
        this.setState({
          result:data.data,
          displayDate,
          displayMonth,
          displayYear,
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  formatdate = (year, month, date) =>{
    return year.toString() + "-" + month.toString() + "-" + date.toString()
  }
  onChange = () => e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  requestResult = (date) => {
    return new Promise((resolve, reject) =>{
      axios
      .post("/api/fengshui/calendar",
        {
          secret: this.state.secret,
          date: date
        }
      ).then(res => {
        resolve(res.data)
      })
      .catch(err =>
        reject(err)
      );
    })
  };
  previousDate = ()=> e =>{
    let currentdate = new Date(this.state.displayYear, this.state.displayMonth-1, this.state.displayDate)
    currentdate.setTime(currentdate.getTime()-60*60*24*1000)
    
    this.requestResult(this.formatdate(currentdate.getFullYear(), currentdate.getMonth() + 1, currentdate.getDate()))
    .then(data=>{
      if (data.data.date){
        const [displayYear, displayMonth, displayDate] = data.data.date.split("-")
        this.setState({
          result:data.data,
          displayDate,
          displayMonth,
          displayYear,
        })
      }
    }).catch(err=>{
      console.log(err)
    })

  }
  
  nextDate = ()=> e =>{
    let currentdate = new Date(this.state.displayYear, this.state.displayMonth-1, this.state.displayDate)
    currentdate.setTime(currentdate.getTime()+60*60*24*1000)
    
    this.requestResult(this.formatdate(currentdate.getFullYear(), currentdate.getMonth() + 1, currentdate.getDate()))
    .then(data=>{
      if (data.data.date){
        const [displayYear, displayMonth, displayDate] = data.data.date.split("-")
        this.setState({
          result:data.data,
          displayDate,
          displayMonth,
          displayYear,
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  
  calculate = () => e => {
    e.preventDefault()
    this.requestResult(this.formatdate(this.state.year, this.state.month, this.state.date))
    .then(data=>{
      if (data.data.date){
        const [year, month, date] = data.data.date.split("-")
        this.setState({
          result:data.data,
          displayDate:date,
          displayMonth:month,
          displayYear:year,
        })
      }
    }).catch(err=>{
      console.log(err)
    })
  };
  render() {
    const dateSelect = [...Array(31).keys()].map((str, id)=>{
      return (<option value={id+1} key ={id+1} >{id+1}</option>)
    })
    const yearSelect = [...Array(200).keys()].map((str, id)=>{
      return (<option value={id+1900} key ={id+1900}>{id+1900}</option>)
    })
    return (
      <div className="lunarcalendar">
        <h1>
          Chinese Lunar Calendar
        </h1>
        <p>
        Although China has adopted the Gregorian calendar in common 
        with most other countries in the world for official and business purposes, 
        the traditional Chinese calendar continues to define the dates of festivals 
        and is used for horoscopes. The calendar has a very long history going back 
        to the Xia (21st century BC - 16th century BC) and Shang Dynasty 
        (16th century BC - 11th century BC). It is based on a unique combination of 
        astronomy and geography through observation and exploration. 
        It is also referred to as the Lunar, Yin, Xia or the old Chinese calendar.
        </p>
        <p >
        Each time the moon moves into line with the earth and the sun a new month begins 
        and this is called 'Chu Yi' or 'Shuo Ri' (the first day of a lunar month). 
        The longest day of a year or Summer Solstice falls on the 21st or 22nd of June, 
        and the shortest day is the Winter Solstice on either December 21, 22, or 23. 
        Using these two annual events the year was divided into in 24 equal parts, each forming the 24 solar terms. 
        The month with its first day nearest the Beginning of Spring (the first solar term) is the first lunar month, 
        and on that day the Spring Festival is held and this varies between January 20th and February 20th.
        </p>
        <hr/>
        <form className="form" id="calendarform">
          <div className="formgroup">
            <label htmlFor="month">Month:</label>
            
            <select name="month" form="calendarform" value={this.state.month}
              onChange={this.onChange()}>
              <option value="1">Janurary</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div className="formgroup">
            <label htmlFor="date">Date:</label>
            
            <select name="date" form="calendarform" value={this.state.date}
              onChange={this.onChange()}>
              {dateSelect}
            </select>
          </div>
          <div className="formgroup">
            <label htmlFor="year">Year:</label>
            <select name="year" form="calendarform" value={this.state.year}
              onChange={this.onChange()}>
              {yearSelect}
            </select>
          </div>
            <button className="button--success submitbutton" onClick={this.calculate()}>
            See Results
          </button>
        </form>
        <div className="lunarcalendar__result">

        <div className="previousdate" onClick={this.previousDate()}>
        <p>
        <i class="fas fa-chevron-circle-left"></i>

        </p>
        </div>
        
        <div className="lunarcalendar__date">
          <div className="western">
            <div className="month">
              <p>
                {this.state.displayYear}
              </p>
              <p>
                {this.state.displayMonth} 月
              </p>
            </div>
            <div className="date">
              <p>
                {this.state.displayDate}
              </p>
            </div>
          </div>
          <hr/>
          {
            this.state.result.lunarYear && (
              <div className="lunar">
                <span className="lunartag">
                  Lunar Year
                </span>
                <span>
                { this.state.result.lunarYear + "(" + this.state.result.animalsYear + ")  " + this.state.result.lunar }
                </span>
              <hr/>
              </div>
            )
          }
          {
            this.state.result.suit && this.state.result.avoid && (
            <div>
              <div className="suit">
              <span className="suittag">
                  Suit
                </span>
                <span>
                  { this.state.result.suit}                
                </span>
             </div>
             <div className="avoid">
              <span className="avoidtag">
                  Avoid
                </span>
                <span>
                  { this.state.result.avoid}                
                </span>
             </div>
             </div>
            )
          }
         
        </div>
        
        <div className="nextdate" onClick={this.nextDate()}>
        <p>
        <i class="fas fa-chevron-circle-right"></i>

        </p>
        </div>
        </div>
        <hr/>
      </div>
    );
  }
}
export default LunarCalendar;
