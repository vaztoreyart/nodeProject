import { ItemInventory } from '.'

let itemInventory

beforeEach(async () => {
  itemInventory = await ItemInventory.create({ item: 'test', description: 'test', price: 'test', discount: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = itemInventory.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(itemInventory.id)
    expect(view.item).toBe(itemInventory.item)
    expect(view.description).toBe(itemInventory.description)
    expect(view.price).toBe(itemInventory.price)
    expect(view.discount).toBe(itemInventory.discount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = itemInventory.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(itemInventory.id)
    expect(view.item).toBe(itemInventory.item)
    expect(view.description).toBe(itemInventory.description)
    expect(view.price).toBe(itemInventory.price)
    
    expect(view.discount).toBe(itemInventory.discount)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
