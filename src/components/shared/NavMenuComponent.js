import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'
//const ScrollLink = Scroll.ScrollLink

import { clientConnect } from '../../client';

export class NavMenuComponent extends Component {

    static displayName = NavMenuComponent.name;

    constructor (props) {
        super();

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            menus: [],
            loading: true,
            menuOpen: this.props.menuOpen,
            color: 'transparent'
        };
    }

    listenScrollEvent = e => {
        if (window.scrollY > 100) {
            this.setState({ color: '#FFFFFF' })
        }
        else {
            this.setState({ color: 'transparent' })
        }
    }

    sendData = () => {
        this.props.navMenuCallback(this.state.menuOpen);
    }

    componentDidMount() {
        //this.populateMenuData();
        window.addEventListener('scroll', this.listenScrollEvent)
    }


    toggleNavbar () {
    this.setState({
        collapsed: !this.state.collapsed
    });
    }



    // routeChange=()=> {
    //let path = `newPath`;
    //let history = useHistory();
    //history.push(path);
    //}

    static renderMenu(menus) {

        return (
            <React.Fragment>
                {menus.lenght > 0 &&
                <ul className="navbar-nav flex-grow">
                    {menus.map((menuItem, i) =>
                        <NavItem key={i}>
                            {menuItem.miModule.includes("section") ?
                                <NavLink href={`/#${menuItem.miUrl}`} className="text-light">{menuItem.miTitle}</NavLink>
                                :
                                <NavLink tag={Link} className="text-light" to={menuItem.miUrl}>{menuItem.miTitle}</NavLink>
                            } 
                        </NavItem>
                    )}
                </ul>
                }
            </React.Fragment>
        );
    }

    toggleMenu() {
        if (this.state.menuOpen !== this.props.menuOpen) {
            this.setState(state => ({ menuOpen: !this.props.menuOpen }), this.sendData)
        } else {
            this.setState(state => ({ menuOpen: !state.menuOpen }), this.sendData)
        }
        
    }

    render() {

    let mainMenu = this.state.loading
        ? <div></div>
        : NavMenuComponent.renderMenu(this.state.menus)

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white mb-3" dark fixed="top" style={{ backgroundColor: global.window.scrollY > 100 ? "#262626" : "transparent" }}>
            <Container>
                <NavbarBrand NavbarBrand href="/"><img src={process.env.PUBLIC_URL + '/images/logo.png'} alt = "R6 Polish Masters" /></NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex" isOpen={!this.state.collapsed} navbar>       
                    {mainMenu}          
                </Collapse>
                <div className="col-md-2 col-sm-2" >
                        <a className="nav-link text-yellow" href="https://player.r6polishmasters.pl"><i className="fa fa-user"></i> Konto</a>
                </div>
                <div className="col-md-2 col-sm-2 hidden-xs">
                    <div className="social-buttons">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                    </div>
                </div>
                <div className="col-md-1 col-sm-1" >
                        <button onClick={() => this.toggleMenu()} className="menu-button"><i className="fa fa-bars"></i></button>
                </div>
            </Container>
        </Navbar>
      </header>
    );
    }

    //async populateMenuData() {
        /*
        const response = await fetch('api/menu/main');
        const data = await response.json();
        this.setState({ menus: data, loading: false });
        */
       //this.setState({ menus: clientConnect('api/menu/get', null), loading: false });
    //}

}
