import { Schema, SchemaTypes, model } from 'mongoose'
const groupSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  name: String,
  username: String,
  link: String,
  admins: Array,
  myStatus: String,
})

export default model('Group', groupSchema)
