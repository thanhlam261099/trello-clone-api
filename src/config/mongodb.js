import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  try {
    // connect client to server
    await client.connect()
    console.log('successfully')

    await listDatabases(client)
  } finally {
    await client.close()
  }
}

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases()
  console.log(databasesList)
  console.log('Your databases: ')
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`))
}
