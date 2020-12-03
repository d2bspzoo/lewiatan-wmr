import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class SectionNews extends Component {

    constructor(props) {
        super();
        this.state = {
            news: [], loadingNews: true
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
            <React.Fragment>
            <div className="row justify-content-md-center">
                {news.map((news, i) => 

                    <div className="row">
                        <div className="col-md-12">
                            <h3>{news.title}</h3>
                            {ReactHtmlParser(ReactHtmlParser(news.abstract))}
                            {news.newsShowDate && 
                            <p>Published: {news.newsDate}</p>
                            }
                            <p><a href={`/${url}/news/${news.url}`} className="btn btn-default">read more...</a></p>
                        </div>
                    </div>

                )}
            </div>
            </React.Fragment>
            )
    }

    render() {

        let newsList = this.state.loadingNews
            ? <p className="text-center">Loading...</p>
            : SectionNews.renderNews(this.state.news)

        return (
            <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
                {ReactHtmlParser(this.props.sectionContent.content)}

                {newsList}

            </div>
        )
    }
}

SectionNews.propTypes = {
    sectioncontents: PropTypes.object
}

export default SectionNews
