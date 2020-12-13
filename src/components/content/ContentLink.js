import React, { Component } from "react";

export class ContentLink extends Component {
    constructor(props) {
        super();
    }
    componentWillMount() {
        if(this.props.content != "")
        {
            window.location = this.props.content;
        }
    }
    render() {
        return (
            <div style={{marginTop:"20px", marginBottom:"20px", padding:"50px"}}>
                <section><p className="text-center">Przekierowuję...</p></section>
            </div>);
    }
}

export default ContentLink;