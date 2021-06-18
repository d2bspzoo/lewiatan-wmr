import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import { clientConnect } from "../../client";
import Moment from "react-moment";

export class SectionNews extends Component {
  constructor(props) {
    super();
    this.state = {
      news: [],
      loadingNews: true,
    };
  }

  componentDidMount() {
    this.populateNewsData("78b86d1a-dc0d-4fe3-ad87-cc29deec3b45", this.props.sectionContent.contentSecondary, 3);
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
    let url = "aktualnosci";
    let colsNum = 12 / news.length;
    return (
      <React.Fragment>
        <div className="row justify-content-md-center">
          <div className="col-md-12">
            {news.length > 0 ? (
              <div className="row">
                {news.map((news, i) => (
                  <div className={`col-md-${colsNum} news-slice`}>
                    <h3>{news.title}</h3>
                    {ReactHtmlParser(news.abstract)}
                    {news.newsShowDate && (
                      <p className="small">
                        Data publikacji: <Moment format="DD.MM.YYYY">{news.newsDate}</Moment>
                      </p>
                    )}
                    <p style={{ marginBottom: "0px" }}>
                      <a href={`/${url}/news/${news.url}`} className="btn btn-default">
                        czytaj więcej...
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <Fragment>
                <p className="text-center" style={{ fontSize: "52px" }}>{`{...}`}</p>
                <p className="text-center">brak aktualności</p>
              </Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    let newsList = this.state.loadingNews ? <p className="text-center">Loading...</p> : SectionNews.renderNews(this.state.news);

    return (
      <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
        {ReactHtmlParser(this.props.sectionContent.content)}

        {newsList}
      </div>
    );
  }

  async populateNewsData(lng, url, itemsNum) {
    if (url) {
      this.setState({ news: await clientConnect("api/news/categorylist", `${lng}/${url}/0/${itemsNum}`), loadingNews: false });
    } else {
      this.setState({ news: await clientConnect("api/news/list", `${lng}/0/${itemsNum}`), loadingNews: false });
    }
  }
}

SectionNews.propTypes = {
  sectioncontents: PropTypes.object,
};

export default SectionNews;
