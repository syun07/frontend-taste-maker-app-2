import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postFavorite, increaseLike, decreaseLike, getFavorites, deleteFromFavorites } from '../../services/backend';
import { addToFavorites } from '../../actions/allActions';

import { Button, Modal, Embed, Label } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class ShowMoreBtn extends Component {
	state = {
		active: null
	}
	
	handleModalClick = () => this.setState({ active: true })

	handleAdd = () => {
		postFavorite(this.props.searchedData, this.props.userData.id)
		.then(data => increaseLike(data.id, data.likes))	
		.then(() => getFavorites(this.props.userData.id))	
		.then(data => this.props.addToFavorites(data.tastes))
	}

	handleRemove = () => {
		let byeWl = this.props.wavelength.find(fav => fav.name === this.props.searchedData.Name)
			
		deleteFromFavorites(this.props.userData.id, byeWl.id)
		.then(() => decreaseLike(byeWl.id, byeWl.likes))
		.then(() => getFavorites(this.props.userData.id))
		.then(data => this.props.addToFavorites(data.tastes))
	}

	render() {

		const { Type } = this.props.searchedData

		const musicTag =
			<Label id='music' className='rec-tag' as='a' ribbon>
				<i className='music icon' />MUSIC</Label>
		
		const movieTag =
			<Label id='movies' className='rec-tag' as='a' ribbon>
				<i className='film icon' />MOVIE</Label>

		const showTag =
			<Label id='shows' className='rec-tag' as='a' ribbon>
				<i className='tv icon' />SHOW</Label>
		
		const podcastTag =
			<Label id='podcasts' className='rec-tag' as='a' ribbon>
				<i className='podcast icon' />PODCAST</Label>
			
			const bookTag =
			<Label id='books' className='rec-tag' as='a' ribbon>
				<i className='book icon' />BOOK</Label>
		
		const gameTag =
			<Label id='games' className='rec-tag' as='a' ribbon>
				<i className='game icon' />GAME</Label>
		
		let tagType;

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
			<Label className='rec-to-wl'
				as='a' color='olive'
				onClick={() => this.handleAdd(this.props.searchedData)}>
				<i className='add icon' />ADD</Label>
		
		const removeBtn = 
			<Label className='rec-to-wl'
				as='a' color='black' onClick={() => this.handleRemove(this.props.searchedData)}>
				<i className='remove icon'/>REMOVE</Label>

		let addOrRemove;

		if (this.props.wavelength.find(wave => wave.name === this.props.searchedData.Name)) {
			addOrRemove = removeBtn
		} else {
			addOrRemove = addBtn
		}

		return (
			<Modal id='modal' trigger=
				{<Button inverted id='web' onClick={this.handleModalClick}>
					MORE INFORMATION ON {this.props.searchedData.Name}</Button>}>			
				
				<Modal.Header id='modal-header'>
					{tagType}
					{addOrRemove}
					<h3 className='blue-labels'>{this.props.searchedData.Name}</h3>
				</Modal.Header>

				<Modal.Content scrolling>
					<Embed id={this.props.searchedData.yID} source='youtube' active={this.state.active} />
					<br />

					<Modal.Description>
						<p>{this.props.searchedData.wTeaser}</p>
						<a href={this.props.searchedData.wUrl} target='_blank' rel='noopener noreferrer'>Read more about {this.props.searchedData.Name}</a>
					</Modal.Description>

				</Modal.Content>
			</Modal>
		)
	}
}

const mapStateToProps = state => {
	return({
		wavelength: state.wavelength,
		searchedData: state.searchedData,
		userData: state.userData
	})
}

export default connect(mapStateToProps, {addToFavorites})(ShowMoreBtn)