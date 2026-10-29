-- CreateTable
CREATE TABLE "SitterProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bio" TEXT NOT NULL,
    "hourlyRate" DECIMAL(65,30),
    "city" TEXT NOT NULL,
    "address" TEXT,
    "experienceInYears" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SitterProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SitterProfile_userId_key" ON "SitterProfile"("userId");

-- AddForeignKey
ALTER TABLE "SitterProfile" ADD CONSTRAINT "SitterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
