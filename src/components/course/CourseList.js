import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";
import { clientConnectCustom } from "../../client";

export class CourseList extends Component {
  constructor(props) {
    super();
    this.state = {
      courses: [],
      loadingCourses: true,
    };
  }

  componentDidMount() {
    if (!this.props.content) {
      this.populateCoursesData("78b86d1a-dc0d-4fe3-ad87-cc29deec3b45");
    } else {
      this.populateCoursesData("78b86d1a-dc0d-4fe3-ad87-cc29deec3b45", this.props.content);
    }
  }

  renderCourses = (courses, url) => {
    let inRow = 3;
    let Tabs = courses.length / inRow;

    let coursesList = new Array();

    function renderCols(courses, tab, cols) {
      let start = tab * cols;
      let end = start + cols;

      if (end > courses.length) {
        end = courses.length;
      }

      var colsList = new Array();

      for (let j = start; j < end; j++) {
        colsList.push(
          <div className="col-md-4" key={`${tab}.${j}`}>
            <div className="row">
              <div className="col-md-12 text-center">
                <h3>{courses[j].title}</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center small">{HtmlReactParser(courses[j].abstract)}</div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <a href={`/${url}/course/${courses[j].url}`} className="btn btn-secondary">
                  zobacz więcej...
                </a>
              </div>
            </div>
          </div>
        );
      }

      return colsList;
    }

    for (let i = 0; i < Tabs; i++) {
      let columnMultiply = 1;

      coursesList.push(
        <div className="row justify-content-md-center" key={i}>
          {renderCols(courses, i, inRow)}
        </div>
      );
    }

    return coursesList;
  };

  render() {
    let courseList = this.state.loadingCourses ? <p className="text-center">Loading...</p> : this.renderCourses(this.state.courses, this.props.baseUrl.url);

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
            <div className="col-12 xs-text-center"></div>
          </div>

          {courseList}
        </div>
      </Fragment>
    );
  }

  async populateCoursesData(lng, url) {
    if (url) {
      this.setState({ courses: await clientConnectCustom("api/course/categorylist", `${lng}/${url}`), loadingCourses: false });
    } else {
      this.setState({ courses: await clientConnectCustom("api/course/list", lng), loadingCourses: false });
    }
  }
}

export default CourseList;
