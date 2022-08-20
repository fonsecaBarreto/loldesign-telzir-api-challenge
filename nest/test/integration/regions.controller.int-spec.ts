import { AppModule } from "@/app.module";
import { RegionsController } from "@/controllers/regions.controller";
import { PrismaAdapterService } from "@/infra/prisma/prisma-adapter.service";
import { RegionsService } from "@/services/regions/regions.service";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { MockRegion, MockRegionsFare } from "@test/mocks";

const fakeRegions = [
  MockRegion({
    cod: 0,
    name: "Regiao 0",
  }),
  MockRegion({
    cod: 1,
    name: "Regiao 1",
  }),
];

const fakeRegionsFares = [
  MockRegionsFare({
    originCod: fakeRegions[0].cod,
    destinyCod: fakeRegions[1].cod,
    fare: 33,
  }),
];

describe("Regions Controller", () => {
  let sut: RegionsController;
  let regionsService: RegionsService;
  let prisma: PrismaAdapterService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    sut = await module.get(RegionsController);
    regionsService = await module.get(RegionsService);
    prisma = await module.get(PrismaAdapterService);
  });

  beforeEach(async () => {
    await prisma.cleanDatabase();
    await prisma.$transaction([
      prisma.region.createMany({ data: fakeRegions }),
      prisma.regionsFare.createMany({ data: fakeRegionsFares }),
    ]);
  });

  describe("findAll", () => {
    it("Deve retornar dados validos", async () => {
      const result = await sut.findAll();
      expect(result).toEqual(fakeRegions);
    });
  });

  describe("findOne", () => {
    it("deve chamar serviço com valores corretos ", async () => {
      const serviceSpy = jest.spyOn(regionsService, "findByCod");
      await sut.findOne(0);
      expect(serviceSpy).toHaveBeenCalledWith(0);
    });
    it("Deve jogar erro quando codigo inexistente", async () => {
      const result = sut.findOne(9999);
      await expect(result).rejects.toThrow(
        new HttpException(null, HttpStatus.NO_CONTENT),
      );
    });

    it("Serviço deve retornar dados", async () => {
      const result = await sut.findOne(0);
      expect(result).toEqual({
        cod: 0,
        destinyRegions: [
          {
            fare: fakeRegionsFares[0].fare,
            destinyRegion: fakeRegions[1],
          },
        ],
        name: "Regiao 0",
      });
    });
  });
});
