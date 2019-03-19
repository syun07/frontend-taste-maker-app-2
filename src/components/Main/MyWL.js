import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class MyWavelength extends Component {
	render() {
		return ( 
			<Container className='searched-result-container'>
				
			</Container>
		)
	}
}

export default connect()(MyWavelength)