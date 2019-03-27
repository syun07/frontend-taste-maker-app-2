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

	
///////////// SEND QUERY + GENRE TO BACKEND FOR FETCH /////////////

export const fetchSearch = (query, genre = '') => {
	return fetch(`${LOCALAPI}/searched-wavelength`, {
		headers: new Headers({
			'Content-Type': 'application/json; charset=utf-8',
			'query': query,
			'genre': genre
		}),
			method: 'GET'
	}).then(res => res.json())
}


///////////// POST TO FAVORITES /////////////

export const postFavorite = (wavelength, userId, likes = 0) => {
return fetch(`${LOCALAPI}/tastes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			userID: userId,
			name: wavelength.Name,
			genre: wavelength.Type,
			teaser: wavelength.wTeaser,
			wUrl: wavelength.wUrl,
			yUrl: wavelength.yUrl,
			yID: wavelength.yID,
			likes: likes
		})
	}).then(res => res.json())
}

export const getFavorites = (userId) => {
	return fetch(`${LOCALAPI}/users/${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
}

export const deleteFromFavorites = (userId, tasteId) => {
	return fetch(`${LOCALAPI}/remove-wavelength`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user_id: userId,
			taste_id: tasteId
		})
	})
}

export const increaseLike = (id, likes) => {
	return fetch(`${LOCALAPI}/tastes/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			likes: likes += 1
		})
	})
}

export const decreaseLike = (id, likes) => {
	return fetch(`${LOCALAPI}/tastes/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			likes: likes -= 1
		})
	})
}

export const getTrending = () => {
	return fetch(`${LOCALAPI}/tastes`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json())
}