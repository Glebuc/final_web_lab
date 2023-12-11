const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const tasksRoutes = require('./routes/routes')
const path = require('path')


const PORT = process.env.PORT || 7000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'styles')))

app.use(tasksRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb://localhost:27017/tasks',
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )
    console.log('DB Connection OK')
    app.listen(PORT, () => {
      console.log('Server has been started... on http://localhost:7000')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
