import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { Test, TestingModule } from "@nestjs/testing";
import { RegionsService } from "@/services/regions/regions.service";
import { PrismaAdapterService } from "@/infra/prisma/prisma-adapter.service";
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
];

describe("Regions Services", () => {
  let sut: RegionsService;
  let prismaStub: PrismaClient;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionsService,
        {
          provide: PrismaAdapterService,
          useFactory: () => mockDeep<PrismaClient>(),
        },
      ],
    }).compile();
    sut = await module.get<RegionsService>(RegionsService);
    prismaStub = await module.get<PrismaClient>(PrismaAdapterService);

    prismaStub.$transaction = jest.fn();
    jest.spyOn(prismaStub, "$transaction").mockImplementation((args: any[]) => {
      return Promise.all(args);
    });

    prismaStub.region.findUnique = jest.fn();
    prismaStub.region.findMany = jest.fn();
  });

  describe("findAll", () => {
    let findSpy: any;
    beforeEach(async () => {
      findSpy = jest
        .spyOn(prismaStub.region, "findMany")
        .mockResolvedValue(fakeRegions);
    });

    it("deve chamar repositorio com valores corretos", async () => {
      await sut.findAll();
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({});
    });

    it("deve retornar dados", async () => {
      const result = await sut.findAll();
      expect(result).toEqual(fakeRegions);
    });
  });

  describe("findByCod", () => {
    let findSpy: any;
    beforeEach(async () => {
      findSpy = jest
        .spyOn(prismaStub.region, "findUnique")
        .mockResolvedValue(fakeRegions[0]);
    });

    it("deve chamar repositorio com valores corretos", async () => {
      await sut.findByCod(2);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({ where: { cod: 2 } });
    });

    it("deve retornar dados", async () => {
      const result = await sut.findByCod(99);
      expect(result).toEqual(fakeRegions[0]);
    });
  });
});
