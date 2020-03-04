import { firestore }  from '../../initializeApp';

const timestamp = () => new Date().toUTCString()

const collection = (userId: string, programId: string) => 
  firestore.collection(`users/${userId}/programs/${programId}/courses`)

const create = async (
  userId: string,
  programId: string,
  course: Program.Course
): Promise<Program.Course> => {
  const result = await collection(userId, programId).add({
    name: course.name,
    slug: course.slug,
    description: course.description ? course.description : '',
    url: course.url,
    progress: course.progress,
    createdAt: timestamp(),
    updatedAt: timestamp()
  })
  return {...course, id: result.id}
}

const readAll = async (userId: string, programId: string): Promise<Program.Course[]> => { 
  try {
    const snapshot = await collection(userId, programId).get()
    const courses = snapshot.docs.map((doc) => {
      const data = doc.data()
      if(!data) 
        throw new Error(`Unable to retrieve courses in ${userId} ${programId}`)
      return {
        ...data as Program.Course,
        id: doc.id
      }
    })
    return courses
  } catch (error) {
    throw error
  }
}

const read = async (
  userId: string,
  programId: string,
  courseId: string
): Promise<Program.Course> => {
  const snapshot = await collection(userId, programId).doc(courseId).get()
  const data = snapshot.data()
  if (!data)
    throw new Error(`Unable to retrieve programs ${programId}`)
  
  return {
    ...data as Program.Course,
    id: snapshot.id
  }
}

const update = async (
  userId: string,
  programId: string,
  courseId: string,
  course: Program.Course
): Promise<Program.Course> => {
  await collection(userId, programId).doc(courseId).update({
    name: course.name,
    slug: course.slug,
    description: course.description ? course.description : '',
    progress: course.progress,
    url: course.url,
    updatedAt: timestamp()
  })
  return {...course, id: courseId}
}

const destroy = (userId: string, programId: string, courseId: string) => 
  collection(userId, programId).doc(courseId).delete()

export { create, readAll, read, update, destroy }
