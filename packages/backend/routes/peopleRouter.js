const express = require('express');
const middleware = require('../middlewares/index')
const services = require('../services/peopleServices')
const peopleRouter = express.Router();

peopleRouter.post('/', middleware.authMiddleware, services.createPeople)
peopleRouter.get('/search', middleware.authMiddleware, services.searchPeople)
peopleRouter.get('/', middleware.authMiddleware, services.getAllPeople)
peopleRouter.get('/test', services.testFunc)

module.exports = { peopleRouter }