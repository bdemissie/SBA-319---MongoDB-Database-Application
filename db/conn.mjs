import {MongoClient} from 'mongodb'

const user  = process.env.USER;
const password = process.env.PASSWORD;
// const uri = `mongodb+srv://${user}:${password}@mongocluster.kpjim1y.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster`
const uri = "mongodb+srv://kermeloswoldeyesdr:L6v9vZnjCvs0tYGA@mongocluster.kpjim1y.mongodb.net/?retryWrites=true&w=majority&appName=MongoCluster"
const client = new MongoClient(uri);

let conn;

try {

    conn = await client.connect();
}
catch (e) {

    console.error(e);
}

let db = conn.db("sample-training")

export default db;