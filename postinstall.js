require("colors")
const input = require("input")
const database = require("./modules/database")

database.initialize()

const userService = require("./services/userService")

async function main() {
    console.clear()
    console.log("Bienvenue sur " + "Quzah".yellow.bold)
    console.log("====================================")
    console.log("Afin d'utiliser ce service, il est nécessaire de créer votre compte utilisateur\n")
    console.log("⚠️  Dans le cas où ce script se lance après une mise à jour de paquet")
    console.log("N'hésitez pas à faire " + "Ctrl+C".bold + " ou " + "Cmd+C".bold)

    try {
        const username = await input.text("Nom d'utilisateur :")
        const password = await input.password("Mot de passe :")

        const result = await userService.register({ username, password })

        if (result && result.status === 200) {
            console.log("\n" + " Succès ".bgGreen.black)
            console.log("Le compte " + username.cyan + " a été créé avec succès !")
        } else {
            console.log("\n" + " Erreur ".bgRed.white + " Impossible de créer le compte.")
        }

    } catch (error) {
        console.log("\n" + " ÉCHEC ".bgRed.white)
        
        if (error.name === "ConflictException") {
            console.log("Ce nom d'utilisateur est déjà pris.".red)
        } else {
            console.log("Une erreur inattendue est survenue :".red)
        }
    } finally {
        console.log("\nMerci d'avoir utilisé " + "Quzah".yellow)
        process.exit()
    }
}

main()