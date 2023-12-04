import { Reception_source } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface TeliPublication {
  receptionOf: any[];
  target: string;
  reception_type: string;
  title: string;
  "english title": string;
  "document type": string;
  genre: string;
  language: string;
  "publication name": string;
  "publish location": string;
  publisher: string;
  year: number;
  date: null;
  source: string;
  note: string;
  receptions: Receptions;
}

export interface TeliReception {
  title: string;
  "english title": string;
  "document type": string;
  genre: string;
  language: string;
  "publish location": string;
  publisher: string;
  year: number;
  source: string;
  target: string;
  reception_type: string;
  note: string;
  receptions: Receptions;
}

export interface Receptions {
  translations: any[];
  reviews: any[];
  articles: any[];
  adaptations: any[];
  other: any[];
}

export const saveReceptionEntries = async (
  receptionEntry: any,
  publication: any,
  type: string,
) => {
  // NOTE: 💡publications should become reception sources!
  const typedTeliReception: TeliReception = receptionEntry;

  // console.log({ savedReception });
};

export const asReceptionSource = async (publication: any) => {
  const typedTeliPublication: TeliPublication = publication;

  // Save work here as well?

  const receptionSource = await prisma.reception_source.create({
    data: {
      title_work: typedTeliPublication.title,
      Person_role: "",
      shelfmark: "",
      reference: "",
      date: 0,
      URL: "",
      Notes: "",
    },
  });

  return receptionSource;
};
