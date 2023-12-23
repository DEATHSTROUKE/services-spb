import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fastifyJWT from '@fastify/jwt'
import { logger } from 'utils/logger'
import { routes } from './routes'
import cors from '@fastify/cors'
import { findUserById } from './models/user'
import dotenv from 'dotenv'

dotenv.config()

const PORT = Number(process.env.PORT) || 5500

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string
    }
  }
}

export const app = fastify({ logger })

const start = async () => {
  await app.register(cors, {
    origin: '*',
  })
  app.register(fastifyJWT, { secret: 'secret_key' })
  app.decorate(
    'authenticate',
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        await req.jwtVerify()
        const user = await findUserById(req.user.id)
        if (!user) {
          return reply.code(400).send({
            ok: false,
            message: 'User not found',
          })
        }
      } catch (err) {
        console.log(err)
        return reply
          .code(401)
          .send({ ok: false, message: 'User not authorized' })
      }
    },
  )
  app.register(routes, { prefix: 'api' })
  await app.ready()

  app.listen({ port: PORT, host: '0.0.0.0' })
}

start()
