import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePage, getSearchedData, getRecData } from '../../actions/allActions';
// import { fetchSearch } from '../../services/backend';


import { Card, Button, Label } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'
// let removeAccents = require('../../../node_modules/remove-accents')


class MyWLCard extends Component {

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
	
		const { name, genre, teaser } = this.props.wave

		const musicTag =
		<Label id='rec-tag' as='a' color='red' image>
				<i className='music icon' />
				MUSIC
			</Label>
		
		const movieTag =
			<Label id='rec-tag' as='a' color='orange' image>
				<i className='film icon' />
				MOVIE
			</Label>

		const showTag =
			<Label id='rec-tag' as='a' color='yellow' image>
				<i className='tv icon' />
				SHOW
			</Label>
		
		const podcastTag =
			<Label id='rec-tag' as='a' color='green' image>
				<i className='podcast icon' />
				PODCAST
			</Label>
			
		const bookTag =
			<Label id='rec-tag' as='a' color='blue' image>
				<i className='book icon' />
				BOOK
			</Label>
		
		const gameTag =
			<Label id='rec-tag' as='a' color='blue' image>
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

		return ( 
			// show favorites by type
			<Card id='rec-card'>
				<Card.Content>
					{tagType}
					<br/><br/>
					<Card.Header className='result-name'>{name}</Card.Header>

					<Label
						className='rec-to-wl'
						as='a' color='black'
						onClick={null}>
						<i className='heartbeat icon' />REMOVE FROM WAVELENGTH
					</Label>

					<Card.Description>
						<p className='card-description'>{teaser.slice(0, 500)}</p>
					</Card.Description>

					<Button
						inverted
						className='see-more'
						color={tagType.props.color}>
						See More
					</Button>
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