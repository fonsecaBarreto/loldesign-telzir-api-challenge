import { Controller, Get } from "@nestjs/common";

@Controller("regions")
export class RegionsController {
  @Get()
  async findAll(): Promise<any> {
    return [];
  }
}
