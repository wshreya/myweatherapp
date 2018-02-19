import React, { Component } from 'react';
import Message from './message';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserName } from "../redux/action";



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emaiId: '',
            passwd: '',
            message: ''
        }
        this.updateMessage = this.updateMessage.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.validateCredentials = this.validateCredentials.bind(this);

    }

    updateMessage(newMessage) {
        this.setState({ message: newMessage });
    }
    updateEmail(e) {
        this.setState({ emaiId: e.target.value });
    }

    updatePassword(e) {
        this.setState({ passwd: e.target.value });

    }

    validateCredentials() {
        if (this.state.emaiId === 'shreya@atos.net' && this.state.passwd === 'admin') {
            this.updateMessage('Login successful');
            this.props.getUserName(this.state.emaiId);
            this.props.history.push('/dashboard')
            return;
        }
        else if (this.state.emaiId === '' && this.state.passwd === '') {
            this.updateMessage('Email and Password is required');
            return;
        }
        else if (this.state.emaiId === '' && this.state.passwd !== '') {
            this.updateMessage('Email is required');
            return;
        }
        else if (this.state.emaiId !== '' && this.state.passwd === '') {
            this.updateMessage('Password is required');
            return;
        } else

            this.updateMessage('Login not successful');
        return;
    }

    render() {
        return (

            <div className="">
                <br /><br />

                <div className="row">
                    <div className="col-md-2 col-md-offset-2"><label className="control-label">Email:</label></div>
                    <div className="col-md-3">
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"
                            value={this.state.emaiId} onChange={this.updateEmail} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-2 col-md-offset-2"><label className="control-label">Password:</label></div>
                    <div className="col-md-3">
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pwd" value={this.state.passwd}
                            onChange={this.updatePassword} />
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-offset-2 col-md-5">
                        <button className="btn btn-default" onClick={this.validateCredentials}>Submit</button>
                    </div>
                </div>

                <br />
                <Message message={this.state.message} />

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUserName }, dispatch);
    // getUserName: userName => dispatch(getUserName(userName))

}

export default connect(null, mapDispatchToProps)(Login);
