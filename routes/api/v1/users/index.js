const express = require("express")
const router = express.Router()
const userService = require("../../../../services/userService")
const permissionsService = require("../../../../services/permissionsService")
const { DefaultError } = require("../../../../errors/errors")

router.delete("/", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "users.remove")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { targetUserId } = req.body
    const result = await userService.removeUser(targetUserId)
    return res.sendStatus(result.status)
})

router.patch("/username", userService.isLogged, async (req, res) => {
    const hasPermission = permissionsService.has(req.user.id, "users.remove")
    if (!hasPermission) {
        throw new DefaultError(403, "Missing permission", "You don't have that permission", "PermissionException")
    }
    const { targetUserId } = req.body
    const result = await userService.removeUser(targetUserId)
    return res.sendStatus(result.status)
})


module.exports = router