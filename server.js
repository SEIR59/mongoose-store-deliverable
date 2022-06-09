const rowdy = require('rowdy-logger')
const routesReport = rowdy.begin(app)


const port = process.env.PORT
app.listen(port, () => {
    console.log(`port 3000 listens`)
    routesReport.print()
})