import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";
import { clientConnectCustom } from "../../client";
import { Collapse, CardBody, Card, CardHeader } from "reactstrap";

export class CourseDetails extends Component {
  constructor(props) {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      course: [],
      loadingCourse: true,
      collapse: 0,
    };
  }

  componentDidMount() {
    this.populateCourseData("78b86d1a-dc0d-4fe3-ad87-cc29deec3b45", this.props.course);
  }

  toggle(e) {
    let event = e.target.dataset.event;
    this.setState({ collapse: this.state.collapse === event ? 0 : event });
  }

  render() {
    const { collapse } = this.state;
    const modules = this.state.course.modules;

    return (
      <Fragment>
        <div style={{ marginTop: "20px", marginBottom: "20px", paddingTop: "30px" }}>
          {!this.state.loadingCourse ? (
            <Fragment>
              <div className="row">
                <div className="col-12 xs-text-center">
                  <div className="h1" style={{ textAlign: "center" }}>
                    {this.state.course.title}
                  </div>
                  <div className="title-page-divider">&nbsp;</div>
                </div>
              </div>
              <div className="row margin-t-3">
                <div className="col-md-12">{HtmlReactParser(this.state.course.description)}</div>
              </div>

              {modules.length > 0 && (
                <div className="modulesaccordion">
                  {modules.map((module) => (
                    <Card key={module.hash}>
                      <CardHeader onClick={this.toggle} data-event={module.hash} className={collapse == module.hash ? "collapsed" : ""}>
                        {module.title}
                      </CardHeader>
                      <Collapse isOpen={collapse === module.hash}>
                        <CardBody>{HtmlReactParser(module.abstract)}</CardBody>
                      </Collapse>
                    </Card>
                  ))}
                </div>
              )}
            </Fragment>
          ) : (
            <p className="text-center">Loading...</p>
          )}

          <div style={{ paddingTop: "15px", paddingBottom: "15px", margin: "20px" }} className="text-center">
            <a href={`/${this.props.baseUrl.url}`}>wróć do listy szkoleń</a>
          </div>
        </div>
      </Fragment>
    );
  }

  async populateCourseData(lng, url) {
    this.setState({ course: await clientConnectCustom("api/course/get", `${lng}/${url}`), loadingCourse: false });
  }
}

export default CourseDetails;
