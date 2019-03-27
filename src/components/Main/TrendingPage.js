import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyWLCard from '../Main/MyWLCard';
import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';


class TrendingPage extends Component {
	render() {
		const mappedTrending = this.props.trending.map((wave, index) =>
		<MyWLCard key={index} id={index} wave={wave} />
		)
		
		return (
			<Container id='my-wl-container'>
				{mappedTrending}
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return ({
		trending: state.trending
	})
}

export default connect(mapStateToProps)(TrendingPage)