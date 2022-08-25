-- CreateTable
CREATE TABLE "prefixo" (
    "id_prefixo" SERIAL NOT NULL,
    "ds_prefixo" TEXT,
    "fg_padrao" BOOLEAN NOT NULL DEFAULT false,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_prefixo" PRIMARY KEY ("id_prefixo")
);

-- CreateTable
CREATE TABLE "url" (
    "id_url" SERIAL NOT NULL,
    "ds_url" TEXT NOT NULL,
    "ds_url_encurtada" VARCHAR(25) NOT NULL,
    "id_prefixo" INTEGER,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_url" PRIMARY KEY ("id_url")
);

-- CreateIndex
CREATE UNIQUE INDEX "ui_prefixo_001" ON "prefixo"("ds_prefixo");

-- CreateIndex
CREATE UNIQUE INDEX "ui_url_001" ON "url"("ds_url");

-- CreateIndex
CREATE UNIQUE INDEX "ui_url_002" ON "url"("ds_url_encurtada");

-- AddForeignKey
ALTER TABLE "url" ADD CONSTRAINT "url_id_prefixo_fkey" FOREIGN KEY ("id_prefixo") REFERENCES "prefixo"("id_prefixo") ON DELETE SET NULL ON UPDATE CASCADE;
