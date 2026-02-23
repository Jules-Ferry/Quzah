const express = require("express")
const router = express.Router()
const userService = require("../../../services/userService")

router.post("/", async (req, res) => {
    const { username, password } = req.body
    if (req.accepts("html")) {
        const loginResult = await userService.loginAndMakeToken({ username, password })
        return res.status(200).json(loginResult).cookie("quzah-bearer", loginResult)
    } else {
        const loginResult = await userService.login({ username, password })
        return res.status(200).json(loginResult)
    }
})

module.exports = router