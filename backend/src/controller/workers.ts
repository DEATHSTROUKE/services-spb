import { createFeedback, getWorkerById, getWorkers } from 'src/models/workers'
import {
  GetWorkersHandler,
  FeedbackHandler,
  GetWorkerHandler,
} from 'src/types/request'

type ReqParams = { id: string }

export const getWorkerHandler: GetWorkerHandler = async (req, reply) => {
  const { id } = req.params as ReqParams
  const worker = await getWorkerById(id)

  return reply.send({ worker })
}

export const getWorkersHandler: GetWorkersHandler = async (req, reply) => {
  const workers = await getWorkers()

  return reply.send({ workers })
}

export const setFeedbackHandler: FeedbackHandler = async (req, reply) => {
  const clientId = req.user.id
  const { score, text, workerId } = req.body

  await createFeedback({ clientId, score, text, workerId })
  return reply.send({ ok: true })
}
