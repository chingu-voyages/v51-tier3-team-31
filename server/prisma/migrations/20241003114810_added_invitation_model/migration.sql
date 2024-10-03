-- CreateTable
CREATE TABLE "invitations" (
    "id" SERIAL NOT NULL,
    "expense_group_id" INTEGER NOT NULL,
    "sent_by" INTEGER NOT NULL,
    "invited_email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitations_expense_group_id_invited_email_key" ON "invitations"("expense_group_id", "invited_email");

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_sent_by_fkey" FOREIGN KEY ("sent_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_expense_group_id_fkey" FOREIGN KEY ("expense_group_id") REFERENCES "expense_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
