const express = require("express")
const router = express.Router()
const fileService = require("../services/fileService")

router.get("/", async (req, res) => {
    const file = await fileService.serveFile("login.html")
    return res.sendFile(file)
})

router.post("/", async (req, res) => {
    
})

module.exports = router