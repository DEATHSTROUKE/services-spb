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

export type Workers = {
  workers: Worker[]
}

export type FullWorker = {
  worker: Worker & {
    workerId: string
    feedback: FeedbackItem[]
  }
}

export type Profile = {
  profile: Worker & {
    workerId: string
    feedback: FeedbackItem[]
  }
}

export type ChangeProfileData = {
  name?: string
  email?: string
  image?: string
  description?: string
  experience?: string
  job?: string
  subway?: string
}

export type FeedbackItem = {
  text: string
  score: number
  client: Client
}

export type Client = {
  id: string
  name: string
  image: string
}

export type SendFeedbackData = {
  workerId: string
  text: string
  score: number
}
