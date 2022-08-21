const seed = require("./seed.json");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
});

async function main() {
  await prisma.region.deleteMany({});
  await prisma.regionsFare.deleteMany({});
  await prisma.franchisePlan.deleteMany({});
  await prisma.region.createMany({ data: seed.regions });
  await prisma.regionsFare.createMany({ data: seed.regionsFares });
  await prisma.franchisePlan.createMany({ data: seed.franchisePlans });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("done", process.env.DATABASE_URL);
    await prisma.$disconnect();
  });
