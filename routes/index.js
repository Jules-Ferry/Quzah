const express = require("express")
const router = express.Router()
const fileService = require("../services/fileService")

router.get(/assets\/.*/, async (req, res) => {
    const file = await fileService.serveFile(req.path)
    return res.sendFile(file)
})

router.get("/", async (req, res) => {
    const file = await fileService.serveFile("index.html")
    return res.sendFile(file)
})

router.get("/about", async (req, res) => {
    const file = await fileService.serveFile("about.html")
    return res.sendFile(file)
})

module.exports = router