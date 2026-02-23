const express = require("express")
const router = express.Router()
const userService = require("../../../../services/userService")
const metadataService = require("../../../../services/metadataService")
const permissionsService = require("../../../../services/permissionsService")
const { DefaultError } = require("../../../../errors/errors")

router.put("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "usertypes.add")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { id, label } = req.body
    const result = await metadataService.addUserType(id, label)
    return res.sendStatus(result.status)
})

router.patch("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "usertypes.add")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { id, label } = req.body
    const result = await metadataService.renameUserType(id, label)
    return res.sendStatus(result.status)
})

router.delete("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "usertypes.add")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { id } = req.body
    const result = await metadataService.removeUserType(id)
    return res.sendStatus(result.status)
})

router.get("/id/:id", userService.isLogged, async (req, res) => {
    const { id } = req.params
    const result = await metadataService.getUserTypeById(id)
    return res.status(result.status).json(result.data)
})

router.get("/name/:name", userService.isLogged, async (req, res) => {
    const { name } = req.params
    const result = await metadataService.getUserTypeByName(name)
    return res.status(result.status).json(result.data)
})

router.get("/", userService.isLogged, async (req, res) => {
    const result = await metadataService.getUserTypes()
    return res.status(result.status).json(result.data)
})

module.exports = router