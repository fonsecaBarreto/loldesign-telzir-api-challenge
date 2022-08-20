import { FranchisePlansService } from "@/services/plans/plans.service";
import { Controller, Get } from "@nestjs/common";

@Controller("plans")
export class FranchisePlansController {
  constructor(private readonly _plansService: FranchisePlansService) {}
  @Get()
  findAll(): Promise<any> {
    return this._plansService.findAll();
  }
}
