import { AppModule } from "@/app.module";
import { FranchisePlansController } from "@/controllers/plans.controller";
import { PrismaAdapterService } from "@/infra/prisma/prisma-adapter.service";
import { FranchisePlansService } from "@/services/plans/plans.service";
import { Test, TestingModule } from "@nestjs/testing";
import { MockFranchiseplan } from "@test/mocks";

const fakePlans = [
  MockFranchiseplan({
    id: 0,
    franchiseMinutes: 33,
    label: "Plano primeiro",
  }),
  MockFranchiseplan({
    id: 1,
    franchiseMinutes: 44,
    label: "Plano segundo",
  }),
  MockFranchiseplan({
    id: 2,
    franchiseMinutes: 666,
    label: "Plano terceiro",
  }),
];

describe("Regions Controller", () => {
  let sut: FranchisePlansController;
  let prisma: PrismaAdapterService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    sut = await module.get(FranchisePlansController);
    prisma = await module.get(PrismaAdapterService);
  });

  beforeEach(async () => {
    await prisma.cleanDatabase();
    await prisma.$transaction([
      prisma.franchisePlan.createMany({ data: fakePlans }),
    ]);
  });

  describe("findAll", () => {
    it("Deve retornar dados validos", async () => {
      const result = await sut.findAll();
      expect(result).toEqual(fakePlans);
    });
  });
});
