import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from "react-html-parser";
import { clientConnectLewiatan } from "../../client";
import Moment from "react-moment";

export class SectionNewsExternal extends Component {
  constructor(props) {
    super();
    this.state = {
      news: [
        //     {
        //         title: 'Lewiatan apeluje o zawarcie paktu społecznego',
        //         url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/_lewiatan_apeluje_o_zawarcie_paktu_spolecznego',
        //         newsShowDate: true,
        //         newsDate: '2020-12-21'
        //     },
        //     {
        //         title: 'Konsultacje',
        //         url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/konsultacje',
        //         newsShowDate: true,
        //         newsDate: '2020-12-21'
        //     },
        //     {
        //         title: 'Sprzedaż detaliczna spętana obostrzeniami w handlu',
        //         url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/sprzedaz_detaliczna_spetana_obostrzeniami_w_handlu',
        //         newsShowDate: true,
        //         newsDate: '2020-12-21'
        //     },
        //     {
        //         title: 'Wkrótce ruszą konsultacje społeczne Krajowego Planu Odbudowy',
        //         url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/wkrotce_rusza_konsultacje_spoleczne_krajowego_planu_odbudowy',
        //         newsShowDate: true,
        //         newsDate: '2020-12-18'
        //     },
        //     {
        //         title: 'Europejski Komitet Ekonomiczno-Społeczny ruszył do pracy',
        //         url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/europejski_komitet_ekonomicznospoleczny_ruszyl_do_pracy',
        //         newsShowDate: true,
        //         newsDate: '2020-12-17'
        //     }
      ],
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
              <a href={news.url} target="_blank" className="text-blue">
                <h3 className="news-title">{news.title}</h3>
              </a>
              {ReactHtmlParser(ReactHtmlParser(news.abstract))}
              {news.newsShowDate && (
                <p>
                  Data publikacji: <Moment format="DD.MM.YYYY">{news.newsDate}</Moment>
                </p>
              )}
            </div>
            <div className="col-md-1">
              <p>
                <a href={news.url} target="_blank" className="text-blue">
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
        {ReactHtmlParser(this.props.sectionContent.content)}
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
