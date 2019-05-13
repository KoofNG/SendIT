import { Client } from "pg";
import dotEnv from "dotEnv";

dotEnv.config();

const connectionString = "postgressql://koofng:0813@localhost:5432/sendIT";

const client = new Client({
  connectionString: connectionString
});

client
  .connect()
  .then(res => {
    console.log(res);
    console.log('Database connected guy');
    return true;
  })
  .catch(err => {
    console.log(err);
    console.log('Database fucked you up!');
    return false;
  });

export default client;
