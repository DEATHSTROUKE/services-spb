import {
  createUser,
  createWorker,
  findUserById,
  findUserByEmail,
} from 'src/models/user'
import {
  GetCheckAuth,
  LoginHandler,
  RegisterHandler,
  UserType,
} from 'src/types/request'
import { hashPassword, verifyPassword } from 'utils/hash'

export const registerHandler: RegisterHandler = async (req, reply) => {
  let { email, password, name, description, job, type, experience } = req.body
  if (!email || !password) {
    return reply.code(400).send({ message: 'Bad request' })
  }

  try {
    password = hashPassword(password)
    if (type === UserType.Client) {
      const user = await createUser({
        name,
        email,
        password,
      })
      const token = req.server.jwt.sign({ id: user.id })

      return reply.send({ id: user.id, email: user.email, token })
    } else {
      const user = await createWorker({
        name,
        email,
        password,
        description,
        job,
        experience,
      })
      const token = req.server.jwt.sign({ id: user.id })

      return reply.send({ id: user.id, email: user.email, token })
    }
  } catch (e) {
    return reply.code(500).send({ message: e })
  }
}

export const loginHandler: LoginHandler = async (req, reply) => {
  const { password, email } = req.body
  if (!password || !email) {
    return reply.code(400).send({ message: 'Bad request' })
  }
  const user = await findUserByEmail(email)
  if (
    !user ||
    !verifyPassword({ candidatePassword: password, hash: user.password })
  ) {
    return reply.code(401).send({ message: 'Wrong login or password' })
  }

  const token = req.server.jwt.sign({ id: user.id })
  return reply.send({ id: user.id, email: user.email, token })
}

export const checkAuthHandler: GetCheckAuth = async (req, reply) => {
  const user = await findUserById(req.user.id)
  if (!user) {
    return reply.code(401).send({ message: 'User not found' })
  }
  return reply.send({ ok: true })
}
