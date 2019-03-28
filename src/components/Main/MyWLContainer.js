import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyWLCard from '../Main/MyWLCard';
import { Container, Dropdown } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css'

class MyWavelength extends Component {
	constructor() {
		super()

		this.state = {
			filterBy: 'all'
		}
	}

	handleChange = (event, { value }) => {
		this.setState({
			filterBy: value
		})
	}

	render() {

		// filter wavelength by genre
		console.log(this.props.wavelength[0].updated_at)
		const sorted = this.props.wavelength.sort(function (a, b) {
			return b.updated_at - a.updated_at
		})

		const filterWl = sorted.filter(wave => 
			wave.genre === this.state.filterBy
		)
		
		const mapFavs = filterWl.map(w =>
			<MyWLCard key={w.id} wave={w} />	
		)

		// all wavelength
		const allWl = sorted.map(w =>
			<MyWLCard key={w.id} wave={w} />
		)
		
		// filter by all vs filter by genre
		let wavelength;

		this.state.filterBy === 'all' ? wavelength = allWl : wavelength = mapFavs

		const options = [
			{
				text: 'ALL', value: 'all',
				image: <i className='filter icon'/>,
			},
			{
				text: 'MUSIC', value: 'music',
				image: <i className='music icon'/>,
			},
			{
				text: 'MOVIES', value: 'movie',
				image: <i className='film icon' />,
			},
			{
				text: 'SHOWS', value: 'show',
				image: <i className='tv icon'/>,
			},
			{
				text: 'PODCASTS', value: 'podcast',
				image: <i className='podcast icon' />,
			},
			{
				text: 'BOOKS', value: 'book',
				image: <i className='book icon' />
	
			},
			{
				text: 'GAMES', value: 'game',
				image: <i className='gamepad icon'/>,
			},
		]
		
		return ( 
			<div className='my-wavelength-page'>
				<h5 className='search-input-container'>
					FILTER MY WAVELENGTH BY
					<Dropdown inline
						options={options}
						defaultValue={options[0].value}
						onChange={this.handleChange}
					/>
				</h5>
				{wavelength.length > 0 ?
					<Container id='my-wl-container'>
						{wavelength}
					</Container>
					:
					<Container id='my-wl-container'>
						<p className='result-name' id='fix-dropdown'>nothing here yet!</p>
					</Container>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		wavelength: state.wavelength
	})
}

export default connect(mapStateToProps)(MyWavelength)