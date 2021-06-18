import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class NewsletterOK extends Component {

    render() {
        return (

            <div class="col-lg-12 col-md-12 text-page-content">
                {(this.props.content.contentTitle != null) &&
                    <React.Fragment>
                    <h1 className="text-page-header">{this.props.content.contentTitle}</h1>
                    <div className="title-page-divider"></div>
                    </React.Fragment>
                }

                {ReactHtmlParser(ReactHtmlParser(this.props.content.contentContent))}

                {(this.props.content.contentShowdate == true) &&
                    <p class="small">Data aktualizacji:
                    {new Intl.DateTimeFormat("pl-PL", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                    }).format(this.props.content.contentDate)}
                    </p>
                }
            </div>
        )
    }
}

NewsletterOK.propTypes = {
    content: PropTypes.object
}

export default NewsletterOK