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

export const 

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

export const clearSearch = () => {
	return {
		type: 'CLEAR_SEARCH'
	}
}

// change searchType depending on which btn is clicked
export const handleTypeChange = genre => {
	return {
		type: 'HANDLE_TYPE_CHANGE', genre
	}
}

// clear search type so it doesn't persist on next search
export const clearSearchType = () => {
	return {
		type: 'CLEAR_SEARCH_TYPE'
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

export const addToWavelength = wavelength => {
	return {
		type: 'ADD_TO_WAVELENGTH', wavelength
	}
}



