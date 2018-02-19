import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { storeWeatherData, storeWeatherHistory } from "../redux/action";
import axios from 'axios';
import WeatherTable from './weathertable';
import WeatherImage from './weatherimage';
import '../style/dashboard.css';
import HistoryPanel from './historypanel';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {cities} from '../constants/constants'
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "weatherData": {},
            "city": '',
            "selectedOption": '',
            "value": '',
            "alertMessage": '',
            "loader": false
        }
        this.setData = this.setData.bind(this);
        this.updateCity = this.updateCity.bind(this);
        this.searchWeather = this.searchWeather.bind(this);
    }

    updateCity(e) {
        this.setState({ city: e.target.value });
    }

    setData(data) {
        this.setState({ weatherData: data });
        this.setState({ loader1: true });
        console.log(this.state.loader1);
        this.props.storeWeatherData(this.state.weatherData);
        console.log(this.state.weatherData.main);
    }

    searchWeather() {
        console.log(this.state.city);
        this.setState({ weatherData: {} });
        var th = this;
        this.setState({ loader: true });
        Promise.all([
            axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + this.state.city.label + "&appid=e92066829eaa6dff702761a84f98cdbd"),
            axios.get("http://api.openweathermap.org/data/2.5/forecast?q=" + this.state.city.label + "&appid=e92066829eaa6dff702761a84f98cdbd")
        ])
            .then(([result1, result2]) => {
                th.setData(result1.data);
                th.props.storeWeatherHistory(result2.data);
                this.setState({ city: '' });
                this.setState({ loader: false });
            })
            .catch(err => {
                // Receives first rejection among the Promises
                console.log("error here");
                this.setState({ loader: false });
                th.setState({ alertMessage: err.response.data.cod + ' : ' + err.response.data.message });
            });
    }

    handleChange = (selectedOption) => {
        this.setState({ city: selectedOption });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3"><div className="col-md-1 col-md-offset-1">
                        <label className="control-label">City :</label>
                    </div>
                        <div className="col-md-4">
                            <Select
                                name="form-field-name"
                                value={this.state.city}
                                onChange={this.handleChange}
                                options={cities} />

                        </div>
                        <div className="col-md-1">
                            <div className="col-md-offset-2 col-md-5">
                                <button className="btn btn-default" onClick={this.searchWeather}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.alertMessage !== '' ? <div className="row">
                    <div className="col-md-2 col-md-offset-4">
                        <div className="alert alert-danger alert-dismissable fade in">
                            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            {this.state.alertMessage}
                        </div>
                    </div>
                </div> : ""}
                {this.state.loader ?
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" /> : ""
                }

                {Object.getOwnPropertyNames(this.state.weatherData).length !== 0 ?
                    <div className="row">
                        <div className="col-md-3">
                            <div className="row">
                                <div class="panel-group col-md-7 col-md-offset-2">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">Current Weather</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row"><WeatherTable /> </div></div>
                        <div className="col-md-6"><div className="container"><br />
                            <WeatherImage />
                        </div></div>
                        <div className="col-md-3">
                            <div className="row">
                                <div class="panel-group col-md-7 col-md-offset-4">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">5 Days/3 Hours Weather Forecast</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row"><HistoryPanel /></div>
                        </div>
                    </div> : ""}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return { userName: state.userName };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        storeWeatherData,
        storeWeatherHistory
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);