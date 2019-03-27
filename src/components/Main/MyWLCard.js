import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToFavorites } from '../../actions/allActions'
import { deleteFromFavorites, postFavorite, getFavorites, increaseLike, decreaseLike } from '../../services/backend';
import { Card, Button, Label, Modal, Embed } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'


class MyWLCard extends Component {
	state = {
		active: null
	}
	
	handleClick = () => this.setState({ active: true })
	
	// handleAdd = () => {
	// 	postFavorite(this.props.wave, this.props.userData.id)
	// 	.then(data => increaseLike(data.id, data.likes))	
	// 	.then(() => getFavorites(this.props.userData.id))	
	// 	.then(data => this.props.addToFavorites(data.tastes))
	// }

	handleRemove = () => {
		let byeWl = this.props.wavelength.find(fav => fav.name === this.props.wave.name)

		deleteFromFavorites(this.props.userData.id, byeWl.id)
		.then(() => decreaseLike(byeWl.id, byeWl.likes))
		.then(() => getFavorites(this.props.userData.id))
		.then(data => this.props.addToFavorites(data.tastes))
	} 

	render() {
		const { name, genre, teaser, wUrl, yID } = this.props.wave

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
		console.log(this.props.wavelength)


		if (this.props.wavelength.find(wave => wave.name === this.props.wave.name)) {
			console.log('hi')
		}
		// 	addOrRemove = removeBtn
		// } else {
		// 	addOrRemove = addBtn
		// }

		return ( 
			<Card id='rec-card'>
				<Card.Content>
					{tagType}
					{addOrRemove}
					{/* <Label className='rec-to-wl'
						as='a' color='black' onClick={() => this.handleRemove(this.props.wave)}>
						<i className='remove icon' />REMOVE</Label> */}
					
					<br /><br />
					
					<Card.Header className='result-name'>{name.slice(0, 30)}</Card.Header>


					<Card.Description>
						<p className='card-description'>{teaser.slice(0, 600)}...</p>
					</Card.Description>

					<Modal id='modal' trigger=
						{<Button className='see-more' onClick={this.handleClick}
							basic color='black'>SEE MORE</Button>}>
						
						<Modal.Header id='modal-header'>						
							<h3 className='blue-labels'>{name}</h3>
						</Modal.Header>

						<Modal.Content scrolling>
							
							<Embed id={yID} source='youtube' active={this.state.active} />
								<br />
							
							<Modal.Description>
								<p>{teaser}</p>
								<a href={wUrl}>Read more about {name}</a>
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