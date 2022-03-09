-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "media_type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
