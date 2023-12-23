import { UserType } from './user'

export type Worker = {
  id: string
  name: string
  email: string
  image?: string
  type: UserType.Worker
  description: string
  experience: string
  job: string
  subway?: string
}

export type FullWorker = Worker & {}
