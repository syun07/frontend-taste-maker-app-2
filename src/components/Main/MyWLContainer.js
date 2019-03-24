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
		const filterWl = this.props.wavelength.filter(wave => 
			wave.genre === this.state.filterBy
		)
		
		const mapFavs = filterWl.map(w =>
			<MyWLCard key={w.id} wave={w} />	
		)

		// all wavelength
		const allWl = this.props.wavelength.map(w =>
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
				<span className='search-input-container'>
					FILTER MY WAVELENGTH BY
					<Dropdown inline
						options={options}
						defaultValue={options[0].value}
						onChange={this.handleChange}
					/>
				</span>
				<Container id='my-wl-container'>			
					{wavelength}
				</Container>
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