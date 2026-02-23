const z = require("zod")

module.exports = {
    GET: {
        headers: z.object({
            authorization: z.string()
            .startsWith("Bearer ", { message: "Token d'authentification manquant ou invalide." }),
            "content-type": z.string().regex(/application\/json/i).optional()
        }),
        error: {
            code: 422,
            message: "Invalid request data"
        }
    }
}