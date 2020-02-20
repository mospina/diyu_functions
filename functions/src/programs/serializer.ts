const REGION = process.env.FUNCTION_REGION
const PROJECT = process.env.GCP_PROJECT
const BASE_URL = `https://${REGION}-${PROJECT}.cloudfunctions.net`

const addLink = (userId: string, p: Program.Program) => ({
  ...p,
  link: `${BASE_URL}/api/users/${userId}/programs/${p.id}`,
})

const program = (userId: string, p: Program.Program) => ({
  user: {
    id: userId
  },
  program: addLink(userId, p)
})

const programs = (userId: string, ps: Program.Program[]) => ({
  user: {
    id: userId
  },
  programs: ps.map((p) => addLink(userId, p))
})

export { program, programs }
