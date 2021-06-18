import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import NewsDetails from "../news/NewsDetails";
import NewsList from "../news/NewsList";

export class ContentNews extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col-lg-12 col-md-12 text-page-content">
            {(() => {
              switch (this.props.baseUrl.mode) {
                case "news":
                  return <NewsDetails news={this.props.baseUrl.itemurl} baseUrl={this.props.baseUrl} />;
                default:
                  return <NewsList baseUrl={this.props.baseUrl} content={this.props.content} title={this.props.title} />;
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

ContentNews.propTypes = {
  content: PropTypes.object,
};

export default ContentNews;
