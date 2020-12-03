import React, { Component, Fragment } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import {accessToken, siteId, apiUrl } from '../../config';

import { clientConnect } from '../../client';

import './SlideMenu.css'
import './NavMenu.css'

export class MobileMenu extends Component {
    static displayName = MobileMenu.name;

    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super();

        this.state = {
            mainMenus: [],
            secondaryMenus: [],
            loadingMain: true,
            loadingSecondary: true,
            menuOpen: false,
            color: 'transparent'
        };
    }

    listenScrollEvent = e => {
        if (window.scrollY > 100) {
            this.setState({ color: '#262626' })
        }
        else {
            this.setState({ color: 'transparent' })
        }
    }

    sendData = () => {
        this.props.slideMenuCallback(this.state.menuOpen);
    }

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange(state) {
        this.setState({ menuOpen: state.isOpen }, this.sendData)
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu() {
        this.setState({ menuOpen: false })
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu() {
        this.setState(state => ({ menuOpen: !state.menuOpen }))
    }

    componentDidMount() {
        this.populateSecondaryMenuData();
        this.populateMainMenuData();
        window.addEventListener('scroll', this.listenScrollEvent)
    }


    renderLink(item) {
        switch (item.miModule) {
            case 'text':
                return <a key={item.id} id={item.miUrl} className="bm-item menu-item" href={`/${item.miUrl}`}>{item.miTitle}</a>;
            default:
              return 'foo';
          }
        }


    // static renderMenu(navMenus) {

    //     return (
    //         <React.Fragment>
    //             {navMenus.length > 0 &&
    //                 <React.Fragment>
    //                     {navMenus.menuList[0].map((menuItem, i) =>
    //                     <div key={i}>
    //                         {menuItem.miModule.includes("section") ?
    //                             <ScrollLink
    //                                 to={menuItem.url}
    //                                 spy={true}
    //                                 smooth={true}
    //                                 duration={500}
    //                                 offset={-180}
    //                                 className="bm-item menu-item">{menuItem.title}</ScrollLink>
    //                             :
    //                             <a key={i} id={menuItem.url} className="bm-item menu-item" href={menuItem.url}>{menuItem.title}</a>
    //                         }
    //                     </div>
    //             )}
    //                 </React.Fragment>
    //             }       
    //         </React.Fragment>
    //     );
    // }

    static renderSecondaryMenu(slideMenus) {
        return (
            <React.Fragment>
                {slideMenus.length > 0 && 
                <React.Fragment>
                    {slideMenus.map((slideMenuItem, i) => {
                    switch (slideMenuItem.module) {
                        case 'text':
                            return <a key={i} id={slideMenuItem.url} className="bm-item menu-item" href={`/${slideMenuItem.url}`}>{slideMenuItem.title}</a>
                        case 'link':
                            return <a key={i} id={slideMenuItem.url} className="bm-item menu-item" href={`/${slideMenuItem.url}`}>{slideMenuItem.title}</a>
                        default:
                            return <a key={i} id={slideMenuItem.url} className="bm-item menu-item" href={`/${slideMenuItem.url}`}>{slideMenuItem.title}</a>
                    }    
                })
                }
                </React.Fragment>
                }
            </React.Fragment>
        );
    }

    render() {


        const mainMenu = this.state.loadingMain
            ? <p className="text-center"></p>
            : this.state.mainMenus.menuList[0]

        let secondaryMenu = this.state.loadingSecondary
            ? <p className="text-center">Loading...</p>
            : MobileMenu.renderSecondaryMenu(this.state.secondaryMenus)

        //const { mainMenu } = this.state.mainMenus;

        return (
            <React.Fragment>
                <Menu right customBurgerIcon={false} customCrossIcon={<i className="fa fa-times"></i>} isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)} width={'350px'}>
                    {!this.state.loadingMain && 
                        mainMenu.menu.map((menuItem, i) =>
                        <div key={i} >
                            {menuItem.module.includes("section") ?
                                <React.Fragment>
                                    {this.props.path == "/"?
                                    <ScrollLink
                                    onClick={() => this.toggleMenu()}
                                    to={menuItem.url}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    offset={-180}
                                    className="bm-item menu-item">{menuItem.title}</ScrollLink>
                                    :
                                    <a key={i} id={menuItem.url} className="bm-item menu-item" href={`/#${menuItem.url}`}>{menuItem.title}</a>
                                }
                                </React.Fragment>       
                                :
                                <a key={i} id={menuItem.url} className="bm-item menu-item" href={menuItem.url}>{menuItem.title}</a>
                            }
                        </div>
                    )}
                    <hr />
                    {this.state.secondaryMenus.length > 0 &&
                    <Fragment>
                    {secondaryMenu}
                    <hr/>
                    </Fragment>
                    }
                    <div style={{marginTop:"20px", textAlign:"center"}}>
                    <a className="bm-item menu-item-small" href="#"><i className="fa fa-user"></i> Logowanie</a>
                    </div>
                </Menu>

                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white mb-3" dark fixed="top" style={{ backgroundColor: global.window.scrollY > 100 ? "#262626" : "transparent" }}>
                        <Container>
                            <NavbarBrand href="/"><img src={process.env.PUBLIC_URL + '/images/logo_transp.png'} alt="Lewiatian Regionalna Platforma Dialogu" /></NavbarBrand>
                           
                            <div className="col col-md-2 col-sm-2 text-right">
                                <button onClick={() => this.toggleMenu()} className="menu-button"><i className="fa fa-bars"></i></button>
                            </div>
                        </Container>
                    </Navbar>
                </header>
            </React.Fragment>
        );
    }

    async populateMainMenuData() {
        /*const response = await fetch('api/menu/main');
        const data = await response.json();
        this.setState({ mainMenus: data, loading: false });*/
        this.setState({ mainMenus: await clientConnect('api/menu/get', '8aa5745f-4109-450b-9882-e2ec5b3f2954'), loadingMain: false });
    }

    async populateSecondaryMenuData() {
        /*const response = await fetch('api/menu/secondary');
        const data = await response.json();
        this.setState({ secondaryMenus: data, loadingSecondary: false });*/
        this.setState({ secondaryMenus: await clientConnect('api/menu/get', null), loadingSecondary: false });
    }
}