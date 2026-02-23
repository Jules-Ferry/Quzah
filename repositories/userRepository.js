const { DefaultError } = require("../errors/errors")
const database = require("../modules/database")
const db = database.getDatabase()

function registerUser(username, password) {
    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)")
    try {
        stmt.run(username, password)
        return { status: 200 }
    } catch (error) {
        console.log(error)
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

function getUserById(userId, needPassword = false) {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?")
    const user = stmt.get(userId)
    if (user) {
        if (!needPassword) {
            delete user.password
        }
        return { ode: 200, user }
    } else {
        throw new DefaultError(404, "No user found with that ID.", "Invalid ID", "UserNotFoundException")
    }   
}

function getUserByName(username, needPassword = false) {
    const stmt = db.prepare("SELECT * FROM users WHERE username = ?")
    const user = stmt.get(username)
    if (user) {
        if (!needPassword) {
            delete user.password
        }
        return { code: 200, user }
    } else {
        throw new DefaultError(404, "No user found with that ID.", "Invalid Username", "UserNotFoundException")
    }
}

module.exports = {
    getUserById,
    registerUser,
    getUserByName
}