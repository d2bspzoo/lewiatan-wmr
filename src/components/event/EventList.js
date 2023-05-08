import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { clientConnect } from "../../client";
import Moment from "react-moment";
import Calendar from "../calendar/Calendar";

export class EventList extends Component {
  constructor(props) {
    super();
    this.state = {
      events: [],
      loadingEvents: true,
    };
  }

  componentDidMount() {
    if (!this.props.content) {
      this.populateEventsData();
    } else {
      this.populateEventsData(this.props.content);
    }
  }

  render() {
    return (
      <Fragment>
        <div style={{ marginTop: "20px", marginBottom: "20px", paddingTop: "30px" }}>
          <div className="row">
            <div className="col-12 xs-text-center">
              <div className="h1" style={{ textAlign: "center" }}>
                {this.props.title}
              </div>
              <div className="title-page-divider">&nbsp;</div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Calendar showMonthName={true} size="large" />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <Calendar showMonthName={true} size="small" monthOffset="1" />
            </div>
            <div className="col-md-6">
              <Calendar showMonthName={true} size="small" monthOffset="2" />
            </div>
          </div>

          {!this.state.loadingEvents ? (
            <div className="mt-4">
              <div style={{ marginTop: "40px" }}></div>
              <div className="h1">Nadchodzące wydarzenia</div>
              <div className="title-page-divider">&nbsp;</div>
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
      </Fragment>
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

export default EventList;
