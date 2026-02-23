const { DefaultError } = require("../errors/errors")
const database = require("../modules/database")
const db = database.getDatabase()

function add(table, id, label) {
    const stmt = db.prepare(`INSERT INTO ${table} (id, label) VALUES (?, ?)`)
    try {
        stmt.run(id, label)
        return { status: 200 }
    } catch (error) {
        if (error.message == "UNIQUE constraint failed: structures.id") {
            throw new DefaultError(409, "Duplicated entry", "SQLite", "UniqueConstraintException")
        }
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

function rename(table, id, newLabel) {
    const stmt = db.prepare(`UPDATE ${table} SET label = ? WHERE id = ?`)
    try {
        const result = stmt.run(newLabel, id)
        if (result.changes > 0) {
            return { status: 200 }
        } else {
            throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
        }
    } catch (error) {
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

function remove(table, id) {
    const stmt = db.prepare(`DELETE FROM ${table} WHERE id = ?`)
    try {
        const result = stmt.run(id)
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

function getById(table, id) {
    const stmt = db.prepare(`SELECT * FROM ${table} WHERE id = ?`)
    try {
        const result = stmt.get(id)
        if (result) {
            return { status: 200, data: result }
        } else {
            throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
        }
    } catch (error) {
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

function getByName(table, name) {
    const stmt = db.prepare(`SELECT * FROM ${table} WHERE label = ?`)
    try {
        const result = stmt.get(name)
        if (result) {
            return { status: 200, data: result }
        } else {
            throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
        }
    } catch (error) {
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

function getAll(table) {
    const stmt = db.prepare(`SELECT * FROM ${table}`)
    try {
        const result = stmt.all()
        if (result) {
            return { status: 200, data: result }
        } else {
            throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
        }
    } catch (error) {
        throw new DefaultError(500, "Please contact an administrator", "SQLite", "InternalServerErrorException")
    }
}

module.exports = {
    add,
    rename,
    remove,
    getAll,
    getById,
    getByName
}