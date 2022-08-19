import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaAdapterModule } from "./infra/prisma/prisma-adapter.module";
import { RegionsController } from "./regions.controller";

@Module({
  imports: [PrismaAdapterModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [RegionsController],
  providers: [],
})
export class AppModule {}
