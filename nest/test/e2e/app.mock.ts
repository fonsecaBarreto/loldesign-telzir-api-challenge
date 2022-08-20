import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "@/app.module";
import { PrismaClient } from "@prisma/client";

export const prismaClient: PrismaClient = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

export async function MockApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  await app.init();

  return app;
}

export const MockAppEnv = async (app: any, data) => {
  /* reset tables */
  if (process.env.NODE_ENV != "production") {
    const models = Reflect.ownKeys(prismaClient).filter(
      (key) => key[0] !== "_",
    );
    await Promise.all(
      models.map((modelKey) => prismaClient[modelKey].deleteMany()),
    );
  }

  await prismaClient.$transaction(
    Object.keys(data).map((k) => prismaClient[k].createMany({ data: data[k] })),
  );
};

export const CloseApp = async (app: any) => {
  app.close();
};
