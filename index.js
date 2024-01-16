import { readFileSync } from 'node:fs'
import https from 'node:https'
import http from 'node:http'
import express from 'express'

const SSL_PATH = '/home/amaryllisw/project/keys/'

const cert = readFileSync(SSL_PATH + 'cert.crt')

const ca = readFileSync(SSL_PATH + 'ca.ca-bundle')

const key = readFileSync(SSL_PATH + 'private.key')

const httpsOptions = {
    cert,
    ca,
    key
}


const app = express()

app.use(express.static('./public'))


// 重定义https
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        res.redirect(301, `https://${HOST_NAME}${req.url}`)
    }
    next()
})


const httpServer = http.createServer(app)

const httpsServer = https.createServer(httpsOptions, app)

httpServer.listen(80)

httpsServer.listen(443, '0.0.0.0', () => { console.log('启动成功') })
