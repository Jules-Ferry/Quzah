const z = require("zod")

module.exports = {
    POST: {
        headers: z.object({
            "content-type": z.string().regex(/application\/json/i).optional()
        }),
        body: z.object({
            email: z.string()
                .email({ message: "Invalid E-Mail format." })
                .toLowerCase(),
            username: z.string()
                .min(3, { message: "The username must be at least 3 characters long." })
                .max(16, { message: "The username must be no longer than 16 characters." }),
            password: z.string()
                .min(8, { message: "The password must be at least 8 characters long." })
                .regex(/[A-Z]/, { message: "The password must contain a capital letter." })
                .regex(/[0-9]/, { message: "The password must contain a number." }),
        }),
        error: {
            code: 422,
            message: "Invalid request data"
        }
    }
}