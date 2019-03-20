import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Label } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class RecCard extends Component {

	render() {	
		const { Name, Type, wTeaser } = this.props.rec

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

		return (
			<Card id='rec-card'>
				<Card.Content>
					<br/><br/>
					<Card.Header className='result-name'>{Name}</Card.Header>
					<Card.Description id='small-desc'>Same Wavelength As {this.props.searchedName}</Card.Description>
					{tagType}
					<br/>
					<Card.Description>
						<p>{wTeaser}</p>
					</Card.Description>
				</Card.Content>

				<Label
					className='rec-to-wl'
					as='a' color='black'
					onClick={null}>
					<i className='heartbeat icon' />ADD TO WAVELENGTH
				</Label>
			</Card>
		)
	}
}

const mapStateToProps = state => {
	return ({
		searchedName: state.searchedData.Name
	})
}

export default connect(mapStateToProps)(RecCard);