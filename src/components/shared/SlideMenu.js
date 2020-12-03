import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

import './SlideMenu.css'

import { clientConnect } from '../../client';

export class SlideMenu extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    constructor(props) {
        super();
        this.state = {
            slideMenus: [],
            loading: true,
            menuOpen: false
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
        this.populateSlideMenuData();
    }


    // renderLink(item) {
    //     switch (item.module) {
    //         case 'text':
    //             return <a key={item.id} id={item.miUrl} className="bm-item menu-item" href={`/${item.miUrl}`}>{item.miTitle}</a>;
    //         default:
    //           return 'foo';
    //       }
    //     }


    static renderSlideMenu(slidemenus) {
        return (
            <React.Fragment>
                {slidemenus.menuList[0].menu.map((slideMenuItem, i) => {
                    switch (slideMenuItem.miModule) {
                        case 'text':
                            return <a key={i} id={slideMenuItem.url} className="bm-item menu-item" href={`/${slideMenuItem.url}`}>{slideMenuItem.title}</a>
                        case 'link':
                            return <a key={i} id={slideMenuItem.url} className="bm-item menu-item" href={`/${slideMenuItem.url}`}>{slideMenuItem.title}</a>
                        default:
                            return <a key={i} id={slideMenuItem.url} className="bm-item menu-item" href={`/${slideMenuItem.url}`}>{slideMenuItem.title}</a>
                    }
                }
                )}
            </React.Fragment>
        );
    }

    render() {


        let secondaryMenu = this.state.loading
            ? <p className="text-center">Loading...</p>
            : SlideMenu.renderSlideMenu(this.state.slideMenus)

        return (
            <React.Fragment>
                <Menu right customBurgerIcon={false} customCrossIcon={<i className="fa fa-times"></i>} isOpen={this.props.menuOpen} onStateChange={(state) => this.handleStateChange(state)} width={'350px'}>
                    {secondaryMenu}
                </Menu>
            </React.Fragment>
        );
    }

    async populateSlideMenuData() {
        /*const response = await fetch('api/menu/secondary');
        const data = await response.json();
        this.setState({ secondaryMenus: data, loading: false });*/
        this.setState({ slideMenus: await clientConnect('api/menu/get', '8aa5745f-4109-450b-9882-e2ec5b3f2954'), loading: false });
    }
}