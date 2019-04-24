import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShowMoreBtn from '../Main/ShowMoreBtn'
import { saveSearch, handleTypeChange, getSearchedData, getRecData, handleResult, addToTrending } from '../../actions/allActions'
import { fetchSearch } from '../../services/backend';
import { Input, Container, Button} from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class SearchInput extends Component {
	// constructor() {
	// 	super()

	// 	this.state = {
	// 		filterBy: 'all'
	// 	}
	// }

	// handleTrending = (event, { value }) => {
	// 	this.setState({
	// 		filterBy: value
	// 	})
	// }



	// event listener for typing in input
	handleChange = event => {
		this.props.saveSearch(event.target.value)

		// if (this.props.result) {
			this.handleSearch(event.target.value, this.props.searchType)
		// } else {
		// 	const filterTrending = this.props.trending.filter(t => t.genre === this.props.searchType)
		// 	this.props.addToTrending(filterTrending)
		// }
	}

	// event listener for clicking on genre
	handleClick = genre => {
		this.props.handleTypeChange(genre)
		this.handleSearch(this.props.userSearch, genre)
	}

	// both are sent to this function
	handleSearch = (query, genre) => {
		if (query.length < 2) {
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
			<ShowMoreBtn />
			
		let showMoreBtn

		this.props.result ? showMoreBtn = show : showMoreBtn = null

		return (
			<Container className='search-input-container'>
				<h5>WHAT IS SOMETHING YOU LOVE?</h5>

				<Input id='search'
					placeholder='SEARCH A SONG/ARTIST, MOVIE, SHOW, PODCAST, BOOK, OR GAME'
					onChange={(event) => this.handleChange(event)} />
			
				<h5>FILTER WAVELENGTH</h5>
				<div> 
					<Button id='all'
						onClick={() => this.handleClick('results')}>
						<i className='chess queen icon' />ALL
					</Button>

					<Button id='music'
						onClick={() => this.handleClick('music')}>
						<i className='music icon' /> MUSIC
					</Button>

					<Button id='movies'
						onClick={() => this.handleClick('movies')}>
						<i className='film icon' /> MOVIES
					</Button>

					<Button id='shows'
						onClick={() => this.handleClick('shows')}>
						<i className='tv icon' /> SHOWS
					</Button>

					<Button id='podcasts'
						onClick={() => this.handleClick('podcasts')}>
						<i className='podcast icon' /> PODCASTS
					</Button>

					<Button id='books'
						onClick={() => this.handleClick('books')}>
						<i className='book icon' /> BOOKS
					</Button>

					<Button id='games'
						onClick={() => this.handleClick('games')}>
						<i className='gamepad icon' /> GAMES
					</Button>
				</div>

				<br/>
				{this.props.result ?
					<p className='result-name' id='result-name-desc'>{type} ON THE SAME WAVELENGTH AS {this.props.searchedData.Name}</p> : null}
				{this.props.userSearch === '' ? <p className='result-name' id='result-name-desc'>TRENDING SEARCHES</p> : null}

				{showMoreBtn}

			</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		userSearch: state.userSearch,
		searchType: state.searchType,
		searchedData: state.searchedData,
		result: state.result,
		// trending: state.trending
	})
}

export default connect(mapStateToProps, { saveSearch, handleTypeChange, getSearchedData, getRecData, handleResult, addToTrending })(SearchInput)