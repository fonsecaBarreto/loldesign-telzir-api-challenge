import { AppModule } from "@/app.module";
import { RegionsController } from "@/controllers/regions.controller";
import { PrismaAdapterService } from "@/infra/prisma/prisma-adapter.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MockRegion } from "@test/mocks";

const fakeRegions = [
  MockRegion({
    cod: 0,
    name: "Regiao 0",
  }),
  MockRegion({
    cod: 1,
    name: "Regiao 1",
  }),
  MockRegion({
    cod: 2,
    name: "Regiao 2",
  }),
];

describe("Regions Controller", () => {
  let sut: RegionsController;
  /*   let regionsService: RegionsService; */
  let prisma: PrismaAdapterService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    sut = await module.get(RegionsController);
    /*     regionsService = await module.get(RegionsService); */
    prisma = await module.get(PrismaAdapterService);
  });

  beforeEach(async () => {
    await prisma.cleanDatabase();
    await prisma.$transaction([
      prisma.region.createMany({ data: fakeRegions }),
    ]);
  });

  describe("findAll", () => {
    it("Deve retornar dados validos", async () => {
      const result = await sut.findAll();
      expect(result).toEqual(fakeRegions);
    });
  });

  describe("findOne", () => {
    it("Deve jogar erro quando codigo for inválido", async () => {
      const result = sut.findOne(9999);
      await expect(result).rejects.toThrow(
        new HttpException(null, HttpStatus.NO_CONTENT),
      );
    });
    it("Deve retornar dados validos", async () => {
      const result = await sut.findOne(0);
      expect(result).toEqual(fakeRegions[0]);
    });
  });
});
