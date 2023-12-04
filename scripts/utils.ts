import { Prisma } from "@prisma/client";
import { publicationFetched } from "./mongo";
import { asReceptionSource, saveReceptionEntries } from "./psql";

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

function processReceptionsForPublication(publication: any, db: any) {
  return async function (type: string, receptionIdRaw: string | unknown) {
    const receptionId = idAsString(receptionIdRaw);
    const receptionEntryInTeli = await publicationFetched(receptionId, db);
    // console.log({ receptionEntryInTeli, receptionId, type });
    await saveReceptionEntries(receptionEntryInTeli, publication, type).catch(
      () => console.log(`ERROR saving ${JSON.stringify(publication)}`),
    );
  };
}

async function processReceptions(publication: any, db: any) {
  const receptions = (publication?.receptions as ReceptionDict) ?? {};
  const { adaptations, articles, other, reviews, translations } = receptions;
  const processed = processReceptionsForPublication(publication, db);
  for (const entry of Object.entries(receptions)) {
    const [type, receptionIds] = entry;
    // RECURSIVELY PROCESS ALL THE RECEPTIONS HERE!!
    for (const id of receptionIds) {
      await processed(type, id);
    }
  }
  // const receptionList = Object.entries(receptions).map(asReceptionWithType);
  // console.log(receptionList);
}

export function authorWorksToReceptions(db: any) {
  return async function (author: any) {
    const publications = author.publications;
    for (const publication of publications) {
      const publicationInPsql = await asReceptionSource(publication);
      console.log({ publicationInPsql });
      await processReceptions(publication, db);
    }
  };
}
