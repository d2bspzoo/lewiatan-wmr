import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { clientConnect } from '../../client';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps'
import Moment from 'react-moment';

const params = {v: '3.exp', key: ''};

export class EventDetails extends Component {


    constructor(props) {
        super();
        this.state = {
            event: [], loadingEvent: true
        };
    }

    componentDidMount() {
        this.populateEventData(this.props.event);
    }

    onMapCreated(map) {
        map.setOptions({
          disableDefaultUI: true
        });
      }
    
      onDragEnd(e) {
        console.log('onDragEnd', e);
      }
    
      onCloseClick() {
        console.log('onCloseClick');
      }
    
      onClick(e) {
        console.log('onClick', e);
      }

    render() {
        return (
            <Fragment>
                <div style={{marginTop:"20px", marginBottom:"20px", paddingTop:"30px"}}>
                    {!this.state.loadingEvent ?
                    <Fragment>
                        <div className="row">
                            <div className="col-12 xs-text-center">
                                <div className="h1" style={{ textAlign: "center" }}>{this.state.event.title}</div>
                                <div className="title-page-divider">&nbsp;</div>
                            </div>
                        </div>
                        <div className="row margin-t-3">
                            <div className="col-md-12">
                            {ReactHtmlParser(this.state.event.description)}
                            </div>
                        </div>
                        <div className="row justify-content-md-center margin-t-3">
                            <div className="offset-md-2 col-md-4">
                                <p><i className="fas fa-clock"></i> <strong>Początek:</strong>  <Moment format="DD.MM.YYYY">{this.state.event.dateStart}</Moment> godz. <Moment format="HH:mm">{this.state.event.dateStart}</Moment></p>
                            </div>
                            <div className="offset-md-2 col-md-4">
                                <p><i className="fas fa-clock"></i> <strong>Koniec:</strong> <Moment format="DD.MM.YYYY">{this.state.event.dateEnd}</Moment> godz. <Moment format="HH:mm">{this.state.event.dateEnd}</Moment></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-md-2 col-md-8">
                                {this.state.event.isOnline === true ?
                                <p><i className="fas fa-globe"></i> <strong>Spotkanie online</strong> </p>
                                :
                                <p><i className="fas fa-location-arrow"></i> <strong>Miejsce:</strong> {this.state.event.place} {this.state.event.address} {this.state.event.zip}, {this.state.event.city}</p>
                                }
                                
                            </div>
                        </div>
                        {this.state.event.isRegistration ===true && 
                        <div className="row margin-t-3">
                            <div className="col-md-12 text-center">
                                <a href="#" className="btn btn-primary">REJESTRACJA</a>
                            </div>
                        </div>
                        }
                        
                        {this.state.event.isOnline === false &&
                        
                        <Fragment>
                        <div style={{borderBottom:"1px solid #051E38", paddingTop:"15px", paddingBottom:"15px", marginBottom:"20px"}}></div>
                        <h3 style={{marginBottom:"20px"}} className="text-center">Mapa</h3>
                        <Gmaps
                            width={'100%'}
                            height={'400px'}
                            lat={this.state.event.lat}
                            lng={this.state.event.lon}
                            zoom={16}
                            loadingMessage={'Loading'}
                            params={params}
                            onMapCreated={this.onMapCreated}>
                            <Marker
                            lat={this.state.event.lat}
                            lng={this.state.event.log}
                            draggable={true}
                            onDragEnd={this.onDragEnd} />
                            <InfoWindow
                            lat={this.state.event.lat}
                            lng={this.state.event.lng}
                            content={this.state.event.place}
                            onCloseClick={this.onCloseClick} />
                            <Circle
                            lat={this.state.event.lat}
                            lng={this.state.event.lng}
                            radius={500}
                            onClick={this.onClick} />
                        </Gmaps>
                        </Fragment>
                        }
                        
                        <div style={{paddingTop:"15px", paddingBottom:"15px", margin:"20px"}} className="text-center">
                            <a href={`/${this.props.baseUrl.url}`}>wróć do listy szkoleń</a>
                        </div>
                    </Fragment>
                    :
                    <p className="text-center">Loading...</p>
                    }    
                </div>
            </Fragment>
        )
    }

    async populateEventData(url) {
        this.setState({ event: await clientConnect('api/event/get', url), loadingEvent: false });
    }
}

export default EventDetails