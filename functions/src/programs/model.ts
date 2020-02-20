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
  // TODO if program.courses add courses
  return {...program, id: result.id}
}

// Request firestore for all documents in the programs collection
const read = async (userId: string): Promise<Program.Program[]> => { 
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

export { create, read }
