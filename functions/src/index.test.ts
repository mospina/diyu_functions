import * as functions from 'firebase-functions-test';
// import * as admin from 'firebase-admin';
import * as request from 'supertest';
import { api } from './index';

const testEnv = functions();

/* // MOCKS
const mockSet = jest.fn();

mockSet.mockReturnValue(true);

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  database: () => ({
    ref: jest.fn(path => ({
      set: mockSet
    }))
  })
}));
*/

// SPECS
describe('api', () => {
  test('Get /:uid returns a parameter', async () => {
    const res = await request(api)
      .get('/')
    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
  });
});

testEnv.cleanup();

