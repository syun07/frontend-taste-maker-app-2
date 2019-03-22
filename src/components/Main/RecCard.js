import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePage, getSearchedData, getRecData, addToFavorites } from '../../actions/allActions'

import { Card, Label, Button, Modal, Embed } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'
import { postFavorite, getFavorites } from '../../services/backend';

class RecCard extends Component {
	
	state = {
		active: null
	}
	
	handleClick = () => this.setState({ active: true })

	render() {	

		const { Name, Type, wTeaser, yID, wUrl } = this.props.rec

		const musicTag =
			<Label id='rec-tag' as='a' color='red' ribbon>
				<i className='music icon' />MUSIC</Label>
		
		const movieTag =
			<Label id='rec-tag' as='a' color='orange' ribbon>
				<i className='film icon' />MOVIE</Label>

		const showTag =
			<Label id='rec-tag' as='a' color='yellow' ribbon>
				<i className='tv icon' />SHOW</Label>
		
		const podcastTag =
			<Label id='rec-tag' as='a' color='green' ribbon>
				<i className='podcast icon' />PODCAST</Label>
			
		const bookTag =
			<Label id='rec-tag' as='a' color='blue' ribbon>
				<i className='book icon' />BOOK</Label>
		
		const gameTag =
			<Label id='rec-tag' as='a' color='blue' ribbon>
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
			<Label className='rec-to-wl'
				as='a' color='olive'
				onClick={() => postFavorite(this.props.rec, this.props.userData.id)
					.then(() => getFavorites(this.props.userData.id))
					.then(data => this.props.addToFavorites(data.tastes))}>
				<i className='add icon' />ADD</Label>
		
		const removeBtn = 
			<Label className='rec-to-wl'
				as='a' color='black' onClick={() => this.handleRemove}>
				<i className='remove icon'/>REMOVE</Label>

		let addOrRemove;

		if (this.props.wavelength.find(wave => wave.name === this.props.rec.Name)) {
			addOrRemove = removeBtn
		} else {
			addOrRemove = addBtn
		}


		return (
			<Card id='rec-card'>
				<Card.Content>
					{tagType}
					{addOrRemove}
					<br /><br />
					
					<Card.Header className='result-name'>{Name}</Card.Header>

					<Card.Description>
						<p className='card-description'>{wTeaser.slice(0, 600)}...</p>
					</Card.Description>

					<Modal id='modal' trigger=
						{<Button className='see-more' onClick={this.handleClick}
							inverted color={tagType.props.color}>SEE MORE</Button>}>
						
						<Modal.Header id='modal-header'>						
							<h3 className='blue-labels'>{Name}</h3>
						</Modal.Header>

						<Modal.Content scrolling>
							<Embed id={yID} source='youtube' active={this.state.active} />
								<br />
							
							<Modal.Description>
								<p>{wTeaser}</p>
								<a href={wUrl}>Read more about {Name}</a>
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
		recData: state.recData,
		userData: state.userData
	})
}

export default connect(mapStateToProps, { changePage, getSearchedData, getRecData, addToFavorites })(RecCard);