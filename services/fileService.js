const fs = require("node:fs")
const path = require("node:path")
const { DefaultError } = require("../errors/errors")

async function serveFile(url) {
    const fullPath = path.join(process.cwd(), "static", decodeURIComponent(url))
    try {
        await fs.promises.access(fullPath, fs.constants.F_OK)
        return fullPath
    } catch (error) {
        throw new DefaultError(404, "File not found.", "File not exists", "NotFoundException")
    }
}

module.exports = {
    serveFile
}