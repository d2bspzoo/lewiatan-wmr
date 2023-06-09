import React, { Component } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";

export class SectionNewsletter extends Component {
  render() {
    return (
      <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
        {HtmlReactParser(this.props.sectionContent.content)}
      </div>
    );
  }
}

SectionNewsletter.propTypes = {
  sectioncontents: PropTypes.object,
};

export default SectionNewsletter;
