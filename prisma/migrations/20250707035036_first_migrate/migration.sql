-- CreateTable
CREATE TABLE "Tim" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Tim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "timId" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_timId_fkey" FOREIGN KEY ("timId") REFERENCES "Tim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
