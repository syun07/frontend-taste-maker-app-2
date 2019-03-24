let initialState = {
	// login
	form: 'b',
	loginSuccess: false,
	userData: {},

	// main page nav
	activeItem: 'home',
	
	// save search & type
	userSearch: '',
	searchType: 'results',
	
	// data that returns from fetch if valid
	searchedData: {},
	recData: [],

	// don't show info for invalid fetches
	result: false,

	wavelength: []
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
			return { ...state, loginSuccess: action.boo }
		case 'SET_USER_INFO':
			return { ...state, userData: action.data }
		
		// MAIN PAGE NAV
		case 'CHANGE_PAGE':
			return { ...state, activeItem: action.clicked }
		
		
		// SAVE SEARCH & TYPE
		case 'SAVE_SEARCH':
			return { ...state, userSearch: action.query }

		case 'CLEAR_SEARCH':
			return {...state, userSearch: ''}
		
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
		
		case 'ADD_TO_FAVORITES':
			return { ...state, wavelength: action.wavelength}
	
		default:
			return state
	}
}

