export const enum UserType {
  Worker = 'worker',
  Client = 'client',
}

export type User = {
  id: string
  name: string
  email: string
  type: UserType.Client
}
