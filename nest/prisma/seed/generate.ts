import { FranchisePlan, Region, RegionsFare } from "@prisma/client";
import path from "path";
import fs from "fs";

const estadoPorDdd = {
  11: "São Paulo - SP",
  16: "Ribeirão Preto - SP",
  17: "São José do Rio Preto - SP",
  18: "Presidente Prudente - SP",
};

const planos: any = {
  "FaleMais 30": 30,
  "FaleMais 60": 60,
  "FaleMais 120": 120,
};

const tarifasPorEstados = [
  [11, 16, 1.9],
  [16, 11, 2.9],
  [11, 17, 1.7],
  [17, 11, 2.7],
  [11, 18, 0.9],
  [18, 11, 1.9],
];

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

  fs.writeFileSync(
    path.resolve(__dirname, "seed.json"),
    JSON.stringify({ regions, regionsFares, franchisePlans }),
  );
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("JSON GERADO COM SUCESSO!");
  });
