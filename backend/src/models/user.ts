import { prisma } from 'utils/connectDB'

type UserToCreate = {
  name: string
  email: string
  password: string
}

type WorkerToCreate = {
  name: string
  email: string
  password: string
  job: string
  experience: string
  description: string
}

export const createWorker = async (userData: WorkerToCreate) => {
  const { name, email, password, job, experience, description } = userData
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password,
      type: 'worker',
      workersField: {
        create: {
          description,
          experience,
          job,
        },
      },
    },
    select: {
      id: true,
      email: true,
    },
  })
  return user
}

export const createUser = async (userData: UserToCreate) => {
  const { name, email, password } = userData
  const user = await prisma.users.create({
    data: { name, email, password },
    select: {
      id: true,
      email: true,
    },
  })
  return user
}

export const getProfile = async (id: string) => {
  return await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      image: true,
      name: true,
      type: true,
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

type ChangeProfileData = {
  id: string
  name: string
  email: string
  image: string
  description: string
  experience: string
  job: string
  subway: string
}
export const changeProfile = async (userData: ChangeProfileData) => {
  const { id, name, email, image, description, experience, job, subway } =
    userData
  return await prisma.users.update({
    where: { id },
    data: {
      name,
      email,
      image,
      workersField: {
        update: {
          data: {
            description,
            experience,
            job,
            subway,
          },
        },
      },
    },
  })
}

export const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  })
}

export const findUserById = async (id: string) => {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  })
}
