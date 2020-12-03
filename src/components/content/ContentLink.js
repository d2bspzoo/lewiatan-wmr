import React, { Component } from "react";

export class ContentLink extends Component {
    constructor(props) {
        super();
    }
    componentWillMount() {
        window.location = this.props.content.contentContent;
    }
    render() {
        return (<section><p className="text-center">Redirecting...</p></section>);
    }
}

export default ContentLink;