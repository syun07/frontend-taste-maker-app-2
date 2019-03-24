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

		const filterWl = this.props.wavelength.filter(wave => 
			wave.genre === this.state.filterBy
		)

		const mapFavs = filterWl.map(w =>
			<MyWLCard
				key={w.id}
				wave={w} />	
		)
		console.log(filterWl)

		const allWl = this.props.wavelength.map(w =>
			<MyWLCard
				key={w.id}
				wave={w} />
		)
		
		let wavelength;

		this.state.filterBy === 'all' ? wavelength = allWl : wavelength = mapFavs
		

		const options = [
			{
				key: 'all',
				text: 'ALL',
				value: 'all',
				image: <i className='filter icon'/>,
			},
			{
				key: 'music',
				text: 'MUSIC',
				value: 'music',
				image: <i className='music icon'/>,
			},
			{
				key: 'movies',
				text: 'MOVIES',
				value: 'movie',
				image: <i className='film icon' />,
			},
			{
				key: 'shows',
				text: 'SHOWS',
				value: 'show',
				image: <i className='tv icon'/>,
			},
			{
				key: 'podcasts',
				text: 'PODCASTS',
				value: 'podcast',
				image: <i className='podcast icon' />,
			},
			{
				key: 'books',
				text: 'BOOKS',
				value: 'book',
				image: <i className='book icon' />
	
			},
			{
				key: 'games',
				text: 'GAMES',
				value: 'game',
				image: <i className='gamepad icon'/>,
			},
		]
		

		return ( 
			<div className='my-wavelength-page'>
				<span className='search-input-container'>
					FILTER MY WAVELENGTH BY
					<Dropdown
						inline
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
		userData: state.userData,
		wavelength: state.wavelength
	})
}

export default connect(mapStateToProps)(MyWavelength)