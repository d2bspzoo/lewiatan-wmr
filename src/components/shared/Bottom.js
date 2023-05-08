import React, { Component } from "react";
import PropTypes from "prop-types";
import BottomContent from "./BottomContent";

export class Bottom extends Component {
  styleSection = (margintop, marginbottom) => {
    return {
      marginTop: `${margintop}px`,
      marginBottom: `${marginbottom}px`,
    };
  };

  render() {
    return (
      <div className="bottomSection" style={this.styleSection(this.props.bottoms.marginTop, this.props.bottoms.marginBottom)}>
        <div className="container">
          <div className="row">
            {this.props.bottoms.bottomContents.map((bottomContent) => (
              <BottomContent bottomContent={bottomContent} key={bottomContent.hash} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Bottom.propTypes = {
  bottomcontent: PropTypes.array,
};

export default Bottom;
