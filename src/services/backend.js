const LOCALAPI = 'http://localhost:3000'

const TASTESAPI = 'https://tastedive.com/api'
const APIKEY = '332551-SchoolPr-UPIB7UJ8'

///////////// LOGIN /////////////
export const 	getAuthToken = (loginInfo) => {
	return fetch(`${LOCALAPI}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(loginInfo)
	}).then(res => res.json())
}

export const addNewUser = (name, password) => {
	return fetch(`${LOCALAPI}/users`, {
		method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: name,
				password: password
			})
		}).then(res => res.json())
	}
	
	export const getUserInfo = (id) => {
		return fetch(`${LOCALAPI}/users/${id}`).then(res => res.json())
	}
	
/////////////// FRONTEND FETCH /////////////

	// export const fetchInfo = (query, genre = '') => {
	// 	return fetch(`${TASTESAPI}/similar?q=${query}&k=${APIKEY}&info=1&verbose=1&type=${genre}`, {
	// 		method: "GET",
	// 		headers: {
	// 			'Content-Type': "application/json",
	// 		}
	// 	}).then(res => res.json())
	// }

	
///////////// BACKEND FETCH /////////////

export const fetchSearch = (query, genre='') => {
	return fetch(`${LOCALAPI}/searched-wavelength`, {
		headers: new Headers({
			'Content-Type': 'application/json; charset=utf-8',
			'query': query,
			'genre': genre
		}),
			method: 'GET'
	}).then(res => res.json())
}

// export const fetchSearch = (query, genre = '') => {
// 	return fetch(`${LOCALAPI}/searched-wavelength`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			query: query,
// 			genre: genre
// 		})
// 	})
// }