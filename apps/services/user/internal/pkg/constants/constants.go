package constants

func InvalidFieldMessage(field string) string {
	return field + " field shouldn't pass validation"
}

func InvalidFieldValueMessage(field string) string {
	return field + " value is incorrect"
}

func MinLenMessage(length string) string {
	return "value length must be at least " + length + " runes"
}

func GTEValueMessage(value string) string {
	return "value must be greater than or equal to " + value
}

var InvalidTokenMessage = "JWT Token isn't valid"
var WrongCredentialsMessage = "Wrong credentials"
var UnableToSignJWTMessage = "Error while signing token"
var MustBeValidEmailMessage = "value must be a valid email address"
