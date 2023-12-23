import { createFeedback, getWorkerById, getWorkers } from 'src/models/workers'
import {
  GetWorkersHandler,
  FeedbackHandler,
  GetWorkerHandler,
} from 'src/types/request'

type ReqParams = { id: string }

export const getWorkerHandler: GetWorkerHandler = async (req, reply) => {
  const { id } = req.params as ReqParams
  console.log(id)
  const worker = await getWorkerById(id)
  if (!worker) return reply.send({ worker: null })
  const prepairedWorker = {
    id: worker.id,
    name: worker.name,
    email: worker.email,
    image: worker.image,
    workerId: worker.workersField?.description,
    description: worker.workersField?.description,
    experience: worker.workersField?.experience,
    job: worker.workersField?.job,
    subway: worker.workersField?.subway,
    feedback: worker.workersField?.feedback,
  }
  return reply.send({ worker: prepairedWorker })
}

export const getWorkersHandler: GetWorkersHandler = async (req, reply) => {
  const workers = await getWorkers()
  const prepairedWorkers = workers.map((item) => {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      image: item.image,
      description: item.workersField?.description,
      experience: item.workersField?.experience,
      job: item.workersField?.job,
      subway: item.workersField?.subway,
    }
  })
  return reply.send({ workers: prepairedWorkers })
}

export const setFeedbackHandler: FeedbackHandler = async (req, reply) => {
  const clientId = req.user.id
  const { score, text, workerId } = req.body

  await createFeedback({ clientId, score, text, workerId })
  return reply.send({ ok: true })
}
