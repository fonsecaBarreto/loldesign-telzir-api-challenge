import { FranchisePlan } from "@prisma/client";

const fakeMinutes: number[] = [30, 60, 120];
const fakeNames = ["Plano de 1/2 hr", "plano de 1 hr", "plano de 2 horas"];

let id_count = 0;

export const MockFranchiseplan = (
  fields?: Partial<FranchisePlan>,
): FranchisePlan => {
  const index = Math.floor(Math.random() * fakeMinutes.length);
  id_count++;
  return {
    id: id_count,
    franchiseMinutes: fakeMinutes[index],
    label: fakeNames[index],
    ...fields,
  };
};
