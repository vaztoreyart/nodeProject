import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export ItemInventory, { schema } from './model'

const router = new Router()
const { item, description, price, discount } = schema.tree

/**
 * @api {post} /itemInventory Create item inventory
 * @apiName CreateItemInventory
 * @apiGroup ItemInventory
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam item Item inventory's item.
 * @apiParam description Item inventory's description.
 * @apiParam price Item inventory's price.
 * @apiParam discount Item inventory's discount.
 * @apiSuccess {Object} itemInventory Item inventory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item inventory not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ item, description, price, discount }),
  create)

/**
 * @api {get} /itemInventory Retrieve item inventories
 * @apiName RetrieveItemInventories
 * @apiGroup ItemInventory
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} itemInventories List of item inventories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /itemInventory/:id Retrieve item inventory
 * @apiName RetrieveItemInventory
 * @apiGroup ItemInventory
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} itemInventory Item inventory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item inventory not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /itemInventory/:id Update item inventory
 * @apiName UpdateItemInventory
 * @apiGroup ItemInventory
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam item Item inventory's item.
 * @apiParam description Item inventory's description.
 * @apiParam price Item inventory's price.
 * @apiParam discount Item inventory's discount.
 * @apiSuccess {Object} itemInventory Item inventory's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Item inventory not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ item, description, price, discount }),
  update)

/**
 * @api {delete} /itemInventory/:id Delete item inventory
 * @apiName DeleteItemInventory
 * @apiGroup ItemInventory
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Item inventory not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
