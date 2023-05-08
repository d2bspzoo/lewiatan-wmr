import React, { Component } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";

export class SectionText extends Component {
  render() {
    return (
      <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
        {!!this.props.sectionContent.content && HtmlReactParser(this.props.sectionContent.content)}
      </div>
    );
  }
}

SectionText.propTypes = {
  sectioncontents: PropTypes.object,
};

export default SectionText;
