require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const myDataSource = require('./src/db/config/connect.js')
const authRouter = require('./src/auth/routes/auth.routes.js')
const fileRouter = require('./src/files/routes/files.router.js') 
const errorMiddleware = require('./src/middlewares/error-middleware.js')

const PORT = process.env.PORT;
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use(cors({ origin: process.env.CLIENT_URL }))

app.use('/', authRouter)
app.use('/file', fileRouter)

app.use(errorMiddleware)

async function Bootstrap() { 
	try {
		await myDataSource;
		app.listen(PORT, () => console.log(`Server started in port: ${PORT}...`))
	} catch (e) { 
		throw new Error(e)
	}
}
Bootstrap()