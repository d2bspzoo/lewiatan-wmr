import React, { Component, Fragment } from 'react';
import { NavMenu } from './shared/NavMenu';
//import { NavMenuComponent } from './shared/NavMenuComponent';
import { SlideMenu } from './shared/SlideMenu';
import { MobileMenu } from './shared/MobileMenu';
//import { MobileMenuComponent } from './shared/MobileMenuComponent';
import Footer from './footer/Footer';
import TopNavEU from './shared/TopNavUE'

import { Responsive } from "responsive-react";

import { CookieBanner } from './cookies/Cookiesindex';

import MessengerCustomerChat from './messangerChat/MessangeChat';

import { clientConnect } from '../client';

export class Layout extends Component {
    static displayName = Layout.name;

    constructor(props) {
        super();

        this.state = {
            menuOpen: false,
            static: [], 
            site: [],
            loadingStatic: false,
            loadingSite: false
        };

    }

    callbackFunction = (childData) => {
        this.setState({ menuOpen: childData })
    }

    componentDidMount() {
        this.populateStaticData();
        this.populateSiteData();
    }

    render() {

        let menu;
        let menuMobile;
        menu = <NavMenu menuOpen={this.state.menuOpen} navMenuCallback={this.callbackFunction} path={this.props.path} />;
        menuMobile = <MobileMenu menuOpen={this.state.menuOpen} slideMenuCallback={this.callbackFunction} path={this.props.path} />;
        /*if (this.props.path === "/") {
            menu = <NavMenu menuOpen={this.state.menuOpen} navMenuCallback={this.callbackFunction}  />;
            menuMobile = <MobileMenu menuOpen={this.state.menuOpen} slideMenuCallback={this.callbackFunction} />;
        } else {
            menu = <NavMenuComponent menuOpen={this.state.menuOpen} navMenuCallback={this.callbackFunction} />;
            menuMobile = <MobileMenuComponent menuOpen={this.state.menuOpen} slideMenuCallback={this.callbackFunction} />;
        }*/

        return (
            <Fragment>
            <header>
            <TopNavEU />
                <Responsive displayIn={["Mobile", "Tablet"]}>
                    {menuMobile}
                </Responsive>
                <Responsive displayIn={["Laptop", "LargerThanLaptop"]}>
                    <SlideMenu menuOpen={this.state.menuOpen} slideMenuCallback={this.callbackFunction} />
                    {menu}
                </Responsive>       
            </header>
            <main>
              {this.props.children}
            </main>
            <Footer />
            <CookieBanner
                message={this.state.static.cookieNotice}
                onAccept={() => { }}
                onAcceptPreferences={() => { }}
                onAcceptStatistics={() => { }}
                onAcceptMarketing={() => { }}
                policyLink={this.state.static.cookieLink}
                privacyPolicyLinkText={this.state.static.cookieNoticeLinkAnchor}
                necessaryOptionText={this.state.static.cookieNecessary}
                preferencesOptionText={this.state.static.cookiePreferences}
                marketingOptionText={this.state.static.cookieMarketing}
                statisticsOptionText={this.state.static.cookieStatistic}
                acceptButtonText={this.state.static.cookieAgreeBtn}
                listTitle={this.state.static.cookieListTitle}
                cookieName = {this.state.site.name}
            />

            <MessengerCustomerChat
                pageId="102482075067970"
                themeColor= "#051E38"
                language = "pl-PL"
                version ="9.0"
                attribution = "setup_tool"
                loggedInGreeting = "Witaj! Masz pytanie? Porozmawiaj z nami!"
                loggedOutGreeting ="Witaj! Masz pytanie? Porozmawiaj z nami!"
                />

          </Fragment>
    );
    }

    async populateStaticData() {
        /*const response = await fetch(apiUrl + 'api/static/' + siteId,
        {    
            headers: 
                {   
                'X-BBCMS-TOKEN': accessToken 
            }
            
        });
        const data = await response.json();
        this.setState({ static: data, loading: false });
        */

        this.setState({ static: await clientConnect('api/static', null), loadingStatic: false });
    }

    async populateSiteData() {
        /*
        const response = await fetch(apiUrl + 'api/site/' + siteId,
        {    
            headers: 
                {   
                'X-BBCMS-TOKEN': accessToken 
            }
            
        });
        const data = await response.json();
        this.setState({ site: data, loadingSite: false });
        */

       this.setState({ site: await clientConnect('api/site', null), loadingSite: false });
    }
}
