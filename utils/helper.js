const checkPassword = (password) => {
  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,21}$/
  return regex.test(password)
}

module.exports = { checkPassword }
