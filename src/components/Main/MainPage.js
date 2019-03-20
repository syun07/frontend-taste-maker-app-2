import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchInput from '../Main/SearchInput';
import SearchResults from '../Main/SearchResults';

import SearchIndividual from '../Main/SearchIndividual';
import SearchIndResults from '../Main/SearchIndResults';

import MyWL from './MyWL';
import MyWLGreeting from './MyWLGreeting'

import { changePage, clearSearch, getRecData, handleResult, clearSearchType, changeLogin, goBack } from '../../actions/allActions'

import { Container, Menu } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';

class MainPage extends Component {
	constructor() {
		super()

		// state for showing which item is currently clicked in navbar
		this.state = {
			activeItem: 'home'
		}
	}

	logOut = () => {
		this.props.changeLogin(false)
		this.props.goBack()
		localStorage.clear()
	}

	// changes activeItem state & props 
	handleItemClick = (clicked) => {
		this.setState({
			activeItem: clicked
		})
		this.props.changePage(clicked)
	}

	render() {	
		// define navBar, home, explore, & wavelength pages
		const navBar = 
			<Menu secondary id='navBar'>
				<Menu.Item
					name='HOME'
					active={this.state.activeItem === 'home'}
					onClick={() => this.handleItemClick('home')} />
				
				<Menu.Item
					name='EXPLORE'
					active={this.state.activeItem === 'explore'}
					onClick={() => this.handleItemClick('explore')} />
				
				<Menu.Item
					name='MY WAVELENGTH'
					active={this.state.activeItem === 'wavelength'}
					onClick={() => this.handleItemClick('wavelength')} />
			
				<Menu.Menu position='right'>
					<Menu.Item
						name='LOG OUT'
						active={this.state.activeItem === 'logout'}
						onClick={this.logOut}
						/>
				</Menu.Menu>
			</Menu>

		const homePage =
			<Container className='search-page-container'>
				<SearchInput />
				<SearchResults />
			</Container>
		
		const searchIndPage =
			<Container className='search-page-container'>
				<SearchIndividual />
				<SearchIndResults />
			</Container>
		
		const wavelength =
			<Container className='search-page-container'>
				<MyWLGreeting />
				<MyWL />
			</Container>
		

		let page;
		
		if (this.props.activeItem === 'home') {
			page = homePage
		} else if (this.props.activeItem === 'explore') {
			page = searchIndPage
		} else if (this.props.activeItem === 'wavelength') {
			page = wavelength
		} else if (this.props.activeItem === 'logout') {
			window.location.reload()
		}
		
		return (
			<Container className='main-container'>
				{navBar}
				{page}	
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		activeItem: state.activeItem,
		result: state.result
	})
}

export default connect(mapStateToProps, { getRecData, clearSearch, changePage, handleResult, clearSearchType, changeLogin, goBack })(MainPage);