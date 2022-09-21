const express = require('express')
const app = express()
const {products} = require('./data')
const logger = require('./logger')
const authorize = require('./authorize')

const morgan = require('morgan')


app.use(morgan('tiny'))

app.get('/', (req,res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product
        return {id, name, image}
    })
    res.json(newProducts)
})





app.get('/:productId', (req, res) => {
    const {productId} = req.params
    const singleProducts = products.find((product) => 
        product.id === Number(productId))
     
   if (!singleProducts) {
    res.status(404).send("Page not found")
   } else {
    res.send(singleProducts)
   }

}

)
app.get('/products/query', (req,res) => {
    const {limit, number} = req.query
    let sortedProducts = [...products]
    if (limit) {
        sortedProducts = sortedProducts.filter((product) => {return product.name.startsWith(limit)})
    }
    if (number) {
        sortedProducts = sortedProducts.slice(0, Number(number))
    }
    if (sortedProducts.length < 1) {
        return res.status(200).json({sucess: true, data: []})
    }
    res.status(200).json(sortedProducts)
})


app.listen(5000, () => {
    console.log("its working")
})