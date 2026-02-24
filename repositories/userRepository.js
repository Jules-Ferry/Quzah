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

function removeUser(userId) {
    const stmt = db.prepare(`DELETE FROM users WHERE id = ?`)
    try {
        const result = stmt.run(userId)
        if (result.changes > 0) {
            return { status: 200 }
        } else {
            throw new DefaultError(404, "Not exists", "Data not found", "NotFoundException")
        }
    } catch (error) {
        if (error instanceof DefaultError) {
            throw error
        }
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

function renameUser(id, newUsername) {
    const stmt = db.prepare(`UPDATE users SET username = ? WHERE id = ?`)
    try {
        const result = stmt.run(newUsername, id)
        if (result.changes > 0) {
            return { status: 200 }
        } else {
            throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
        }
    } catch (error) {
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

function changePassword(id, hashedPassword) {
    const stmt = db.prepare(`UPDATE users SET password = ? WHERE id = ?`)
    try {
        const result = stmt.run(hashedPassword, id)
        if (result.changes > 0) {
            return { status: 200 }
        } else {
            throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
        }
    } catch (error) {
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

module.exports = {
    renameUser,
    removeUser,
    getUserById,
    registerUser,
    getUserByName,
    changePassword
}