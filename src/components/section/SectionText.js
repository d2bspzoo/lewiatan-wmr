import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class SectionText extends Component {
    render() {
        return (
            <div className={`col-lg-${this.props.sectionContent.widthInColumns} col-md-${this.props.sectionContent.widthInColumns} xs-text-center`}>
                {ReactHtmlParser(this.props.sectionContent.content)}
            </div>
        )
    }
}

SectionText.propTypes = {
    sectioncontents: PropTypes.object
}

export default SectionText
