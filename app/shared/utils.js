function isValidEmail(email) {

	if (typeof email !== 'string')
		return false;

	return /^[0-9a-zA-Z]+([\_\.\-]?[0-9a-zA-Z]+)*\@[0-9a-zA-Z]+[0-9a-zA-Z\.\-]*\.[a-zA-Z]{2,}$/.test(email);
}

function isValidName(name) {

	if (typeof name !== 'string')
		return false;

	return !( /^(?=.*[\!\@\#\$\%\&\*\(\)\'\"\\\|\]\}\[\{\;\:\/\?\>]).+$/.test(name) )
		&& /^.{3,50}$/.test(name);
}


function isValidPhone(phone) {

	if (typeof phone !== 'string')
		return false;

	return /^\(?\d{2}\)?\ *[9]?\d{4}\-?\d{4}$/.test(phone);
}

module.exports = { isValidEmail, isValidPhone, isValidName };