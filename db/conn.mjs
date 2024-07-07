import {MongoClient} from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

const user  = process.env.USER;
const password = process.env.PASSWORD;

// let uri = `mongodb+srv://${user}:${password}@mongocluster.kpjim1y.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster`
let uri = 'mongodb+srv://perScholasUser:EM3RhJuQ3GrYRzm9@mongocluster.kpjim1y.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster'
const client = new MongoClient(uri);

let conn;

try {

    conn = await client.connect();
}
catch (e) {

    console.error(e);
}

let db = conn.db("sba-19")

export default db;