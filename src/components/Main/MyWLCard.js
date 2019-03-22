import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePage, getSearchedData, getRecData } from '../../actions/allActions';
// import { fetchSearch } from '../../services/backend';


import { Card, Button, Label, Modal, Embed } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'
// let removeAccents = require('../../../node_modules/remove-accents')


class MyWLCard extends Component {

	state = {
		active: null
	}
	
	handleClick = () => this.setState({ active: true })

// 	handleClick = () => {
// 		let favWL
// 		if (this.props.wavelength !== []) {
// 			 favWL = this.props.wavelength.find(fav => fav. === this.props.movieInfo.id)
// 		}

// 		deleteFavorite(this.props.currentUser, favedMovie.id)
// 		.then(() => getFavorites(this.props.currentUser))
// 		.then(data => this.props.setUserFavorites(data.movies))
//  } 


	render() {
	
		const { name, genre, teaser, wUrl, yID } = this.props.wave

		const musicTag =
		<Label id='rec-tag' as='a' color='red' ribbon>
				<i className='music icon' />
				MUSIC
			</Label>
		
		const movieTag =
			<Label id='rec-tag' as='a' color='orange' ribbon>
				<i className='film icon' />
				MOVIE
			</Label>

		const showTag =
			<Label id='rec-tag' as='a' color='yellow' ribbon>
				<i className='tv icon' />
				SHOW
			</Label>
		
		const podcastTag =
			<Label id='rec-tag' as='a' color='green' ribbon>
				<i className='podcast icon' />
				PODCAST
			</Label>
			
		const bookTag =
			<Label id='rec-tag' as='a' color='blue' ribbon>
				<i className='book icon' />
				BOOK
			</Label>
		
		const gameTag =
			<Label id='rec-tag' as='a' color='blue' ribbon>
				<i className='game icon' />
				GAME
			</Label>
		
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

		const removeBtn = 
			<Label className='rec-to-wl'
				as='a' color='black' onClick={() => this.handleRemove}>
				<i className='remove icon'/>REMOVE</Label>

		let addOrRemove = removeBtn;

		// if (this.props.wavelength.find(wave => wave.name === this.props.wave.name)) {
		// 	addOrRemove = removeBtn
		// } else {
		// 	addOrRemove = addBtn
		// }

		return ( 
			// show favorites by type
			<Card id='rec-card'>
				<Card.Content>
					{tagType}
					{addOrRemove}
					<br /><br />
					
					<Card.Header className='result-name'>{name}</Card.Header>


					<Card.Description>
						<p className='card-description'>{teaser.slice(0, 600)}...</p>
					</Card.Description>

					<Modal id='modal' trigger=
						{<Button className='see-more' onClick={this.handleClick}
							inverted color={tagType.props.color}>SEE MORE</Button>}>
						
						<Modal.Header id='modal-header'>						
							<h3 id='center-name'>{name}</h3>
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
		wavelength: state.wavelength
	})
}


export default connect(mapStateToProps, { changePage, getSearchedData, getRecData })(MyWLCard);