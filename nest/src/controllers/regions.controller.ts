import { RegionsService } from "@/services/regions/regions.service";
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from "@nestjs/common";

@Controller("regions")
export class RegionsController {
  constructor(private readonly _regionsService: RegionsService) {}
  @Get()
  findAll(): Promise<any> {
    return this._regionsService.findAll();
  }
  @Get(":region_cod")
  async findOne(
    @Param("region_cod", ParseIntPipe) regionCod: number,
  ): Promise<any> {
    const region = await this._regionsService.findByCod(regionCod);
    if (!region) throw new HttpException(null, HttpStatus.NO_CONTENT);
    return region;
  }
}
