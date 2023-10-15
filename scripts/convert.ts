import { MongoClient } from "mongodb";
import { authorWorksToReceptions } from "./utils";
const client = new MongoClient("mongodb://localhost:27017/teli");

await client.connect();
const db = client.db("teli");

const authors = db.collection("authors");
const allAuthors = await authors.find({}).toArray();

allAuthors.forEach(authorWorksToReceptions);

await client.close();
