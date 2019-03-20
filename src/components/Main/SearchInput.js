import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input, Container, Button } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

import { fetchSearch } from '../../services/backend';
import { saveSearch, handleTypeChange, getSearchedData, getRecData, handleResult } from '../../actions/allActions'

class SearchInput extends Component {

	// when user enters something in search
	// (query, genre) = (event.target.value, this.props.searchType)
	handleChange = event => {
		this.props.saveSearch(event.target.value)
		this.handleSearch(event.target.value, this.props.searchType)
	}

	// when user clicks a genre (before or after search)
	// (query, genre) = (this.props.userSearch, genre that's passed in as a string)
	handleClick = genre => {
		this.props.handleTypeChange(genre)
		this.handleSearch(this.props.userSearch, genre)
	}

	handleSearch = (query, genre) => {
		if (query === '' || query === ' ') {
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
				<h4>FIND ME</h4>
				<div>
					<Button color='red'
						onClick={() => this.handleClick('music')}>
						<i className='music icon' /> Music
					</Button>

					<Button color='orange'
						onClick={() => this.handleClick('movies')}>
						<i className='film icon' /> Movies
					</Button>

					<Button color='yellow'
						onClick={() => this.handleClick('shows')}>
						<i className='tv icon' /> Shows
					</Button>

					<Button color='green'
						onClick={() => this.handleClick('podcasts')}>
						<i className='podcast icon' /> Podcasts
					</Button>

					<Button color='blue'
						onClick={() => this.handleClick('books')}>
						<i className='book icon' /> Books
					</Button>

					<Button color='purple'
						onClick={() => this.handleClick('games')}>
						<i className='gamepad icon' /> Games
					</Button>
				</div>
				<h4>ON THE SAME WAVELENGTH AS</h4>

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
		searchType: state.searchType,
		searchedData: state.searchedData
	})
}

export default connect(mapStateToProps, { saveSearch, handleTypeChange, getSearchedData, getRecData, handleResult })(SearchInput)