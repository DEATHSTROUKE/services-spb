import { changeProfile, getProfile } from 'src/models/user'
import { ChangeProfileHandler, GetProfileHandler } from 'src/types/request'

export const getProfileHandler: GetProfileHandler = async (req, reply) => {
  const id = req.user.id

  const worker = await getProfile(id)
  if (!worker) return reply.send({ worker: null })
  const prepairedWorker = {
    id: worker.id,
    name: worker.name,
    email: worker.email,
    image: worker.image,
    description: worker.workersField?.description,
    experience: worker.workersField?.experience,
    job: worker.workersField?.job,
    subway: worker.workersField?.subway,
  }
  return reply.send({ profile: prepairedWorker })
}

export const changeProfileHandler: ChangeProfileHandler = async (
  req,
  reply,
) => {
  const id = req.user.id
  const { name, email, image, description, experience, job, subway } = req.body
  await changeProfile({
    id,
    name,
    email,
    image,
    description,
    experience,
    job,
    subway,
  })

  return reply.send({ ok: true })
}
