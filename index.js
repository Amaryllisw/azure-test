import express from 'express'
import { createWriteStream } from 'node:fs'

const app = express()

const ws = createWriteStream('log.txt', { flags: 'a' })

app.get('/', (req, res) => {
    const { id } = req.query

    if (id) {
        const now = new Date().toLocaleTimeString()
        ws.write(`time:${now}\nid:${id}\n`)
        ws.write('------------------\n')
    }

    res.send('lalala')
})

app.listen(3597, () => { })

app.on('close', () => {
    ws.close()
})
