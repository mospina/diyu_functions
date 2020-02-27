import * as functions from 'firebase-functions-test';
import * as request from 'supertest';
import { api } from '../index';
import * as model from './model';

const testEnv = functions();

// EXAMPLES

const program1: Program.Program = {
  id: "1",
  name: "",
  description: "",
  slug: "",
  courses: [],
  createdAt: new Date(),
  updatedAt: new Date()
}

const program2: Program.Program = {
  id: "2",
  name: "",
  slug: "",
  courses: [],
  createdAt: new Date(),
  updatedAt: new Date()
}

// MOCKS
jest.mock('./model')
const mockedModel = model as jest.Mocked<typeof model>;

mockedModel.create.mockImplementation((userId: string, program) => Promise.resolve(program1))
mockedModel.readAll.mockImplementation((userId: string) => Promise.resolve([program1, program2]))
mockedModel.read.mockImplementation((userId: string, programId) => Promise.resolve(program1))
mockedModel.update.mockImplementation((userId: string, programId, program) => Promise.resolve(program1))

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  auth: () => ({
    verifyIdToken: jest.fn().mockReturnValue({uid: 'testUser'}),
  }),
  firestore: () => ({})
}));

// SPECS
describe('programs', () => {
  const baseUrl = (uid: string) => `/users/${uid}/programs`

  test('GET /programs return all programs for userId user', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(200);
  })

  test('POST /programs Creates a new program', async () => {
    const res = await request(api)
      .post(baseUrl('testUser'))
      .send({program: program1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(201);
  })

  test('POST /programs returns unauthorized when authentication is invalid', async () => {
    const res = await request(api)
      .post(baseUrl('otherUser'))
      .send({program: program1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })
  
  test('GET  /programs/:id Gets the :pid program', async () => {
    const res = await request(api)
      .get(baseUrl('testUser') + '/1')
    expect(res.status).toBe(200);
  })
  
  test('PATCH /programs/:id Updates the :pid program', async () => {
    const res = await request(api)
      .patch(baseUrl('testUser') + '/1')
      .send({program: program1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(200);
  })
  
  test('PATCH /programs/:id returns unauthorized when authentication is invalid', async () => {
    const res = await request(api)
      .patch(baseUrl('otherUser') + '/1')
      .send({program: program1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })
  
  test('DELETE /programs/:id Deletes the :id program', async () => {
    const res = await request(api)
      .delete(baseUrl('testUser') + '/1')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(204);
  })
  
  test('DELETE /programs/:id returns unauthorized when auth is not valid', async () => {
    const res = await request(api)
      .delete(baseUrl('otherUser') + '/1')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })
})

testEnv.cleanup();
