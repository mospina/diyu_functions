const REGION = process.env.FUNCTION_REGION
const PROJECT = process.env.GCP_PROJECT
const BASE_URL = `https://${REGION}-${PROJECT}.cloudfunctions.net`

const programLink = (userId: string, programId: string) => 
  `${BASE_URL}/api/users/${userId}/programs/${programId}`

const addLink = (userId: string, programId: string, item: Program.Course) => ({
  ...item,
  link: `${programLink(userId, programId)}/courses/${item.id}`
})

const course = (userId: string, programId: string, item: Program.Course) => ({
  user: {
    id: userId
  },
  program: {
    id: programId,
    link: programLink(userId, programId)
  },
  course: addLink(userId, programId, item)
})

const courses = (userId: string, programId: string, items: Program.Course[]) => ({
  user: {
    id: userId
  },
  program: {
    id: programId
  },
  courses: items.map((c) => addLink(userId, programId, c))
})

export { course, courses }
