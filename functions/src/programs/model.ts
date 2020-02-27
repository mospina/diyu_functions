import { firestore }  from '../initializeApp';

const timestamp = () => new Date().toUTCString()

const collection = (userId: string) => firestore.collection(`users/${userId}/programs`)

const create = async (userId: string, program: Program.Program): Promise<Program.Program> => {
  const result = await collection(userId).add({
    name: program.name,
    slug: program.slug,
    description: program.description ? program.description : '',
    createdAt: timestamp(),
    updatedAt: timestamp()
  })
  return {...program, id: result.id}
}

// Request firestore for all documents in the programs collection
const readAll = async (userId: string): Promise<Program.Program[]> => { 
  try {
    const snapshot = await collection(userId).get()
    const programs = snapshot.docs.map((doc) => {
      const data = doc.data()
      if(!data) 
        throw new Error(`Unable to retrieve programs for ${userId}`)
      return {
        ...data as Program.Program,
        id: doc.id
      }
    })
    return programs
  } catch (error) {
    throw error
  }
}

const read = async (userId: string, programId: string): Promise<Program.Program> => {
  const snapshot = await collection(userId).doc(programId).get()
  const data = snapshot.data()
  if (!data)
    throw new Error(`Unable to retrieve programs ${programId}`)
  
  return {
    ...data as Program.Program,
    id: snapshot.id
  }
}

const update = async (userId: string, programId: string, program: Program.Program): Promise<Program.Program> => {
  await collection(userId).doc(programId).update({
    name: program.name,
    slug: program.slug,
    description: program.description ? program.description : '',
    updatedAt: timestamp()
  })
  return {...program, id: programId}
}

const destroy = (userId: string, programId: string) => collection(userId).doc(programId).delete()

export { create, readAll, read, update, destroy }
