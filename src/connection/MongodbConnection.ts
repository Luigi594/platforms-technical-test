import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let connection!: MongoClient;
let mongoURI = process.env.MONGO_URI || "mongo://localhost:27017";
let mongodbName = process.env.MONGO_DBNAME;

export const getMongoConnection = async () => {
  if (!connection) {
    connection = await MongoClient.connect(mongoURI);
  }
  return connection.db(mongodbName);
};
