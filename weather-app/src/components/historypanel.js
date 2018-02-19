import React, { Component } from 'react';
import { connect } from "react-redux";
import DatesPanel from './datespanel';
import '../style/history.css'

class HistoryPanel extends Component {

    getTemperature(kelvinTemp) {
        return (kelvinTemp - 273.15).toFixed(0);
    };

    constructor(props) {
        super(props);
        this.state = {
            dates: []
        }
    }

    componentWillReceiveProps(newProps) {
        var uniqueTags = [];
        var longDates = []
        newProps.weatherHistory.list.map(data => {
            if (uniqueTags.indexOf(new Date(data.dt * 1000).toDateString()) === -1) {
                uniqueTags.push(new Date(data.dt * 1000).toDateString());
                longDates.push(data.dt);
            }
        });
        this.setState({ dates: longDates });
        console.log(this.state.dates);
    }
    render() {

        if (this.state.dates.length !== 0) {
            return (

                <div className="">
                    {this.state.dates.map((dynamicComponent, i) => <DatesPanel
                        key={i} dates={dynamicComponent} weatherList={this.props.weatherHistory.list} />)}
                </div>
            );
        } else {
            return (""
            );
        }
    }
}

const mapStateToProps = state => {
    return { weatherHistory: state.weatherHistory };
};

export default connect(mapStateToProps)(HistoryPanel);