const bcrypt = require("bcryptjs")
const userRepository = require("../repositories/userRepository")
const jwt = require("jsonwebtoken")
const { DefaultError } = require("../errors/errors")

async function register({ username, password }) {
    let existingUser = null

    try {
        existingUser = userRepository.getUserByName(username)
    } catch (error) {
        existingUser = null
    }

    if (existingUser) {
        throw new DefaultError(409, "This user already exists.", "Registration", "ConflictException")
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = userRepository.registerUser(username, hashedPassword)

        return {
            status: 200,
            data: result
        }

    } catch (error) {
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

async function loginWithCredentials({ username, password }) {
    const result = userRepository.getUserByName(username, true)
    const isMatch = await bcrypt.compare(password, result.user.password)
    if (!isMatch) {
        throw new DefaultError(401, "Bad credentials.", "Invalid Password.", "InvalidCredentialsException")
    }
    return result
}

async function loginAndMakeToken({ username, password }) {
    const result = userRepository.getUserByName(username, true)
    const isMatch = await bcrypt.compare(password, result.user.password)
    if (!isMatch) {
        throw new DefaultError(401, "Bad credentials.", "Invalid Password.", "InvalidCredentialsException")
    }

    const payload = {
        id: result.user.id,
        username: result.user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { issuer: "Quzah/1.0", expiresIn: "24h" })
    return token
}

async function loginWithToken({ token }) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { issuer: "Quzah/1.0" })
        return decoded
    } catch (error) {
        throw new DefaultError(401, "Bad credentials.", "Invalid Token.", "InvalidCredentialsException")
    }
}

async function isLogged(req, res, next) {
    let token = null
    if (req.cookies && req.cookies["quzah-bearer"]) {
        token = req.cookies["quzah-bearer"]
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        throw new DefaultError(401, "Missing token.", "Token not found in cookie and auth header", "MissingTokenException")
    }

    try {
        const decoded = await loginWithToken({ token })
        req.user = decoded
        
        return next() 
    } catch (error) {
        throw error
    }
}

async function getUserById(id) {
    return userRepository.getUserById(id)
}

async function getUserByName(name) {
    return userRepository.getUserByName(name)
}

async function renameUser(id, newUsername) {
    return userRepository.renameUser(id, newUsername)
}

async function removeUser(id) {
    return userRepository.removeUser(id)
}

async function changePassword(id, password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return userRepository.changePassword(id, hashedPassword)
}

module.exports = {
    isLogged,
    register,
    removeUser,
    renameUser,
    getUserById,
    getUserByName,
    changePassword,
    loginWithToken,
    loginAndMakeToken,
    loginWithCredentials,
}
