import { User } from './user'
import { Worker } from './worker'

export type UserLogin = {
  email: string
  password: string
}

export type UserRegister = User & { password: string }

export type UserReply = User & { token: string }

export type WorkerRegister = Worker & { password: string }
