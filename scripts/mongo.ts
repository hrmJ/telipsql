import { Db, ObjectId } from "mongodb";

export async function publicationFetched(id: string, db: Db) {
  const authors = db.collection("authors");
  const result = authors.aggregate([
    { $match: { "publications._id": new ObjectId(id) } },
    { $unwind: "$publications" },
    {
      $group: {
        _id: "$name",
        publications: { $addToSet: "$publications" },
      },
    },
  ]);
  for await (const doc of result) {
    console.log(doc);
  }

  //const publication = await publications.findOne({ id: new ObjectId(id) });
  //if (!publication) {
  //  console.log(`NO PUBLICATION with id ${id} FOUND`);
  //}
  return null;
}
