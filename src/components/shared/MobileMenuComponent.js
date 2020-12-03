import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import './SlideMenu.css'
import './NavMenu.css'

import { clientConnect } from '../../client';

export class MobileMenuComponent extends Component {
    static displayName = MobileMenuComponent.name;

    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super();

        this.state = {
            mainMenus: [],
            secondaryMenus: [],
            loading: true,
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

    static renderSecondaryMenu(secondarymenus) {
        return (
            <React.Fragment>
                {secondarymenus.mainMenuList.map((secodaryMenuItem, i) => {
                    switch (secodaryMenuItem.miModule) {
                        case 'text':
                            return <a key={i} id={secodaryMenuItem.miUrl} className="bm-item menu-item" href={`/${secodaryMenuItem.miUrl}`}>{secodaryMenuItem.miTitle}</a>
                        case 'link':
                            return <a key={i} id={secodaryMenuItem.miUrl} className="bm-item menu-item" href={`/${secodaryMenuItem.miUrl}`}>{secodaryMenuItem.miTitle}</a>
                        default:
                            return <a key={i} id={secodaryMenuItem.miUrl} className="bm-item menu-item" href={`/${secodaryMenuItem.miUrl}`}>{secodaryMenuItem.miTitle}</a>
                    }
                }
                )}
            </React.Fragment>
        );
    }

    render() {


        const mainMenu = !this.state.loading
            ? this.state.mainMenus.mainMenuList
            : null

        let secondaryMenu = this.state.loadingSecondary
            ? <p className="text-center">Loading...</p>
            : MobileMenuComponent.renderSecondaryMenu(this.state.secondaryMenus)

        //const { mainMenu } = this.state.mainMenus;

        return (
            <React.Fragment>
                <Menu right customBurgerIcon={false} customCrossIcon={<i className="fa fa-times"></i>} isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)} width={'350px'}>
                    {!this.state.loading && 
                        mainMenu.map((menuItem, i) =>
                        <div key={i}>
                            {menuItem.miModule.includes("section") ?
                                    <a key={i} id={menuItem.miUrl} className="bm-item menu-item" href={`/#${menuItem.miUrl}`}>{menuItem.miTitle}</a>
                                :
                                <a key={i} id={menuItem.miUrl} className="bm-item menu-item" href={menuItem.miUrl}>{menuItem.miTitle}</a>
                            }
                        </div>
                    )}
                    <hr />
                    {secondaryMenu}
                    <hr/>
                    <a className="bm-item menu-item" href="https://player.r6polishmasters.pl"><i className="fa fa-user"></i>Konto</a>
                    <hr/>
                    <div className="social-buttons">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                    </div>
                </Menu>

                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white mb-3" dark fixed="top" style={{ backgroundColor: global.window.scrollY > 100 ? "#262626" : "transparent" }}>
                        <Container>
                            <NavbarBrand href="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="R6 Polish Masters" /></NavbarBrand>
                           
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
        this.setState({ mainMenus: clientConnect('api/menu/get', null), loading: false });
    }

    async populateSecondaryMenuData() {
        /*const response = await fetch('api/menu/secondary');
        const data = await response.json();
        this.setState({ secondaryMenus: data, loadingSecondary: false });*/
        this.setState({ secondaryMenus: clientConnect('api/menu/get', null), loadingSecondary: false });
    }
}