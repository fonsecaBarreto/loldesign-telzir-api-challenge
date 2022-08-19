import { Injectable } from "@nestjs/common";
import { PrismaAdapterService } from "src/infra/prisma/prisma-adapter.service";

@Injectable()
export class RegionsService {
  constructor(private readonly _repository: PrismaAdapterService) {}
  public async findAll(): Promise<any> {
    const [records] = await this._repository.$transaction([
      this._repository.region.findMany({}),
    ]);
    return records;
  }
  public async findbyId(regionCod: number): Promise<any> {
    const region = await this._repository.region.findUnique({
      where: { cod: regionCod },
    });
    if (!region) return null;
    return region;
  }
}
