import { User, UserType } from './user'

export type UserLogin = {
  email: string
  password: string
}

export type UserReply = User & { token: string }

export type WorkerRegister = {
  name: string
  email: string
  type: UserType
  job: string
  description: string
  experience: string
  password: string
}
