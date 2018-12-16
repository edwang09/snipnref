import React, { Component } from "react";
import { DatePicker, Card } from "antd";
import taichi from "./taichi.png";
import isEmpty from "../../../utils/is-empty";
import BaziInfo from "./baziInfo"

class Bazi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateString: "",
      tiangan: BaziInfo.tiangan,
      dizhimonthref: BaziInfo.dizhimonthref,
      dizhihourref: BaziInfo.dizhihourref,
      dizhi: BaziInfo.dizhi,
      monthfixer: BaziInfo.monthfixer,
      pillars: {
        yearPillar: "暂无",
        monthPillar: "暂无",
        dayPillar: "暂无",
        hourPillar: "暂无"
      }
    };
  }

  fixMonth = extractdate => {
    if (isEmpty(extractdate)) {
      throw new Error("Parameter is not valid!");
    } else {
      const { month, day } = extractdate;
      var newmonth = month;
      if (this.state.monthfixer[month - 1] > day) {
        //day before jieqi
      } else {
        newmonth = newmonth + 1;
      }
      return { ...extractdate, month: newmonth };
    }
  };
  getPillars = extractdate => {
    if (isEmpty(extractdate)) {
      throw new Error("Parameter is not valid!");
    } else {
      const datediff =
        36000000 +
        Math.round(
          (new Date(extractdate.year, extractdate.month - 1, extractdate.day) -
            new Date(2018, 4, 31)) /
            (1000 * 60 * 60 * 24)
        );
      const { year, month, hour } = this.fixMonth(extractdate);
      const yearPillar =
        this.state.tiangan[(year - 3) % 10] + this.state.dizhi[(year - 3) % 12];
      const monthPillar =
        this.state.dizhimonthref[(year - 3) % 5][month % 12] +
        this.state.dizhi[month % 12];

      console.log(datediff % 60);
      const dayPillar =
        this.state.tiangan[datediff % 10] + this.state.dizhi[datediff % 12];
      const hournumber = Math.floor(((hour + 1) % 24) / 2 + 1) % 12;
      const hourPillar =
        this.state.dizhihourref[datediff % 5][hournumber] +
        this.state.dizhi[hournumber];
      return { yearPillar, monthPillar, dayPillar, hourPillar };
    }
  };
  extractpillars = dateString => {
    if (typeof dateString === "string" && dateString !== "") {
      const year = parseInt(dateString.split(" ")[0].split("-")[0], 10);
      const month = parseInt(dateString.split(" ")[0].split("-")[1], 10);
      const day = parseInt(dateString.split(" ")[0].split("-")[2], 10);
      const hour = parseInt(dateString.split(" ")[1].split(":")[0], 10);
      return { year, month, day, hour };
    }
    return {};
  };
  onChange = e => (value, dateString) => {
    this.setState({ dateString });
  };
  calculate = () => {
    console.log("Formatted Selected Time: ", this.state.dateString);
    const pillars = this.extractpillars(this.state.dateString);
    this.setState({ pillars: this.getPillars(pillars) });
  };

  onOk = e => value => {
    console.log("onOk: ", value);
  };
  render() {
    return (
      <div className="container p-3 shadow  main">
        <h1 className="display-5 text-center">
          Calculate your Four Pillars of Destiny
        </h1>
        <h2 className="lead p-3">
          <i className="fas fa-info-circle" /> The Four Pillars of Destiny is a
          Chinese astrological concept that a person's destiny or fate can be
          divined by the two sexagenary cycle characters assigned to their birth
          year, month, day, and hour. This type of astrology is also used in
          Japan and Korea.
        </h2>
        <h2 className="lead p-3">
          1. In order to accuratly calculate your Four Pillars of Destiny,
          information including your birth year, month, day, and hour needs to
          be provided.
        </h2>
        <div className="row justify-content-md-center">
          <div className="col-md-12 col-lg-6">
            <h2 className="lead p-3">
              <i className="fas fa-calendar-alt" /> Enter your Birth Date and
              Time
            </h2>
            <DatePicker
              className="d-block"
              dropdownClassName="d-block"
              showTime
              format="YYYY-MM-DD HH:mm"
              placeholder="Please enter your Date of Birth"
              onChange={this.onChange()}
              onOk={this.onOk()}
              renderExtraFooter={() => "Time can be accurate into a minute."}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <a href="#result">
            <img
              src={taichi}
              alt=""
              width="200rem"
              height="200rem"
              onClick={this.calculate.bind(this)}
              className="rounded mx-auto d-block m-5 taichi-icon"
            />
          </a>
        </div>
        <h2 className="lead p-3">
          2. Here are the results. Contact Mian Yin for detail explanations.
        </h2>
        <div className="row justify-content-center text-center" id="result">
          <div className="col-md-6 col-lg-3 p-3">
            <Card title="年柱(Year Pillar)">
              <p className="pillar-result m-auto">
                {this.state.pillars.yearPillar}
              </p>
            </Card>
          </div>
          <div className="col-md-6 col-lg-3 p-3">
            <Card title="月柱(Month Pillar)">
              <p className="pillar-result m-auto">
                {this.state.pillars.monthPillar}
              </p>
            </Card>
          </div>
          <div className="col-md-6 col-lg-3 p-3">
            <Card title="日柱(Day Pillar)">
              <p className="pillar-result m-auto">
                {this.state.pillars.dayPillar}
              </p>
            </Card>
          </div>
          <div className="col-md-6 col-lg-3 p-3">
            <Card title="时柱(Hour Pillar)">
              <p className="pillar-result m-auto">
                {this.state.pillars.hourPillar}
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default Bazi;
