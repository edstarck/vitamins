function auth (login, password) {

	if(login === 'login' && password === 'password'){
		return 'You were logged in';
	} else {
		return 'You ligin is incorrect';
	}

}

