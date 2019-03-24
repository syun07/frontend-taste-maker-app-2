import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveSearch, getSearchedData, getRecData, handleResult } from '../../actions/allActions'
import { fetchSearch } from '../../services/backend'
import { Container, Input } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class SearchIndividual extends Component {

	handleChange = (event) => {
		this.props.saveSearch(event.target.value)
		this.handleSearch(event.target.value, this.props.searchType)
	}

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
		return (
			<Container className='search-input-container'>
				<h4>EXPLORE MORE INFORMATION ON ANYTHING</h4>
				<Input id='search'
					placeholder='SEARCH ANY SONG/ARTIST, MOVIE, SHOW, PODCAST, BOOK, OR GAME'
					onChange={(event) => this.handleChange(event)} />
				<br/>
				<div className='icon-cont'>
					<i className='music icon'/>
					<i className='film icon'/>
					<i className='tv icon'/>
					<i className='podcast icon'/>
					<i className='book icon'/>
					<i className='gamepad icon'/>
				</div>
			</Container>
		)
	}
}

export default connect(null, { saveSearch, getSearchedData, getRecData, handleResult })(SearchIndividual)