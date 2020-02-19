const programs = (userId: string, ps: Program.Program[]) => ({
  user: {
    id: userId
  },
  programs: ps
})

export { programs }
