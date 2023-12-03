import { Db, ObjectId } from "mongodb";

export async function publicationFetched(id: string, db: Db) {
  const authors = db.collection("authors");
  const cursor = authors.aggregate([
    { $match: { "publications._id": new ObjectId(id) } },
    { $unwind: "$publications" },
    {
      $group: {
        _id: "$name",
        publications: { $addToSet: "$publications" },
      },
    },
  ]);
  const result = await cursor.toArray();
  const [publication] = result;
  if (!publication) {
    console.log(`NO PUBLICATION with id ${id} FOUND`);
    return null;
  }
  return publication;
}
