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

mockedModel.read.mockImplementation((userId: string) => Promise.resolve([program1, program2]))

// SPECS
describe('programs', () => {
  const baseUrl = (uid: string) => `/users/${uid}/programs`

  test('GET /programs return all programs for userId user', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(200);
  })

  test.skip('POST /programs Creates a new program', async () => {
    const res = await request(api)
      .post(baseUrl('testUser'))
    expect(res.status).toBe(201);
  })

  test.skip('POST /programs returns unauthorized when authentication is invalid', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(400);
  })
  
  test.skip('GET  /programs/:id Gets the :pid program', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(200);
  })
  
  test.skip('PATCH /programs/:id Updates the :pid program', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(200);
  })
  
  test.skip('PATCH /programs/:id returns unauthorized when authentication is invalid', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(400);
  })
  
  test.skip('DELETE /programs/:id Deletes the :id program', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(200);
  })
  
  test.skip('DELETE /programs/:id returns unauthorized when auth is not valid', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(400);
  })
})

testEnv.cleanup();
