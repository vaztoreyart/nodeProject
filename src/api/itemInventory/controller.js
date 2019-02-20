import { success, notFound } from '../../services/response/'
import { ItemInventory } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  ItemInventory.create(body)
    .then((itemInventory) => itemInventory.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  ItemInventory.find(query, select, cursor)
    .then((itemInventories) => itemInventories.map((itemInventory) => itemInventory.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  ItemInventory.findById(params.id)
    .then(notFound(res))
    .then((itemInventory) => itemInventory ? itemInventory.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  ItemInventory.findById(params.id)
    .then(notFound(res))
    .then((itemInventory) => itemInventory ? Object.assign(itemInventory, body).save() : null)
    .then((itemInventory) => itemInventory ? itemInventory.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  ItemInventory.findById(params.id)
    .then(notFound(res))
    .then((itemInventory) => itemInventory ? itemInventory.remove() : null)
    .then(success(res, 204))
    .catch(next)
