const express = require("express")
const router = express.Router()
const userService = require("../../../../services/userService")
const permissionsService = require("../../../../services/permissionsService")
const { DefaultError } = require("../../../../errors/errors")

router.put("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "permissions.grant")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { targetUserId, permission } = req.body
    const result = await permissionsService.grant(targetUserId, permission)
    return res.sendStatus(result.status)
})

router.delete("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "permissions.revoke")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { targetUserId, permission } = req.body
    const result = await permissionsService.revoke(targetUserId, permission)
    return res.sendStatus(result.status)
})

router.get("/:targetUserId", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "permissions.read")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { targetUserId } = req.params
    const result = await permissionsService.getForUser(targetUserId)
    return res.status(result.status).json(result.permissions)
})

module.exports = router