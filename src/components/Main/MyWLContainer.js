import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class MyWavelength extends Component {
	render() {
		// const mappedFavorites = this.props.wavelength.map(wave =>
		// )

		return ( 
			<Container className='searched-result-container'>
				<h4>{this.props.userData.name}'s Wavelength</h4>
				{/* {mappedFavorites} */}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return ({
		userData: state.userData,
		wavelength: state.wavelength
	})
}

export default connect(mapStateToProps)(MyWavelength)