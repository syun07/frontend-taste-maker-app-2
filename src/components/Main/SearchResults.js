import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecCard from '../Main/RecCard'
import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';

class SearchResults extends Component {
	render() {
		const mappedResults = this.props.recData.map((rec, index) =>
			<RecCard key={index} id={index} rec={rec} />
		)
		
		// no wavelength found
		const wasOrWere = this.props.searchType === 'music' ? 'was' : 'were'
	
		const noWavelength =
			<p className='result-name'>Sorry, there {wasOrWere} no {this.props.searchType} found on the same wavelength as {this.props.userSearch}</p>
			
		// invalid search
		const noResults =
			<p className='result-name'>Please enter a valid search</p>
		
		let message;

		this.props.searchType === 'results' ? message = noResults : message = noWavelength

		return (
			this.props.result === false ?
			<Container className='searched-result-container'>
				{message}
			</Container>
				:
			<Container id='rec-cards-container'>
				{mappedResults}
			</Container>
		)	
	}
}

const mapStateToProps = state => {
	console.log(state)
	return ({
		result: state.result,
		userSearch: state.userSearch,
		searchType: state.searchType,
		recData: state.recData
	})
}

export default connect(mapStateToProps)(SearchResults)