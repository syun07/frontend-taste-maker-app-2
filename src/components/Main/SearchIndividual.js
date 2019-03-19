import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSearch } from '../../services/backend'
import { saveSearch, getSearchedData, getRecData, handleResult, clearSearchType } from '../../actions/allActions'


import { Container, Input, Button } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class SearchIndividual extends Component {

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
			<h4>SEARCH ALL</h4>
			<div>
				<Button disabled color='red'>
						<i className='music icon' /> Music
					</Button>

					<Button disabled color='orange'>
						<i className='film icon' /> Movies
					</Button>

					<Button disabled color='yellow'>
						<i className='tv icon' /> Shows
					</Button>

					<Button disabled color='green'>
						<i className='podcast icon' /> Podcasts
					</Button>

					<Button disabled color='blue'>
						<i className='book icon' /> Books
					</Button>

					<Button disabled color='purple'>
						<i className='gamepad icon' /> Games
					</Button>
				</div>
				<h4>FOR MORE INFORMATION</h4>
				<Input id='search'
					placeholder='SEARCH ANY SONG/ARTIST, MOVIE, SHOW, PODCAST, BOOK, OR GAME'
					onChange={(event) => this.handleSearch(event, this.props.searchType)} />
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		activeItem: state.activeItem,
		userSearch: state.userSearch,
		searchedData: state.searchedData
	})
}

export default connect(mapStateToProps, { saveSearch, getSearchedData, getRecData, handleResult, clearSearchType })(SearchIndividual)