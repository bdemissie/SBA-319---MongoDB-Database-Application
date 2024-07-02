import {MongoClient} from 'mongodb'

const user  = process.env.USER;
const password = process.env.PASSWORD;
// const uri = `mongodb+srv://${user}:${password}@mongocluster.kpjim1y.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster`
let uri = "mongodb+srv://kermeloswoldeyesdr:MTIJoSjMpTQL00lO@mongocluster.kpjim1y.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster"
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