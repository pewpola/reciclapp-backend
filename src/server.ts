import cors from "cors"
import express from "express"
import { router } from "./routes"

const app = express()

app.use(cors())
app.use(router);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado em <http://localhost>:${PORT}/`))