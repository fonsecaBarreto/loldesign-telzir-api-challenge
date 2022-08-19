import { Controller, Get } from "@nestjs/common";

@Controller("regions")
export class RidesController {
  @Get()
  async findAll(): Promise<any> {
    return [];
  }
}
