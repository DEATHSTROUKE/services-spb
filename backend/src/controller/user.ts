import { changeProfile } from 'src/models/user'
import { getWorkerById } from 'src/models/workers'
import { ChangeProfileHandler, GetProfileHandler } from 'src/types/request'

export const getProfileHandler: GetProfileHandler = async (req, reply) => {
  const id = req.user.id

  const worker = await getWorkerById(id)
  return reply.send({ profile: worker })
}

export const changeProfileHandler: ChangeProfileHandler = async (
  req,
  reply,
) => {
  const id = req.user.id
  const { name, email, image, description, experience, job, subway } = req.body
  console.log(req.body)

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
