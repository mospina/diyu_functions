import { firestore }  from '../initializeApp';

const document = (userId: string) => firestore.doc(`users/${userId}`)

const create = async (userId: string, profile: User.Profile): Promise<User.User> => {
  await document(userId).set(profile)
  return read(userId)
}

const read = async (userId: string): Promise<User.User> => {
  const snapshot = await document(userId).get()
  const data = snapshot.data()
  if (!data)
    throw new Error(`Unable to retrieve user information for ${userId}`)
  
  return {
    ...data as User.User,
    id: snapshot.id
  }
}

const update = async (userId: string, profile: User.Profile): Promise<User.User> => {
  await document(userId).update(profile)
  return read(userId)
}

const destroy = (userId: string) => document(userId).delete()

export { create, read, update, destroy }
