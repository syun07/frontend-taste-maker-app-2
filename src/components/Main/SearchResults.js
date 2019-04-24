import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecCard from '../Main/RecCard'
import MyWLCard from '../Main/MyWLCard'
import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';

class SearchResults extends Component {
	render() {
		const mappedResults = this.props.recData.map((rec, index) =>
			<RecCard key={index} id={index} rec={rec} />
		)

		const trending = this.props.trending.sort(function (a, b) {
			return b.likes - a.likes
		})

		let genre;

		switch (this.props.searchType) {
			case 'results':
				break;
			case 'music':
				genre = 'music'
				break;
			case 'movies':
				genre = 'movie'
				break;
			case 'shows':
				genre = 'show'
				break;
			case 'podcasts':
				genre = 'podcast'
				break;
			case 'books':
				genre = 'book'
				break;
			case 'games':
				genre = 'game'
				break;
			default:
				return null;
		} 

		let filterTrending;

		if (this.props.searchType === 'results') {
			filterTrending = trending
		} else {
			filterTrending = trending.filter(t => t.genre === genre)
		}

		const limitResults = filterTrending.slice(0, 12)

		const mappedTrending = limitResults.map((wave, index) =>
			wave.likes > 1 ?
					<MyWLCard key={index} id={index} wave={wave} />
				: null
		)

		// invalid search
		const noResults =
		<p className='result-name'>Please enter a valid search</p>

		// no wavelength found
		const wasOrWere = this.props.searchType === 'music' ? 'was' : 'were'
		
		const noWavelength =
			<p className='result-name'>Sorry, there {wasOrWere} no {this.props.searchType} found on the same wavelength as {this.props.userSearch}</p>

		let trendingOrInvalidSearch;

		if (this.props.userSearch === '') {
			trendingOrInvalidSearch = mappedTrending
		} else if (this.props.userSearch.length > 1 && this.props.searchType === 'results') {
			trendingOrInvalidSearch = noResults
		}

		let resultsOrNoWavelength;

		if (this.props.recData.length >= 1) {
			resultsOrNoWavelength = mappedResults
		} else if (this.props.recData.length < 1) {
			resultsOrNoWavelength = noWavelength
		}

		return (
			this.props.result === false ?
				<Container id='my-wl-container'>
					{trendingOrInvalidSearch}
				</Container>
				:
			<Container id='rec-cards-container'>
				{resultsOrNoWavelength}
			</Container>
		)	
	}
}

const mapStateToProps = state => {
	return ({
		result: state.result,
		userSearch: state.userSearch,
		searchType: state.searchType,
		recData: state.recData,
		trending: state.trending,
		wavelength: state.wavelength
	})
}

export default connect(mapStateToProps)(SearchResults)