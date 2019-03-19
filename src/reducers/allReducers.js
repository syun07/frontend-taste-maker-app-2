let initialState = {
	// login
	form: 'b',
	loginSuccess: false,
	userData: {},

	// main page nav
	activeItem: 'home',
	
	// save search & type
	userSearch: '',
	searchType: '',
	
	// data that returns from fetch if valid
	searchedData: {},
	recData: [],

	// don't show info for invalid fetches
	result: false,
	
	// saved wavelengths
	userTastes: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		// LOGIN
		case 'CLICK_LOGIN':
			return { ...state, form: 'l' }
		case 'CLICK_SIGNUP':
			return { ...state, form: 's' }
		case 'GO_BACK':
			return { ...state, form: 'b' }
		case 'CHANGE_LOGIN':
			return { ...state, loginSuccess: true }
		case 'SET_USER_INFO':
			return { ...state, userData: action.data, userTastes: action.data.tastes }
		
		// MAIN PAGE NAV
		case 'CHANGE_PAGE':
			return { ...state, activeItem: action.clicked }
		
		
		// SAVE SEARCH & TYPE
		case 'SAVE_SEARCH':
			return { ...state, userSearch: action.query }
		
		case 'HANDLE_TYPE_CHANGE':
			return { ...state, searchType: action.genre }
		
		case 'CLEAR_SEARCH_TYPE':
			return { ...state, searchType: '' }
				
		// DATA THAT RETURNS IF VALID SEARCH
		case 'GET_SEARCHED_DATA':
			return { ...state, searchedData: action.searched }
		
		case 'GET_REC_DATA':
			return { ...state, recData: action.rec }
		
		
		// NO INFO FOR INVALID SEARCHES
		case 'HANDLE_RESULT':
			return { ...state, result: action.result }
	
		default:
			return state
	}
}

