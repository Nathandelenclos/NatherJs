import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {readFileSync} from "fs"
import {fileURLToPath} from "url";
import ejs from "ejs"
import path from "path";
import routes from "./src/server/app.js"
import https from "https"
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJson = JSON.parse(readFileSync('./package.json'));

const app = express()
const port = process.env.PORT || 4000
app.engine('html', ejs.renderFile);

app.use(express.static('./dist/public'));

app.get('/', (req, res) => {
    res.render(__dirname + "/dist/index.html")
})

routes.forEach((route) => {
    switch (route.method) {
        case "GET": {
            route.middleware.forEach((m) => app.get(route.name, m))
            app.get(route.name, route.controller)
            break;
        }
        case "POST": {
            route.middleware.forEach((m) => app.post(route.name, m))
            app.post(route.name, route.controller)
            break;
        }
        case "PUT": {
            route.middleware.forEach((m) => app.put(route.name, m))
            app.put(route.name, route.controller)
            break;
        }
    }
})
if (process.env.DATABASE_USER)
    mongoose.connect(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_ADDRESS}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`).then(r => console.info(r));

const sslserver = https.createServer({
    key: readFileSync(path.join(__dirname, process.env.CERT_KEY)),
    cert: readFileSync(path.join(__dirname,process.env.CERT_CERT))
}, app)

sslserver.listen(port, () => {
    console.info(`${packageJson.name}'s app started: https://127.0.0.1:${port}`)
})
