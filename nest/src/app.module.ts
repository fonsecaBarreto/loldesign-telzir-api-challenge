import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaAdapterModule } from "./infra/prisma/prisma-adapter.module";
import { RegionsController } from "./controllers/regions.controller";
import { RegionsService } from "./services/regions/regions.service";

@Module({
  imports: [PrismaAdapterModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class AppModule {}
