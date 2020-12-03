import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

//import {accessToken, siteId, apiUrl } from '../../config';

import { clientConnect } from '../../client';

export class PageNotFound extends Component {

    static displayName = PageNotFound.name;

    constructor(props) {
        super();
        this.state = {
            site: [], loadingSite: true
        };
    }

    
    componentDidMount() {
        this.populateSiteData();
    }


    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-md-center" style={{ marginTop: '30px' }}>
                    <div className="col-md-10 text-center">
                        <a href="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Biedronka" /></a>
                        <h1>Mikołajki z Biedronką</h1>
                    </div>
                </div>
                <div className="row justify-content-md-center" style={{ marginTop: '0px' }}>
                    <div className="col-md-10 text-center">
                        <p style={{ fontSize: "88px", fontWeight:"900" }}>404</p>
                        <p style={{ marginTop: '30px', marginBottom: '30px' }}>
                        </p>
                        <p style={{ marginTop: '30px' }}>Page not found, go back to <a href="/">home page</a></p>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    async populateSiteData() {
        this.setState({ site: await clientConnect('api/site', null), loadingSite: false });
    }
}
