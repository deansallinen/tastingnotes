const Router = require('koa-router')
const users = new Router()
const Ctrl = require('../controllers/users')
const notesRouter = require('./notes')

users.get('/', Ctrl.allUsers)
users.get('/:uid', Ctrl.oneUser)

users.use('/:uid/notes', notesRouter)

module.exports = users.routes()
