import * as functions from 'firebase-functions-test';
import * as request from 'supertest';
import { api } from './index';

const testEnv = functions();

// SPECS
describe('api', () => {
  test('Get / returns 200', async () => {
    const res = await request(api)
      .get('/')
    expect(res.status).toBe(200);
    expect(res.text).toBe('ok');
  });
});

testEnv.cleanup();

