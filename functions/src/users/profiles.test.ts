import * as functions from 'firebase-functions-test';
import * as request from 'supertest';
import { api } from '../index';
import * as model from './model';

const testEnv = functions();

// EXAMPLES

const user1: User.User = {
  id: '1',
  profile: {
    name: 'profileName'
  },
  account: {
    type: 'FREE',
    status: 'NEW'
  }
}

const user2: User.User = {
  id: '2',
  profile: {
    name: 'Name'
  },
  account: {
    type: 'BASIC',
    status: 'NEW'
  }
}

// MOCKS
jest.mock('./model')
const mockedModel = model as jest.Mocked<typeof model>;

mockedModel.create.mockImplementation(
  (userId: string, profile: User.Profile) => Promise.resolve(user1)
)
mockedModel.read.mockImplementation((userId: string) => Promise.resolve(user1))
mockedModel.update.mockImplementation(
  (userId: string, profile: User.Profile) => Promise.resolve(user2)
)

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  auth: () => ({
    verifyIdToken: jest.fn().mockReturnValue({uid: 'testUser'}),
  }),
  firestore: () => ({})
}));

// SPECS
describe('users', () => {
  const baseUrl = (uid: string) => `/users/${uid}`

  test('POST /users/:id create a profile for user :id', async () => {
    const res = await request(api)
      .post(baseUrl('testUser'))
      .send({user: user1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(201);
  })
  
  test('POST /users/:id returns unauthorized when authentication is invalid', async () => {
    const res = await request(api)
      .patch(baseUrl('otherUser'))
      .send({user: user2})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })

  test('GET  /users/:id Gets the :id user', async () => {
    const res = await request(api)
      .get(baseUrl('testUser'))
    expect(res.status).toBe(200);
  })
  
  test('PATCH /users/:id Updates the :id user profile', async () => {
    const res = await request(api)
      .patch(baseUrl('testUser'))
      .send({user: user2})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(200);
  })
  
  test('PATCH /users/:id returns unauthorized when authentication is invalid', async () => {
    const res = await request(api)
      .patch(baseUrl('otherUser'))
      .send({user: user1})
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })
  
  test('DELETE /users/:id Deletes the :id user', async () => {
    const res = await request(api)
      .delete(baseUrl('testUser'))
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(204);
  })
  
  test('DELETE /users/:id returns unauthorized when auth is not valid', async () => {
    const res = await request(api)
      .delete(baseUrl('otherUser'))
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer idToken')
    expect(res.status).toBe(401);
  })
})

testEnv.cleanup();
