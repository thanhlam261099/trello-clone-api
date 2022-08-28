import Joi from 'joi'
import { ObjectID } from 'mongodb'
import getDB from '*/config/mongodb'

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
})

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId: ObjectID(validatedValue.boardId),
      boardId: ObjectID(validatedValue.columnId),
    }
    const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
    return result
  } catch (error) {
    console.log(error)
  }
}

export const CardModel = { cardCollectionName, createNew }
