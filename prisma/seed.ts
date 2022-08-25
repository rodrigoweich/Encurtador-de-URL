import { PrismaClient } from '@prisma/client';
import { PrefixoSeed } from './seeds/prefixo.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.prefixo.createMany({
    data: PrefixoSeed,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
