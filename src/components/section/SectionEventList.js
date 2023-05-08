import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";
import Moment from "react-moment";

import { clientConnect } from "../../client";

export class SectionEventList extends Component {
  constructor(props) {
    super();
    this.state = {
      events: [],
      loadingEvents: true,
    };
  }

  componentDidMount() {
    if (!this.props.sectionContent.contentSecondary) {
      this.populateEventsData();
    } else {
      this.populateEventsData(this.props.sectionContent.contentSecondary);
    }
  }

  render() {
    return (
      <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
        {HtmlReactParser(this.props.sectionContent.content)}

        {!this.state.loadingEvents ? (
          <div className="mt-4">
            {this.state.events.length > 0 ? (
              this.state.events.map((event, i) => (
                <Fragment>
                  <div style={{ borderBottom: "1px solid #051E38", paddingTop: "15px", paddingBottom: "15px" }} key={i}>
                    <div className="row">
                      <div className="col-md-12">
                        <h3>{event.title}</h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p>
                          <i className="fas fa-clock"></i> <strong>Początek:</strong> <Moment format="DD.MM.YYYY">{event.dateStart}</Moment> godz.{" "}
                          <Moment format="HH:mm">{event.dateStart}</Moment>
                          <br />
                          {event.isOnline === true ? (
                            <span>
                              <i className="fas fa-globe"></i> <strong>Spotkanie online</strong>
                            </span>
                          ) : (
                            <span>
                              <i className="fas fa-location-arrow"></i> <strong>Miejsce:</strong> {event.place}, {event.city}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <a href={`/${this.props.baseUrl.url}/event/${event.url}`} className="btn btn-secondary">
                          zobacz więcej...
                        </a>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))
            ) : (
              <Fragment>
                <p className="text-center" style={{ fontSize: "52px" }}>{`{...}`}</p>
                <p className="text-center">brak nadchodzących wydarzeń</p>
              </Fragment>
            )}
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    );
  }

  async populateEventsData(url) {
    if (url) {
      this.setState({ events: await clientConnect("api/event/categorylist", url), loadingEvents: false });
    } else {
      this.setState({ events: await clientConnect("api/event/list", url), loadingEvents: false });
    }
  }
}

SectionEventList.propTypes = {
  sectioncontents: PropTypes.object,
};

export default SectionEventList;
