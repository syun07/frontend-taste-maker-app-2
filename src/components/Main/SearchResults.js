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
		
		const wasOrWere = this.props.searchType === 'music' ? 'was' : 'were'

		return (
			this.props.userSearch.length > 1 && this.props.recData.length === 0 ?
				<Container className='searched-result-container'>
					<p className='result-messages'>Sorry, there {wasOrWere} no {this.props.searchType} found on the same wavelength as {this.props.userSearch}</p>
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
		userSearch: state.userSearch,
		searchType: state.searchType,
		searchedData: state.searchedData,
		recData: state.recData
	})
}

export default connect(mapStateToProps)(SearchResults)