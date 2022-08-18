const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')

const v1UsersRoute = require('./v1/routes/users.js')
const v1CategoriesRoute = require('./v1/routes/categories.js')
const v1PostsRoute = require('./v1/routes/posts.js')

dotenv.config()
const app = express()

mongoose
	.connect(process.env.MONGO_KEY, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('✅ Conectado a la base de datos'))
	.catch(err => console.log(err))

// Variables
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/v1/users', v1UsersRoute)
app.use('/api/v1/categories', v1CategoriesRoute)
app.use('/api/v1/posts', v1PostsRoute)

// Listen
app.listen(port, () => {
	console.log(`🚀 Servidor en el puerto ${port}`)
})
