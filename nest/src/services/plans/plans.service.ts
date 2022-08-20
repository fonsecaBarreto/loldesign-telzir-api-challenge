import { PrismaAdapterService } from "@/infra/prisma/prisma-adapter.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FranchisePlansService {
  constructor(private readonly _repository: PrismaAdapterService) {}
  public async findAll(): Promise<any> {
    const records = await this._repository.franchisePlan.findMany({});
    return records;
  }
}
