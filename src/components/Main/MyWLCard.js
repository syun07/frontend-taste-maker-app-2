import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToFavorites } from '../../actions/allActions'
import { deleteFromFavorites, postTrending, getFavorites, increaseLike, decreaseLike } from '../../services/backend';
import { Card, Button, Label, Modal, Embed } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'


class MyWLCard extends Component {
	state = {
		active: null
	}

	handleClick = () => this.setState({ active: true })
	
	handleAdd = () => {
		postTrending(this.props.wave, this.props.userData.id)
		.then(data => increaseLike(data.id, data.likes))
		.then(() => getFavorites(this.props.userData.id))	
		.then(data => this.props.addToFavorites(data.tastes))
		.then(this.increaseNumber())
	}

	handleRemove = () => {
		let byeWl = this.props.wavelength.find(fav => fav.name === this.props.wave.name)

		deleteFromFavorites(this.props.userData.id, byeWl.id)
		.then(() => decreaseLike(byeWl.id, byeWl.likes))
		.then(() => getFavorites(this.props.userData.id))
		.then(data => this.props.addToFavorites(data.tastes))
		.then(this.decreaseNumber())
	} 

	increaseNumber = () => {
		this.props.wave.likes += 1
	}

	decreaseNumber = () => {
		this.props.wave.likes -= 1
	}

	render() {
		const { name, genre, teaser, wUrl, yID, likes } = this.props.wave

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
		
		let tagType

		switch(genre) {
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
				onClick={() => this.handleAdd(this.props.wave)}>
				<i className='add icon' />ADD</Label>
		
		const removeBtn = 
			<Label className='rec-to-wl'
				as='a' color='black' onClick={() => this.handleRemove(this.props.wave)}>
				<i className='remove icon'/>REMOVE</Label>

		let addOrRemove;

		this.props.wavelength.find(wave => wave.name === this.props.wave.name) ?
			addOrRemove = removeBtn : addOrRemove = addBtn
			
		return ( 
			<Card id='rec-card'>
				<Card.Content>
					{tagType}
					{addOrRemove}
					
					<br /><br />
					
					<Card.Header className='result-name'>{name.slice(0, 30)}</Card.Header>
					<Card.Meta>
						<i className='heart outline icon' /> {likes}
					</Card.Meta>


					<Card.Description>
						<p className='card-description'>{teaser.slice(0, 550)}...</p>
					</Card.Description>

					<Modal id='modal' trigger=
						{<Button className='see-more' onClick={this.handleClick}
							basic color='black'>SEE MORE</Button>}>
						
						<Modal.Header id='modal-header'>	
							{tagType}
							{addOrRemove}
							<h3 className='blue-labels'>{name}</h3>
							<p className='modal-likes'><i className='heart outline icon' />{likes}</p>
						</Modal.Header>

						<Modal.Content scrolling>
							<Embed id={yID} source='youtube' active={this.state.active} />
								<br />
							
							<Modal.Description>
								<p>{teaser}</p>
								<a href={wUrl} target='_blank' rel='noopener noreferrer'>Read more about {name}</a>
							</Modal.Description>

						</Modal.Content>
					</Modal>
				</Card.Content>
			</Card>
		)
	}
}

const mapStateToProps = state => {
	return ({
		wavelength: state.wavelength,
		userData: state.userData
	})
}

export default connect(mapStateToProps, {addToFavorites})(MyWLCard);