import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaAdapterModule } from "./infra/prisma/prisma-adapter.module";
import { RegionsController } from "./controllers/regions.controller";
import { RegionsService } from "./services/regions/regions.service";
import { FranchisePlansController } from "./controllers/plans.controller";
import { FranchisePlansService } from "./services/plans/plans.service";

@Module({
  imports: [PrismaAdapterModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [RegionsController, FranchisePlansController],
  providers: [RegionsService, FranchisePlansService],
})
export class AppModule {}
