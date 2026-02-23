const express = require("express")
const router = express.Router()
const userService = require("../../../../services/userService")
const metadataService = require("../../../../services/metadataService")

router.put("/", userService.isLogged, async (req, res) => {
    const { id, label } = req.body
    const result = await metadataService.addStructure(id, label)
    return res.status(result.status)
})

router.patch("/", userService.isLogged, async (req, res) => {
    const { id, label } = req.body
    const result = await metadataService.renameStructure(id, label)
    return res.status(result.status)
})

router.delete("/", userService.isLogged, async (req, res) => {
    const { id } = req.body
    const result = await metadataService.removeStructure(id)
    return res.status(result.status)
})

router.get("/:id", userService.isLogged, async (req, res) => {
    const { id } = req.params
    const result = await metadataService.getStructureById(id)
    return res.status(result.status).json(result.data)
})

router.get("/:name", userService.isLogged, async (req, res) => {
    const { name } = req.params
    const result = await metadataService.getStructureByName(name)
    return res.status(result.status).json(result.data)
})

router.get("/", userService.isLogged, async (req, res) => {
    const result = await metadataService.getStructures()
    return res.status(result.status).json(result.data)
})

module.exports = router