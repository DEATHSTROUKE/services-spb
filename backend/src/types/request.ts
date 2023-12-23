import { Users } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'

export type FastifyHandler<Req> = (
  req: FastifyRequest<{ Body: Req }>,
  reply: FastifyReply,
) => unknown

export interface IHeaders {
  authorization: string
}

// Requests and resposes
export interface GetReq {}

export type LoginReq = {
  email: string
  password: string
}

export const enum UserType {
  Client = 'client',
  Worker = 'worker',
}

export interface RegisterReq {
  name: string
  email: string
  password: string
  type: UserType
  job: string
  experience: string
  description: string
}

export interface FeedbackReq {
  workerId: string
  score: number
  text: string
}

export interface ChangeProfileReq {
  name: string
  email: string
  image: string
  description: string
  experience: string
  job: string
  subway: string
}

// Handlers
export type GetCheckAuth = FastifyHandler<GetReq>
export type LoginHandler = FastifyHandler<LoginReq>
export type RegisterHandler = FastifyHandler<RegisterReq>

export type GetWorkersHandler = FastifyHandler<{}>
export type GetWorkerHandler = FastifyHandler<{}>
export type GetProfileHandler = FastifyHandler<{}>
export type FeedbackHandler = FastifyHandler<FeedbackReq>
export type ChangeProfileHandler = FastifyHandler<ChangeProfileReq>
