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
  return await prisma.users.findMany({
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
}

export const getWorkerById = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
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
}
