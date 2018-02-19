import React, { Component } from 'react';
import { connect } from "react-redux";
import '../style/weather.css';

class WeatherTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "temperature": ''
        }
        this.toCelsius = this.toCelsius.bind(this);
        this.getCelsius = this.getCelsius.bind(this);
    }

    toCelsius(fahrenheit) {
        this.setState({ temperature: (fahrenheit - 273.15).toFixed(0) });
    }

    getCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(0);
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.toCelsius(newProps.weatherData.main.temp);
    }

    getImage() {
        var images = require.context('../images', true);
        return images('./' + this.props.weatherData.weather[0].main + 'icon.png');
    }

    getDate(date) {
        return new Date(date * 1000).toDateString()
    }

    render() {
        if (this.props.weatherData && this.props.weatherData.weather && this.props.weatherData.main) {
            return (
                <div className="weathertable">
                    <div className="row">
                        <div className="col-md-11 col-md-offset-1"><h1>{this.props.weatherData.name}</h1></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"><img src={this.getImage()} width="80%" height="90%" /></div>
                        <div className="col-md-6">
                            <div className="row"><h2>{this.state.temperature} &#8451;</h2></div>
                            <div className="row"><h2>{this.props.weatherData.weather[0].main}</h2></div>
                            <div className="row"><span className="description">{this.props.weatherData.weather[0].description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="row"><span><b>Temperature</b></span></div>
                            <div className="row"><span>{this.state.temperature} Celcius</span></div>
                        </div>
                        <div className="col-md-4">
                            <div className="row"><span><b>Pressure</b></span></div>
                            <div className="row"><span>{this.props.weatherData.main.pressure}</span></div>
                        </div>
                        <div className="col-md-4">
                            <div className="row"><span><b>Humidity</b></span></div>
                            <div className="row"><span>{this.props.weatherData.main.humidity} %</span></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="row"><span><b>Min. Temperature</b></span></div>
                            <div className="row"><span>{this.getCelsius(this.props.weatherData.main.temp_min)} &#8451;</span></div>
                        </div>
                        <div className="col-md-4">
                            <div className="row"><span><b>Max. Temperature</b></span></div>
                            <div className="row"><span>{this.getCelsius(this.props.weatherData.main.temp_max)} &#8451;</span></div>
                        </div>
                    </div>
                    <div className="row"><span className="date">{this.getDate(this.props.weatherData.dt)}</span></div>
                </div>
            );
        }
        else {
            return ("");
        }
    }
}

const mapStateToProps = state => {
    return { weatherData: state.weatherData, weather: state.weather };
};


export default connect(mapStateToProps)(WeatherTable);