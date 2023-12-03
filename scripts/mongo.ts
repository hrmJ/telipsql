import { Db, ObjectId } from "mongodb";

export async function publicationFetched(id: string, db: Db) {
  const authors = db.collection("authors");
  const objectId = new ObjectId(id);
  const result = await authors.findOne({
    "publications._id": objectId,
  });
  return result.publications.find(({ _id }) => objectId.equals(_id));

  for (const pub of result.publications) {
    console.log(pub._id, objectId, pub._id == objectID);
  }
  // console.log(result.publications[0], { id });
  //const result = await cursor.toArray();
  //const [publication] = result;
  //if (!publication) {
  //  console.log(`NO PUBLICATION with id ${id} FOUND`);
  //  return null;
  //}
  //return publication;
}
