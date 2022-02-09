import { Router } from 'express'
import getAvaliation from '../API/getAvaliation'

const route = Router()

route.get('/', getAvaliation)

module.exports = route