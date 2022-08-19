import { Region } from "@prisma/client";

export const MockRegion = (fields?: Partial<Region>): Region => {
  return {
    cod: Math.floor(Math.random() * 100),
    name: "Nome da região aqui",
    ...fields,
  };
};
