import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import { Container, Label } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';

class SearchIndResults extends Component {
	render() {
		const opts = {
			height: '400',
			width: '650',
		}

		const { Name, Type, wTeaser, wUrl, yUrl, yID } = this.props.searchedData

		const musicTag =
			<Label className='type-tag' as='a' color='red' image>
				<i className='music icon' />
				MUSIC
			</Label>
		
		const movieTag =
			<Label className='type-tag' as='a' color='orange' image>
				<i className='film icon' />
				MOVIE
			</Label>

		const showTag =
			<Label className='type-tag' as='a' color='yellow' image>
				<i className='tv icon' />
				SHOW
			</Label>
		
		const podcastTag =
			<Label className='type-tag' as='a' color='green' image>
				<i className='podcast icon' />
				PODCAST
			</Label>
			
		const bookTag =
			<Label className='type-tag' as='a' color='blue' image>
				<i className='book icon' />
				BOOK
			</Label>
		
		const gameTag =
			<Label className='type-tag' as='a' color='blue' image>
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
			this.props.result === false ? 
				
			<Container className='searched-result-container'>
				<br/>
				<p className='result-messages'>Please enter a song/artist, movie, show, podcast, book/author, or game to find more information!</p>
			</Container>
		:
			<Container className='searched-result-container'>
					{tagType}
				<h2 className='result-name'>{Name}</h2>
				

				<Label
					className='add-to-wl'
					as='a' color='black'
					onClick={null}>
					<i className='heartbeat icon' />ADD TO WAVELENGTH
				</Label>

				<br />

				{yUrl === undefined || null ? null :
					<YouTube
						videoId={yID}
						opts={opts} />
				}
				<br/>
				<p className='result-desc'>{wTeaser}</p>
				{wUrl === undefined ? null : <a href={wUrl}>Read More About {Name}</a>}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		result: state.result,
		searchedData: state.searchedData,
		recData: state.recData
	})
}

export default connect(mapStateToProps)(SearchIndResults)