const LOCALAPI = 'http://localhost:3000'

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

	
///////////// FETCH /////////////

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
