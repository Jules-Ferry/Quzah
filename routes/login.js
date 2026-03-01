const express = require("express")
const router = express.Router()
const userService = require("../services/userService")
const fileService = require("../services/fileService")

router.get("/", userService.isNotLogged, async (req, res) => {
    const file = await fileService.serveFile("login.html")
    return res.sendFile(file)
})

router.post("/", userService.isNotLogged, async (req, res) => {
    const { username, password } = req.body
    const loginResult = await userService.loginAndMakeToken({ username, password })
    return res.status(200).cookie("quzah-bearer", loginResult).redirect("/dashboard")
})

module.exports = router