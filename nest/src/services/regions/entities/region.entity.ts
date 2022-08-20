import { Region, RegionsFare } from "@prisma/client";
import { Exclude, Expose } from "class-transformer";

export interface DestinyRegion {
  fare: number;
  region: Region;
}

export class RegionEntity implements Region {
  cod: number;
  name: string;

  @Exclude()
  destinyRegions: RegionsFare[];

  @Expose()
  get destinies(): DestinyRegion[] {
    return this.destinyRegions.map((p: any) => {
      return {
        fare: p.fare,
        region: p.destinyRegion,
      };
    });
  }

  constructor(partial: Partial<RegionEntity>) {
    Object.assign(this, partial);
  }
}
