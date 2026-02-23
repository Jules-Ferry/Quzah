const fs = require("node:fs")
const path = require("node:path")
const logger = require("../modules/logger")
const Database = require("better-sqlite3")
const datadir = path.join(process.cwd(), "data")

let databaseInstance = null

function initialize() {
    if (!fs.existsSync(datadir)) {
        fs.mkdirSync(datadir, { recursive: true })
    }

    const db = new Database(path.join(datadir, "quzah.db"), { 
        verbose: (message) => logger.log(message, ["SQLite", "yellow"]) 
    })

    db.pragma("foreign_keys = ON")
    db.pragma("journal_mode = WAL")

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            createdAt INTEGER DEFAULT (strftime('%s', 'now'))
        );

        CREATE TABLE IF NOT EXISTS clients (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NULL,
            avatarUrl TEXT NULL,
            isActive INTEGER DEFAULT 1,
            createdAt INTEGER DEFAULT (strftime('%s', 'now')),
            constraintUserType INTEGER DEFAULT 0,
            constraintStructure INTEGER DEFAULT 0
        );
        
        CREATE TABLE IF NOT EXISTS clientRedirectUris (
            clientId TEXT NOT NULL,
            uri TEXT NOT NULL,
            FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS userTypes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            label TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS structures (
            id TEXT NOT NULL PRIMARY KEY,
            label TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS clientAllowedUserTypes (
            clientId TEXT NOT NULL,
            userTypeId INTEGER NOT NULL,
            PRIMARY KEY (clientId, userTypeId),
            FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
            FOREIGN KEY (userTypeId) REFERENCES userTypes(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS clientAllowedStructures (
            clientId TEXT NOT NULL,
            structureId TEXT NOT NULL,
            PRIMARY KEY (clientId, structureId),
            FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
            FOREIGN KEY (structureId) REFERENCES structures(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS scopes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE
        );

        CREATE TABLE IF NOT EXISTS clientScopes (
            clientId TEXT NOT NULL,
            scopeId INTEGER NOT NULL,
            PRIMARY KEY (clientId, scopeId),
            FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
            FOREIGN KEY (scopeId) REFERENCES scopes(id) ON DELETE CASCADE
        );
    `)
    databaseInstance = db
}

function getDatabase() {
    if (!databaseInstance) {
        throw new Error("Database not initialized. Call initialize() first.")
    }
    return databaseInstance
}

module.exports = {
    getDatabase,
    initialize
}