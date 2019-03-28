import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyWLCard from '../Main/MyWLCard';
import { Container } from 'semantic-ui-react';
import '../../stylesheets/MainPage.css';


class TrendingPage extends Component {
	render() {
		const trending = this.props.trending.sort(function (a, b) {
			return b.likes - a.likes
		})

		const mappedTrending = trending.map((wave, index) =>
			wave.likes > 1 ? <MyWLCard key={index} id={index} wave={wave} /> : null
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