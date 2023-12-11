const { Router } = require('express')
const Tasks = require('../models/tasks')
const router = Router()

router.get('/', async (req, res) => {
  const tasks = await Tasks.find({})

  res.render('index', {
    tasks
  })
})

router.get('/add', (req, res) => {
  res.render('add')
})

router.post('/add', async (req, res) => {
  console.log(req.body)
  const tasks = new Tasks({
    title: req.body.title,
    descript: req.body.descript
  })

  await tasks.save()
  res.redirect('/')
})

router.post('/delete', async (req, res) => {
  console.log(req.body.id)
  Tasks.findByIdAndRemove(req.body.id, (err) => {
    if (!err) {
      res.redirect('/')
    } else {
      console.log('Ошибка удаления задачи: ' + err)
    }
  })
})

module.exports = router
