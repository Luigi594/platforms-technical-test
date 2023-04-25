import app from "./config/express";
import { getMongoConnection } from "./connection/MongodbConnection";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3002;

getMongoConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Error connection to database ${error}`);
    process.exit(1);
  });
