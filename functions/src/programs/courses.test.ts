import * as functions from 'firebase-functions-test';
import * as request from 'supertest';
import { api } from '../index';
import * as model from './courses/model';

const testEnv = functions();

// EXAMPLES
const course1: Program.Course = {
  id: "1",
  name: "",
  description: "",
  slug: "",
  url: "",
  progress: "TODO",
  createdAt: new Date(),
  updatedAt: new Date()
}

const course2: Program.Course = {
  id: "2",
  name: "",
  description: "",
  slug: "",
  url: "",
  progress: "TODO",
  createdAt: new Date(),
  updatedAt: new Date()
}

const program1: Program.Program = {
  id: "1",
  name: "",
  description: "",
  slug: "",
  courses: [course1, course2],
  createdAt: new Date(),
  updatedAt: new Date()
}

// MOCKS
jest.mock('./courses/model')
const mockedModel = model as jest.Mocked<typeof model>;

mockedModel.create.mockImplementation(
  (userId: string, programId: string, course: Program.Course) => Promise.resolve(course)
)
mockedModel.readAll.mockImplementation(
  (userId: string, programId:string) => Promise.resolve(program1.courses)
)
mockedModel.read.mockImplementation(
  (userId: string, programId: string, courseId: string) => Promise.resolve(course1)
)
mockedModel.update.mockImplementation(
  (userId: string, programId: string, courseId: string, course: Program.Course) => Promise.resolve(course)
)

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  auth: () => ({
    verifyIdToken: jest.fn().mockReturnValue({uid: 'testUser'}),
  }),
  firestore: () => ({})
}));

// SPECS
describe('courses', () => {
  const baseUrl = (uid: string, pid: string) => `/users/${uid}/programs/${pid}/courses`

  test('GET /programs/:pid/courses return all courses for pid', async () => {
    const res = await request(api)
      .get(baseUrl('testUser', '1'))
    expect(res.status).toBe(200);
  })

  test('POST /programs/:pid/courses Creates a new course', async () => {
    const res = await request(api)
      .post(baseUrl('testUser', '1'))
      .send({course: course1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(201);
  })

  test('POST /programs/:pid/course returns unauthorized when auth is invalid', async () => {
    const res = await request(api)
      .post(baseUrl('otherUser', '1'))
      .send({course: course1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })
  
  test('GET  /programs/:pid/courses/:id Gets the :id course', async () => {
    const res = await request(api)
      .get(baseUrl('testUser', '1') + '/1')
    expect(res.status).toBe(200);
  })
  
  test('PATCH /programs/:pid/courses/:id updates the :id course', async () => {
    const res = await request(api)
      .patch(baseUrl('testUser', '1') + '/1')
      .send({course: course1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(200);
  })
  
  test('PATCH /programs/:pid/courses/:id returns unauthorized when auth is invalid', async () => {
    const res = await request(api)
      .patch(baseUrl('otherUser', '1') + '/1')
      .send({course: course1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })
  
  test('DELETE /programs/:pid/courses/:id deletes the :id course', async () => {
    const res = await request(api)
      .delete(baseUrl('testUser', '1') + '/1')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(204);
  })
  
  test('DELETE /programs/:id returns unauthorized when auth is not valid', async () => {
    const res = await request(api)
      .delete(baseUrl('otherUser', '1') + '/1')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })
})

testEnv.cleanup();
