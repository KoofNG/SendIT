import { Client } from "pg";
import dotEnv from "dotEnv";

dotEnv.config();

const connectionString = "postgressql://koofng:0813@localhost:5432/sendIT";

// ${process.env.PORT}
console.log(process.env.key);

const client = new Client({
  connectionString: connectionString
});

client
  .connect()
  .then(res => {
    console.log(res);
    return true;
  })
  .catch(err => {
    console.log(err);
    return false;
  });

export default client;
