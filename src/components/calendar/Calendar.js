import React, { Fragment } from "react";
import moment from 'moment'
import('moment/locale/pl').then();

export default class Calendar extends React.Component {
    
    state = {
        dateObject: moment().add(this.props.monthOffset, "M"),
        selectedDay: null,
        weekdayshort: moment.weekdaysMin(true)
      };
      daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
      };
      year = () => {
        return this.state.dateObject.format("Y");
      };
      month = () => {
        return this.state.dateObject.format("M");
      };
      monthName = () => {
        return this.state.dateObject.format("MMMM");
      };
      currentDay = (d) => {
        if(moment().format('YYYY-MM-D') === moment(d).format('YYYY-MM-D'))
        {
            return "today"
        }
        else
        {
            return ""
        }
        //return this.state.dateObject.format("D");
      };
      sunday = (d) => {
        return moment(d).format("dddd");
      };
      firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
                     .startOf("month")
                     .format("d"); 
       return firstDay;
    };
    onDayClick = (e, d) => {
        this.setState(
          {
            selectedDay: d
          },
          () => {
            //console.log("SELECTED DAY: ", this.state.selectedDay);
          }
        );
      };

  render() {
    let weekdayshortname = this.state.weekdayshort.map(day => {
        return <th key={day}>{day}</th>;
      });
      let blanks = [];
      for (let i = 1; i < this.firstDayOfMonth(true); i++) {
        blanks.push(<td className="calendar-day empty">{""}</td>);
      }
      let daysInMonth = [];
      for (let d = 1; d <= this.daysInMonth(true); d++) {
        let currentDay = this.currentDay(`${this.year()}-${this.month()}-${d}`) ? "today" : "";
        let isSunday = this.sunday(`${this.year()}-${this.month()}-${d}`) === "niedziela" ? "sunday" : "";
        // let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
        daysInMonth.push(
          <td key={d} className={`calendar-day ${currentDay} ${isSunday}`}>
            <span
              onClick={e => {
                this.onDayClick(e, d);
              }}
            >
              {d}
            </span>
          </td>
        );
      }
      var totalSlots = [...blanks, ...daysInMonth];
      let rows = [];
      let cells = [];
  
      totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
          cells.push(row);
        } else {
          rows.push(cells);
          cells = [];
          cells.push(row);
        }
        if (i === totalSlots.length - 1) {
          rows.push(cells);
        }
      });
  
      let daysinmonth = rows.map((d, i) => {
        return <tr key={i}>
            <td></td>
            {d}
            </tr>;
      });

      return (
        <Fragment>
        {this.props.showMonthName === true &&
            <h2 className="text-center">{this.monthName()}</h2>
        }
        <div className={`text-center datetime-calendar-${this.props.size !== undefined ? this.props.size : "normal"}`}>
            <div className="calendar-date">
                <table className="calendar-day">
                <thead>
                    <tr>
                        <th></th>
                        {weekdayshortname}
                    </tr>
                </thead>
                <tbody>{daysinmonth}</tbody>
                </table>
            </div>
        </div>
        </Fragment>
    );
  }
}