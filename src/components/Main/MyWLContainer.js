import React, { Component } from 'react';
import { connect } from 'react-redux';

import MyWLCard from '../Main/MyWLCard';

import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class MyWavelength extends Component {
	render() {
		const mappedFavorites = this.props.wavelength.map(wave =>
			<MyWLCard
				key={wave.id}
				wave={wave}
			/>	
		)

		return ( 
			<Container id='my-wl-container'>
				{mappedFavorites}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		userData: state.userData,
		wavelength: state.wavelength
	})
}

export default connect(mapStateToProps)(MyWavelength)