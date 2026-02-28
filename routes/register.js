const express = require("express")
const router = express.Router()
const userService = require("../services/userService")
const fileService = require("../services/fileService")

router.get("", async (req, res) => {
    const file = await fileService.serveFile("register.html")
    return res.sendFile(file)
})

router.post("", async (req, res) => {
    const { username, password } = req.body
    await userService.register({ username, password })
    return res.redirect("/login")
})

module.exports = router