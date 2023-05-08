import React, { Component } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";

export class BottomContent extends Component {
  render() {
    return (
      <div className={`col-lg-${this.props.bottomContent.widthInColumns} col-md-${this.props.bottomContent.widthInColumns} xs-text-center`}>
        {HtmlReactParser(this.props.bottomContent.content)}
      </div>
    );
  }
}

BottomContent.propTypes = {
  bottomcontent: PropTypes.object,
};

export default BottomContent;
