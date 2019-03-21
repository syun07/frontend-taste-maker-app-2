import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class MyWavelength extends Component {
	render() {
		return ( 
			<Container className='searched-result-container'>
				<h4>{this.props.userData.name}'s Wavelength</h4>
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		userData: state.userData
	})
}

export default connect(mapStateToProps)(MyWavelength)