import mongoose, { Schema } from 'mongoose'

const itemInventorySchema = new Schema({
  item: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: String
  },
  discount: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

itemInventorySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      item: this.item,
      description: this.description,
      price: this.price,
      discount: this.discount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ItemInventory', itemInventorySchema)

export const schema = model.schema
export default model
