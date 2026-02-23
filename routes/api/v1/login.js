const express = require("express")
const router = express.Router()
const userService = require("../../../services/userService")

router.post("/", async (req, res) => {
    const { username, password } = req.body
    if (req.accepts("html")) {
        const loginResult = await userService.loginAndMakeToken({ username, password })
        return res.status(200).cookie("quzah-bearer", loginResult).send()
    } else {
        const loginResult = await userService.loginAndMakeToken({ username, password })
        return res.status(200).json({ token: loginResult })
    }
})

module.exports = router