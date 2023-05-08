import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import EventDetails from "../event/EventDetails";
import EventList from "../event/EventList";

export class ContentCalendar extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row" style={{ marginBottom: "30px" }}>
            <div className="col-lg-12 col-md-12 text-page-content">
              {(() => {
                switch (this.props.baseUrl.mode) {
                  case "event":
                    return <EventDetails event={this.props.baseUrl.itemurl} baseUrl={this.props.baseUrl} />;
                  default:
                    return <EventList baseUrl={this.props.baseUrl} content={this.props.content} title={this.props.title} />;
                }
              })()}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

ContentCalendar.propTypes = {
  content: PropTypes.object,
};

export default ContentCalendar;
