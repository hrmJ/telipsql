-- CreateTable
CREATE TABLE "Persons" (
    "id" SERIAL NOT NULL,
    "Short_name" VARCHAR(255) NOT NULL,
    "VIAF_or_CERL_identifier" VARCHAR(255) NOT NULL,
    "First_name" VARCHAR(255) NOT NULL,
    "Maiden_name" VARCHAR(255) NOT NULL,
    "Married_name" VARCHAR(255) NOT NULL,
    "Alternative_name" VARCHAR(255) NOT NULL,
    "Date_in_use_of_name" INTEGER NOT NULL,
    "Date_of_birth" INTEGER NOT NULL,
    "Date_of_death" INTEGER NOT NULL,
    "Flourishing" INTEGER NOT NULL,
    "Sex" VARCHAR(255) NOT NULL,
    "Alternative_name_gender" VARCHAR(255) NOT NULL,
    "Professional_ecclesiatic_title" VARCHAR(255) NOT NULL,
    "Role" VARCHAR(255) NOT NULL,
    "Date_of_role" INTEGER NOT NULL,
    "Place_of_residence" VARCHAR(255) NOT NULL,
    "Date_of_residence" INTEGER NOT NULL,
    "Education" VARCHAR(200) NOT NULL,
    "Marital_status" VARCHAR(255) NOT NULL,
    "Date_of_marital_status" INTEGER NOT NULL,
    "Profession" VARCHAR(255) NOT NULL,
    "Religion" VARCHAR(255) NOT NULL,
    "Bibliography" TEXT NOT NULL,
    "Notes" TEXT NOT NULL,

    CONSTRAINT "Persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collectives" (
    "id" SERIAL NOT NULL,
    "Type" VARCHAR(255) NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Dates_of_activity" INTEGER NOT NULL,
    "Notes" TEXT NOT NULL,

    CONSTRAINT "Collectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Works" (
    "id" SERIAL NOT NULL,
    "VIAF_Work" VARCHAR(32) NOT NULL,
    "Language" VARCHAR(255) NOT NULL,
    "Person_role" VARCHAR(255) NOT NULL,
    "Notes" TEXT NOT NULL,

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Editions" (
    "id" SERIAL NOT NULL,
    "Publication_year" INTEGER NOT NULL,
    "Language" VARCHAR(255) NOT NULL,
    "CERL_Publisher" VARCHAR(255) NOT NULL,
    "Person_role" VARCHAR(255) NOT NULL,
    "Genre" VARCHAR(255) NOT NULL,
    "URL" VARCHAR(255) NOT NULL,
    "Notes" TEXT NOT NULL,

    CONSTRAINT "Editions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receptions" (
    "id" SERIAL NOT NULL,
    "Person_role" VARCHAR(255) NOT NULL,
    "Title" TEXT NOT NULL,
    "Reference" TEXT NOT NULL,
    "Date_of_reception" INTEGER NOT NULL,
    "Quotation_reception" TEXT NOT NULL,
    "Document_type" VARCHAR(255) NOT NULL,
    "URL" VARCHAR(200) NOT NULL,
    "Reception_type" VARCHAR(255) NOT NULL,
    "Language_of_reception" VARCHAR(255) NOT NULL,
    "Reception_genre" VARCHAR(255) NOT NULL,
    "VIAF_Work" VARCHAR(255) NOT NULL,
    "Notes" TEXT NOT NULL,

    CONSTRAINT "Receptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reception_sources" (
    "id" SERIAL NOT NULL,
    "title_work" VARCHAR(200) NOT NULL,
    "Person_role" VARCHAR(255) NOT NULL,
    "shelfmark" VARCHAR(200) NOT NULL,
    "reference" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "URL" VARCHAR(200) NOT NULL,
    "Notes" TEXT NOT NULL,

    CONSTRAINT "Reception_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Places" (
    "id" SERIAL NOT NULL,
    "Name_of_city" VARCHAR(200) NOT NULL,
    "CERL_ID" VARCHAR(255) NOT NULL,
    "Modern_country" VARCHAR(255) NOT NULL,
    "Latitude" INTEGER NOT NULL,
    "Longitude" INTEGER NOT NULL,

    CONSTRAINT "Places_pkey" PRIMARY KEY ("id")
);
