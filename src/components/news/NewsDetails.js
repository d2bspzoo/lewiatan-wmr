import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import { clientConnect } from "../../client";
import Moment from "react-moment";

export class NewsDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      news: [],
      loadingNews: true,
    };
  }

  componentDidMount() {
    this.populateNewsData(this.props.news);
  }

  render() {
    return (
      <Fragment>
        <div style={{ marginTop: "20px", marginBottom: "20px", paddingTop: "30px" }}>
          {!this.state.loadingNews ? (
            <Fragment>
              <div className="row">
                <div className="col-12 xs-text-center">
                  <div className="h1" style={{ textAlign: "center" }}>
                    {this.state.news.title}
                  </div>
                </div>
              </div>
              {this.state.news.hasImageFull && (
                <img
                  src={`https://cdn.bluebirdcms.net/imageasset/get/${this.state.news.imageAssetFullHash}`}
                  alt={this.state.news.title}
                  className="img-fluid"
                />
              )}
              <div className="row mt-3">
                <div className="col-md-12">{ReactHtmlParser(this.state.news.content)}</div>
              </div>
              {this.state.news.newsShowDate === true && (
                <p class="small">
                  Published:&nbsp;<Moment format="DD.MM.YYYY">{this.state.news.newsDate}</Moment>
                </p>
              )}
              <hr />
              <div style={{ paddingTop: "15px", paddingBottom: "15px", margin: "20px" }} className="text-center">
                <a href={`/${this.props.baseUrl.url}`}>wróć do listy</a>
              </div>
            </Fragment>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </Fragment>
    );
  }

  async populateNewsData(url) {
    this.setState({ news: await clientConnect("api/news/get", url), loadingNews: false });
  }
}

export default NewsDetails;
