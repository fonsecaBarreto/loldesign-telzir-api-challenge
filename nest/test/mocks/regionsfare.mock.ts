import { RegionsFare } from "@prisma/client";

export const MockRegionsFare = (fields?: Partial<RegionsFare>): RegionsFare => {
  return {
    destinyCod: 0,
    originCod: 1,
    fare: 1.9,
    ...fields,
  };
};
