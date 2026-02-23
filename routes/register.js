const express = require("express")
const router = express.Router()
const registerService = require("../services/register")

router.post("/", async (req, res) => {
    const { email, username, password } = req.body
    const registerResult = registerService.register({ email, username, password })
    return res.status(200).json({
        code: 200,
        message: "User successfully registered",
        data: registerResult
    })
})

module.exports = router