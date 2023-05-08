import React, { Component } from "react";
import HtmlReactParser from "html-react-parser";
import "./footer.css";
import FooterUE from "./FooterUE";

import { clientConnect } from "../../client";

class Footer extends Component {
  constructor(props) {
    super();

    this.state = {
      footers: [],
      notices: [],
      loadingFooters: true,
      loadingNotices: true,
    };
  }

  componentDidMount() {
    this.populateFooterData();
    this.populateNoticeData();
  }

  static renderNoticeList(notices) {
    return (
      <React.Fragment>
        {notices.length > 0 && (
          <React.Fragment>
            {notices.map((notice, i) => (
              <React.Fragment key={i}>
                <span> |</span> <a href={`/notice/${notice.noticeUrl}`}>{notice.noticeTitle}</a>
              </React.Fragment>
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  static renderFooter(footers, notices) {
    let noticeList = Footer.renderNoticeList(notices);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-7 text-right xs-text-center order-md-5">
            {!!footers.right && HtmlReactParser(footers.right)} <p>{noticeList}</p>
          </div>
          <div className="col-md-5 xs-text-center">{!!footers.left && HtmlReactParser(footers.left)}</div>
        </div>
      </div>
    );
  }

  render() {
    let footer =
      this.state.loadingNotices && this.state.loadingFooters ? (
        <p className="text-center">Loading...</p>
      ) : (
        Footer.renderFooter(this.state.footers, this.state.notices)
      );

    return (
      <footer className="footer" id="footer">
        <div className="addressFooter notice">
          {footer}
          <FooterUE />
        </div>
      </footer>
    );
  }

  async populateFooterData() {
    this.setState({ footers: await clientConnect("api/footer", null), loadingFooters: false });
  }

  async populateNoticeData() {
    this.setState({ notices: await clientConnect("api/notice/list", null), loadingNotices: false });
  }
}

export default Footer;
