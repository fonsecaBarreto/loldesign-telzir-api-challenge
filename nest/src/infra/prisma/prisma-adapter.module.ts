import { Global, Module } from "@nestjs/common";
import { PrismaAdapterService } from "./prisma-adapter.service";

@Global()
@Module({
  providers: [PrismaAdapterService],
  exports: [PrismaAdapterService],
})
export class PrismaAdapterModule {}
