const myDataSource = require('./data-source')

module.exports = myDataSource
    .initialize()
    .then((data) => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
