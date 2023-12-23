import { FastifyInstance } from 'fastify'
import {
  checkAuthHandler,
  loginHandler,
  registerHandler,
} from 'src/controller/login'
import { changeProfileHandler, getProfileHandler } from 'src/controller/user'
import {
  getWorkerHandler,
  getWorkersHandler,
  setFeedbackHandler,
} from 'src/controller/workers'

export const routes = async (app: FastifyInstance) => {
  app.get('/workers', getWorkersHandler)

  app.get('/worker/:id', getWorkerHandler)

  app.get('/profile', { preHandler: [app.authenticate] }, getProfileHandler)
  app.post('/profile', { preHandler: [app.authenticate] }, changeProfileHandler)
  app.post('/feedback', { preHandler: [app.authenticate] }, setFeedbackHandler)

  app.get('/check_auth', { preHandler: [app.authenticate] }, checkAuthHandler)
  app.post('/login', loginHandler)
  app.post('/register', registerHandler)
}
