const express = require("express")
const router = express.Router()
const userService = require("../../../services/userService")

router.post("/", userService.isNotLogged, async (req, res) => {
    const { username, password } = req.body
    const loginResult = await userService.loginAndMakeToken({ username, password })
    return res.status(200).json({ token: loginResult })
})

module.exports = router