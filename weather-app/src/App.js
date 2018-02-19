import React, { Component } from 'react';
import './App.css';
import Login from './components/login';
import Header from './components/header';
import Dashboard from './components/dashboard';
import { Switch, Route } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
       emailId: "shreya@atos.net",
       password: "admin",
       message:''
    }
    this.updateMessage = this.updateMessage.bind(this);
    console.log('here');
 }

 updateMessage(newMessage) {
   this.setState({message:newMessage});
 }

  render() {
    return (
      <div className="App">
      <Header/>
      
               <Switch>
                 <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/dashboard' component={Dashboard} />
              </Switch>
            </div>
  
  
    );
  }
}

export default App;
