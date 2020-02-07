// Request firestore for all documents in the programs collection
const getPrograms = (userId: string) => ({ 
  user: {
    id: userId
  }
})

export { getPrograms }
