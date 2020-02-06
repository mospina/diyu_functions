import * as functions from 'firebase-functions-test';
import * as request from 'supertest';
import { api } from '../index';

const testEnv = functions();

describe('programs', () => {
  test('GET /programs Lists all programs', async () => {
    const res = await request(api)
      .get('/programs')
    expect(res.status).toBe(200);
  })

  test.skip('POST /programs Creates a new program', async () => {
    const res = await request(api)
      .get('/programs')
    expect(res.status).toBe(201);
  })

  test.skip('POST /programs returns unauthorized when authentication is invalid', async () => {
    const res = await request(api)
      .get('/programs')
    expect(res.status).toBe(400);
  })
  
  test.skip('GET  /programs/:id Gets the :pid program', async () => {
    const res = await request(api)
      .get('/programs')
    expect(res.status).toBe(200);
  })
  
  test.skip('PATCH /programs/:id Updates the :pid program', async () => {
    const res = await request(api)
      .get('/programs')
    expect(res.status).toBe(200);
  })
  
  test.skip('PATCH /programs/:id returns unauthorized when authentication is invalid', async () => {
    const res = await request(api)
      .get('/programs')
    expect(res.status).toBe(400);
  })
  
  test.skip('DELETE /programs/:id Deletes the :id program', async () => {
    const res = await request(api)
      .get('/programs')
    expect(res.status).toBe(200);
  })
  
  test.skip('DELETE /programs/:id returns unauthorized when auth is not valid', async () => {
    const res = await request(api)
      .get('/programs')
    expect(res.status).toBe(400);
  })
})

testEnv.cleanup();
