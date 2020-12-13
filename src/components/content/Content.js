import React, { Component } from 'react'
//import ContentText from './ContentText'
import ContentLink from './ContentLink'
import ContentNews from './ContentNews'
import ContentCalendar from './ContentCalendar'
import ContentGallery from './ContentGallery'
import ContentVideoGallery from './ContentVideoGallery'
import ContentContact from './ContentContact'
import ContentCourse from './ContentCourse'
import Section from '../section/Section'
import PropTypes from 'prop-types'
import './content.css'
import Bottom from '../shared/Bottom';
import { Container } from 'reactstrap';
import { Helmet } from 'react-helmet';

import { clientConnect } from '../../client';

export class Content extends Component {

    static displayName = Content.name;

    constructor(props) {
        super(props);
        this.state = {
            page: [], loading: true
        };
    }


    componentDidMount() {

        const { url } = this.props.match.params;
        this.populatePageData(url);

        //document.getElementById("root").style.backgroundImage = `url(${process.env.PUBLIC_URL + '/images/bcgkNormal.jpg'})`;
        //document.getElementById("root").style.backgroundPosition = 'top center';
        //document.getElementById("root").style.backgroundRepeat = 'no-repeat';
    }

    static renderPage(page, url) {
        return (
            <React.Fragment>
                <Container>
                
                {(page.module === "link") &&
                    <ContentLink content={page.content} baseUrl={url} title={page.title} />
                }

                {(page.module === "news") &&
                    <ContentNews content={page.content} baseUrl={url} title={page.title}/>
                }

                {(page.module === "calendar") &&
                    <ContentCalendar content={page.content} baseUrl={url} title={page.title}/>
                }

                {(page.module === "gallery") &&
                    <ContentGallery content={page.content} baseUrl={url} title={page.title}/>
                }

                {(page.module === "video-gallery") &&
                    <ContentVideoGallery content={page.content} baseUrl={url} title={page.title}/>
                }

                {(page.module === "contact") &&
                    <ContentContact content={page.content} baseUrl={url} title={page.title}/>
                }

                {(page.module === "custom-course") &&
                    <ContentCourse content={page.content} baseUrl={url} title={page.title} />
                }

                
                {page.sections.map(sections =>
                    <Section key={sections.hash} sections={sections} id={sections.hash} />
                )}

                </Container>
            </React.Fragment>
        );
    }

    static renderBottom(page) {
        return (
            <React.Fragment>
                <Bottom bottoms={page.bottoms} />
            </React.Fragment>
        );
    }

    static renderMetatags(page) {
        return (
            <Helmet>
                <title>{page.metaTitle}</title>
                <meta name="description" content={page.metaDescription} />
                <meta name="keywords" content={page.metaKeywords} />
                <meta name="robots" content={page.metaRobots} />
                <meta name="theme-color" content="#1f1f1f" />
                <meta property="og:url" content="https://www.regiony-lewiatan.pl/" />
                <meta property="og:type" content="image/png" />
                <meta property="og:title" content={page.metaTitle} />
                <meta property="og:description" content={page.metaDesc} />
                <meta property="og:image" content="https://www.regiony-lewiatan.pl/images/logo.png" />
            </Helmet>
        );
    }

    render() {


        let content = this.state.loading
            ? <p className="text-center">Loading...</p>
            : Content.renderPage(this.state.page, this.props.match.params)

        let bottoms = this.state.loading
            ? <p className="text-center">Loading...</p>
            : Content.renderBottom(this.state.page)

        let metatags = this.state.loading
            ? ""
            : Content.renderMetatags(this.state.page)


        return (
            <React.Fragment>

                {metatags}

                {content}

                {bottoms}

            </React.Fragment>
        )
    }

    async populatePageData(url) {
        this.setState({ page: await clientConnect('api/page/get', url), loading: false });
    }
}