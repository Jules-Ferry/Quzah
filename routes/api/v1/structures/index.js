const express = require("express")
const router = express.Router()
const userService = require("../../../../services/userService")
const metadataService = require("../../../../services/metadataService")
const permissionsService = require("../../../../services/permissionsService")
const { DefaultError } = require("../../../../errors/errors")

router.put("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "structures.add")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { id, label } = req.body
    const result = await metadataService.addStructure(id, label)
    return res.sendStatus(result.status)
})

router.patch("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "structures.rename")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { id, label } = req.body
    const result = await metadataService.renameStructure(id, label)
    return res.sendStatus(result.status)
})

router.delete("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "structures.remove")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { id } = req.body
    const result = await metadataService.removeStructure(id)
    return res.sendStatus(result.status)
})

router.get("/id/:id", userService.isLogged, async (req, res) => {
    const { id } = req.params
    const result = await metadataService.getStructureById(id)
    return res.status(result.status).json(result.data)
})

router.get("/name/:name", userService.isLogged, async (req, res) => {
    const { name } = req.params
    const result = await metadataService.getStructureByName(decodeURIComponent(name))
    return res.status(result.status).json(result.data)
})

router.get("/", userService.isLogged, async (req, res) => {
    const result = await metadataService.getStructures()
    return res.status(result.status).json(result.data)
})

module.exports = router