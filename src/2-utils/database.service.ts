// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { cars?: mongoDB.Collection, users?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
      
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const carsCollection: mongoDB.Collection = db.collection(process.env.CARS_COLLECTION_NAME);
    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME);
 
    collections.cars = carsCollection;
    collections.users = usersCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${carsCollection.collectionName} and collection: ${usersCollection.collectionName}`);
 }