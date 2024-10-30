import cors from "cors"
import express from "express"

const app = express()

app.use(cors())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado em <http://localhost>:${PORT}/`))