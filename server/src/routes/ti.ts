import { Router } from 'express'
import handleRegistration from '../API/handleRegistration'

const route = Router()

route.post('/register', handleRegistration)

module.exports = route