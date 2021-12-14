import express, { Express } from 'express'
import request from 'request'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import bodyParser from 'body-parser'
import 'dotenv/config'
import configDB from './config/db'
import Product from './models/Product'
import homeRouter from './routes/home'
import productsRouter from './routes/products'
import productRouter from './routes/product'
import userRouter from './routes/user'
import authRouter from './routes/auth'

const app = express()
configDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', homeRouter)
app.use('/products', productsRouter)
app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)

app.get('/countries', async (req: any, res: any) => {
    const countries = fs.readFileSync('./countries.json', { encoding: 'utf8' })
    res.json({ countries: JSON.parse(countries) })
})

app.get('/db', async (req: any, res: any) => {
    const products = await Product.getTopCategories()
    res.json({ products })
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req: any, res: any) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
    })
}

const PORT: any = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))