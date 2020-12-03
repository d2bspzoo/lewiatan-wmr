import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Bottom from '../shared/Bottom';
import { Container } from 'reactstrap';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import { clientConnect } from '../../client';

export class Notice extends Component {

    static displayName = Notice.name;

    constructor(props) {
        super(props);
        this.state = {
            notice: [], loading: true
        };
    }


    componentDidMount() {
        const { url } = this.props.match.params;
        this.populateNoticeData(url);

        document.getElementById("root").style.backgroundImage = `url(${process.env.PUBLIC_URL + '/images/bcgkNormal.jpg'})`;
        document.getElementById("root").style.backgroundPosition = 'top center';
        document.getElementById("root").style.backgroundRepeat = 'no-repeat';
    }

    static renderNotice(notice) {
        return (
            <React.Fragment>

                <div class="col-lg-12 col-md-12 text-page-content">
                    {(notice.noticeTitle != null) &&
                        <React.Fragment>
                        <h1 className="text-page-header">{notice.noticeTitle}</h1>
                            <div className="title-page-divider"></div>
                        </React.Fragment>
                    }

                    {ReactHtmlParser(notice.noticeContent)}

                    {(notice.noticeShowdate == true) &&
                        <p class="small">Data aktualizacji:
                    {new Intl.DateTimeFormat("pl-PL", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        }).format(notice.noticeDate)}
                        </p>
                    }
                </div>

            </React.Fragment>
        );
    }

    static renderBottom(bottom) {
        return (
            <React.Fragment>
                    <Bottom bottoms={bottom} />
            </React.Fragment>
        );
    }

    render() {


        let notice = this.state.loading
            ? <p className="text-center">Loading...</p>
            : Notice.renderNotice(this.state.notice.noticeItem)

        let bottoms = this.state.loading
            ? <p className="text-center">Loading...</p>
            : Notice.renderBottom(this.state.notice.bottomItem)

        return (
            <React.Fragment>

                <Container>
                    {notice}
                </Container>

                {bottoms}

            </React.Fragment>
        )
    }

    async populateNoticeData(url) {
        this.setState({ notice: await clientConnect('api/notice/get', url), loading: false });
    }
}