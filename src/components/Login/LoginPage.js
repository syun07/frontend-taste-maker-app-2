import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickLogin, clickSignUp, changeLogin, goBack, setUserInfo } from '../../actions/allActions';
import { addNewUser, getAuthToken, getUserInfo } from '../../services/backend';
import { Form, Button } from 'semantic-ui-react';
import '../../stylesheets/LoginPage.css';

class LoginPage extends Component {
	constructor() {
		super()

		this.state = {
			name: '',
			password: '',
			newName: '',
			newPassword: ''
		}
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		})	
	}

	handleSubmit = event => {
		event.preventDefault();
		addNewUser(this.state.newName, this.state.newPassword)
		event.target.reset()
		this.props.clickLogin()
		this.setState({
			newName: '',
			newPassword: ''
		})
	}

	handleLogin = event => {
		event.preventDefault();
		getAuthToken({ name: this.state.name, password: this.state.password })
			.then(payload => {
				if (payload.user) {
					localStorage.setItem("token", payload.jwt)

					getUserInfo(payload.user.id).then((data) => this.props.setUserInfo(data))
					this.props.changeLogin(true)
			} else {
				alert("INVALID LOGIN!")
			}
		})
	}

	render() {
		const buttonPage =
			<div className='button-page-container'>
				<div className='title-container'>
					<h1 className='title-one'>Get on my</h1>
					<h1 className='title-two'>WAVELENGTH</h1>
				</div>
			
				<div className='open-page-btns'>
					<Button.Group>
						<Button inverted id='login-btn'
							onClick={this.props.clickLogin}>LOGIN</Button>
						<Button.Or />
						<Button id='signup-btn'
							onClick={this.props.clickSignUp}>SIGNUP</Button>
					</Button.Group>
				</div>
			</div>

		const loginForm =
			<div className='login-form-container'>
				<Form onSubmit={this.handleLogin}>					
					<h1 className='labels'>WELCOME BACK</h1>

					<Form.Field>
						<input placeholder='NAME' name='name'
							onChange={this.handleChange} />
					</Form.Field>
				
					<Form.Field>
						<input placeholder='PASSWORD' name='password' type='password'
							onChange={this.handleChange} />
					</Form.Field>

					<Button id='signup-btn' type='submit'>LOGIN</Button>
				</Form>
			</div>
		
		const signupForm =
			<div className='signup-form-container'>
				<Form onSubmit={this.handleSubmit}>
					<h1 className='labels'>WELCOME</h1>

					<Form.Field>
						<input placeholder='NAME' name='newName'
							onChange={this.handleChange} />
					</Form.Field>
				
					<Form.Field>
						<input placeholder='PASSWORD' name='newPassword' type='password'
							onChange={this.handleChange} />
					</Form.Field>

					<Button id='signup-btn' type='submit'>SIGN UP</Button>
				</Form>
			</div>		
		
		const goBackBtn =
			<div className='back-btn-container'> 
				<Button inverted id='login-btn' className='back-btn'
					onClick={this.props.goBack}>BACK</Button>
			</div>
		
		let whichForm;
		let goBack;

		if (this.props.form === 'b') {
			whichForm = buttonPage
			goBack = null
		} else if (this.props.form === 'l') {
			whichForm = loginForm
			goBack = goBackBtn
		} else if(this.props.form === 's') {
			whichForm = signupForm
			goBack = goBackBtn
		}
				
		return (
			<div className='login-page-grid'>
				{goBack}
				{whichForm}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return ({
		form: state.form
	})
}

export default connect(mapStateToProps, { clickLogin, clickSignUp, changeLogin, goBack, setUserInfo })(LoginPage)