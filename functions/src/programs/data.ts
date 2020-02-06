type Progress = 'TODO' | 'DOING' | 'DONE'
/*
 * Progress is one of:
 *  - TODO
 *  - DOING
 *  - DONE
 * interp. Represent the progress of a course.
 *
 * Function Template:
 *   const fnForProgress = (progress: Progress): ... => {
 *     switch (progress) {
 *       case 'TODO': 
 *         return ...
 *       case 'DOING':
 *         return ...
 *       case 'DONE':
 *         return ...
 *     }
 *   }
 */   

type Course = {
  name: string,
  description?: string,
  slug?: string,
  url?: string,
  progress: Progress
}
/*
 * interp. Course is a MOOC course or book. url is the provider of the course
 *
 * Example: 
 *   const categoryTheory = {
 *     name: 'Category Theory for programmers',
 *     description: 'A series of lecture in category theory for software developers',
 *     slug: 'category-theory',
 *     url: 'https://www.youtube.com/playlist?list=PLbgaMIhjbmEnaH_LTkxLI7FMa2HsnawM_',
 *     progress: 'DOING'
 *   }
 *
 *   const mobileApp = {
 *     name: 'CS50's Mobile App Development with React Native',
 *     description: 'A introduction to Mobile App development using React Native',
 *     slug: 'mobile-app-development',
 *     url: 'https://www.youtube.com/playlist?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR',
 *     progress: 'TODO'
 *   }
 *
 * Function Template:
 *
 *   const fnForCourse = (course: Course): ... => (
 *     ... course.name 
 *     ... course.description 
 *     ... course.slug? 
 *     ... course.url? 
 *     ... course.progress
 *   )
 */   

type Program = {
  name: string,
  description?: string,
  slug?: string,
  courses: Course[],
  createdAt: Date,
  updatedAt: Date
}

/*
 * interp. A study program.
 *
 * Example:
 *   const computerScience = {
 *     name: 'Computer Science',
 *     description: 'A self-made program on computer science',
 *     slug: 'computer-science',
 *     courses: Course[ categoryTheory, MobileApp],
 *     createdAt: Date,
 *   }
 *   
 * Function Template:
 *
 *   const fnForProgram = (program: Program) => (
 *     ... program.name 
 *     ... program.description 
 *     ... program.slug 
 *     ... program.courses.map((course) => fnForCourse(course))
 *   )
 */

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
