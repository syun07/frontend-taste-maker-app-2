import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Input, Container, Button, Modal, Embed } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

import { fetchSearch } from '../../services/backend';
import { saveSearch, handleTypeChange, getSearchedData, getRecData, handleResult } from '../../actions/allActions'

class SearchInput extends Component {

	state = {
		active: null
	}
	
	handleModalClick = () => this.setState({ active: true })

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
		if (query === '' || this.props.userSearch.length < 2) {
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

		const type = this.props.searchType === '' ? 'All Categories' : this.props.searchType
		
		const show =
			<Modal id='modal' trigger=
				{<Button className='more-info-btn' onClick={this.handleModalClick}
					inverted color='teal'>
					MORE INFORMATION ON {this.props.searchedData.Name}</Button>}>
				
				<Modal.Header id='modal-header'>
					<h3 className='blue-labels'>{this.props.searchedData.Name}</h3>
				</Modal.Header>

				<Modal.Content scrolling>
					<Embed id={this.props.searchedData.yID} source='youtube' active={this.state.active} />
					<br />

					<Modal.Description>
						<p>{this.props.searchedData.wTeaser}</p>
						<a href={this.props.searchedData.wUrl}>Read more about {this.props.searchedData.Name}</a>
					</Modal.Description>

				</Modal.Content>

				</Modal>
		
		let showMoreBtn

		if (this.props.result) {
			showMoreBtn = show
		} else {
			showMoreBtn = null
		}

		return (
			<Container className='search-input-container'>
				<h5 className='blue-labels'>WHAT IS SOMETHING YOU LOVE?</h5>

				<Input id='search'
					placeholder='SEARCH A SONG/ARTIST, MOVIE, SHOW, PODCAST, BOOK, OR GAME'
					onChange={(event) => this.handleChange(event)} />
				<br />
				
				{showMoreBtn}
			
				<h5>FILTER WAVELENGTH</h5>
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
				<br/>

				{this.props.result === true ?
					<p className='result-name' id='result-name-desc'>{type} ON THE SAME WAVELENGTH AS {this.props.userSearch}</p> : null
			 	}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		activeItem: state.activeItem,
		userSearch: state.userSearch,
		searchType: state.searchType,
		searchedData: state.searchedData,
		result: state.result
	})
}

export default connect(mapStateToProps, { saveSearch, handleTypeChange, getSearchedData, getRecData, handleResult })(SearchInput)