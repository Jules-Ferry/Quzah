const { DefaultError } = require("../errors/errors")
const database = require("../modules/database")
const db = database.getDatabase()

function grantPermission(userId, permission) {
    const stmt = db.prepare("INSERT OR IGNORE INTO userPermissions (userId, permission) VALUES (?, ?)")
    try {
        const result = stmt.run(userId, permission)
        return { status: 200, changes: result.changes }
    } catch (error) {
        throw new DefaultError(500, "Could not grant permission", "SQLite", "InternalServerErrorException")
    }
}

function revokePermission(userId, permission) {
    const stmt = db.prepare("DELETE FROM userPermissions WHERE userId = ? AND permission = ?")
    try {
        const result = stmt.run(userId, permission)
        if (result.changes === 0) {
            throw new DefaultError(404, "Permission not found for this user", "Invalid Revoke", "PermissionNotFoundException")
        }
        return { status: 200 }
    } catch (error) {
        if (error instanceof DefaultError) throw error
        throw new DefaultError(500, "Could not revoke permission", "SQLite", "InternalServerErrorException")
    }
}

function hasPermission(userId, required) {
    const stmt = db.prepare("SELECT permission FROM userPermissions WHERE userId = ?")
    try {
        const rows = stmt.all(userId)
        const perms = rows.map(r => r.permission)

        if (perms.includes("*") || perms.includes(required)) {
            return true
        }

        const subject = required.split(".")[0]
        if (perms.includes(`${subject}.*`)) {
            return true
        }

        return false
    } catch (error) {
        throw new DefaultError(500, "Error checking permissions", "SQLite", "InternalServerErrorException")
    }
}

function listUserPermissions(userId) {
    const stmt = db.prepare("SELECT permission FROM userPermissions WHERE userId = ?")
    try {
        const perms = stmt.all(userId)
        return { status: 200, permissions: perms.map(p => p.permission) }
    } catch (error) {
        throw new DefaultError(500, "Could not list permissions", "SQLite", "InternalServerErrorException")
    }
}

module.exports = {
    grantPermission,
    revokePermission,
    hasPermission,
    listUserPermissions
}