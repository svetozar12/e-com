package constants

func InvalidFieldMessage(field string) string {
	return field + " field shouldn't pass validation"
}

func MinLenMessage(length string) string {
	return "value length must be at least " + length + " runes"
}

var InvalidTokenMessage = "JWT Token isn't valid"
var WrongCredentialsMessage = "Wrong credentials"
var UnableToSignJWTMessage = "Error while signing token"
