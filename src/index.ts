import * as dotenv from 'dotenv'
dotenv.config()
import * as express from "express"
import { AppDataSource } from "./data-source"
import routes from "./controller"




AppDataSource.initialize().then(async () => {
    const app = express()
    app.use(express.JSON())
    app.use(express.urlencoded({ extended: false }))

    app.use("/api/v1", routes)

    const { PORT } = process.env
    app.listen(PORT || 3000)
    console.log(`App has started on port ${PORT}`)

}).catch(error => console.log(error))
