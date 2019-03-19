import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginPage from './components/Login/LoginPage';
import MainPage from './components/Main/MainPage';

import './App.css';

class App extends Component {
	render() {

    return (
			this.props.loginSuccess ?
				<div className='App'>
					<MainPage />
				</div>
				:
				<div>
					<LoginPage />
			</div>
    );
  }
}

const mapStateToProps = state => {
	return ({
		loginSuccess: state.loginSuccess
	})
}

export default connect(mapStateToProps)(App);
