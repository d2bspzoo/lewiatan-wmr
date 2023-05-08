import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import CourseDetails from '../course/CourseDetails';
import CourseList from '../course/CourseList';


export class ContentCourse extends Component {

    render() {
        return (
            <Fragment>
            <div className="row" style={{marginBottom:"30px"}}>
            <div className="col-lg-12 col-md-12 text-page-content">
        
                {(() => {
                    switch (this.props.baseUrl.mode) {
                        case 'course':
                            return <CourseDetails course={this.props.baseUrl.itemurl} baseUrl={this.props.baseUrl} />
                        default:
                            return <CourseList baseUrl={this.props.baseUrl} content={this.props.content} title={this.props.title} />
                    }
                })()}


            </div>
            </div>
            </Fragment>
        )
    }
}

ContentCourse.propTypes = {
    content: PropTypes.object
}

export default ContentCourse
