import React, { Component, Fragment } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll'
import TopNavEU from './TopNavUE'
//const ScrollLink = Scroll.ScrollLink

import { clientConnect } from '../../client';

    let mainColor = '#ffffff';

export class NavMenu extends Component {

    static displayName = NavMenu.name;

    constructor (props) {
        super();

        this.state = {
            collapsed: true,
            menus: [],
            loading: true,
            menuOpen: props.menuOpen,
            color: 'transparent'
        };

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }


    listenScrollEvent = e => {
        if (window.scrollY > 30) {
            this.setState({ color: mainColor })
        }
        else {
            this.setState({ color: 'transparent' })
        }
    }

    sendData = () => {
        this.props.navMenuCallback(this.state.menuOpen);
    }

    componentDidMount() {
        this.populateMenuData();
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
                {menus.menuList.length > 0 &&
                <ul className="navbar-nav flex-grow w-100 justify-content-center nav-fill">
                    {menus.menuList[0].menu.map((menuItem, i) =>
                        <NavItem key={i}>
                            {menuItem.module.includes("section") ?
                                <React.Fragment>
                                {this.props.path == "/" ?
                                    <ScrollLink
                                    to={menuItem.url}
                                    spy={true}
                                    smooth={true}
                                    duration={500}
                                    offset={-180}
                                    className="text-blue nav-link nav-link-coursor">{menuItem.title}</ScrollLink>
                                    :
                                    <NavLink href={`/#${menuItem.url}`} className="text-blue">{menuItem.title}</NavLink>
                                }    
                                </React.Fragment>
                                :
                                <NavLink className="text-blue" href={menuItem.url}>{menuItem.title}</NavLink>
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
        : NavMenu.renderMenu(this.state.menus)

    return (
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white" dark fixed="top" style={{ borderBottom: "2px solid #051E38", backgroundColor: mainColor, top: global.window.scrollY > 30 ? 0 : 60 }}>
            <Container>
                <div className="col-md-2">
                <NavbarBrand href="/"><img src={process.env.PUBLIC_URL + '/images/logo_transp.png'} alt = "Lewiatan - Regionalna Platforma Dialogu" /></NavbarBrand>
                </div>
                <div className="col-md-8">
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex" isOpen={!this.state.collapsed} navbar>       
                    {mainMenu}          
                </Collapse>
                </div>
                <div className="col-md-2 col-sm-3 text-center" >
                    {//<a className="nav-link text-blue" href="#" target="_blank"><i className="fa fa-user text-grey"></i>&nbsp;&nbsp;Konto</a> 
                    }
                </div>
            </Container>
        </Navbar>
    );
    }

    async populateMenuData() {
        /*const response = await fetch('api/menu/main');
        const data = await response.json();
        this.setState({ menus: data, loading: false });*/
        this.setState({ menus: await clientConnect('api/menu/get', '8aa5745f-4109-450b-9882-e2ec5b3f2954'), loading: false });
    }

}
