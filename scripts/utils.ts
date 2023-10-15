import { Prisma } from "@prisma/client";
import { publicationFetched } from "./mongo";

export function authorConverted() {
  //
}

type ReceptionDict = {
  translations: any[];
  reviews: any[];
  articles: any[];
  adaptations: any[];
  other: any[];
};

function asReceptionWithType(entry: [string, string[]]) {
  const [type, receptions] = entry;
  // Note: what if id is "new ObjectId(blablaa)" ???

  // NEED TO HAVE PERSONS HERE, so all persons have to have been processed before

  const reception: Partial<Prisma.ReceptionCreateInput> = {
    Reception_type: type,
  };

  return reception;
}

function idAsString(id: string | unknown) {
  if (typeof id !== "string") return "CONVERTOBJECTID";
  return id;
}

async function saveReception(
  type: string,
  receptionIdRaw: string | unknown,
  db: any,
) {
  const receptionId = idAsString(receptionIdRaw);
  const publication = await publicationFetched(receptionId, db);
}

async function processReceptions(receptions: ReceptionDict, db: any) {
  const { adaptations, articles, other, reviews, translations } = receptions;
  for (const entry of Object.entries(receptions)) {
    const [type, receptionIds] = entry;
    // RECURSIVELY PROCESS ALL THE RECEPTIONS HERE!!
    for (const id of receptionIds) {
      await saveReception(type, id, db);
    }
  }
  const receptionList = Object.entries(receptions).map(asReceptionWithType);
  // console.log(receptionList);
}

export async function authorWorksToReceptions(author: any, db: any) {
  const publications = author.publications;
  for (const publication of publications) {
    const receptions = publication?.receptions;
    await processReceptions(receptions, db);
  }
}
