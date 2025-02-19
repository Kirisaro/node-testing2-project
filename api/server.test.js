/* eslint-disable no-undef */
const request = require('supertest')
const server = require('./server')
const db = require('../data/db-config')
const knex = require('knex')

  test('NODE_ENV is correct', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
  
  beforeAll(async () => {
      await db.migrate.rollback()
      await db.migrate.latest()
  })
  beforeEach(async () => {
  await db.seed.run()
  })
  afterAll(async () => {
  await db.destroy()
  })

  describe('GET /profile', () => {
    test('returns a status 200 OK', async () => {
      const res = await request(server).get('/profile')
      expect(res.status).toBe(200)
    })
  })

  describe('GET /', () => {
    test('returns a status 404 Not Found', async () => {
      const res = await request(server).get('/')
      expect(res.status).toBe(404)
    })
  })

  describe('POST /profile', () => {
    test('returns a status 201 Created', async () => {
      const res = await request(server)
        .post('/profile')
        .send({ Name: 'Iris West Allen', Abilities: 'Wife of Flash' })
      expect(res.status).toBe(201)
    })
  })

  describe('POST /profile', () => {
    test('returns a status 404 Not Found', async () => {
      const res = await request(server).get('/')
      expect(res.status).toBe(404)
    })
  })