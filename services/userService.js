const bcrypt = require("bcryptjs")
const userRepository = require("../repositories/userRepository")
const jwt = require("jsonwebtoken")
const { DefaultError } = require("../errors/errors")

async function register({ username, password }) {
    const hashedPassword = await bcrypt.hash(password, 4)
    const result = userRepository.registerUser(username, hashedPassword)
    return result
}

async function login({ username, password }) {
    const result = userRepository.getUserByName(username, true)
    const isMatch = await bcrypt.compare(password, result.user.password)
    if (!isMatch) {
        throw new DefaultError(401, "Bad credentials", "Invalid Password", "InvalidCredentialsException")
    }
    return result
}

async function loginAndMakeToken({ username, password }) {
    const result = userRepository.getUserByName(username, true)
    const isMatch = await bcrypt.compare(password, result.user.password)
    if (!isMatch) {
        throw new DefaultError(401, "Bad credentials", "Invalid Password", "InvalidCredentialsException")
    }

    const payload = {
        id: result.user.id,
        username: result.user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: "RS256", issuer: "Quzah/1.0", expiresIn: "24h" })
    return token
}

async function loginWithToken({ token }) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["RS256"], issuer: "Quzah/1.0" })
    return decoded
}

module.exports = {
    login,
    register,
    loginWithToken,
    loginAndMakeToken,
}
