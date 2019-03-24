import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { addToFavorites } from '../../actions/allActions'
import { postFavorite, getFavorites, deleteFromFavorites } from '../../services/backend';
import { Container, Label } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';

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
			<Label id='music' className='ind-type-tag' as='a' ribbon>
				<i className='music icon' />MUSIC</Label>
		
		const movieTag =
			<Label id='movies' className='ind-type-tag' as='a' ribbon>
				<i className='film icon' />MOVIE</Label>

		const showTag =
			<Label id='shows' className='ind-type-tag' as='a' ribbon>
				<i className='tv icon' />SHOW</Label>
		
		const podcastTag =
			<Label id='podcasts' className='ind-type-tag' as='a' ribbon>
				<i className='podcast icon' />PODCAST</Label>
			
		const bookTag =
			<Label id='books' className='ind-type-tag' as='a' ribbon>
				<i className='book icon' />BOOK</Label>
		
		const gameTag =
			<Label id='games' className='ind-type-tag' as='a' ribbon>
				<i className='game icon' />GAME</Label>
		
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
			<Label id='search-to-wl'
				as='a' color='olive'
				onClick={() => postFavorite(this.props.searchedData, this.props.userData.id)
					.then(() => getFavorites(this.props.userData.id))
					.then(data => this.props.addToFavorites(data.tastes))}>
				<i className='add icon' />ADD</Label>
		
		const removeBtn = 
			<Label id='search-to-wl'
				as='a' color='black' onClick={() => this.handleRemove(this.props.searchedData)}>
				<i className='remove icon'/>REMOVE</Label>

		let addOrRemove;

		if (this.props.wavelength.find(wave => wave.name === this.props.searchedData.Name)) {
			addOrRemove = removeBtn
		} else {
			addOrRemove = addBtn
		}

		return (
			this.props.result === false ? 
				
			<Container className='searched-result-container'>
				<br/>
				<p className='result-name'>Please enter a valid search</p>
			</Container>
		:
			<Container id='search-card-result'>
				{tagType}
				<h3 className='blue-labels'>{Name}</h3>
				{addOrRemove}

				{yUrl === undefined || null ? null : <YouTube videoId={yID} opts={opts} />}
				<br/>
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
		searchedData: state.searchedData,
		userData: state.userData,
		wavelength: state.wavelength
	})
}

export default connect(mapStateToProps, { addToFavorites })(SearchIndResults)