const express = require("express")
const router = express.Router()
const userService = require("../../../../services/userService")
const metadataService = require("../../../../services/metadataService")

router.put("/", userService.isLogged, async (req, res) => {
    const { id, label } = req.body
    const result = await metadataService.addUserType(id, label)
    return res.status(result.status).send()
})

router.patch("/", userService.isLogged, async (req, res) => {
    const { id, label } = req.body
    const result = await metadataService.renameUserType(id, label)
    return res.status(result.status).send()
})

router.delete("/", userService.isLogged, async (req, res) => {
    const { id } = req.body
    const result = await metadataService.removeUserType(id)
    return res.status(result.status).send()
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