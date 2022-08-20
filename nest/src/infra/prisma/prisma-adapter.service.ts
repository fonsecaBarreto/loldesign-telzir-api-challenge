import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaAdapterService extends PrismaClient {
  constructor(_configService: ConfigService) {
    const DB_URL = _configService.get<string>("DATABASE_URL");
    super({
      datasources: {
        db: { url: DB_URL },
      },
    });
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === "production") return;
    const models = Reflect.ownKeys(this).filter((key) => key[0] !== "_");
    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
  }
}
