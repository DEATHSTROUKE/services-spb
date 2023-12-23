import crypto from 'crypto'

const salt = 'randomSalt'

export const hashPassword = (password: string): string => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

  return hash
}

type VerifyProps = {
  candidatePassword: string
  hash: string
}

export const verifyPassword = ({ candidatePassword, hash }: VerifyProps) => {
  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512')
    .toString('hex')
  return candidateHash === hash
}
