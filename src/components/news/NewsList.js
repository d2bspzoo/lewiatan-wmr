import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";
import { clientConnect } from "../../client";
import Moment from "react-moment";

export class NewsList extends Component {
  constructor(props) {
    super();
    this.state = {
      news: [],
      loadingNews: true,
    };
  }

  componentDidMount() {
    if (!this.props.content) {
      this.populateNewsData();
    } else {
      this.populateNewsData(this.props.content.url);
    }
  }

  render() {
    var newsTails = [];

    if (this.state.news.length > 1 && this.state.news.length >= 4) {
      for (let i = 1; i < 4; i++) {
        newsTails.push(
          <div className="col-md-4">
            <p>
              {this.state.news[i].hasImage && (
                <a href={`/${this.props.baseUrl.url}/news/${this.state.news[i].url}`}>
                  <img
                    src={`https://cdn.bluebirdcms.net/imageasset/get/${this.state.news[i].imageAssetHash}`}
                    alt={this.state.news[i].title}
                    className="img-fluid"
                  />
                </a>
              )}
            </p>
            <h3>
              <a href={`/${this.props.baseUrl.url}/news/${this.state.news[i].url}`}>{this.state.news[i].title}</a>
            </h3>
            {HtmlReactParser(this.state.news[i].abstract)}
            <p>
              <a href={`/${this.props.baseUrl.url}/news/${this.state.news[i].url}`} className="btn btn-default">
                czytaj więcej...
              </a>
            </p>
          </div>
        );
      }
    }

    if (this.state.news.length > 1 && this.state.news.length < 4) {
      for (let i = 1; i < this.state.news.length; i++) {
        newsTails.push(
          <div className="col-md-4">
            <p>
              {this.state.news[i].hasImage && (
                <a href={`/${this.props.baseUrl.url}/news/${this.state.news[i].url}`}>
                  <img
                    src={`https://cdn.bluebirdcms.net/imageasset/get/${this.state.news[i].imageAssetHash}`}
                    alt={this.state.news[i].title}
                    className="img-fluid"
                  />
                </a>
              )}
            </p>
            <h3>
              <a href={`/${this.props.baseUrl.url}/news/${this.state.news[i].url}`}>{this.state.news[i].title}</a>
            </h3>
            {HtmlReactParser(this.state.news[i].abstract)}
            <p>
              <a href={`/${this.props.baseUrl.url}/news/${this.state.news[i].url}`} className="btn btn-default">
                czytaj więcej...
              </a>
            </p>
          </div>
        );
      }
    }

    var newsList = [];

    if (this.state.news.length >= 5) {
      for (let j = 4; j < this.state.news.length; j++) {
        newsList.push(
          <div style={{ borderBottom: "1px solid #051E38", paddingTop: "15px", paddingBottom: "15px" }} key={j}>
            <div className="row">
              <div className="col-md-12">
                <h3>
                  <a href={`/${this.props.baseUrl.url}/news/${this.state.news[j].url}`}>{this.state.news[j].title}</a>
                </h3>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <div style={{ marginBottom: "20px" }}>
          {!this.state.loadingEvents ? (
            <Fragment>
              {this.state.news.length > 0 ? (
                <Fragment>
                  <div className="row">
                    {this.state.news[0].hasImage && (
                      <div className="col-md-6">
                        <a href={`/${this.props.baseUrl.url}/news/${this.state.news[0].url}`}>
                          <img
                            src={`https://cdn.bluebirdcms.net/imageasset/get/${this.state.news[0].imageAssetHash}`}
                            alt={this.state.news[0].title}
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    )}
                    <div className={this.state.news[0].hasImage ? `col-md-6` : `col-md-12`}>
                      <h3>
                        <a href={`/${this.props.baseUrl.url}/news/${this.state.news[0].url}`}>{this.state.news[0].title}</a>
                      </h3>
                      {HtmlReactParser(this.state.news[0].abstract)}
                      <p>
                        <a href={`/${this.props.baseUrl.url}/news/${this.state.news[0].url}`} className="btn btn-default">
                          czytaj więcej...
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="row">{newsTails}</div>

                  <div className="row">{newsList}</div>
                </Fragment>
              ) : (
                <Fragment>
                  <p className="text-center" style={{ fontSize: "52px" }}>{`{...}`}</p>
                  <p className="text-center">brak aktualności</p>
                </Fragment>
              )}
            </Fragment>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
      </Fragment>
    );
  }

  async populateNewsData(url) {
    if (url) {
      this.setState({ news: await clientConnect("api/news/categorylist", url), loadingNews: false });
    } else {
      this.setState({ news: await clientConnect("api/news/list", url), loadingNews: false });
    }
  }
}

export default NewsList;
