import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { CloseApp, MockApp, MockAppEnv } from "./app.mock";
import { MockFranchiseplan } from "../mocks";

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

describe("FranchisePlansController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await MockApp();
  });

  beforeEach(async () => {
    await MockAppEnv(app, { franchisePlan: fakePlans });
  });

  afterAll(() => {
    CloseApp(app);
  });

  describe("/regions (GET)", () => {
    const URL = "/plans";
    it("Deve retornar 200 para nao usuarios", () => {
      return request(app.getHttpServer())
        .get(URL)
        .send()
        .expect(200)
        .expect(fakePlans);
    });
  });
});
