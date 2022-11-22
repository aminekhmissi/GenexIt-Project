const isEmpty = require('./isEmpty')
const validator = require('validator')
module.exports = function validateUser(data) {
  var errors = {}
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""
  data.fullname = !isEmpty(data.fullname) ? data.fullname : ""
  data.phone = !isEmpty(data.phone) ? data.phone : ""

  if (!validator.isEmail(data.email)) {
    errors.email = 'format email required'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'password required'
  }
  if (validator.isEmpty(data.fullname)) {
    errors.fullname = 'full name is required '
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = 'phone is required  '
  }
  return { errors, isValid: isEmpty(errors) }
}