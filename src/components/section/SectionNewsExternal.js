import React, { Component } from "react";
import PropTypes from "prop-types";
import HtmlReactParser from "html-react-parser";
import { clientConnectLewiatan } from "../../client";
import Moment from "react-moment";

export class SectionNewsExternal extends Component {
  constructor(props) {
    super();
    this.state = {
      news: [],
      loadingNews: true,
    };
  }

  componentDidMount() {
    this.populateNewsData();
  }

  styleSection = (background) => {
    return {
      backgroundColor: background,
    };
  };

  rowStyles = () => {
    return {
      marginTop: "20px",
      marginBottom: "20px",
    };
  };

  static renderNews(news) {
    let url = "news";

    return (
      <div className="news-list">
        {news.map((news, i) => (
          <div
            className="row"
            style={{
              borderBottom: "1px solid #051E38",
              paddingTop: "15px",
              paddingBottom: "15px",
            }}
            key={i}
          >
            <div className="col-md-11">
              <a href={news.url} target="_blank" className="text-blue" rel="noreferrer">
                <h3 className="news-title">{news.title}</h3>
              </a>
              {!!news.abstract && HtmlReactParser(news.abstract)}
              {news.newsShowDate && (
                <p>
                  Data publikacji: <Moment format="DD.MM.YYYY">{news.newsDate}</Moment>
                </p>
              )}
            </div>
            <div className="col-md-1">
              <p>
                <a href={news.url} target="_blank" className="text-blue" rel="noreferrer">
                  <i className="fas fa-arrow-alt-circle-right fa-2x"></i>
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    let newsList = this.state.loadingNews ? <p className="text-center">Loading...</p> : SectionNewsExternal.renderNews(this.state.news);

    return (
      <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
        {/* {HtmlReactParser(this.props.sectionContent.content)} */}
        <div className="margin-b-1"></div>
        {newsList}
      </div>
    );
  }

  async populateNewsData() {
    this.setState({
      news: await clientConnectLewiatan("api/news/list", `?channel=6e01b015-f0e1-4ed8-8a5c-647c561880f8&showdate=true&showcontent=false&page=0&items=5`),
      loadingNews: false,
    });
  }
}

SectionNewsExternal.propTypes = {
  sectioncontents: PropTypes.object,
};

export default SectionNewsExternal;
