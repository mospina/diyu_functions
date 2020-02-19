import { firestore }  from '../initializeApp';

const collection = (userId: string) => firestore.collection(`users/${userId}/programs`)

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

export { read }
