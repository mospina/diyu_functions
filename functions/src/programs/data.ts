/*
 * How to store the data?
 *   programs or programs/courses
 */   
const programDoc = (userId: string, programId: string) => {
  return `users/${userId}/programs/${programId}`
}

const courseDoc = (userId: string, programId: string, courseId: string) => {
  `${programDoc(userId, programId)}/courses/${courseId}`
}
