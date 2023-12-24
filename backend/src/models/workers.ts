import { prisma } from 'utils/connectDB'

type FeedbackParams = {
  clientId: string
  text: string
  workerId: string
  score: number
}

export const createFeedback = async ({
  clientId,
  text,
  workerId,
  score,
}: FeedbackParams) => {
  return await prisma.feedback.create({
    data: {
      clientId,
      text,
      workerId,
      score,
    },
  })
}

export const getWorkers = async () => {
  const workers = await prisma.users.findMany({
    where: { type: 'worker' },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      workersField: {
        select: {
          description: true,
          experience: true,
          job: true,
          subway: true,
        },
      },
    },
  })
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
  return prepairedWorkers
}

export const getWorkerById = async (id: string) => {
  const worker = await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      type: true,
      workersField: {
        select: {
          id: true,
          description: true,
          experience: true,
          job: true,
          subway: true,
          feedback: {
            select: {
              text: true,
              score: true,
              client: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  })

  if (!worker) return null

  const prepairedWorker = {
    id: worker.id,
    name: worker.name,
    email: worker.email,
    image: worker.image,
    type: worker.type,
    workerId: worker.workersField?.id,
    description: worker.workersField?.description,
    experience: worker.workersField?.experience,
    job: worker.workersField?.job,
    subway: worker.workersField?.subway,
    feedback: worker.workersField?.feedback,
  }

  return prepairedWorker
}
