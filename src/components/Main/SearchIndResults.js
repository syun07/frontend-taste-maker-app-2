import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import { Container, Label, Card } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';
import { postFavorite, getFavorites, deleteFromFavorites } from '../../services/backend';
import { addToFavorites } from '../../actions/allActions'


class SearchIndResults extends Component {

	handleRemove = () => {
		let byeWl = this.props.wavelength.find(fav => fav.name === this.props.searchedData.Name)
			
		deleteFromFavorites(this.props.userData.id, byeWl.id)	
		.then(() => getFavorites(this.props.userData.id))
		.then(data => this.props.addToFavorites(data.tastes))
	}

	render() {
		const opts = {
			height: '400',
			width: '650',
		}

		const { Name, Type, wTeaser, wUrl, yUrl, yID } = this.props.searchedData

		const musicTag =
			<Label className='ind-type-tag' as='a' color='red' ribbon>
				<i className='music icon' />
				MUSIC
			</Label>
		
		const movieTag =
			<Label className='ind-type-tag' as='a' color='orange' ribbon>
				<i className='film icon' />
				MOVIE
			</Label>

		const showTag =
			<Label className='ind-type-tag' as='a' color='yellow' ribbon>
				<i className='tv icon' />
				SHOW
			</Label>
		
		const podcastTag =
			<Label className='ind-type-tag' as='a' color='green' ribbon>
				<i className='podcast icon' />
				PODCAST
			</Label>
			
		const bookTag =
			<Label className='ind-type-tag' as='a' color='blue' ribbon>
				<i className='book icon' />
				BOOK
			</Label>
		
		const gameTag =
			<Label className='ind-type-tag' as='a' color='blue' ribbon>
				<i className='game icon' />
				GAME
			</Label>
		
		let tagType

		switch(Type) {
			case 'music':
				tagType = musicTag
				break;
			case 'movie':
				tagType = movieTag
				break;
			case 'show':
				tagType = showTag
				break;
			case 'podcast':
				tagType = podcastTag
				break;
			case 'book':
				tagType = bookTag
				break;
			case 'author':
				tagType = bookTag
				break;
			case 'game':
				tagType = gameTag
				break;
			default:
				return null;
		}	

		const addBtn = 
			<Label className='search-to-wl'
				as='a' color='olive'
				onClick={() => postFavorite(this.props.searchedData, this.props.userData.id)
					.then(() => getFavorites(this.props.userData.id))
					.then(data => this.props.addToFavorites(data.tastes))}>
				<i className='add icon' />ADD</Label>
		
		const removeBtn = 
			<Label className='search-to-wl'
				as='a' color='black' onClick={() => this.handleRemove(this.props.searchedData)}>
				<i className='remove icon'/>REMOVE</Label>

		let addOrRemove;

		if (this.props.wavelength.find(wave => wave.name === this.props.searchedData.Name)) {
			addOrRemove = removeBtn
		} else {
			addOrRemove = addBtn
		}

		return (
			this.props.result === false || this.props.userSearch === '' ? 
				
			<Container className='searched-result-container'>
				<br/>
				<p className='result-name'>Please enter a song/artist, movie, show, podcast, book/author, or game to find more information!</p>
			</Container>
		:
		
			<Container id='search-card-result'>
				<br/>
				<h4 className='blue-labels'>{Name}</h4>
				{tagType}
				{addOrRemove}

				{yUrl === undefined || null ? null :
				<YouTube
					videoId={yID}
					opts={opts} />
				}
				
					<p>{wTeaser}</p>
					<a href={wUrl}>Read More About {Name}</a>
					
			</Container>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return ({
		result: state.result,
		userSearch: state.userSearch,
		searchedData: state.searchedData,
		recData: state.recData,
		userData: state.userData,
		wavelength: state.wavelength
	})
}

export default connect(mapStateToProps, { addToFavorites })(SearchIndResults)