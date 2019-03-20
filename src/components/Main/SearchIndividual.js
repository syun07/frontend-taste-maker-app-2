import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearch } from '../../services/backend'
import { saveSearch, getSearchedData, getRecData, handleResult, clearSearchType } from '../../actions/allActions'


import { Container, Input } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class SearchIndividual extends Component {

	handleChange = (event) => {
		this.props.saveSearch(event.target.value)
		this.handleSearch(event.target.value, this.props.searchType)
	}

	handleSearch = (query, genre) => {
		if (query === '' || query.length < 2) {
			this.props.handleResult(false)
		} else {
			fetchSearch(query, genre)
			.then(data => {
				if (data.Similar.Info.length === 1) {
					this.props.handleResult(true)
					this.props.getSearchedData(data.Similar.Info[0])
					this.props.getRecData(data.Similar.Results)
				} else {
					this.props.handleResult(false)
				}
			})
		}
	}


	render() {
		return (
			<Container className='search-input-container'>
				<h4>SEARCH ANYTHING</h4>
				<Input id='search'
					placeholder='SEARCH ANY SONG/ARTIST, MOVIE, SHOW, PODCAST, BOOK, OR GAME'
					onChange={(event) => this.handleChange(event)} />
			</Container>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return ({
		activeItem: state.activeItem,
		userSearch: state.userSearch,
		searchedData: state.searchedData
	})
}

export default connect(mapStateToProps, { saveSearch, getSearchedData, getRecData, handleResult, clearSearchType })(SearchIndividual)