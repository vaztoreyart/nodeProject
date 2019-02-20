import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { ItemInventory } from '.'

const app = () => express(apiRoot, routes)

let itemInventory

beforeEach(async () => {
  itemInventory = await ItemInventory.create({})
})

test('POST /itemInventory 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, item: 'test', description: 'test', price: 'test', discount: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.item).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.discount).toEqual('test')
})

test('POST /itemInventory 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /itemInventory 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /itemInventory 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /itemInventory/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${itemInventory.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(itemInventory.id)
})

test('GET /itemInventory/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${itemInventory.id}`)
  expect(status).toBe(401)
})

test('GET /itemInventory/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /itemInventory/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${itemInventory.id}`)
    .send({ access_token: masterKey, item: 'test', description: 'test', price: 'test', discount: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(itemInventory.id)
  expect(body.item).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.discount).toEqual('test')
})

test('PUT /itemInventory/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${itemInventory.id}`)
  expect(status).toBe(401)
})

test('PUT /itemInventory/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, item: 'test', description: 'test', price: 'test', discount: 'test' })
  expect(status).toBe(404)
})

test('DELETE /itemInventory/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${itemInventory.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /itemInventory/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${itemInventory.id}`)
  expect(status).toBe(401)
})

test('DELETE /itemInventory/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
