const permissionsRepository = require("../repositories/permissionsRepository")

async function grant(userId, permission){
    return permissionsRepository.grantPermission(userId, permission)
}

async function revoke(userId, permission) {
    return permissionsRepository.revokePermission(userId, permission)
}

async function has(userId, permission) {
    return permissionsRepository.hasPermission(userId, permission)
}

async function getForUser(userId) {
    return permissionsRepository.listUserPermissions(userId)
}

module.exports = {
    has,
    grant,
    revoke,
    getForUser,
}