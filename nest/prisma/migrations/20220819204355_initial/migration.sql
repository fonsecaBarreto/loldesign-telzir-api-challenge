-- CreateTable
CREATE TABLE "regions" (
    "cod" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("cod")
);

-- CreateTable
CREATE TABLE "regionFares" (
    "originCod" INTEGER NOT NULL,
    "destinyCod" INTEGER NOT NULL,
    "fare" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "regionFares_pkey" PRIMARY KEY ("originCod","destinyCod")
);

-- CreateTable
CREATE TABLE "franchisePlans" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "franchiseMinutes" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "franchisePlans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "regionFares" ADD CONSTRAINT "regionFares_originCod_fkey" FOREIGN KEY ("originCod") REFERENCES "regions"("cod") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regionFares" ADD CONSTRAINT "regionFares_destinyCod_fkey" FOREIGN KEY ("destinyCod") REFERENCES "regions"("cod") ON DELETE CASCADE ON UPDATE CASCADE;
