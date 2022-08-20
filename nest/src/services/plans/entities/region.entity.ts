import { FranchisePlan } from "@prisma/client";

export class FranchisePlanEntity implements FranchisePlan {
  id: number;
  label: string;
  franchiseMinutes: number;

  constructor(partial: Partial<FranchisePlanEntity>) {
    Object.assign(this, partial);
  }
}
