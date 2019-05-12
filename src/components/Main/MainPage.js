import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput from '../Main/SearchInput';
import SearchResults from '../Main/SearchResults';
import SearchIndividual from '../Main/SearchIndividual';
import SearchIndResults from '../Main/SearchIndResults';
import TrendingPage from '../Main/TrendingPage';
import MyWLContainer from './MyWLContainer';
import { changePage, changeLogin, goBack, addToFavorites, addToTrending, getSearchedData, getRecData, saveSearch, handleResult, handleTypeChange} from '../../actions/allActions';
import { getTrending } from '../../services/backend'
import { Container, Menu } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';

class MainPage extends Component {
	constructor() {
		super()

		// which item is clicked in nav
		this.state = {
			activeItem: 'home'
		}
	}

	logOut = () => {
		this.props.changeLogin(false)
		this.props.goBack()
		localStorage.clear()
		this.clearData()
	}

	clearData = () => {
		this.props.saveSearch('')
		this.props.handleResult(false)
		this.props.getSearchedData({})
		this.props.getRecData([])
		this.props.handleTypeChange('results')
	}

	// changes activeItem state & props 
	handleItemClick = (clicked) => {
		this.setState({
			activeItem: clicked
		})
		this.clearData()
		this.props.changePage(clicked)
	}

	render() {	
		const navBar = 
			<Menu secondary id='navBar'>
				<Menu.Item
					name='HOME'
					active={this.state.activeItem === 'home'}
					onClick={() => this.handleItemClick('home')} />
				
				<Menu.Item
					name='TRENDING'
					active={this.state.activeItem === 'trending'}
					onClick={() => this.handleItemClick('trending')} />
				
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
				<MyWLContainer />
			</Container>
		
		const trending = 
			<Container className='search-page-container'>
				<h5 className='search-input-container'>TRENDING SEARCHES</h5>
				<TrendingPage />
			</Container>
		

		let page;
		
		if (this.props.activeItem === 'home') {
			page = homePage
			getTrending().then(data => this.props.addToTrending(data))
		} else if (this.props.activeItem === 'explore') {
			page = searchIndPage
		} else if (this.props.activeItem === 'trending') {
			page = trending
		} else if (this.props.activeItem === 'wavelength') {
			page = wavelength
		} else if (this.props.activeItem === 'logout') {
			Location.reload(true)
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
		result: state.result,
		userData: state.userData
	})
}

export default connect(mapStateToProps, { changePage, changeLogin, goBack, addToFavorites, addToTrending, getSearchedData, getRecData, saveSearch, handleResult,handleTypeChange})(MainPage);