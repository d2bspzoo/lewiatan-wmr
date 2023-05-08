import React, { Component } from "react";
import HtmlReactParser from "html-react-parser";
import SectionText from "./SectionText";
import SectionNews from "./SectionNews";
import SectionNewsExternal from "./SectionNewsExternal";
import SectionEventList from "./SectionEventList";
import SectionCalendar from "./SectionCalendar";
import SectionNewsletter from "./SectionNewsletter";
import SectionContact from "./SectionContact";
import { Element } from "react-scroll";
import { Container } from "reactstrap";

export class Section extends Component {
  styleSection = (background, margintop, marginbottom) => {
    return {
      backgroundColor: background,
      marginTop: `${margintop}px`,
      marginBottom: `${marginbottom}px`,
      padding: "30px",
    };
  };

  rowStyles = () => {
    return {
      marginTop: "20px",
      marginBottom: "20px",
    };
  };

  render() {
    return (
      <React.Fragment>
        <Element id={this.props.sections.hash} name={this.props.sections.hash}>
          {this.props.sections.inContainer === true ? (
            <Container>
              <section
                style={this.styleSection(this.props.sections.background, this.props.sections.marginTop, this.props.sections.marginBottom)}
                className="content-section"
                key={this.props.sections.hash}
              >
                {this.props.sections.title != null && this.props.sections.titleShow === true && (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-12 xs-text-center">
                        <div className="h1" style={{ textAlign: "center" }}>
                          {this.props.sections.title}
                        </div>
                        <div className="title-page-divider">&nbsp;</div>
                      </div>
                    </div>
                  </React.Fragment>
                )}
                <div className="row mt-3">
                  {this.props.sections.sectionContents.map((sectionContent) =>
                    (() => {
                      switch (sectionContent.type) {
                        case "text":
                          return <SectionText sectionContent={sectionContent} key={sectionContent.hash} />;
                          break;
                        case "news":
                          return <SectionNews sectionContent={sectionContent} key={sectionContent.hash} />;
                          break;
                        case "news-external":
                          return <SectionNewsExternal sectionContent={sectionContent} key={sectionContent.hash} />;
                          break;
                        case "event-list":
                          return <SectionEventList sectionContent={sectionContent} key={sectionContent.hash} />;
                          break;
                        case "calendar":
                          return <SectionCalendar sectionContent={sectionContent} key={sectionContent.hash} />;
                          break;
                        case "newsletter":
                          return <SectionNewsletter sectionContent={sectionContent} key={sectionContent.hash} />;
                          break;
                        case "contact":
                          return <SectionContact sectionContent={sectionContent} key={sectionContent.hash} />;
                          break;
                        default:
                          return <SectionText sectionContent={sectionContent} key={sectionContent.hash} />;
                          break;
                      }
                    })()
                  )}
                </div>
              </section>
            </Container>
          ) : (
            <React.Fragment>
              <section
                style={this.styleSection(this.props.sections.background, this.props.sections.marginTop, this.props.sections.marginBottom)}
                className="content-section"
                key={this.props.sections.hash}
              >
                <Container>
                  {this.props.sections.title != null && this.props.sections.titleShow == true && (
                    <React.Fragment>
                      <div className="row">
                        <div className="col-12 xs-text-center">
                          <div className="h1" style={{ textAlign: "center" }}>
                            {this.props.sections.title}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                  <div className="row">
                    {this.props.sections.sectionContents.map((sectionContent) =>
                      (() => {
                        switch (sectionContent.type) {
                          case "text":
                            return <SectionText sectionContent={sectionContent} key={sectionContent.hash} />;
                            break;
                          case "news":
                            return <SectionNews sectionContent={sectionContent} key={sectionContent.hash} />;
                            break;
                          case "news-external":
                            return <SectionNewsExternal sectionContent={sectionContent} key={sectionContent.hash} />;
                            break;
                          case "event-list":
                            return <SectionEventList sectionContent={sectionContent} key={sectionContent.hash} />;
                            break;
                          case "calendar":
                            return <SectionCalendar sectionContent={sectionContent} key={sectionContent.hash} />;
                            break;
                          case "newsletter":
                            return <SectionNewsletter sectionContent={sectionContent} key={sectionContent.hash} />;
                            break;
                          case "contact":
                            return <SectionContact sectionContent={sectionContent} key={sectionContent.hash} />;
                            break;
                          default:
                            return <SectionText sectionContent={sectionContent} key={sectionContent.hash} />;
                            break;
                        }
                      })()
                    )}
                  </div>
                </Container>
              </section>
            </React.Fragment>
          )}
        </Element>
      </React.Fragment>
    );
  }
}

export default Section;
