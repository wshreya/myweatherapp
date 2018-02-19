import React, { Component } from 'react';
import { connect } from "react-redux";
import '../style/weatherimage.css';

class WeatherImage extends Component {

    render() {
        return (
            <div className="">
                {this.props.weatherData && this.props.weatherData.weather ?
                    <div className={'container ' + this.props.weatherData.weather[0].main}>
                    </div> : ""}
            </div>
        );
    }

}

const mapStateToProps = state => {
    console.log(state.weatherData);
    return { weatherData: state.weatherData, weather: state.weather };
};

export default connect(mapStateToProps)(WeatherImage);