import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { slug: 'cua-va-he-cua', name: 'Cửa và hệ cửa', position: 1 },
    { slug: 'vach-kinh', name: 'Vách kính', position: 2 },
    { slug: 'giai-phap-kien-truc', name: 'Giải pháp kiến trúc', position: 3 },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
