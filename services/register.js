const crypto = require("node:crypto")
const DefaultError = require("../errors/DefaultError")

function register({ email, username }) {
    const canRegister = true
    if (canRegister === true) {
        return {
            id: crypto.randomUUID(),
            username: username,
            email: email
        }
    } else {
        throw new DefaultError(418, "I'm a teapot", "", "TeaPotExeception")
    }
}

module.exports = {
    register
}