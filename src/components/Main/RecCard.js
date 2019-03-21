import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePage, getSearchedData, getRecData } from '../../actions/allActions'
import { fetchSearch } from '../../services/backend';

import { Card, Label, Button } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'
let removeAccents = require('../../../node_modules/remove-accents')

class RecCard extends Component {

	handleNameClick = (name) => {
		// this.props.changePage('explore')
		const inputString = removeAccents(name.Name)
		this.seeMoreFetch(inputString)
	}

	seeMoreFetch = (name) => {
		fetchSearch(name).then(data => {
			this.props.getSearchedData(data.Similar.Info[0])
			this.props.getRecData(data.Similar.Results)
		})
	}

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

		// const addBtn = 
		// 	<Label
		// 		className='rec-to-wl'
		// 		as='a' color='black'
		// 		onClick={null}>
		// 		<i className='heartbeat icon' />ADD TO WAVELENGTH
		// 	</Label>
		
		// const removeBtn = 
		// 	<Label
		// 		className='rec-to-wl'
		// 		as='a' color='black'
		// 		onClick={null}>
		// 		<i className='heartbeat icon' />ADD TO WAVELENGTH
		// 	</Label>
	

		// let addOrRemove;

		return (
			<Card id='rec-card'>
				<Card.Content>
					{tagType}
					<br/><br/>
					<Card.Header className='result-name'>{Name}</Card.Header>

					{/* {addOrRemove} */}

					<Card.Description>
						<p className='card-description'>{wTeaser.slice(0, 500)}</p>
					</Card.Description>
					<br/>

					<Button
						inverted
						className='see-more'
						color={tagType.props.color}
						onClick={() => this.handleNameClick({Name})}>
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

export default connect(mapStateToProps, { changePage, getSearchedData, getRecData })(RecCard);