//////////////// LOGIN ////////////////

// render login form
export const clickLogin = () => {
	return {
		type: 'CLICK_LOGIN'
	}
}

// render signup form
export const clickSignUp = () => {
	return {
		type: 'CLICK_SIGNUP'
	}
}

export const loadScreen = () => {
	return {
		type: 'LOAD_SCREEN'
	}
}

// go back to button page
export const goBack = () => {
	return {
		type: 'GO_BACK'
	}
}

// change login status to true if login is authenticated
export const changeLogin = (boo) => {
	return {
		type: 'CHANGE_LOGIN', boo
	}
}

// take in user data & set as userData state
export const setUserInfo = data => {
	return {
		type: 'SET_USER_INFO', data
	}
}

//////////////// MAIN PAGE NAV ////////////////

// change what's rendered in main container based on navBar click
export const changePage = clicked => {
	return {
		type: 'CHANGE_PAGE', clicked
	}
}

//////////////// SEARCH DATA ////////////////

// save user's search
export const saveSearch = query => {
	return {
		type: 'SAVE_SEARCH', query
	}
}

// change searchType depending on which btn is clicked
export const handleTypeChange = genre => {
	return {
		type: 'HANDLE_TYPE_CHANGE', genre
	}
}


//////////////// VALID FETCHED DATA ////////////////

// save searched data to state
export const getSearchedData = searched => {
	return {
		type: 'GET_SEARCHED_DATA', searched
	}
}

// save recommended data to state
export const getRecData = rec => {
	return {
		type: 'GET_REC_DATA', rec
	}
}

//////////////// INVALID SEARCHED DATA ////////////////

// true/false depending on whether search input is a valid search
export const handleResult = result => {
	return {
		type: 'HANDLE_RESULT', result
	}
}


//////////////// FAVORITES ////////////////

// adding favorites
export const addToFavorites = wavelength => {
	return {
		type: 'ADD_TO_FAVORITES', wavelength
	}
}

//////////////// TRENDING ////////////////
export const addToTrending = trending => {
	return {
		type: 'ADD_TO_TRENDING', trending
	}
}