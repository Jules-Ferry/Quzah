const express = require("express")
const router = express.Router()
const userService = require("../../../services/userService")

router.post("/", userService.isNotLogged, async (req, res) => {
    const { username, password } = req.body
    const registerResult = await userService.register({ username, password })
    return res.status(200).json({
        code: registerResult.status,
        message: "User successfully registered"
    })
})

module.exports = router