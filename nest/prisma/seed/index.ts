import { FranchisePlan, PrismaClient, Region, RegionsFare } from "@prisma/client";
import { estadoPorDdd } from "./ddds.json";
import { tarifasPorEstados } from "./regionsFares.json";
import { planos } from "./plans.json";

const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
});

async function main() {
  const regions: Region[] = Object.keys(estadoPorDdd).map((cod: string) => {
    return {
      name: estadoPorDdd[cod],
      cod: Number(cod),
    };
  });

  const regionsFares: RegionsFare[] = tarifasPorEstados.map((p: any) => ({
    originCod: p[0],
    destinyCod: p[1],
    fare: p[2],
  }));

  const franchisePlans: Omit<FranchisePlan, "id">[] = Object.keys(planos).map(
    (key: any) => {
      return {
        label: key,
        franchiseMinutes: planos[key],
      };
    },
  );

  await prisma.region.deleteMany({});
  await prisma.regionsFare.deleteMany({});
  await prisma.franchisePlan.deleteMany({});
  await prisma.region.createMany({ data: regions });
  await prisma.regionsFare.createMany({ data: regionsFares });
  await prisma.franchisePlan.createMany({ data: franchisePlans });
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
