const express = require("express")
const DefaultError = require("../../errors/DefaultError")
const router = express.Router()

router.get("", async (req, res) => {
    const bearer = req.headers.authorization
    if (bearer == "Bearer token") {
        return res.status(200).json({
            id: req.params.id,
            username: "johndoe"
        })
    } else {
        throw new DefaultError(403, "Invalid token", "", "InvalidTokenException")
    }
})

module.exports = router