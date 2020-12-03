import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import BottomContent from './BottomContent';

export class Bottom extends Component {
    render() {
        return (
                
            <div className="bottomSection">
                <div className="container">

                    <div className="row">
                        {this.props.bottoms.bottomContents.map((bottomContent) => 
                            <BottomContent bottomContent={bottomContent} key={bottomContent.hash}/>
                        )}
                    </div>

                </div>
            </div>
            )
    }
}

Bottom.propTypes = {
    bottomcontent: PropTypes.array
}

export default Bottom
