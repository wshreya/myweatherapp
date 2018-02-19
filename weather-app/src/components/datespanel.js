import React, { Component } from 'react';
import HistoryData from './historydata';

class DatesPanel extends Component {

    getFilteredData(date) {
        return this.props.weatherList.filter(data => new Date(data.dt * 1000).toDateString() === new Date(date * 1000).toDateString())
    }

    render() {
        return (
            <div className="">
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <a data-toggle="collapse" href={'#' + this.props.dates}>{new Date(this.props.dates * 1000).toDateString()}</a>
                            </h4>
                        </div>
                        <div id={this.props.dates} className="panel-collapse collapse">
                            <div className="panel-body">
                                {this.getFilteredData(this.props.dates).map((dynamicComponent, i) => <HistoryData
                                    key={i} componentData={dynamicComponent} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default DatesPanel;