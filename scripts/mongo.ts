export async function publicationFetched(id: string, db: any) {
  const publications = db.collection("publications");
  const publication = await publications.findById(id);
  if (!publication) throw new Error("NO PUBLICATION FOUND");
  return publication;
}
