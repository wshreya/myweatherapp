import React, { Component } from 'react';

class HistoryData extends Component {

    getTemperature(kelvinTemp) {
        return (kelvinTemp - 273.15).toFixed(0);
    };

    getTime(date) {
        return new Date(date * 1000).getHours() + ':' + new Date(date * 1000).getMinutes();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-2"><h3><span className="label label-primary">{this.getTime(this.props.componentData.dt)} </span></h3></div>
                <div className="col-md-3"><h3>{this.getTemperature(this.props.componentData.main.temp)} &#8451;</h3></div>
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-5"><span className="glyphicon glyphicon-arrow-down">{this.getTemperature(this.props.componentData.main.temp_min)} &#8451;</span></div>
                        <div className="col-md-5"><span className="glyphicon glyphicon-arrow-up">{this.getTemperature(this.props.componentData.main.temp_max)} &#8451;</span></div>
                    </div>
                    <div className="row">
                        <div className="col-md-7"><span className="description">{this.props.componentData.weather[0].description}</span></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default HistoryData;