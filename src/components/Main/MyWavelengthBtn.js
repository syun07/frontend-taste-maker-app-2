import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'semantic-ui-react'
import '../../stylesheets/MainPage.css'

const MyWavelengthBtn = (props) => {
	return (
		<Button
			color='red'>
			MY WAVELENGTH
		</Button>
	)
}

export default connect(null)(MyWavelengthBtn);