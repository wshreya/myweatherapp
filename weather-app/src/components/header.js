import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOut } from "../redux/action";
import '../style/header.css';
import { withRouter } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.signOut();
        this.props.history.push('/login')
    }

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Login App</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        {this.props.userName !== '' ?
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-user"></span> Welcome {this.props.userName}</a>
                                <ul className="dropdown-menu">
                                    <li><a onClick={this.logOut}><span className="glyphicon glyphicon-log-out"></span>Sign Out</a></li>
                                </ul>
                            </li>
                            : <li><span></span></li>
                        }
                    </ul>
                </div>
            </nav>


        );
    }
}
const mapStateToProps = state => {
    return { userName: state.userName };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signOut
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));


