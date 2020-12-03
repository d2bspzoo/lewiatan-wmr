import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import Section from '../section/Section';
import Bottom from '../shared/Bottom';
import Header from '../header/Header';

import { Helmet } from 'react-helmet';

//import {accessToken, siteId, apiUrl } from '../../config';

import { clientConnect } from '../../client';
import { Container } from 'reactstrap';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super();
        this.state = {
            homes: [], site: [], loading: true, loadingSite: true, nodes: []
        };
    }

    componentDidMount() {
        this.populateHomeData();
        this.populateSiteData();
    }

    static renderSections(homes) {
        return (
            <React.Fragment>
            {homes.sections.map(sections =>
                <Section key={sections.hash} sections={sections} />
            )}
            </React.Fragment>
        );
    }

    static renderBottom(homes) {
        return (
            <Bottom bottoms={homes.bottoms} />
        );
    }

    static renderMetatags(homes) {
        return (
            <Helmet>
                <title>{homes.metatagTitle}</title>
                <meta name="description" content={homes.metatagDesc} />
                <meta name="keywords" content={homes.metatagKeywords} />
                <meta name="robots" content={homes.metatagRobots} />
                <meta name="theme-color" content="#ffffff" />
                <meta property="og:url" content="https://www.regiony-lewiatan.pl/" />
                <meta property="og:type" content="image/png" />
                <meta property="og:title" content={homes.metatagTitle} />
                <meta property="og:description" content={homes.metatagDesc} />
                <meta property="og:image" content="https://www.regiony-lewiatan.pl/images/logo.png" />
            </Helmet>
        );
    }

    render() {

        let sections = this.state.loading
            ? <p className="text-center">Loading...</p>
            : Home.renderSections(this.state.homes)

        let bottoms = this.state.loading
            ? <p className="text-center">Loading...</p>
            : Home.renderBottom(this.state.homes)

        let metatags = this.state.loading
            ? ""
            : Home.renderMetatags(this.state.homes)

    return (
        <React.Fragment>

            {metatags}

            <Container>
                <Header />
            </Container>
            {sections}

            {bottoms}
            
        </React.Fragment>
    );
    }

    async populateHomeData() {
        /*const response = await fetch(apiUrl + 'api/home/' + siteId,
        {    
            headers: 
                {   
                'X-BBCMS-TOKEN': accessToken
            }
            
        });
        const data = await response.json();
        this.setState({ homes: data, sections: data.sectionList.sectionHash , loading: false });
        */
       this.setState({ homes: await clientConnect('api/home', null), loading: false });
    }

    async populateSiteData() {
       this.setState({ site: await clientConnect('api/site', null), loadingSite: false });
    }
}
