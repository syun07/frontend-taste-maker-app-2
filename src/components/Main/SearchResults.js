import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecCard from '../Main/RecCard'

import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';

class SearchResults extends Component {
	render() {
		const mappedResults = this.props.recData.map((rec, index) =>
			<RecCard
				key={index}
				rec={rec}
			/>
		)

		return (
			this.props.result === false ? 
				<Container className='searched-result-container'>
					<br/>
					<h4 className='result-name'>What are some things you love?</h4>
					<h4 className='result-name'>Search to find things on that wavelength!</h4>
				</Container>
				
				:

				<Container id='rec-cards-container'>
						{mappedResults}
				</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		result: state.result,
		searchType: state.searchType,
		searchedData: state.searchedData,
		recData: state.recData
	})
}

export default connect(mapStateToProps)(SearchResults)