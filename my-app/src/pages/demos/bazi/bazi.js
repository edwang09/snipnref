import React, { Component } from "react";
import taichi from "./taichi.png";
import isEmpty from "../../../utils/is-empty";
import BaziInfo from "./baziInfo"

class Bazi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month:1,
      date:1,
      year:1991,
      hour:0,
      tiangan: BaziInfo.tiangan,
      dizhimonthref: BaziInfo.dizhimonthref,
      dizhihourref: BaziInfo.dizhihourref,
      dizhi: BaziInfo.dizhi,
      monthfixer: BaziInfo.monthfixer,
      pillars: {
        yearPillar: "--",
        monthPillar: "--",
        dayPillar: "--",
        hourPillar: "--"
      }
    };
  }

  fixMonth = () => {
      const { month, date } = this.state;
      var newmonth = month;
      if (this.state.monthfixer[month - 1] > date) {
        //day before jieqi
      } else {
        newmonth = newmonth + 1;
      }
      return newmonth;
  };
  getPillars = () => {
      const datediff =
        36000000 +
        Math.round(
          (new Date(this.state.year, this.state.month - 1, this.state.date) -
            new Date(2018, 4, 31)) /
            (1000 * 60 * 60 * 24)
        );
      const { year, hour } = this.state;
      const month = this.fixMonth();
      const yearPillar =
        this.state.tiangan[(year - 3) % 10] + this.state.dizhi[(year - 3) % 12];
      const monthPillar =
        this.state.dizhimonthref[(year - 3) % 5][month % 12] +
        this.state.dizhi[month % 12];
      const dayPillar =
        this.state.tiangan[datediff % 10] + this.state.dizhi[datediff % 12];
      const hournumber = Math.floor(((hour + 1) % 24) / 2 + 1) % 12;
      const hourPillar =
        this.state.dizhihourref[datediff % 5][hournumber] +
        this.state.dizhi[hournumber];
      return { yearPillar, monthPillar, dayPillar, hourPillar };
  };
  onChange = () => e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  calculate = () => {
    this.setState({ pillars: this.getPillars() });
  };
  render() {
    const dateSelect = [...Array(31).keys()].map((str, id)=>{
      return (<option value={id+1}>{id+1}</option>)
    })
    const yearSelect = [...Array(200).keys()].map((str, id)=>{
      return (<option value={id+1900}>{id+1900}</option>)
    })
    const hourSelect = [...Array(24).keys()].map((str, id)=>{
      return (<option value={id}>{id+" : 00"}</option>)
    })
    return (
      <div className="bazi">
        <h1>
          Calculate your Four Pillars of Destiny
        </h1>
        <p>
          The Four Pillars of Destiny is a
          Chinese astrological concept that a person's destiny or fate can be
          divined by the two sexagenary cycle characters assigned to their birth
          year, month, day, and hour. This type of astrology is also used in
          Japan and Korea.
        </p>
        <p >
          In order to accuratly calculate your Four Pillars of Destiny,
          information including your birth year, month, day, and hour needs to
          be provided.
        </p>
        <hr/>
        <form className="form" id="baziform">
          <div className="formgroup">
            <label htmlFor="month">Month:</label>
            
            <select name="month" form="baziform" value={this.state.month}
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
            
            <select name="date" form="baziform" value={this.state.date}
              onChange={this.onChange()}>
              {dateSelect}
            </select>
          </div>
          <div className="formgroup">
            <label htmlFor="year">Year:</label>
            <select name="year" form="baziform" value={this.state.year}
              onChange={this.onChange()}>
              {yearSelect}
            </select>
          </div>
          <div className="formgroup">
            <label htmlFor="hour">Hour:</label>
            <select name="hour" form="baziform" value={this.state.hour}
              onChange={this.onChange()}>
              {hourSelect}
            </select>
          </div>
        </form>
        <div className="submit">
          <a href="#result">
            <img
              src={taichi}
              alt=""
              width="200rem"
              height="200rem"
              onClick={this.calculate.bind(this)}
              className="taichi"
            />
          </a>
        </div>
        <hr/>
        <p>
          Here are the results. Contact Mian Yin for detail explanations.
        </p>
        <div className="result" id="result">
          <div className="result__pillar">
            <h3>年柱(Year Pillar)</h3>
            <p className="result__text">
              {this.state.pillars.yearPillar}
            </p>
          </div>
          <div className="result__pillar">
            <h3>月柱(Month Pillar)</h3>
              <p className="result__text">
                {this.state.pillars.monthPillar}
              </p>
          </div>
          <div className="result__pillar">
            <h3>日柱(Day Pillar)</h3>
              <p className="result__text">
                {this.state.pillars.dayPillar}
              </p>
          </div>
          <div className="result__pillar">
            <h3>时柱(Hour Pillar)</h3>
              <p className="result__text">
                {this.state.pillars.hourPillar}
              </p>
          </div>
        </div>
        <hr/>
        <p>
          All calculations are based on algorithm provided by Mian Yin who is a Fengshui Consultant in North Carolina. Please visit her <a href="www.amethystfs891.com" target="_blank">site</a> for further information and interpretation.
        </p>
      </div>
    );
  }
}
export default Bazi;
