import React, { Component } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";
import Calendar from "../calendar/Calendar";

export class SectionCalendar extends Component {
  constructor(props) {
    super();
    this.state = {
      events: [],
      loadingEvents: true,
    };
  }

  omponentDidMount() {
    this.populateEventsData(this.props.section.contentContentSecondary);
  }

  styleSection = (background) => {
    return {
      backgroundColor: background,
    };
  };

  rowStyles = () => {
    return {
      marginTop: "20px",
      marginBottom: "20px",
    };
  };

  render() {
    let url = "kalendarz";

    return (
      <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
        {HtmlReactParser(this.props.sectionContent.content)}

        <Calendar />
      </div>
    );
  }
}

SectionCalendar.propTypes = {
  sectioncontents: PropTypes.object,
};

export default SectionCalendar;
