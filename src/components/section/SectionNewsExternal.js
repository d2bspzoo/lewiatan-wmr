import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class SectionNewsExternal extends Component {

    constructor(props) {
        super();
        this.state = {
            news: [
                { 
                    title: 'Access2Markets - nowy portal dla firm chcących eksportować lub importować produkty lub usługi',
                    url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/access2markets__nowy_portal_dla_firm_chcacych_eksportowac_lub_importowac_produkty_lub_uslugi',
                    newsShowDate: true,
                    newsDate: '2020-12-07'
                },
                { 
                    title: 'Bezrobocie nie rośnie. Tarcze antykryzysowe chronią miejsca pracy',
                    url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/bezrobocie_nie_rosnie_tarcze_antykryzysowe_chronia_miejsca_pracy_',
                    newsShowDate: true,
                    newsDate: '2020-12-07'
                },
                { 
                    title: 'Badanie Lewiatana: Brak strategii rządu to główna bariera inwestycji proklimatycznych',
                    url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/badanie_lewiatana_brak_strategii_rzadu_to_glowna_bariera_inwestycji_proklimatycznych',
                    newsShowDate: true,
                    newsDate: '2020-12-07'
                },
                { 
                    title: 'Dostępność w praktyce',
                    url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/dostepnosc_w_praktyce',
                    newsShowDate: true,
                    newsDate: '2020-12-06'
                },
                { 
                    title: 'Krajowy Rejestr Mediatorów – Konfederacja Lewiatan jednym z partnerów nowego projektu MS dot. mediacji.',
                    url: 'http://konfederacjalewiatan.pl/aktualnosci/2020/1/krajowy_rejestr_mediatorow__konfederacja_lewiatan_jednym_z_partnerow_nowego_projektu_ms_dot_mediacji',
                    newsShowDate: true,
                    newsDate: '2020-12-03'
                }
                

            ], loadingNews: false
        };
    }

    omponentDidMount() {
        this.populateNewsData(this.props.section.contentContentSecondary);
    }

    styleSection = (background) => {
        return {
            backgroundColor: background
        }

    }

    rowStyles = () => {
        return {
            marginTop: '20px',
            marginBottom: '20px',
        }
    }

    static renderNews(news) {

            let url = "news";

            return(
                <div className="news-list">
                {news.map((news, i) => 

                    <div className="row" style={{borderBottom:"1px solid #051E38", paddingTop:"15px", paddingBottom:"15px"}} key={i}>
                        <div className="col-md-11">
                            <a href={news.url} target="_blank" className="text-blue"><h3 className="news-title">{news.title}</h3></a>
                            {ReactHtmlParser(ReactHtmlParser(news.abstract))}
                            {news.newsShowDate && 
                            <p>Data publikacji: {news.newsDate}</p>
                            }
                        </div>
                        <div className="col-md-1">
                            <p><a href={news.url} target="_blank" className="text-blue"><i className="fas fa-arrow-alt-circle-right fa-2x"></i></a></p>    
                        </div>
                    </div>

                )}
                </div>
            )
    }

    render() {

        let newsList = this.state.loadingNews
            ? <p className="text-center">Loading...</p>
            : SectionNewsExternal.renderNews(this.state.news)

        return (
            <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
                
                {ReactHtmlParser(this.props.sectionContent.content)}
                <div className="margin-b-1"></div>
                {newsList}

            </div>
        )
    }
}

SectionNewsExternal.propTypes = {
    sectioncontents: PropTypes.object
}

export default SectionNewsExternal
