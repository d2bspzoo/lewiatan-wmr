import React, { Component } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import SectionContent from './SectionContent';
import { Element } from 'react-scroll'
import { Container } from 'reactstrap';

export class Section extends Component {


    styleSection = (background) => {
        return {
            backgroundColor: background,
            marginTop: '20px',
            marginBottom: '20px',
            padding: '20px'
        }

    }

    rowStyles = () => {
        return {
            marginTop: '20px',
            marginBottom: '20px',
        }
    }

    render() {
        return (
            <React.Fragment>
                <Element id={this.props.sections.hash} name={this.props.sections.hash}>
                    {this.props.sections.inContainer == true ? 
                    <Container>
                        <section style={this.styleSection(this.props.sections.background)} className="content-section" key={this.props.sections.hash}>
                        {(this.props.sections.title != null && this.props.sections.titleShow == true) &&
                                <React.Fragment>
                                <div className="row">
                                    <div className="col-12 xs-text-center">
                                        <div className="h1" style={{ textAlign: "center" }}>{this.props.sections.title}</div>
                                        <div className="title-page-divider">&nbsp;</div>
                                    </div>
                                </div>
                                </React.Fragment>
                            }
                            <div className="row">
                                {this.props.sections.sectionContents.map((sectionContent) => 
                                    <SectionContent sectionContent={sectionContent} key={sectionContent.hash}/>
                                )}
                            </div>
                        </section>
                    </Container>
                    :
                    <React.Fragment>
                        <section style={this.styleSection(this.props.sections.background)} className="content-section" key={this.props.sections.hash}>
                        <Container>
                        {(this.props.sections.title != null && this.props.sections.titleShow == true) &&
                                <React.Fragment>
                                <div className="row">
                                    <div className="col-12 xs-text-center">
                                        <div className="h1" style={{ textAlign: "center" }}>{this.props.sections.title}</div>
                                    </div>
                                </div>
                                </React.Fragment>
                            }
                            <div className="row">
                                {this.props.sections.sectionContents.map(sectionContent => 
                                    <SectionContent sectionContent={sectionContent} key={sectionContent.hash}/>
                                )}
                            </div>
                        </Container>
                        </section>
                    </React.Fragment>
                    }
                </Element>
            </React.Fragment>
        )
    }
}

export default Section