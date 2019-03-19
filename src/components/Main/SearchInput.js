import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input, Container, Button } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

import { fetchSearch } from '../../services/backend';
import { saveSearch, handleTypeChange, getSearchedData, getRecData, handleResult } from '../../actions/allActions'

class SearchInput extends Component {

	// handleSearch = (event, genre) => {
	// 	this.props.saveSearch(event.target.value)
	// 	if (event.target.value === '' || event.target.value === ' ') {
	// 		this.props.handleResult(false)
	// 	} else {
	// 		genre = this.props.searchType
	// 	fetchInfo(event.target.value, genre)
	// 		.then(data => {
	// 			if (data.Similar.Info.length === 1 ) {
	// 				this.props.handleResult(true)
	// 				this.props.getSearchedData(data.Similar.Info[0])
	// 				this.props.getRecData(data.Similar.Results)
	// 			} else {
	// 				this.props.handleResult(false)
	// 			}
	// 		})
	// 	}
	// }

	handleSearch = (event, genre) => {
		this.props.saveSearch(event.target.value)
		fetchSearch(this.props.userSearch, this.props.searchType)
		.then(data => {
			if (this.props.userSearch === '') {
				this.props.handleResult(false)
			} else {
				genre = this.props.searchType
			fetchSearch(this.props.userSearch, genre)
				.then(data => {
					if (data.Similar.Info.length === 1 ) {
						this.props.handleResult(true)
						this.props.getSearchedData(data.Similar.Info[0])
						this.props.getRecData(data.Similar.Results)
					} else {
						this.props.handleResult(false)
					}
				})
			}
		})
	}

	render() {
		return (
			<Container className='search-input-container'>
				<h4>FIND ME</h4>
				<div>
					<Button color='red'
						onClick={() => this.props.handleTypeChange('music')}>
						<i className='music icon' /> Music
					</Button>

					<Button color='orange'
						onClick={() => this.props.handleTypeChange('movies')}>
						<i className='film icon' /> Movies
					</Button>

					<Button color='yellow'
						onClick={() => this.props.handleTypeChange('shows')}>
						<i className='tv icon' /> Shows
					</Button>

					<Button color='green'
						onClick={() => this.props.handleTypeChange('podcasts')}>
						<i className='podcast icon' /> Podcasts
					</Button>

					<Button color='blue'
						onClick={() => this.props.handleTypeChange('books')}>
						<i className='book icon' /> Books
					</Button>

					<Button color='purple'
						onClick={() => this.props.handleTypeChange('games')}>
						<i className='gamepad icon' /> Games
					</Button>
				</div>
				<h4>ON THE SAME WAVELENGTH AS</h4>

				<Input id='search'
					placeholder='SEARCH ANY SONG/ARTIST, MOVIE, SHOW, PODCAST, BOOK, OR GAME'
					onChange={(event) => this.handleSearch(event, this.props.searchType)} />

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